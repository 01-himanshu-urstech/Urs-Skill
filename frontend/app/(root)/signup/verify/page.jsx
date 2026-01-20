'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmailOTP, resendEmailOTP } from '@/store/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, RefreshCcw, ArrowLeft, Mail } from 'lucide-react';
import toast from 'react-hot-toast'; // Switched to react-hot-toast

// Wrapper component to handle useSearchParams safely in Next.js
function VerifyOTPContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const { loading } = useSelector((state) => state.auth);
  const inputRefs = useRef([]);

  // Timer logic for resend button
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle OTP input focus shifting
  const handleChange = (index, value) => {
    // Only allow numbers
    const val = value.replace(/[^0-9]/g, '');
    if (val.length > 1) return; // Prevent pasting more than 1 char per box

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Move focus forward
    if (val !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus backward on backspace
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');

    if (finalOtp.length !== 6) {
      return toast.error("Please enter the full 6-digit code");
    }

    const verifyToast = toast.loading('Verifying code...');

    try {
      const res = await dispatch(verifyEmailOTP({ email, otp: finalOtp }));
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Email verified successfully!', { id: verifyToast });
        router.push('/login');
      } else {
        toast.error(res.payload || 'Invalid OTP', { id: verifyToast });
      }
    } catch (err) {
      toast.error('Verification failed', { id: verifyToast });
    }
  };

  const handleResend = async () => {
    const resendToast = toast.loading('Sending new OTP...');

    try {
      const res = await dispatch(resendEmailOTP({ email }));
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('New OTP sent to your email', { id: resendToast });
        setTimer(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      } else {
        toast.error(res.payload || 'Failed to resend', { id: resendToast });
      }
    } catch (err) {
      toast.error('Error resending OTP', { id: resendToast });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-purple-100 border border-purple-50">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-purple-700 transition-colors mb-8 group text-sm font-medium"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Signup
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-50 rounded-2xl mb-6 transform rotate-3">
            <ShieldCheck size={40} className="text-purple-700 transform -rotate-3" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Check your email</h1>
          <div className="flex flex-col items-center justify-center text-gray-500 mb-8 space-y-1">
            <div className="flex items-center text-sm sm:text-base">
              <Mail size={16} className="mr-2 text-purple-600" />
              <span>Code sent to:</span>
            </div>
            <span className="font-bold text-purple-700 break-all">{email || 'your email'}</span>
          </div>

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="flex justify-between gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-12 sm:h-16 text-center text-xl sm:text-2xl font-bold border-2 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all border-gray-100 bg-gray-50 text-gray-800"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : 'Verify & Proceed'}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-50">
            <p className="text-gray-500 text-sm mb-3">Didn't receive the code?</p>
            {timer > 0 ? (
              <div className="flex items-center justify-center gap-2 text-purple-700 font-semibold bg-purple-50 py-2 px-4 rounded-full w-fit mx-auto">
                <RefreshCcw size={14} className="animate-spin-slow" />
                <span className="text-sm">Resend in {timer}s</span>
              </div>
            ) : (
              <button
                onClick={handleResend}
                className="inline-flex items-center text-purple-700 font-bold hover:text-purple-900 transition-all hover:scale-105 hover:cursor-pointer"
              >
                <RefreshCcw size={16} className="mr-2" />
                Resend New OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense for Next.js 13+ searchParams
export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}