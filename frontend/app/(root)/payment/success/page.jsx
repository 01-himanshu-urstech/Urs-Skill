"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-green-600">
        🎉 Payment Successful
      </h1>

      <p className="mt-3 text-lg">
        Order ID: <b>{orderId}</b>
      </p>

      <p className="mt-4 text-gray-600">
        You’ll receive course access shortly.
      </p>
    </div>
  );
}
