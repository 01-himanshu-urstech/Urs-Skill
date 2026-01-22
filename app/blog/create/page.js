"use client";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import PageHeader from "../../../components/ui/PageHeader";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import {
    Check, Loader2, Type, Search, Camera,
    Globe, Save, ChevronLeft, AlertCircle
} from "lucide-react";
import { useCreateBlogMutation } from "../../../redux/service/adminApi";
import DOMPurify from "dompurify";

//    Dynamic import with absolute SSR disabled to prevent hydration mismatch
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <div className="h-80 w-full bg-gray-50 animate-pulse rounded-[2rem] border-2 border-gray-100" />
});
import "react-quill-new/dist/quill.snow.css";

export default function CreateBlogPage() {
    const router = useRouter();
    const [createBlog, { isLoading }] = useCreateBlogMutation();

    //    FIX 1: Add mounted state to prevent Hydration Error
    const [mounted, setMounted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "", excerpt: "", content: "", status: "DRAFT",
        seo: { metaTitle: "", metaDescription: "", keywords: "" }
    });

    useEffect(() => {
        setMounted(true);
    }, []);

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
        const cleanContent = DOMPurify.sanitize(formData.content);
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("content", cleanContent);
        payload.append("excerpt", formData.excerpt);
        payload.append("status", formData.status);
        if (selectedImage) payload.append("coverImage", selectedImage);
        payload.append("seo[metaTitle]", formData.seo.metaTitle || formData.title);
        payload.append("seo[metaDescription]", formData.seo.metaDescription || formData.excerpt);
        const keywordsArray = formData.seo.keywords.split(",").map(k => k.trim()).filter(k => k !== "");
        payload.append("seo[keywords]", JSON.stringify(keywordsArray));

        try {
            await createBlog(payload).unwrap();
            router.push("/blog");
        } catch (err) { setError(err?.data?.message || "Failed to save."); }
    };

    //    FIX 2: Delay rendering until client is ready to match server's initial output
    if (!mounted) return <div className="min-h-screen bg-gray-50/30 w-full" />;

    return (
        <PermissionGuardian permissionId="General">
            {/*    Edge-to-Edge Responsive Container */}
            <main className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50/30 w-full overflow-x-hidden">

                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <PageHeader title="Draft New Article" description="Draft and publish a new article to your platform." />
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:cursor-pointer hover:shadow-md transition-all w-fit"
                    >
                        <ChevronLeft size={16} /> Back to List
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">

                    {/* Left Side: Content (8/12 columns) */}
                    <div className="xl:col-span-8 space-y-8">
                        {error && (
                            <div className="p-5 bg-red-50 border-2 border-red-100 text-red-600 rounded-[1.5rem] flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-6 sm:p-10 lg:p-12 space-y-10 text-black">
                            <InputField label="Article Title *" placeholder="Enter catchy title..." value={formData.title} onChange={(e) => handleUpdate('title', e.target.value)} icon={<Type size={20} />} required />

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Excerpt (Short Summary)</label>
                                    <span className="text-[9px] font-bold text-gray-300 uppercase">{formData.excerpt.length}/160</span>
                                </div>
                                <textarea maxLength={160} rows={3} className="w-full p-6 bg-gray-50/50 border-2 border-gray-100 rounded-[2rem] focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium leading-relaxed" value={formData.excerpt} onChange={(e) => handleUpdate('excerpt', e.target.value)} placeholder="Short summary for SEO..." />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] ml-1">Main Body Content *</label>
                                <div className="rounded-[2rem] overflow-hidden border-2 border-gray-100 focus-within:border-indigo-500 transition-all shadow-sm">
                                    <ReactQuill theme="snow" value={formData.content} onChange={(val) => handleUpdate('content', val)} placeholder="Write your full story here..." className="bg-white min-h-[500px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Sidebar (4/12 columns) */}
                    <div className="xl:col-span-4 space-y-8">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Post Status</span>
                                <select value={formData.status} onChange={(e) => handleUpdate('status', e.target.value)} className={`px-5 py-2.5 rounded-full text-[10px] font-black border-0 outline-none cursor-pointer transition-colors ${formData.status === 'PUBLISHED' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                    <option value="DRAFT">DRAFT</option>
                                    <option value="PUBLISHED">PUBLISH</option>
                                </select>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[2px] shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Article
                            </button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-4 text-black">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Cover Graphic</label>
                            <label className="relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-100 rounded-[2rem] hover:bg-gray-50 cursor-pointer overflow-hidden group transition-all">
                                {selectedImage ? (
                                    <img src={URL.createObjectURL(selectedImage)} className="w-full h-full object-cover" alt="Preview" />
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-5 bg-indigo-50 rounded-2xl text-indigo-500"><Camera size={32} /></div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select Header</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" onChange={(e) => setSelectedImage(e.target.files[0])} accept="image/*" />
                            </label>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-6 text-black">
                            <div className="flex items-center gap-2 text-indigo-600 pb-3 border-b border-gray-50">
                                <Globe size={18} />
                                <h3 className="font-black text-[10px] uppercase tracking-widest">SEO Meta Configuration</h3>
                            </div>
                            <InputField label="Meta Title" value={formData.seo.metaTitle} onChange={(e) => handleUpdate('seo.metaTitle', e.target.value)} />
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                                <textarea rows={4} value={formData.seo.metaDescription} onChange={(e) => handleUpdate('seo.metaDescription', e.target.value)} className="w-full p-5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all text-xs font-medium leading-relaxed" />
                            </div>
                            <InputField label="SEO Keywords" placeholder="react, development, coding" value={formData.seo.keywords} onChange={(e) => handleUpdate('seo.keywords', e.target.value)} />
                        </div>
                    </div>
                </form>
            </main>
        </PermissionGuardian>
    );
}

const InputField = ({ label, icon, ...props }) => (
    <div className="flex flex-col gap-3 w-full">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
            <input {...props} className={`w-full h-16 ${icon ? 'pl-14' : 'px-6'} text-black bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-sm focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm`} />
        </div>
    </div>
);