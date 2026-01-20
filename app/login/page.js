"use client";
import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, AlertCircle } from "lucide-react";
import { useLoginMutation } from "../../redux/service/adminApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; //    NEW
import { setCredentials } from "../../redux/service/authSlice"; //    NEW

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const dispatch = useDispatch(); //    Initialize Dispatch
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login({ email, password }).unwrap();

            // Match the backend structure: result.data.token and result.data.user
            const token = result?.data?.token;
            const userData = result?.data?.user;

            if (token && userData) {
                document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`;

                // This triggers the persistence logic in the slice above
                dispatch(setCredentials({
                    user: userData,
                    token: token
                }));

                window.location.replace('/');
            } else {
                setError("Invalid Email or Password");
            }
        } catch (err) {
            setError("Invalid Email or Password");
        }
    };

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                        <Image src="/assets/logo.png" alt="UrsSkill" width={40} height={40} priority />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">Admin Portal</h1>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 text-center">Authentication Required to Access Dashboard</p>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 p-10">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2">
                                <AlertCircle size={14} /> {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C3AED] transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#7C3AED]/5 focus:border-[#7C3AED] transition-all text-sm font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Secret Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C3AED] transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-[#7C3AED]/5 focus:border-[#7C3AED] transition-all text-sm font-bold"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-[#7C3AED] hover:bg-indigo-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-70 active:scale-95 mt-4"
                        >
                            {isLoading ? "Validating Session..." : "Authorize & Sign In"}
                            {!isLoading && <LogIn size={16} />}
                        </button>
                    </form>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-[9px] font-black uppercase tracking-[0.2em]">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    End-to-End Encrypted Access
                </div>
            </div>
        </main>
    );
}