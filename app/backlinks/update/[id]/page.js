"use client";
import { useState, useEffect } from "react";
import PageHeader from "../../../../components/ui/PageHeader";
import { Link2, Globe, Tag, Navigation, Check, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
import { useRouter, useParams } from "next/navigation";
import { useUpdateBacklinkMutation, useGetBacklinksQuery } from "../../../../redux/service/adminApi";

export default function UpdateBacklinkPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: listData } = useGetBacklinksQuery(); // Existing data fetch karne ke liye
    const [updateBacklink, { isLoading }] = useUpdateBacklinkMutation();

    const [formData, setFormData] = useState({
        name: "",
        url: "",
        type: "DOFOLLOW",
        position: "FOOTER",
        isActive: true
    });

    //    Form mein purana data pre-fill karne ke liye
    useEffect(() => {
        if (listData?.data?.backlinks) {
            const currentLink = listData.data.backlinks.find(item => item._id === id);
            if (currentLink) {
                setFormData({
                    name: currentLink.name,
                    url: currentLink.url,
                    type: currentLink.type,
                    position: currentLink.position,
                    isActive: currentLink.isActive
                });
            }
        }
    }, [id, listData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //    Mutation trigger for PATCH /backlinks/update/:id
            await updateBacklink({ id, ...formData }).unwrap();
            alert("Backlink updated successfully!");
            router.push("/backlinks");
        } catch (err) {
            alert(err?.data?.message || "Failed to update backlink");
        }
    };

    return (
        <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
            <PermissionGuardian permissionId="General">
                <div className="flex items-center gap-4 mb-2">

                    <PageHeader title="Update Backlink" description="Modify the details of an existing SEO link." />
                </div>

                <div className="max-w-4xl mt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                                <InputField label="Partner Name" name="name" value={formData.name} onChange={handleChange} icon={<Globe size={18} />} required />
                                <InputField label="Target URL" name="url" type="url" value={formData.url} onChange={handleChange} icon={<Link2 size={18} />} required />

                                <SelectField label="Link Type" name="type" value={formData.type} onChange={handleChange} icon={<Tag size={18} />} options={["DOFOLLOW", "NOFOLLOW"]} />
                                <SelectField label="Placement" name="position" value={formData.position} onChange={handleChange} icon={<Navigation size={18} />} options={["FOOTER", "BLOG", "PARTNER"]} />

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl md:col-span-2">
                                    <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 accent-[#7C3AED]" />
                                    <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">Set as Active Link</label>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" disabled={isLoading} className="px-10 py-3.5 bg-[#7C3AED] hover:bg-[#5B21B6] hover:cursor-pointer text-white rounded-xl font-bold flex items-center gap-2 disabled:opacity-70">
                                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Update Link <Check size={18} /></>}
                            </button>
                        </div>
                    </form>
                </div>
            </PermissionGuardian>
        </main >
    );
}

// Reuseable Components
const InputField = ({ label, icon, ...props }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
            <input {...props} className="text-black w-full pl-11 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#7C3AED] text-sm h-12 shadow-sm font-medium" />
        </div>
    </div>
);

const SelectField = ({ label, icon, options, ...props }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
            <select {...props} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#7C3AED] text-sm h-12 shadow-sm font-medium">
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    </div>
);