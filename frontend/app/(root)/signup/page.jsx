'use client';
import { useDispatch } from 'react-redux';
import { customerSignup } from '@/store/slices/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';

export default function SignupPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error('All fields are required');
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error('Enter a valid email address');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const res = await dispatch(customerSignup(form));

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Account created successfully');
      router.push('/login');
    } else {
      toast.error(res.payload || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg mb-4">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* 🌍 Worldwide Phone Input */}
        <PhoneInput
          country={'in'}
          value={form.phone}
          onChange={(phone) =>
            setForm({ ...form, phone })
          }
          inputStyle={{
            width: '100%',
            height: '40px'
          }}
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full border p-2 rounded pr-10"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button className="w-full bg-purple-700 text-white py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}
