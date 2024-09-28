"use client";

import { Button } from "@/components/ui/button";
import { createPaymentSubscription } from "@/lib/api/stripe";
// import { createPaymentIntent } from "@/lib/api/stripe";
import toast from "react-hot-toast";

export default function Stripe() {

  // async function handleCreatePaymentIntent(amount: number, userId: string) {
  //   try {
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     const response: any = await createPaymentIntent(amount, userId);
  //     return response.json();
  //   } catch (error: unknown) {
  //     console.error('Error creating payment intent:', error);
  //     return null;
  //   }
  // }

  const handleButtonClick = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await createPaymentSubscription(1, "123");
    console.log("res: ", res.data);
    if (res.data) {
      toast.success("Payment subscription created successfully");
      window.location.href = res.data.url;
    } else {
      toast.error("Error creating payment subscription");
    }
  };

  return (
    <Button onClick={handleButtonClick} variant="outline">
      Stripe
    </Button>
  );
}
