import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { sendDonationConfirmation } from '@/lib/email/resend';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the checkout session completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract metadata
    const campaignSlug = session.metadata?.campaignSlug;
    const campaignName = session.metadata?.campaignName;
    const donationType = session.metadata?.donationType;
    const customerEmail = session.customer_details?.email;

    if (customerEmail && campaignName) {
      try {
        // Send thank you email
        await sendDonationConfirmation({
          email: customerEmail,
          campaignName,
          amount: session.amount_total || 0,
          isMonthly: donationType === 'monthly',
        });

        console.log(`Donation confirmation email sent to ${customerEmail}`);

        // In the future, you could update the campaign's amountRaised in Sanity here
        // For MVP, agencies will update this manually
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        // Don't fail the webhook if email fails
      }
    }
  }

  return NextResponse.json({ received: true });
}
