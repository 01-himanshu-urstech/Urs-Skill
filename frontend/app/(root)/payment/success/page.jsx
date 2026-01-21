"use client";
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, LayoutDashboard, Mail } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId");

  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const checkRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(cardRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        )
        .fromTo(checkRef.current,
          { scale: 0, rotation: -45 },
          { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" },
          "-=0.4"
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[90vh] flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <div
        ref={cardRef}
        className="max-w-md w-full bg-white rounded-[24px] p-8 shadow-[0_20px_50px_rgba(109,74,255,0.1)] border border-purple-50 text-center"
      >
        {/* Success Icon */}
        <div ref={checkRef} className="flex justify-center mb-6">
          <div className="bg-purple-100 p-4 rounded-full">
            <CheckCircle2 className="text-purple-600 w-12 h-12" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Enrollment Successful
        </h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Your payment was processed successfully. You now have full access to your course materials.
        </p>

        {/* Order Details */}
        <div className="mt-8 bg-purple-50/50 rounded-2xl p-4 border border-purple-100/50">
          <div className="flex justify-between items-center text-[12px] uppercase tracking-wider font-bold text-purple-400 mb-1">
            <span>Transaction ID</span>
            <span className="text-purple-600">Verified</span>
          </div>
          <p className="text-sm font-mono font-medium text-gray-700 break-all">
            {orderId || "CF_ORD_9283741"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Link
            href="/profile"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group"
          >
            <LayoutDashboard size={18} />
            Go to My Profile
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={() => window.print()}
            className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            Download Invoice
          </button>
        </div>

        {/* Footer Support */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 flex items-center justify-center gap-2">
            <Mail size={12} />
            Need help? support@ursskill.com
          </p>
        </div>
      </div>
    </div>
  );
}