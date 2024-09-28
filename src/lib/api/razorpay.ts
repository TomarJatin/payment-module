import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrder(amount: number) {
    const response = await axios.post(`${baseURL}/payment/razorpay/checkout`, {
        amount,
        currency: "INR",
    });
    return response.data;
}

export async function verifyPayment(paymentId: string, orderId: string, signature: string, email: string) {
    const response = await axios.post(`${baseURL}/payment/razorpay/verification`, {
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        razorpay_signature: signature,
        email,
    });
    return response.data;
}
