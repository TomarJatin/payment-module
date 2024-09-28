import { NextResponse } from 'next/server';
import { createStripeSubscription } from '@/lib/api/stripe';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    const session = await createStripeSubscription(userId);

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: 'Error creating subscription' }, { status: 500 });
  }
}