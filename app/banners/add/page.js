"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../components/ui/PageHeader";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { Check, Camera, ArrowLeft, Loader2, ExternalLink, AlertCircle, CheckCircle, X } from "lucide-react";
import Link from "next/link";
import { useCreateBannerMutation } from "../../../redux/service/adminApi";

export default function AddBannerPage() {
    const router = useRouter();
    const [createBanner, { isLoading }] = useCreateBannerMutation();
    const [showToast, setShowToast] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        link: "",
        position: "HOME",
        order: 1,
        isActive: true
    });

    //    Validation State
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        if (!selectedImage) newErrors.image = "Banner graphic is required";
        if (selectedImage && selectedImage.size > 2 * 1024 * 1024) newErrors.image = "Image size must be less than 2MB";

        if (!formData.title.trim()) newErrors.title = "Primary title is required";
        else if (formData.title.length < 3) newErrors.title = "Title must be at least 3 characters";

        if (formData.link && !formData.link.startsWith('/') && !formData.link.startsWith('http')) {
            newErrors.link = "Link must be a relative path (/) or absolute URL (http)";
        }

        if (formData.order < 1) newErrors.order = "Order must be a positive number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("subtitle", formData.subtitle);
        payload.append("link", formData.link);
        payload.append("position", formData.position);
        payload.append("order", formData.order);
        payload.append("isActive", formData.isActive);
        if (selectedImage) payload.append("image", selectedImage);

        try {
            await createBanner(payload).unwrap();
            setShowToast(true);
            setTimeout(() => { router.push("/banners") }, 2000);
        } catch (err) {
            setErrors({ server: err?.data?.message || "Failed to publish banner" });
        }
    };

    return (
        <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
            <PermissionGuardian permissionId="General">
                {showToast && (
                    <div className="fixed top-10 right-4 sm:right-10 z-[200] animate-in slide-in-from-right-full duration-500">
                        <div className="bg-emerald-500 text-white px-6 py-4 rounded-[1.5rem] shadow-2xl shadow-emerald-200 flex items-center gap-4 border border-emerald-400">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <CheckCircle size={24} strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-widest">Banner Published!</p>
                                <p className="text-[10px] font-bold opacity-80 uppercase">Synchronizing with live platform...</p>
                            </div>
                            <button onClick={() => setShowToast(false)} className="ml-4 hover:cursor-pointer hover:rotate-90 transition-transform">
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                )}
                <PageHeader title="Publish Banner" description="Create a new promotional hero section." />

                <div className="max-w-4xl mt-8 pb-20">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {errors.server && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold uppercase tracking-wider">
                                <AlertCircle size={16} /> {errors.server}
                            </div>
                        )}

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10 space-y-10">

                            {/* Image Upload Area */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Banner Graphic *</label>
                                <label className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-[2rem] cursor-pointer overflow-hidden transition-all ${errors.image ? 'border-red-300 bg-red-50/30' : 'border-gray-100 hover:bg-gray-50/50'}`}>
                                    {selectedImage ? (
                                        <img src={URL.createObjectURL(selectedImage)} className="w-full h-full object-cover" alt="Preview" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-gray-300">
                                            <Camera size={40} />
                                            <p className="text-xs font-black uppercase tracking-widest">Click to upload media</p>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" onChange={(e) => setSelectedImage(e.target.files[0])} accept="image/*" />
                                </label>
                                {errors.image && <p className="text-[10px] text-red-500 font-bold uppercase ml-2">{errors.image}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                                <InputField
                                    label="Primary Title *"
                                    placeholder="Learn Spoken Communication"
                                    value={formData.title}
                                    error={errors.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                                <InputField
                                    label="Secondary Subtitle"
                                    placeholder="Become Job Ready"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                />
                                <InputField
                                    label="Redirect URL (Link)"
                                    placeholder="/courses/fullstack"
                                    icon={<ExternalLink size={16} />}
                                    value={formData.link}
                                    error={errors.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                />

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Target Position</label>
                                    <select
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full h-16 px-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-sm focus:border-emerald-500 focus:outline-none appearance-none"
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
                                    error={errors.order}
                                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 h-16 bg-emerald-500 hover:cursor-pointer hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Check size={18} />}
                                Upload and Publish
                            </button>
                            <Link href="/banners" className="px-10 h-16 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center">
                                Discard
                            </Link>
                        </div>
                    </form>
                </div>
            </PermissionGuardian>
        </main>
    );
}

const InputField = ({ label, icon, error, ...props }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300">{icon}</div>}
            <input
                {...props}
                className={`w-full h-16 ${icon ? 'pl-14' : 'px-6'} bg-gray-50/50 border-2 rounded-2xl font-bold text-sm focus:outline-none transition-all text-black ${error ? 'border-red-200 focus:border-red-400' : 'border-gray-100 focus:border-emerald-500'}`}
            />
        </div>
        {error && <p className="text-[9px] text-red-500 font-bold uppercase ml-2">{error}</p>}
    </div>
);