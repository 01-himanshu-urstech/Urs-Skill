"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "../../../../components/ui/PageHeader";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
import { User, Mail, Phone, Check, ArrowLeft, Loader2, Shield, Lock } from "lucide-react";
import Link from "next/link";
import { useGetCustomerByIdQuery, useUpdateCustomerMutation } from "../../../../redux/service/adminApi";

export default function EditCustomerPage() {
    const { id } = useParams();
    const router = useRouter();

    // API Calls
    const { data: response, isLoading: isFetching, isError } = useGetCustomerByIdQuery(id);
    const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (response) {
            console.log("Full API Response:", response); // 🔍 Debugging: Check console

            // ✅ Fix: Handling nested data vs flat data
            // Agar backend response.data ke andar ek aur data object bhej raha hai
            const customerData = response.data?.customer || response.data || response;

            setFormData({
                // Default value "" rakhein taaki N/A na dikhe agar data fetch ho raha ho
                name: customerData.name || "",
                email: customerData.email || "",
                phone: customerData.phone || ""
            });
        }
    }, [response]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCustomer({ id, email: formData.email }).unwrap();
            router.push("/customer/list");
        } catch (err) {
            setSubmitError(err?.data?.message || "Failed to update customer");
        }
    };

    if (isFetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-emerald-500 w-12 h-12 mb-4" />
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Fetching Customer Profile...</p>
            </div>
        );
    }

    return (
        <PermissionGuardian permissionId="customers">
            <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/customer/list" className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 hover:bg-gray-50 rounded-xl transition-all">
                        <ArrowLeft size={20} className="text-gray-400" />
                    </Link>
                    <PageHeader title="Edit Customer" description="Verify and update official security credentials." />
                </div>

                <div className="max-w-4xl mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10">
                            <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-6">
                                <Shield className="text-emerald-500 w-6 h-6" />
                                <h3 className="font-black text-gray-800 uppercase tracking-tight text-sm">Identity Verification</h3>
                            </div>

                            {submitError && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800 text-xs font-bold uppercase tracking-wider">
                                    ⚠️ {submitError}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* LOCKED NAME */}
                                <InputField
                                    label="Full Name (Locked)"
                                    value={formData.name}
                                    readOnly
                                    icon={<Lock size={16} className="text-gray-300" />}
                                    className="bg-gray-50/70 cursor-not-allowed border-gray-200 text-gray-400"
                                />

                                {/* EDITABLE EMAIL */}
                                <InputField
                                    label="Email Address"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    required
                                    icon={<Mail size={18} className="text-emerald-500" />}
                                />

                                {/* LOCKED PHONE */}
                                <InputField
                                    label="Phone Number (Locked)"
                                    value={formData.phone}
                                    readOnly
                                    icon={<Lock size={16} className="text-gray-300" />}
                                    className="bg-gray-50/70 cursor-not-allowed border-gray-200 text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="px-12 py-4 bg-[#00C885] hover:bg-[#00B074] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isUpdating ? "Syncing..." : "Update Profile"}
                                {!isUpdating && <Check size={18} />}
                            </button>
                            <Link
                                href="/customer/list"
                                className="px-12 py-4 bg-white border border-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all text-center shadow-sm"
                            >
                                Discard Changes
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </PermissionGuardian>
    );
}

// Reusable Input Component
const InputField = ({ label, icon, className = "", ...props }) => (
    <div className="space-y-2">
        <label className="block text-[10px] font-black uppercase tracking-[2px] text-gray-400">{label}</label>
        <div className="relative">
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    {icon}
                </div>
            )}
            <input
                {...props}
                className={`w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none transition-all duration-200 text-sm font-bold shadow-sm h-14 ${className}`}
            />
        </div>
    </div>
);