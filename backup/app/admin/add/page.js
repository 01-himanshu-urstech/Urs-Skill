"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { ShieldCheck, User, Mail, Lock, Check, ArrowLeft, Key, AlertCircle, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { useAddAdminMutation } from "../../../redux/service/adminApi";

//    Defined consistent module keys matching your Search/Sidebar logic
const PERMISSION_MODULES = [
    { id: 'admin', label: 'Admin Management' },
    { id: 'customers', label: 'Customer Records' },
    { id: 'courses', label: 'Course Content' },      // New
    { id: 'transaction', label: 'Transactions' },    // New
    { id: 'General', label: 'General' },
    { id: 'coupons', label: 'Coupon Management' },
    { id: 'Enquiry', label: 'Enquiry' },
    { id: 'logs', label: 'System Logs' }             // New
];

export default function AddAdminPage() {
    const router = useRouter();
    const [addAdmin, { isLoading }] = useAddAdminMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "SUBADMIN",
        permissions: [] //    Array of strings matching your Mongoose schema
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Logic: If role changes to SUPERADMIN, we could optionally clear or auto-fill permissions
        if (name === "role" && value === "SUPERADMIN") {
            setFormData(prev => ({ ...prev, role: value, permissions: PERMISSION_MODULES.map(m => m.id) }));
        } else if (name === "role" && value === "SUBADMIN") {
            setFormData(prev => ({ ...prev, role: value, permissions: [] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (error) setError("");
    };

    //    Toggle Permission logic for SUBADMINs
    const togglePermission = (moduleId) => {
        if (formData.role === "SUPERADMIN") return; // Superadmins stay full-access
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.includes(moduleId)
                ? prev.permissions.filter(id => id !== moduleId)
                : [...prev.permissions, moduleId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match!");
        }

        if (formData.role === "SUBADMIN" && formData.permissions.length === 0) {
            return setError("Please assign at least one permission to the Sub Admin.");
        }

        try {
            const result = await addAdmin({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                permissions: formData.permissions //    Sent as [String]
            }).unwrap();

            if (result.success) {
                router.push("/admin/list");
            }
        } catch (err) {
            setError(err?.data?.message || "Failed to create administrator account.");
        }
    };

    return (
        <PermissionGuardian permissionId="admins">
            <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden min-h-screen bg-gray-50/30">

                <PageHeader
                    title="Add New Administrator"
                    description="Assign system roles and access permissions to new staff members."
                />

                <div className="max-w-4xl mt-6 pb-20">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Admin Identity Card */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-10">
                            <div className="flex items-center gap-2 mb-8 border-b border-gray-50 pb-4">
                                <User className="text-[#7C3AED]" size={20} />
                                <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Account Credentials</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                                <InputField
                                    label="Admin Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Full Name"
                                    icon={<User size={18} />}
                                />
                                <InputField
                                    label="Official Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="email@urstech.com"
                                    icon={<Mail size={18} />}
                                />

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px]      text-gray-400 uppercase tracking-widest ml-1">System Role</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/5 focus:border-[#7C3AED] transition-all text-sm text-black h-14 shadow-sm font-bold uppercase cursor-pointer"
                                    >
                                        <option value="SUBADMIN">Sub Admin</option>
                                        <option value="SUPERADMIN">Super Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/*    PERMISSIONS GRID SECTION  */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-50 pb-4">
                                <div className="flex items-center gap-2">
                                    <Shield className="text-[#7C3AED]" size={20} />
                                    <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Access Permissions</h3>
                                </div>
                                {formData.role === "SUPERADMIN" && (
                                    <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[9px]      uppercase border border-amber-100">Full System Access Enabled</span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {PERMISSION_MODULES.map((module) => (
                                    <button
                                        key={module.id}
                                        type="button"
                                        disabled={formData.role === "SUPERADMIN"}
                                        onClick={() => togglePermission(module.id)}
                                        className={`flex items-center justify-between p-5 hover:cursor-pointer rounded-2xl border-2 transition-all group ${formData.permissions.includes(module.id)
                                            ? 'border-[#7C3AED] bg-purple-50/50 text-[#7C3AED]'
                                            : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white'
                                            }`}
                                    >
                                        <span className="text-[11px]      uppercase tracking-tight">{module.label}</span>
                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center hover:cursor-pointer justify-center transition-all ${formData.permissions.includes(module.id)
                                            ? 'bg-[#7C3AED] border-[#7C3AED]'
                                            : 'border-gray-200 bg-gray-50'
                                            }`}>
                                            {formData.permissions.includes(module.id) && (
                                                <Check size={14} className="text-white" strokeWidth={4} />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Security Credentials Card */}
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sm:p-10">
                            <div className="flex items-center gap-2 mb-8 border-b border-gray-50 pb-4">
                                <Key className="text-[#7C3AED]" size={20} />
                                <h3 className="font-bold text-gray-800 uppercase tracking-tight text-sm">Security Credentials</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField
                                    label="Initial Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    icon={<Lock size={18} />}
                                />
                                <InputField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    icon={<ShieldCheck size={18} />}
                                />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:w-auto px-12 py-5 bg-[#7C3AED] hover:bg-[#5B21B6] hover:cursor-pointer text-white rounded-[1.2rem]      uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-3 disabled:opacity-70 active:scale-95"
                            >
                                {isLoading ? "Synchronizing..." : "Create Admin Account"}
                                {!isLoading && <Check size={18} />}
                            </button>
                            <Link
                                href="/admin/list"
                                className="w-full sm:w-auto px-12 py-5 bg-white border border-gray-200 text-gray-400 hover:text-gray-600 rounded-[1.2rem]      uppercase tracking-widest text-[10px] transition-all text-center"
                            >
                                Cancel Process
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </PermissionGuardian>
    );
}

const InputField = ({ label, icon, ...props }) => (
    <div className="flex flex-col gap-2">
        <label className="text-[10px]      text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <div className="relative group">
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C3AED] transition-colors">
                    {icon}
                </div>
            )}
            <input
                {...props}
                className={`w-full ${icon ? 'pl-12' : 'px-5'} py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/5 focus:border-[#7C3AED] transition-all text-sm text-black placeholder-gray-300 h-14 shadow-sm font-bold`}
            />
        </div>
    </div>
);