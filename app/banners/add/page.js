"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../components/ui/PageHeader";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import {
    Check, Camera, ArrowLeft, Loader2,
    ExternalLink, Image as ImageIcon, Layout
} from "lucide-react";
import Link from "next/link";
import { useCreateBannerMutation } from "../../../redux/service/adminApi"; //

export default function AddBannerPage() {
    const router = useRouter();
    const [createBanner, { isLoading }] = useCreateBannerMutation(); //

    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        link: "",
        position: "HOME", // Default from your collection
        order: 1,
        isActive: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Using FormData for image upload
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("subtitle", formData.subtitle);
        payload.append("link", formData.link);
        payload.append("position", formData.position);
        payload.append("order", formData.order);
        payload.append("isActive", formData.isActive);

        if (selectedImage) {
            payload.append("image", selectedImage);
        }

        try {
            await createBanner(payload).unwrap(); //
            router.push("/banners"); // Redirect to list after success
        } catch (err) {
            console.error("Upload Failed:", err);
        }
    };

    return (
        <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
            <PermissionGuardian permissionId="General">
                {/* Header section */}
                <div className="flex items-center gap-4 mb-8">
                    <PageHeader
                        title="Publish Banner"
                        description="Create a new promotional hero section for your platform."
                    />
                </div>

                <div className="max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Main Content Card */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10 space-y-10">

                            {/* Image Upload Area */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Banner Graphic *</label>
                                <label className="relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-100 rounded-[2rem] hover:bg-gray-50/50 cursor-pointer overflow-hidden transition-all group">
                                    {selectedImage ? (
                                        <img
                                            src={URL.createObjectURL(selectedImage)}
                                            className="w-full h-full object-cover"
                                            alt="Preview"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300">
                                                <Camera size={32} />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Click to upload media</p>
                                                <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Recommended: 1920x600 (Max 2MB)</p>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setSelectedImage(e.target.files[0])}
                                        accept="image/*"
                                        required
                                    />
                                </label>
                            </div>

                            {/* Input Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputField
                                    label="Primary Title *"
                                    placeholder="e.g. Learn Spoken Communication"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                                <InputField
                                    label="Secondary Subtitle"
                                    placeholder="e.g. Become Job Ready"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                />
                                <InputField
                                    label="Redirect URL (Link)"
                                    placeholder="/courses/fullstack"
                                    icon={<ExternalLink size={16} />}
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                />

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Target Position</label>
                                    <select
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full h-16 px-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-sm focus:border-emerald-500 focus:outline-none transition-all appearance-none"
                                    >
                                        <option value="HOME">HOME PAGE</option>
                                        <option value="COURSES">COURSES PAGE</option>
                                        <option value="BLOG">BLOG PAGE</option>
                                    </select>
                                </div>

                                <InputField
                                    label="Display Sequence (Order)"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Check size={18} />}
                                Upload and Publish
                            </button>
                            <Link
                                href="/banners"
                                className="px-10 h-16 bg-white border-2 border-gray-100 text-gray-400 hover:text-gray-600 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center transition-all"
                            >
                                Discard
                            </Link>
                        </div>
                    </form>
                </div>
            </PermissionGuardian>
        </main>
    );
}

/* Reusable Styled Input */
const InputField = ({ label, icon, ...props }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300">{icon}</div>}
            <input
                {...props}
                className={`w-full h-16 ${icon ? 'pl-14' : 'px-6'} bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-sm focus:border-emerald-500 focus:outline-none transition-all placeholder:text-gray-300`}
            />
        </div>
    </div>
);