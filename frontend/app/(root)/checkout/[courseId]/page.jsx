'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Ticket, CheckCircle2, ArrowRight, ShieldCheck,
    Loader2, Tag, CreditCard, Info
} from 'lucide-react';
import { useCreateTransactionMutation, useApplyCouponMutation } from '@/store/api/transactionApi';
import { STATIC_COURSES } from '@/app/(root)/constants/constant';
import toast from 'react-hot-toast';
import gsap from 'gsap';

export default function CheckoutPage() {
    const { courseId } = useParams();
    const router = useRouter();

    // Get course data from local constant based on ID from URL
    const course = STATIC_COURSES[courseId];

    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [finalAmount, setFinalAmount] = useState(course?.price || 0);

    const [applyCoupon, { isLoading: applyingCoupon }] = useApplyCouponMutation();
    const [createTransaction, { isLoading: creatingTx }] = useCreateTransactionMutation();

    const containerRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        // Redirect if course ID is invalid
        if (!course) {
            toast.error("Course not found");
            router.push('/courses');
            return;
        }

        // GSAP Entrance Animation
        const tl = gsap.timeline();
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 })
            .fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }, [course, router]);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return toast.error("Please enter a code");

        try {
            const res = await applyCoupon({
                code: couponCode.toUpperCase(),
                cartAmount: course.price // FIX: Pass the price so backend can calculate %
            }).unwrap();

            // res.data now contains { discount, finalAmount, couponCode } from your updated backend
            setAppliedCoupon(res.data);

            // Use the exact finalAmount calculated by your backend service
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
                // Ensure we send the string code 'SAVE10', not the whole object
                couponCode: appliedCoupon?.couponCode || null,
            };

            const res = await createTransaction(payload).unwrap();

            // Your backend returns: { transactionId, paymentSessionId }
            const sessionId = res.data?.paymentSessionId;

            if (!sessionId) {
                toast.error("Payment session failed. Please try again.");
                return;
            }

            const cashfree = new window.Cashfree({
                mode: "sandbox", // Change to "production" when going live
            });

            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_self", // This will trigger the backend /return route
            };

            cashfree.checkout(checkoutOptions);

        } catch (err) {
            toast.error(err?.data?.message || "Transaction failed");
        }
    };
    if (!course) return null;

    return (
        <div ref={containerRef} className="min-h-screen bg-white py-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight"> Complete Your Enrollment</h1>
                    <p className="text-gray-500 mt-2">You are just one step away from starting your journey.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Course Info & Coupon */}
                    <div className="lg:col-span-2 space-y-6">
                        <div ref={cardRef} className="bg-purple-50/50 rounded-3xl p-6 sm:p-8 border border-purple-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Premium Course</span>
                                    <h2 className="text-2xl font-bold text-gray-900 mt-3">{course.name}</h2>
                                </div>
                                <div className="bg-white p-3 rounded-2xl shadow-sm border border-purple-100">
                                    <CreditCard className="text-purple-600" size={24} />
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Get full access to the {course.name} curriculum, including hands-on projects,
                                expert mentorship, and a verified certificate upon completion.
                            </p>

                            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="text-green-500" size={18} /> 100% Secure
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="text-purple-600" size={18} /> Official Certificate
                                </div>
                            </div>
                        </div>

                        {/* Coupon Input */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-tight">Have a Coupon?</label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Tag className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="ENTER CODE"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-purple-200 outline-none transition-all uppercase font-semibold"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={applyingCoupon}
                                    className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50 hover:cursor-pointer"
                                >
                                    {applyingCoupon ? <Loader2 className="animate-spin" size={20} /> : 'Apply'}
                                </button>
                            </div>
                            {appliedCoupon && (
                                <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-bold animate-pulse">
                                    <Ticket size={16} /> Coupon Applied Successfully!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-purple-100 border border-purple-100 sticky top-10">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Payment Summary</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Course Price</span>
                                    <span className="font-bold text-gray-900">₹{course.price}</span>
                                </div>

                                {appliedCoupon && (
                                    <div className="flex justify-between text-green-600 text-sm font-bold">
                                        <span>Discount</span>
                                        <span>- ₹{course.price - finalAmount}</span>
                                    </div>
                                )}

                                <div className="pt-4 border-t-2 border-dashed border-gray-100 flex justify-between items-center">
                                    <span className="text-gray-900 font-bold">Total Pay</span>
                                    <span className="text-3xl font-black text-purple-700">₹{finalAmount}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={creatingTx}
                                className="w-full bg-gradient-to-br from-purple-600 to-purple-800 text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-200 flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-70 hover:cursor-pointer"
                            >
                                {creatingTx ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Enroll Now
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <p className="mt-6 text-[10px] text-center text-gray-400 flex items-center justify-center gap-1 leading-relaxed">
                                <Info size={12} /> By proceeding, you agree to the Terms of Service.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}