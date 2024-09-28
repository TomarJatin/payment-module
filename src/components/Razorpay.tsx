"use client";
import { Button } from "@/components/ui/button"
import { createOrder, verifyPayment } from "@/lib/api/razorpay";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Razorpay() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const checkoutHandler = async (amount: number) => {
		console.log("handling checkout", amount);

		if (amount) {
			console.log("intiating checkout");
			try {
				const order = await createOrder(amount);

				const options = {
					key: process.env.RAZORPAY_KEY_ID || "",
					amount: order.amount,
					currency: "INR",
					name: "Testing Payment",
					description: "Payment for testing",
					image: "/logo-full.svg",
					order_id: order.orderId,
					prefill: {
						// name: session.user?.name ?? "",
                        email: "test@test.com",
					},
					notes: {
						address: "Razorpay Corporate Office",
					},
					theme: {
						color: "#170927",
					},
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					handler: async (response: any) => {
						setLoading(true);
						try {
							console.log("response", response);
							const {
								razorpay_payment_id,
								razorpay_order_id,
								razorpay_signature,
							} = response;

							const res = await verifyPayment(razorpay_payment_id, razorpay_order_id, razorpay_signature, "test@test.com");

							if (res) {
								router.push("/dashboard");
								// window.location.reload();
							}
						} catch (error) {
							console.error("Error verifying payment:", error);
						}
						setLoading(false);
					},
				};
				const razor = new window.Razorpay(options);
				razor.open();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				console.error(error);
			}
		} else {
			console.log(amount);
		}
	};

    return (
        <Button disabled={loading} onClick={() => checkoutHandler(1)} variant="outline">Razorpay</Button>
      );
  }
  