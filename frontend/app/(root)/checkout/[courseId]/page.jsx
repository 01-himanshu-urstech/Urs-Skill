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

    useEffect(() => {
        if (!course) {
            toast.error("Course not found");
            router.push('/courses');
            return;
        }

        // GSAP Entrance Animation for Premium Feel
        const tl = gsap.timeline();
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
          .fromTo(".checkout-reveal", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" });
    }, [course, router]);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return toast.error("Please enter a code");

        try {
            const res = await applyCoupon({
                code: couponCode.toUpperCase(),
                cartAmount: course.price // Logic: Send price for backend calculation
            }).unwrap();

            // Logic: Use finalAmount calculated by backend
            setAppliedCoupon(res.data);
            setFinalAmount(res.data.finalAmount);

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
                // Logic: Send string code to backend
                couponCode: appliedCoupon?.couponCode || null,
            };

            const res = await createTransaction(payload).unwrap();
            const sessionId = res.data?.paymentSessionId;

            if (!sessionId) {
                toast.error("Payment session failed. Please try again.");
                return;
            }

            // Cashfree Integration
            const cashfree = new window.Cashfree({
                mode: "sandbox", // Change to "production" when going live
            });

            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_self", 
            };

            cashfree.checkout(checkoutOptions);

        } catch (err) {
            toast.error(err?.data?.message || "Transaction failed");
        }
    };

    if (!course) return null;

    return (
        <div ref={containerRef} className="min-h-screen bg-white py-16 md:py-24 overflow-hidden">
            {/* Design: 1440px Master Alignment */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
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

                    {/* LEFT: Course Info & Coupon */}
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

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Master industry-critical skills with the {course.name} track. This enrollment includes 
                                full curriculum access, 1-on-1 mentorship, and a verified professional certificate.
                            </p>
                        </div>

                        {/* Coupon Input */}
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Have a Coupon?</label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="ENTER CODE"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all uppercase font-bold"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={applyingCoupon}
                                    className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50 hover:cursor-pointer"
                                >
                                    {applyingCoupon ? <Loader2 className="animate-spin" size={20} /> : 'Apply'}
                                </button>
                            </div>
                            {appliedCoupon && (
                                <div className="mt-4 flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full w-fit animate-pulse">
                                    <Ticket size={14} /> Coupon Applied Successfully!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Payment Summary */}
                    <div className="lg:col-span-4 checkout-reveal">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-purple-100/50 border border-gray-100 sticky top-10 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-50 overflow-hidden">
                                <div className="h-full bg-[#8B19E6] w-3/4" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Order Summary</h3>

                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-medium">Standard Tuition</span>
                                    <span className="font-bold text-gray-900">₹{course.price}</span>
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
                                className="w-full bg-[#8B19E6] hover:bg-[#7014ba] text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-200 transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-70 hover:cursor-pointer group"
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