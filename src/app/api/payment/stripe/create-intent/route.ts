import { NextResponse } from 'next/server';
import { createStripePaymentIntent } from '@/lib/api/stripe';

export async function POST(request: Request) {
  try {
    const { amount, userId } = await request.json();
    const paymentIntent = await createStripePaymentIntent(amount, userId);

    return NextResponse.json(paymentIntent);
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 });
  }
}