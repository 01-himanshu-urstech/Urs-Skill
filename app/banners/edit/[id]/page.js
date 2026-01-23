"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "../../../../components/ui/PageHeader";
import { Check, X, Camera, ArrowLeft, Loader2, Link as LinkIcon, Globe, Hash } from "lucide-react";
import Link from "next/link";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
import { useGetBannerByIdQuery, useUpdateBannerMutation } from "../../../../redux/service/adminApi"; //

export default function EditBannerPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: response, isLoading: isFetching } = useGetBannerByIdQuery(id); //
    const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation(); //

    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "", subtitle: "", link: "", position: "HOME", order: 1, isActive: true
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (response?.data?.banner) {
            const b = response.data.banner;
            setFormData({
                title: b.title, subtitle: b.subtitle, link: b.link,
                position: b.position, order: b.order, isActive: b.isActive
            });
        }
    }, [response]);
    const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim())
        newErrors.title = "Title is required";
    else if (formData.title.length < 3)
        newErrors.title = "Title must be at least 3 characters";
    else if (formData.title.length > 18)
        newErrors.title = "Title must not exceed 18 characters";

    if (formData.subtitle && formData.subtitle.length > 26)
        newErrors.subtitle = "Subtitle must not exceed 26 characters";

    if (formData.order < 1)
        newErrors.order = "Order must be positive";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData(); // Must be FormData for image
        Object.keys(formData).forEach(key => payload.append(key, formData[key]));
        if (selectedImage) payload.append("image", selectedImage);

        try {
            await updateBanner({ id, formData: payload }).unwrap(); //
            router.push("/banners");
        } catch (err) { console.error(err); }
    };

    if (isFetching) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-500" size={40} /></div>;

    return (
        <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
            <PermissionGuardian permissionId="General">
                <div className="flex items-center gap-4 mb-6">

                    <PageHeader title="Modify Banner" description="Update titles, positions, or media assets." />
                </div>

                <div className="max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
                               <InputField
                                    label="Heading *"
                                    value={formData.title}
                                    maxLength={18}
                                    error={errors.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    />
                                    <p className="text-[9px] text-gray-400 text-right font-bold">
                                    {formData.title.length}/18
                                    </p>

                                    <InputField
                                    label="Subtitle"
                                    value={formData.subtitle}
                                    maxLength={26}
                                    error={errors.subtitle}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subtitle: e.target.value })
                                    }
                                    />
                                    <p className="text-[9px] text-gray-400 text-right font-bold">
                                    {formData.subtitle.length}/26
                                    </p>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px]      text-gray-400 uppercase tracking-[2px]">Visibility Position</label>
                                    <select
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="h-14 px-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-bold text-sm focus:border-emerald-500 outline-none"
                                    >
                                        <option value="HOME">HOME PAGE</option>
                                        <option value="COURSES">COURSES PAGE</option>
                                    </select>
                                </div>

                                <InputField label="Display Order" type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px]      text-gray-400 uppercase tracking-[2px]">Banner Asset</label>
                                <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-3xl hover:bg-gray-50 cursor-pointer overflow-hidden group">
                                    {selectedImage ? (
                                        <img src={URL.createObjectURL(selectedImage)} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <Camera size={32} className="text-gray-300" />
                                            <span className="text-[10px]      text-gray-400 uppercase tracking-widest italic">Click to replace current image</span>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" onChange={(e) => setSelectedImage(e.target.files[0])} accept="image/*" />
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" disabled={isUpdating} className="flex-1 py-4 bg-emerald-500 hover:cursor-pointer text-white rounded-2xl      uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-100 flex items-center justify-center gap-2">
                                {isUpdating ? "Processing..." : "Commit Changes"} <Check size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            </PermissionGuardian>
        </main>
    );
}

const InputField = ({ label, error, ...props }) => (
    <div className="flex flex-col gap-2 w-full">
        <label className="text-[10px]   text-gray-400 uppercase tracking-[2px]">
            {label}
        </label>
        <input
            {...props}
            className={`text-black w-full h-14 px-5 bg-gray-50 border-2 rounded-2xl font-bold text-sm outline-none transition-all
                ${error ? "border-red-300 focus:border-red-500" : "border-gray-100 focus:border-emerald-500"}`}
        />
        {error && (
            <p className="text-[9px] text-red-500 font-bold uppercase ml-1">
                {error}
            </p>
        )}
    </div>
);
