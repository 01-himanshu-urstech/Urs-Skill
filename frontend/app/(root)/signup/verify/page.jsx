'use client';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmailOTP, resendEmailOTP } from '@/store/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, RefreshCcw, ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'react-toastify';

export default function VerifyOTPPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Gets email from URL: ?email=abc@gmail.com
  
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
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6) return toast.error("Please enter the full 6-digit code");

    const res = await dispatch(verifyEmailOTP({ email, otp: finalOtp }));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Email verified successfully!');
      router.push('/login');
    } else {
      toast.error(res.payload || 'Invalid OTP');
    }
  };

  const handleResend = async () => {
    const res = await dispatch(resendEmailOTP({ email }));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.info('A new OTP has been sent to your email');
      setTimer(60);
      setOtp(['', '', '', '', '', '']);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-white">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-gray-500 hover:text-purple-700 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Signup
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-50 rounded-full mb-6">
            <ShieldCheck size={40} className="text-purple-700" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify your email</h1>
          <div className="flex items-center justify-center text-gray-500 mb-8">
            <Mail size={16} className="mr-2" />
            <p>We've sent a code to <span className="font-semibold text-gray-900">{email}</span></p>
          </div>

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="flex justify-between gap-2 md:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 rounded-xl focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all border-gray-100 bg-gray-50"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-100 transition-all transform active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="mt-10">
            <p className="text-gray-500 mb-2">Didn't receive the code?</p>
            {timer > 0 ? (
              <p className="text-purple-700 font-medium">
                Resend code in <span className="font-bold">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="inline-flex items-center text-purple-700 font-bold hover:text-purple-900 hover:underline transition-all"
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