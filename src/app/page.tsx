import Razorpay from "@/components/Razorpay";
import Stripe from "@/components/Stripe";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold block">Payment Gateways</h1>
      <div className=" mt-20 flex flex-col gap-8">
        <Stripe />
        <Razorpay />
      </div>
    </div>
  );
}
