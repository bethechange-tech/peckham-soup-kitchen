import { loadStripe } from '@stripe/stripe-js';

let stripePromise: any = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      String(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    );
  }
  return stripePromise;
};

export default getStripe;
