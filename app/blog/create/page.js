"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import {
    Plus, Check, ArrowLeft, Loader2,
    Type, Search, Camera, Globe, X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCreateBlogMutation } from "../../../redux/service/adminApi";

export default function CreateBlogPage() {
    const router = useRouter();
    const [createBlog, { isLoading }] = useCreateBlogMutation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        status: "PUBLISHED", // Default from schema
        seo: { metaTitle: "", metaDescription: "", keywords: "" }
    });

    const handleUpdate = (field, value) => {
        if (field.startsWith("seo.")) {
            const seoField = field.split(".")[1];
            setFormData(prev => ({ ...prev, seo: { ...prev.seo, [seoField]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare multipart/form-data for Cloudinary
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("content", formData.content);
        payload.append("excerpt", formData.excerpt);
        payload.append("status", formData.status);

        if (selectedImage) payload.append("coverImage", selectedImage);

        // SEO Handling
        const keywordsArray = formData.seo.keywords.split(",").map(k => k.trim());
        payload.append("seo[keywords]", JSON.stringify(keywordsArray));

        try {
            await createBlog(payload).unwrap();
            router.push("/blog");
        } catch (err) { console.error("Creation failed:", err); }
    };

    return (
        <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
            <PermissionGuardian permissionId="General">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">

                    <PageHeader title="Create New Post" description="Draft and publish a new article to your platform." />
                </div>

                <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="xl:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 space-y-8">
                            <InputField label="Blog Title *" placeholder="Enter catchy title..." value={formData.title} onChange={(e) => handleUpdate('title', e.target.value)} icon={<Type size={18} />} required />

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Excerpt (Summary)</label>
                                <textarea maxLength={160} rows={3} className="w-full p-5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all text-sm font-medium" value={formData.excerpt} onChange={(e) => handleUpdate('excerpt', e.target.value)} placeholder="Short summary for SEO..." />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Content (HTML Allowed)</label>
                                <textarea rows={12} className="w-full p-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium text-sm min-h-[400px]" value={formData.content} onChange={(e) => handleUpdate('content', e.target.value)} placeholder="Write your full story here..." required />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        {/* Media Card */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Cover Image</label>
                            <label className="relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-100 rounded-2xl hover:bg-gray-50 cursor-pointer overflow-hidden group transition-all">
                                {selectedImage ? (
                                    <img src={URL.createObjectURL(selectedImage)} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Camera size={24} className="text-gray-300" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Header</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" onChange={(e) => setSelectedImage(e.target.files[0])} accept="image/*" />
                            </label>
                        </div>

                        {/* SEO Settings Card */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 space-y-5">
                            <div className="flex items-center gap-2 text-indigo-600 pb-2 border-b border-gray-50">
                                <Search size={18} />
                                <h3 className="font-black text-xs uppercase tracking-widest">SEO Optimization</h3>
                            </div>
                            <InputField label="Keywords" placeholder="word1, word2..." value={formData.seo.keywords} onChange={(e) => handleUpdate('seo.keywords', e.target.value)} />
                        </div>

                        {/* Status & Publish */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Publish Status</span>
                                <button type="button" onClick={() => handleUpdate('status', formData.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED")} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${formData.status === 'PUBLISHED' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    {formData.status}
                                </button>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all">
                                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />} Publish Post
                            </button>
                        </div>
                    </div>
                </form>
            </PermissionGuardian>
        </main>
    );
}

const InputField = ({ label, icon, ...props }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
            <input {...props} className={`w-full h-14 ${icon ? 'pl-12' : 'px-5'} bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-sm focus:border-indigo-500 outline-none transition-all shadow-sm`} />
        </div>
    </div>
);