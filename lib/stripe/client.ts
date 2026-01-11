import Stripe from 'stripe';

const getSecretKey = (): string => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set');
  }
  return key;
};

// Create a lazy-loaded stripe instance to avoid build-time errors
let stripeInstance: Stripe | null = null;

const getStripe = (): Stripe => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(getSecretKey(), {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    });
  }
  return stripeInstance;
};

export { getStripe };
export const stripe = getStripe();
