"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "../../../../components/ui/PageHeader";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
import { User, Mail, Phone, Check, Loader2, Shield, Info } from "lucide-react";
import Link from "next/link";
import { useGetCustomerByIdQuery, useUpdateCustomerMutation } from "../../../../redux/service/adminApi";

export default function EditCustomerPage() {
    const { id } = useParams();
    const router = useRouter();

    const { data: response, isLoading: isFetching } = useGetCustomerByIdQuery(id);
    const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

    //    Track initial state to detect changes
    const [initialData, setInitialData] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (response) {
            const customerData = response.data?.customer || response.data || response;
            const mappedData = {
                name: customerData.name || "",
                email: customerData.email || "",
                phone: customerData.phone || ""
            };
            setFormData(mappedData);
            setInitialData(mappedData); //    Save reference for comparison
        }
    }, [response]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const onlyNums = value.replace(/[^0-9]/g, '');
            if (onlyNums.length <= 10) setFormData(prev => ({ ...prev, [name]: onlyNums }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if (submitError) setSubmitError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //    Fix: Only compare if initialData is not null
        const isUnchanged =
            initialData &&
            formData.name === initialData.name &&
            formData.email === initialData.email &&
            formData.phone === initialData.phone;

        if (isUnchanged) {
            return setSubmitError("No changes detected. Update is not required.");
        }

        //    2. Validations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return setSubmitError("Please enter a valid email address.");
        if (formData.phone.length !== 10) return setSubmitError("Phone number must be exactly 10 digits.");

        try {
            await updateCustomer({
                id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            }).unwrap();
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
                <PageHeader title="Edit Customer" description="Modify customer contact and identity details." />

                <div className="max-w-4xl mt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10">
                            <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-6">
                                <Shield className="text-emerald-500 w-6 h-6" />
                                <h3 className="  text-gray-800 uppercase tracking-tight text-sm">Identity & Contact</h3>
                            </div>

                            {submitError && (
                                <div className={`mb-6 p-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${submitError.includes("No changes") ? "bg-amber-50 border border-amber-200 text-amber-700" : "bg-red-50 border border-red-200 text-red-800"
                                    }`}>
                                    {submitError.includes("No changes") ? <Info size={16} /> : "⚠️"} {submitError}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} required icon={<User size={18} className="text-emerald-500" />} />
                                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required icon={<Mail size={18} className="text-emerald-500" />} />
                                <InputField label="Phone Number (10 Digits)" name="phone" type="text" value={formData.phone} onChange={handleChange} required icon={<Phone size={18} className="text-emerald-500" />} />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="px-12 py-4 bg-[#00C885] hover:bg-[#00B074] text-white hover:cursor-pointer rounded-2xl   uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                            >
                                {isUpdating ? "Syncing..." : "Update Profile"}
                                {!isUpdating && <Check size={18} />}
                            </button>
                            <Link href="/customer/list" className="px-12 py-4 bg-white border border-gray-100 text-gray-400 hover:cursor-pointer rounded-2xl   uppercase tracking-widest text-[10px] transition-all text-center shadow-sm hover:bg-gray-50">
                                Discard Changes
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </PermissionGuardian>
    );
}

const InputField = ({ label, icon, ...props }) => (
    <div className="space-y-2">
        <label className="block text-[10px]   uppercase tracking-[2px] text-gray-400">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>}
            <input {...props} className="text-black w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-emerald-500 transition-all duration-200 text-sm font-bold shadow-sm h-14" />
        </div>
    </div>
);