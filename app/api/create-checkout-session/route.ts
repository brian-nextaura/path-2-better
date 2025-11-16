import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';

export async function POST(request: NextRequest) {
  try {
    const { amount, campaignSlug, campaignName, donationType } = await request.json();

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
              unit_amount: amount,
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
              unit_amount: amount,
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
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
