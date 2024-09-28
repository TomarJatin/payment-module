import axios from "axios";
import { baseURL } from "../constants";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use the latest API version
});

export async function createPaymentSubscription(amount: number, userId: string) {
const response = await axios.post(`${baseURL}/payment/stripe/create-subscription`, {
    amount,
    userId,
  });
  console.log("createPaymentSubscription response: ", response);
  return response;
}

export async function createPaymentIntent(amount: number, userId: string) {
  const response = await axios.post(`${baseURL}/payment/stripe/create-intent`, {
    amount,
    userId,
  });
  console.log("createPaymentIntent response: ", response);
  return response;
}


// Server-side functions for API routes
export async function createStripeSubscription(userId: string): Promise<Stripe.Checkout.Session> {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
      metadata: { userId },
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        },
      ],
    });
  
    return session;
  }
  
  export async function createStripePaymentIntent(amount: number, userId: string): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      metadata: { userId },
    });
  
    return paymentIntent;
  }