"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { XCircle, RefreshCcw, LayoutDashboard, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function PaymentFailedPage() {
  const router = useRouter();
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .fromTo(cardRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        )
        .fromTo(iconRef.current,
          { scale: 0, rotation: 45 },
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
        className="max-w-md w-full bg-white rounded-[24px] p-8 shadow-[0_20px_50px_rgba(239,68,68,0.1)] border border-red-50 text-center"
      >
        {/* Error Icon */}
        <div ref={iconRef} className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="text-red-500 w-12 h-12" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Payment Failed
        </h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed px-4">
          We couldn't process your transaction. This could be due to insufficient funds,
          an expired card, or a temporary connection issue.
        </p>

        {/* Status Box */}
        <div className="mt-8 bg-red-50/50 rounded-2xl p-4 border border-red-100/50">
          <div className="flex justify-between items-center text-[12px] uppercase tracking-wider font-bold text-red-400 mb-1">
            <span>Transaction Status</span>
            <span className="text-red-500 underline underline-offset-4">Declined</span>
          </div>
          <p className="text-sm font-medium text-gray-700">
            No money has been deducted from your account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group shadow-lg shadow-purple-200 hover:cursor-pointer"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Try Payment Again
          </button>

          <Link
            href="/profile"
            className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard size={18} />
            Go to My Profile
          </Link>
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