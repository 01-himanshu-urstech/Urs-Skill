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

//    Next.js SSR Safety for Text Editor
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <div className="h-80 w-full bg-gray-50 animate-pulse rounded-[2rem] border-2 border-gray-100" />
});
import "react-quill-new/dist/quill.snow.css";

export default function EditBlogPage() {
    const { id } = useParams();
    const router = useRouter();

    //    API Hooks
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

    //    Sync state with Model data
    useEffect(() => {
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

        const cleanContent = DOMPurify.sanitize(formData.content);
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("content", cleanContent);
        payload.append("excerpt", formData.excerpt);
        payload.append("status", formData.status);

        if (selectedImage) payload.append("coverImage", selectedImage);

        // SEO Handling based on Model
        payload.append("seo[metaTitle]", formData.seo.metaTitle || formData.title);
        payload.append("seo[metaDescription]", formData.seo.metaDescription || formData.excerpt);

        const keywordsArray = formData.seo.keywords.split(",").map(k => k.trim()).filter(k => k !== "");
        payload.append("seo[keywords]", JSON.stringify(keywordsArray));

        try {
            await updateBlog({ id, formData: payload }).unwrap();
            router.push("/blog");
        } catch (err) {
            setError(err?.data?.message || "Failed to update blog.");
        }
    };

    if (isFetching) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <p className="mt-4 text-gray-400 font-black uppercase text-[10px] tracking-widest">Retrieving Blog Data...</p>
        </div>
    );

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gray-50/30 w-full overflow-x-hidden">

                {/* Responsive Header Container */}
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <PageHeader
                        title="Edit Article"
                        description="Modify existing content and update SEO parameters."
                    />
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 hover:cursor-pointer text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-md transition-all w-fit"
                    >
                        <ArrowLeft size={16} /> Discard Changes
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">

                    {/* Left Column: Content (8 of 12 columns on desktop) */}
                    <div className="xl:col-span-8 space-y-8">
                        {error && (
                            <div className="p-5 bg-red-50 border-2 border-red-100 text-red-600 rounded-[1.5rem] flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                                <AlertCircle size={18} /> {error}
                            </div>
                        )}

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-6 sm:p-10 lg:p-12 space-y-10">
                            <InputField label="Article Title *" placeholder="Title..." value={formData.title} onChange={(e) => handleUpdate('title', e.target.value)} icon={<Type size={20} />} required />

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Excerpt (Short Summary)</label>
                                    <span className="text-[9px] font-bold text-gray-300 uppercase">{formData.excerpt.length}/160</span>
                                </div>
                                <textarea maxLength={160} rows={3} className="w-full p-6 bg-gray-50/50 border-2 border-gray-100 rounded-[2rem] focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium leading-relaxed" value={formData.excerpt} onChange={(e) => handleUpdate('excerpt', e.target.value)} placeholder="Short summary for lists..." />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] ml-1">Main Body Content *</label>
                                <div className="rounded-[2rem] overflow-hidden border-2 border-gray-100 focus-within:border-indigo-500 transition-all shadow-sm">
                                    <ReactQuill theme="snow" modules={quillModules} value={formData.content} onChange={(val) => handleUpdate('content', val)} placeholder="Edit your content..." className="bg-white min-h-[500px]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Meta & Sidebar (4 of 12 columns on desktop) */}
                    <div className="xl:col-span-4 space-y-8">

                        {/* Status Card */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visibility</span>
                                <select value={formData.status} onChange={(e) => handleUpdate('status', e.target.value)} className={`px-5 py-2.5 rounded-full text-[10px] font-black border-0 outline-none cursor-pointer transition-colors ${formData.status === 'PUBLISHED' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                    <option value="DRAFT">DRAFT</option>
                                    <option value="PUBLISHED">PUBLISH</option>
                                </select>
                            </div>
                            <button type="submit" disabled={isUpdating} className="w-full py-5 bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[2px] shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50">
                                {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />} Update Post
                            </button>
                        </div>

                        {/* Image Card */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Featured Cover Image</label>
                            <label className="relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-100 rounded-[2rem] hover:bg-gray-50 cursor-pointer overflow-hidden group transition-all">
                                {previewUrl ? (
                                    <div className="relative w-full h-full">
                                        <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <Camera className="text-white" size={32} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="p-5 bg-indigo-50 rounded-2xl text-indigo-500"><Camera size={32} /></div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase">Upload Graphic</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>

                        {/* SEO Config */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 space-y-6">
                            <div className="flex items-center gap-2 text-indigo-600 pb-3 border-b border-gray-50">
                                <Globe size={18} />
                                <h3 className="font-black text-[10px] uppercase tracking-widest">SEO Meta Configuration</h3>
                            </div>
                            <InputField label="Meta Title" value={formData.seo.metaTitle} onChange={(e) => handleUpdate('seo.metaTitle', e.target.value)} placeholder="Browser tab title..." />

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Meta Description</label>
                                    <span className={`text-[9px] font-bold uppercase ${formData.seo.metaDescription.length > 160 ? 'text-red-400' : 'text-gray-300'}`}>
                                        {formData.seo.metaDescription.length}/160
                                    </span>
                                </div>
                                <textarea
                                    rows={4}
                                    value={formData.seo.metaDescription}
                                    onChange={(e) => handleUpdate('seo.metaDescription', e.target.value)}
                                    placeholder="Summary for Google Search..."
                                    className="w-full p-5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all text-xs font-medium"
                                />
                            </div>

                            <InputField label="SEO Keywords" placeholder="react, code, etc." value={formData.seo.keywords} onChange={(e) => handleUpdate('seo.keywords', e.target.value)} />
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
            <input {...props} className={`w-full h-16 ${icon ? 'pl-14' : 'px-6'} bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-sm focus:border-indigo-500 focus:bg-white outline-none transition-all shadow-sm`} />
        </div>
    </div>
);