"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { Link2, Globe, Tag, Navigation, Check, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { useCreateBacklinkMutation } from "../../../redux/service/adminApi";

export default function CreateBacklinkPage() {
    const router = useRouter();
    const [createBacklink, { isLoading }] = useCreateBacklinkMutation();

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        type: "DOFOLLOW",
        position: "FOOTER", //    Default matched with Backend Model
        isActive: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //    Values are now validated against Mongoose Enum
            await createBacklink(formData).unwrap();
            alert("Backlink created successfully!");
            router.push("/backlinks");
        } catch (err) {
            // Error handling for 500/400 validation errors
            alert(err?.data?.message || "Failed to create backlink. Check if all fields are valid.");
        }
    };

    return (
        <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
            <PermissionGuardian permissionId="General">
                <div className="flex items-center gap-4 mb-2">

                    <PageHeader
                        title="Add New Backlink"
                        description="Register a new external SEO link for the platform."
                    />
                </div>

                <div className="max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
                                <Link2 className="text-[#7C3AED]" size={20} />
                                <h3 className="font-bold text-gray-800">Link Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                                <InputField
                                    label="Partner Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. UrsSkill Partner"
                                    icon={<Globe size={18} />}
                                    required
                                />
                                <InputField
                                    label="Target URL"
                                    name="url"
                                    type="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    placeholder="https://example.com"
                                    icon={<Link2 size={18} />}
                                    required
                                />

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-gray-900">Link Type</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-black h-12 shadow-sm font-medium"
                                        >
                                            <option value="DOFOLLOW">DOFOLLOW</option>
                                            <option value="NOFOLLOW">NOFOLLOW</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-gray-900">Placement Position</label>
                                    <div className="relative">
                                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-black h-12 shadow-sm font-medium"
                                        >
                                            {/*    Options strictly matched with Backend Enum */}
                                            <option value="FOOTER">FOOTER</option>
                                            <option value="BLOG">BLOG</option>
                                            <option value="PARTNER">PARTNER</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl md:col-span-2">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="w-5 h-5 accent-[#7C3AED]"
                                    />
                                    <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                                        Set as Active Link
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:w-auto px-10 py-3.5 bg-[#7C3AED] hover:bg-[#5B21B6] hover:cursor-pointer text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-100 flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Save Backlink
                                        <Check size={18} />
                                    </>
                                )}
                            </button>
                            <Link
                                href="/backlinks"
                                className="w-full sm:w-auto px-10 py-3.5 bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-xl font-bold transition-all text-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs font-medium">
                    <ShieldCheck size={14} />
                    Secure Backlink Management
                </div>
            </PermissionGuardian>
        </main>
    );
}

const InputField = ({ label, icon, ...props }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <div className="relative group">
            {icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C3AED] transition-colors">
                    {icon}
                </div>
            )}
            <input
                {...props}
                className={`w-full ${icon ? 'pl-11' : 'px-4'} py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-black placeholder-gray-600 h-12 shadow-sm font-medium text-black`}
            />
        </div>
    </div>
);