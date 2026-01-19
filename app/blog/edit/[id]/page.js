"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "../../../../components/ui/PageHeader";
import {
    Check, ArrowLeft, Loader2,
    Type, Search, Camera, Globe, X, Info
} from "lucide-react";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
import Link from "next/link";
import { useGetBlogsQuery, useUpdateBlogMutation } from "../../../../redux/service/adminApi";

export default function EditBlogPage() {
    const { id } = useParams(); // ID from URL
    const router = useRouter();

    // ✅ Get pre-filled data from API
    const { data: response, isLoading: isFetching, isSuccess } = useGetBlogsQuery(id);
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        status: "PUBLISHED",
        seo: { metaTitle: "", metaDescription: "", keywords: "" }
    });

    // ✅ Sync state with API data once loaded
    useEffect(() => {
        if (isSuccess && response?.data?.blog) {
            const blog = response.data.blog;
            setFormData({
                title: blog.title || "",
                excerpt: blog.excerpt || "",
                content: blog.content || "",
                status: blog.status || "PUBLISHED",
                seo: {
                    metaTitle: blog.seo?.metaTitle || "",
                    metaDescription: blog.seo?.metaDescription || "",
                    keywords: blog.seo?.keywords?.join(", ") || ""
                }
            });
            if (blog.coverImage?.url) setPreviewUrl(blog.coverImage.url);
        }
    }, [isSuccess, response]);

    const handleUpdate = (field, value) => {
        if (field.startsWith("seo.")) {
            const seoField = field.split(".")[1];
            setFormData(prev => ({ ...prev, seo: { ...prev.seo, [seoField]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Use FormData to allow image upload
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("content", formData.content);
        payload.append("excerpt", formData.excerpt);
        payload.append("status", formData.status);

        if (selectedImage) payload.append("coverImage", selectedImage);

        const keywordsArray = formData.seo.keywords.split(",").map(k => k.trim());
        payload.append("seo[keywords]", JSON.stringify(keywordsArray));

        try {
            await updateBlog({ id, formData: payload }).unwrap();
            router.push("/blog");
        } catch (err) { console.error("Update failed:", err); }
    };

    if (isFetching) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-[#7C3AED]" size={40} />
            <p className="mt-4 text-gray-400 font-black uppercase text-[10px] tracking-widest">Loading Blog Data...</p>
        </div>
    );

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">

                    <PageHeader title="Edit Blog Post" description="Modify content, SEO settings, and featured media." />
                </div>

                <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left: Main Content */}
                    <div className="xl:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 space-y-8">
                            <InputField label="Blog Title *" value={formData.title} onChange={(e) => handleUpdate('title', e.target.value)} icon={<Type size={18} />} required />

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Short Excerpt</label>
                                <textarea rows={3} className="w-full p-5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all text-sm font-medium" value={formData.excerpt} onChange={(e) => handleUpdate('excerpt', e.target.value)} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Main Content (Editor Body)</label>
                                <textarea rows={15} className="w-full p-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-medium text-sm min-h-[450px]" value={formData.content} onChange={(e) => handleUpdate('content', e.target.value)} required />
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar & Media */}
                    <div className="space-y-6">
                        {/* Media Card - Prefilled with existing image */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Featured Cover</label>
                            <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-100 rounded-2xl hover:bg-gray-50 cursor-pointer overflow-hidden group transition-all">
                                {previewUrl ? (
                                    <div className="relative w-full h-full">
                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                            <Camera className="text-white" size={32} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <Camera size={24} className="text-gray-300" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Image</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>

                        {/* SEO Prefilled Settings */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 space-y-5">
                            <div className="flex items-center gap-2 text-indigo-600 pb-2 border-b border-gray-50">
                                <Search size={18} />
                                <h3 className="font-black text-xs uppercase tracking-widest">Meta & Keywords</h3>
                            </div>
                            <InputField label="Keywords" value={formData.seo.keywords} onChange={(e) => handleUpdate('seo.keywords', e.target.value)} placeholder="tech, news, web..." />
                        </div>

                        {/* Final Actions */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Status</span>
                                <button type="button" onClick={() => handleUpdate('status', formData.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED")} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${formData.status === 'PUBLISHED' ? 'bg-emerald-500 text-white shadow-emerald-100 shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                                    {formData.status}
                                </button>
                            </div>
                            <button type="submit" disabled={isUpdating} className="w-full py-5 bg-[#7C3AED] hover:bg-[#5B21B6] text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all disabled:opacity-50">
                                {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />} Save All Changes
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </PermissionGuardian>
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