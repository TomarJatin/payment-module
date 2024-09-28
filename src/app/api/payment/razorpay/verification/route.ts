import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
    } = await request.json();

    console.log("razorpay_order_id", razorpay_order_id);
    console.log("razorpay_payment_id", razorpay_payment_id);
    console.log("razorpay_signature", razorpay_signature);
    console.log("email", email);

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSignature) {
      // Payment is successful
      // Here you can update your database, send confirmation email, etc.
      console.log('Payment verified successfully');
      console.log('User email:', email);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { error: 'Error verifying payment' },
      { status: 500 }
    );
  }
}