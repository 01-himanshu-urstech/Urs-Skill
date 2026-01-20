"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { User, Mail, Phone, Shield, Check, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAddCustomerMutation } from "../../../redux/service/adminApi";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
export default function AddCustomerPage() {
    const router = useRouter();
    const [addCustomer, { isLoading }] = useAddCustomerMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 🔥 Backend expects EXACTLY these 4 fields
        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        };

        try {
            await addCustomer(payload).unwrap();
            router.push("/customer/list");
        } catch (err) {
            setError(err?.data?.message || "Failed to add customer");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <PermissionGuardian permissionId="customers">
            <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
                <div className="flex items-center gap-4 mb-2">

                    <PageHeader
                        title="Add New Customer"
                        description="Register a new student or client"
                    />
                </div>

                <div className="max-w-2xl">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center gap-2 mb-8 border-b border-gray-50 pb-6">
                            <User className="text-[#7C3AED]" size={20} />
                            <h3 className="font-bold text-gray-800 text-lg">Customer Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Full Name *"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Anish Kumar Mishra"
                                icon={<User size={18} />}
                            />

                            <InputField
                                label="Email *"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                required
                                placeholder="customer@example.com"
                                icon={<Mail size={18} />}
                            />

                            <InputField
                                label="Phone *"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                required
                                placeholder="9806527800"
                                icon={<Phone size={18} />}
                            />

                            <InputField
                                label="Password *"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                type="password"
                                required
                                placeholder="••••••••"
                                icon={<Shield size={18} />}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 px-8 py-3.5 bg-[#7C3AED] hover:bg-[#5B21B6] text-white rounded-xl hover:cursor-pointer font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        Create Customer
                                        <Check size={18} />
                                    </>
                                )}
                            </button>

                            <Link
                                href="/customer/list"
                                className="px-8 py-3.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl font-semibold transition-all flex-1 text-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </PermissionGuardian>
    );
}

const InputField = ({ label, icon, name, value, onChange, ...props }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <div className="relative group">
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C3AED]">
                    {icon}
                </div>
            )}
            <input
                name={name}
                value={value}
                onChange={onChange}
                {...props}
                className={`w-full ${icon ? 'pl-12' : 'px-4'} py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all text-sm font-medium h-12 shadow-sm`}
            />
        </div>
    </div>
);
