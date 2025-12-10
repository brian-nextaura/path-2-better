import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { getCampaignForDonation } from '@/lib/sanity/queries';

export async function POST(request: NextRequest) {
  try {
    const { amount, campaignSlug, campaignName, donationType } = await request.json();

    const MIN_AMOUNT_CENTS = 100; // $1.00
    const MAX_AMOUNT_CENTS = 5000000; // $50,000.00

    if (!amount || typeof amount !== 'number' || Number.isNaN(amount)) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (!campaignSlug || !campaignName) {
      return NextResponse.json({ error: 'Missing campaign details' }, { status: 400 });
    }

    if (!['one-time', 'monthly'].includes(donationType)) {
      return NextResponse.json({ error: 'Invalid donation type' }, { status: 400 });
    }

    const amountCents = Math.round(amount);

    if (amountCents < MIN_AMOUNT_CENTS || amountCents > MAX_AMOUNT_CENTS) {
      return NextResponse.json(
        { error: `Amount must be between $${MIN_AMOUNT_CENTS / 100} and $${MAX_AMOUNT_CENTS / 100}` },
        { status: 400 }
      );
    }

    const campaign = await getCampaignForDonation(campaignSlug);
    if (!campaign?._id) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status !== 'active') {
      return NextResponse.json({ error: 'Campaign is not accepting donations' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    if (donationType === 'monthly') {
      // Create a subscription checkout session
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'cad',
              product_data: {
                name: `Monthly Sponsorship for ${campaignName}`,
                description: 'Monthly recurring donation',
              },
              unit_amount: amountCents,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/campaigns/${campaignSlug}`,
        metadata: {
          campaignSlug,
          campaignName,
          donationType,
        },
      });

      return NextResponse.json({ sessionId: session.id });
    } else {
      // Create a one-time payment checkout session
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'cad',
              product_data: {
                name: `Support ${campaignName}`,
                description: 'One-time donation',
              },
              unit_amount: amountCents,
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/campaigns/${campaignSlug}`,
        metadata: {
          campaignSlug,
          campaignName,
          donationType,
        },
      });

      return NextResponse.json({ sessionId: session.id });
    }
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
