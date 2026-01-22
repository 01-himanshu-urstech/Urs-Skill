"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import PageHeader from "../../../../components/ui/PageHeader";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
import {
    Check, ArrowLeft, Loader2, Save,
    Type, Search, Camera, Globe, X, AlertCircle
} from "lucide-react";
import { useGetBlogsQuery, useUpdateBlogMutation } from "../../../../redux/service/adminApi";
import DOMPurify from "dompurify";

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <div className="h-80 w-full bg-gray-50 animate-pulse rounded-[2rem] border-2 border-gray-100" />
});
import "react-quill-new/dist/quill.snow.css";

export default function EditBlogPage() {
    const { id } = useParams();
    const router = useRouter();

    // ✅ Hydration Fix
    const [mounted, setMounted] = useState(false);

    const { data: response, isLoading: isFetching, isSuccess } = useGetBlogsQuery(id);
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        status: "DRAFT",
        seo: { metaTitle: "", metaDescription: "", keywords: "" }
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        if (isSuccess && response?.data?.blog) {
            const blog = response.data.blog;
            setFormData({
                title: blog.title || "",
                excerpt: blog.excerpt || "",
                content: blog.content || "",
                status: blog.status || "DRAFT",
                seo: {
                    metaTitle: blog.seo?.metaTitle || "",
                    metaDescription: blog.seo?.metaDescription || "",
                    keywords: blog.seo?.keywords?.join(", ") || ""
                }
            });
            if (blog.coverImage?.url) setPreviewUrl(blog.coverImage.url);
        }
    }, [isSuccess, response]);

    const quillModules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'blockquote', 'code-block'],
            ['clean']
        ],
    }), []);

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
        setError("");

        const cleanContent = DOMPurify.sanitize(formData.content);
        
        // Payload for Server
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("content", cleanContent);
        payload.append("excerpt", formData.excerpt);
        payload.append("status", formData.status);

        if (selectedImage) payload.append("coverImage", selectedImage);

        // ✅ SEO Details Re-added
        payload.append("seo[metaTitle]", formData.seo.metaTitle || formData.title);
        payload.append("seo[metaDescription]", formData.seo.metaDescription || formData.excerpt);
        const keywordsArray = formData.seo.keywords.split(",").map(k => k.trim()).filter(k => k !== "");
        payload.append("seo[keywords]", JSON.stringify(keywordsArray));

        // Patch for Redux State (Serializable)
        const patchData = {
            title: formData.title,
            status: formData.status,
            excerpt: formData.excerpt,
            seo: { ...formData.seo, keywords: keywordsArray }
        };

        try {
            await updateBlog({ id, formData: payload, patch: patchData }).unwrap();
            router.push("/blog");
        } catch (err) {
            setError(err?.data?.message || "Failed to update blog.");
        }
    };

    if (!mounted || isFetching) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
            </div>
        );
    }

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50/30 w-full overflow-x-hidden">
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <PageHeader title="Edit Article" description="Modify existing content and SEO." />
                    <button onClick={() => router.back()} className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-md transition-all">
                        <ArrowLeft size={16} /> Discard
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
                    {/* Left: Content */}
                    <div className="xl:col-span-8 space-y-8">
                        {error && <div className="p-5 bg-red-50 border-2 border-red-100 text-red-600 rounded-[1.5rem] flex items-center gap-3 text-[10px] font-black uppercase tracking-widest"><AlertCircle size={18} /> {error}</div>}
                        
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-6 sm:p-10 lg:p-12 space-y-10">
                            <InputField label="Article Title *" value={formData.title} onChange={(e) => handleUpdate('title', e.target.value)} icon={<Type size={20} />} required />
                            
                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Excerpt</label>
                                <textarea maxLength={160} rows={3} className="w-full p-6 bg-gray-50/50 border-2 border-gray-100 rounded-[2rem] focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium" value={formData.excerpt} onChange={(e) => handleUpdate('excerpt', e.target.value)} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Main Content *</label>
                                <div className="rounded-[2rem] overflow-hidden border-2 border-gray-100 shadow-sm">
                                    <ReactQuill theme="snow" modules={quillModules} value={formData.content} onChange={(val) => handleUpdate('content', val)} className="bg-white min-h-[500px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar & Meta */}
                    <div className="xl:col-span-4 space-y-8">
                        {/* Status Card */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</span>
                                <select value={formData.status} onChange={(e) => handleUpdate('status', e.target.value)} className={`px-5 py-2.5 rounded-full text-[10px] font-black border-0 outline-none cursor-pointer transition-colors ${formData.status === 'PUBLISHED' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                    <option value="DRAFT">DRAFT</option>
                                    <option value="PUBLISHED">PUBLISH</option>
                                </select>
                            </div>
                            <button type="submit" disabled={isUpdating} className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[2px] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                                {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />} Update Post
                            </button>
                        </div>

                        {/* Image Card */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cover Image</label>
                            <label className="relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-100 rounded-[2rem] hover:bg-gray-50 cursor-pointer overflow-hidden group transition-all">
                                {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" /> : <Camera size={32} className="text-indigo-500" />}
                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>

                        {/* ✅ SEO Meta Details Restored */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-6">
                            <div className="flex items-center gap-2 text-indigo-600 pb-3 border-b border-gray-50">
                                <Globe size={18} />
                                <h3 className="font-black text-[10px] uppercase tracking-widest">SEO Settings</h3>
                            </div>
                            <InputField label="Meta Title" value={formData.seo.metaTitle} onChange={(e) => handleUpdate('seo.metaTitle', e.target.value)} placeholder="Browser title..." />
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                                <textarea rows={4} value={formData.seo.metaDescription} onChange={(e) => handleUpdate('seo.metaDescription', e.target.value)} placeholder="SEO description..." className="w-full p-5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all text-xs font-medium" />
                            </div>

                            <InputField label="SEO Keywords" placeholder="react, news, blog" value={formData.seo.keywords} onChange={(e) => handleUpdate('seo.keywords', e.target.value)} />
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
            <input {...props} className={`w-full h-16 ${icon ? 'pl-14' : 'px-6'} text-black bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-sm focus:border-indigo-500 outline-none transition-all shadow-sm`} />
        </div>
    </div>
);