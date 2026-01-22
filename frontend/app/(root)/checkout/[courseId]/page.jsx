'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Ticket, CheckCircle2, ArrowRight, ShieldCheck,
    Loader2, Tag, CreditCard, Info, Lock
} from 'lucide-react';
import { useCreateTransactionMutation, useApplyCouponMutation } from '@/store/api/transactionApi';
import { STATIC_COURSES } from '@/app/(root)/constants/constant';
import toast from 'react-hot-toast';
import gsap from 'gsap';

export default function CheckoutPage() {
    const { courseId } = useParams();
    const router = useRouter();
    const course = STATIC_COURSES[courseId];

    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [finalAmount, setFinalAmount] = useState(course?.price || 0);

    const [applyCoupon, { isLoading: applyingCoupon }] = useApplyCouponMutation();
    const [createTransaction, { isLoading: creatingTx }] = useCreateTransactionMutation();

    const containerRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        if (!course) {
            toast.error("Course not found");
            router.push('/courses');
            return;
        }

        const tl = gsap.timeline();
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
          .fromTo(".checkout-reveal", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" });
    }, [course, router]);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return toast.error("Please enter a code");
        try {
            const res = await applyCoupon({
                code: couponCode.toUpperCase(),
                courseId: parseInt(courseId)
            }).unwrap();
            setAppliedCoupon(res.data);
            const discountValue = res.data.discountAmount || 0;
            setFinalAmount(Math.max(0, course.price - discountValue));
            toast.success("Coupon applied!");
        } catch (err) {
            toast.error(err?.data?.message || "Invalid Coupon");
            setAppliedCoupon(null);
            setFinalAmount(course.price);
        }
    };

    const handlePayment = async () => {
        try {
            const payload = {
                courseId: parseInt(courseId),
                couponCode: appliedCoupon?.code || null,
            };
            const res = await createTransaction(payload).unwrap();
            const sessionId = res.data?.paymentSessionId; 

            if (!sessionId) {
                toast.error("Could not initialize payment session.");
                return;
            }

            const cashfree = new window.Cashfree({ mode: "sandbox" });
            cashfree.checkout({ paymentSessionId: sessionId, redirectTarget: "_self" });
        } catch (err) {
            toast.error(err?.data?.message || "Transaction failed");
        }
    };

    if (!course) return null;

    return (
        <div ref={containerRef} className="min-h-screen bg-white py-16 md:py-24 overflow-hidden">
            {/* 1440px ALIGNMENT: Exactly synced with Navbar */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* HEADER: Unified 3xl/5xl Scale */}
                <div className="mb-12 md:mb-20 checkout-reveal">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                            • Secure Enrollment
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                        Complete Your <span className="text-[#8B19E6]">Enrollment.</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT: Enrollment Details */}
                    <div className="lg:col-span-8 space-y-8 checkout-reveal">
                        <div className="bg-[#FAFAFB] rounded-[2.5rem] p-8 md:p-12 border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-purple-100/20">
                            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 pb-8 border-b border-gray-200/50">
                                <div className="flex-1">
                                    <span className="text-[#8B19E6] text-[10px] font-black uppercase tracking-widest block mb-2">Program Selection</span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{course.name}</h2>
                                    <div className="mt-4 flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-500" /> Secure</span>
                                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                                        <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#8B19E6]" /> Certified</span>
                                    </div>
                                </div>
                                <div className="hidden md:flex shrink-0 w-24 h-24 bg-white rounded-3xl items-center justify-center shadow-sm border border-gray-50">
                                    <CreditCard className="text-[#8B19E6]" size={32} />
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-2xl mb-8">
                                You are about to enroll in the {course.name} ecosystem. This includes lifetime access to core modules, 1-1 mentorship, and our global alumni network.
                            </p>

                            {/* Coupon Logic: Minimalist UI */}
                            <div className="max-w-md">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Special Offer Code</label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="ENTER CODE"
                                            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-4 focus:ring-purple-50 outline-none transition-all uppercase font-bold text-gray-700"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={applyingCoupon}
                                        className="bg-gray-900 hover:bg-[#8B19E6] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                                    >
                                        {applyingCoupon ? <Loader2 className="animate-spin" size={20} /> : 'Apply'}
                                    </button>
                                </div>
                                {appliedCoupon && (
                                    <div className="mt-4 inline-flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                                        <Ticket size={12} /> Offer Successfully Applied
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Security Assurance */}
                        <div className="flex items-center gap-6 p-6 border border-dashed border-gray-200 rounded-[2rem] opacity-60">
                             <Lock size={24} className="text-gray-400" />
                             <p className="text-xs font-medium text-gray-500 leading-relaxed">
                                Your payment information is encrypted and processed via Cashfree Secure Gateway. We do not store your card details on our servers.
                             </p>
                        </div>
                    </div>

                    {/* RIGHT: Payment Summary */}
                    <div className="lg:col-span-4 checkout-reveal">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-purple-100/50 border border-gray-100 sticky top-10 overflow-hidden">
                            {/* Visual Progress Bar Accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-50 overflow-hidden">
                                <div className="h-full bg-[#8B19E6] w-3/4" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Order Summary</h3>

                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Standard Tuition</span>
                                    <span className="font-bold text-gray-900 italic">₹{course.price}</span>
                                </div>

                                {appliedCoupon && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-green-600 font-bold">Scholarship Discount</span>
                                        <span className="font-bold text-green-600">- ₹{course.price - finalAmount}</span>
                                    </div>
                                )}

                                <div className="pt-6 border-t border-gray-100 flex flex-col gap-1">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Investment</span>
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-4xl font-black text-[#8B19E6] tracking-tighter">₹{finalAmount}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">INR</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={creatingTx}
                                className="w-full bg-[#8B19E6] hover:bg-[#7014ba] text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-200 transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-70 group"
                            >
                                {creatingTx ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Proceed to Pay
                                        <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>

                            <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col items-center">
                                <div className="flex items-center gap-4 grayscale opacity-30 mb-4">
                                    <img src="/icons/cashfree.webp" alt="Cashfree" className="h-4" />
                                    <div className="w-px h-3 bg-gray-300" />
                                    <img src="/icons/visa.svg" alt="Visa" className="h-3" />
                                    <img src="/icons/upi.svg" alt="UPI" className="h-3" />
                                </div>
                                <p className="text-[9px] text-center text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <Lock size={10} /> Fully Encrypted Transaction
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}