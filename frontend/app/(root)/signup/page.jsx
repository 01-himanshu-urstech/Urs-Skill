'use client';
import { useDispatch, useSelector } from 'react-redux';
import { customerSignup } from '@/store/slices/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast'; // Switched import

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile standard
    
    if (form.name.length < 3) return "Name must be at least 3 characters";
    if (!emailRegex.test(form.email)) return "Invalid email address";
    if (!phoneRegex.test(form.phone)) return "Enter a valid 10-digit Indian number";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return toast.error(error);

    // Start loading toast
    const signupToast = toast.loading('Creating your account...');

    const res = await dispatch(customerSignup({ ...form, phone: `+91${form.phone}` }));

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('OTP sent to your email', { id: signupToast });
      router.push(`/signup/verify?email=${encodeURIComponent(form.email)}`);
    } else {
      toast.error(res.payload || 'Signup failed', { id: signupToast });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Container with responsive max-width */}
      <div className="w-full max-w-[450px] bg-white rounded-2xl shadow-2xl shadow-purple-100 overflow-hidden border border-purple-50">
        
        {/* Header Section */}
        <div className="bg-purple-700 p-6 sm:p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Join Urs Skill</h2>
          <p className="text-purple-100 mt-2 text-sm sm:text-base opacity-90">Start your learning journey today</p>
        </div>

        {/* Form Section */}
        <form onSubmit={submit} className="p-6 sm:p-8 space-y-4 sm:space-y-5">
          
          {/* Name Input */}
          <div className="group space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={18} />
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all text-gray-700"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="group space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={18} />
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all text-gray-700"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="group space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={18} />
              <div className="absolute left-10 top-3.5 text-gray-400 font-semibold border-r pr-2 border-gray-200">+91</div>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                className="w-full pl-[4.5rem] pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all text-gray-700"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Secure Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-purple-600 transition-colors" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all text-gray-700"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-purple-600 transition-colors p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className={`w-full mt-4 bg-purple-700 hover:bg-purple-800 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-purple-100 active:scale-[0.98] ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 pt-2">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => router.push('/login')}
              className="text-purple-700 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}