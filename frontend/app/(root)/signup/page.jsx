'use client';
import { useDispatch, useSelector } from 'react-redux';
import { customerSignup } from '@/store/slices/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

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

    const res = await dispatch(customerSignup({ ...form, phone: `+91${form.phone}` }));

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('OTP sent to your email');
      // Redirect to OTP page and pass email via query or state
      router.push(`/signup/verify?email=${encodeURIComponent(form.email)}`);
    } else {
      toast.error(res.payload || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
        <div className="bg-purple-700 p-8 text-center text-white">
          <h2 className="text-3xl font-bold">Join Urs Skill</h2>
          <p className="text-purple-100 mt-2">Start your learning journey today</p>
        </div>

        <form onSubmit={submit} className="p-8 space-y-5">
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Phone Input (Custom +91) */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
            <span className="absolute left-10 top-3 text-gray-600 font-medium">+91</span>
            <input
              type="tel"
              placeholder="Phone Number"
              maxLength={10}
              className="w-full pl-20 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-purple-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-purple-200"
          >
            {loading ? 'Processing...' : 'Create Account'}
            {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>
    </div>
  );
}