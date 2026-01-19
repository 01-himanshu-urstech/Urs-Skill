"use client";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "../../../../components/ui/PageHeader";
import {
    Image as ImageIcon, Globe, ShieldCheck,
    Calendar, User, ExternalLink, ArrowLeft, Loader2, Info, Hash
} from "lucide-react";
import Link from "next/link";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
import { useGetBannerByIdQuery } from "../../../../redux/service/adminApi"; //

export default function ViewBannerPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: response, isLoading } = useGetBannerByIdQuery(id); //

    const banner = response?.data?.banner; // Path based on your API

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Retrieving Banner Media...</p>
        </div>
    );

    return (
        <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
            <PermissionGuardian permissionId="General">
                <div className="flex items-center gap-4 mb-6">

                    <PageHeader title="Banner Details" description="Full technical specifications and preview." />
                </div>

                <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Visual Preview Card */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden p-3">
                            <div className="rounded-[2rem] overflow-hidden bg-gray-50 aspect-video relative group">
                                <img src={banner?.image?.url} className="w-full h-full object-cover" alt="Preview" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a href={banner?.image?.url} target="_blank" className="px-6 py-3 bg-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                                        <ExternalLink size={14} /> View Full Image
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-10 space-y-8">
                            <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                                <Info className="text-emerald-500" size={20} />
                                <h3 className="font-black text-gray-800 uppercase tracking-tight text-sm">Marketing Information</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Primary Heading</label>
                                    <p className="text-xl font-black text-gray-800 uppercase leading-tight">{banner?.title}</p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Subtitle / Copy</label>
                                    <p className="text-gray-600 font-bold leading-relaxed">{banner?.subtitle || "No subtitle provided."}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Details Card */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-8">
                            <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
                                <ShieldCheck className="text-emerald-500" size={20} />
                                <h3 className="font-black text-gray-800 uppercase tracking-tight text-sm">Metadata</h3>
                            </div>

                            <div className="space-y-6">
                                <MetaItem label="Visibility" value={banner?.isActive ? "ACTIVE" : "INACTIVE"} color={banner?.isActive ? "text-emerald-500" : "text-gray-400"} />
                                <MetaItem label="Placement" value={banner?.position} />
                                <MetaItem label="Display Order" value={`INDEX: ${banner?.order}`} />
                                <div className="pt-4 border-t border-gray-50 space-y-4">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                        <Calendar size={14} /> Created: {new Date(banner?.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                        <User size={14} /> Owner ID: {banner?.createdBy?.slice(-8)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href={`/banners/edit/${id}`} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-100 flex items-center justify-center gap-2">
                            Edit Content
                        </Link>
                    </div>
                </div>
            </PermissionGuardian>
        </main>
    );
}

const MetaItem = ({ label, value, color = "text-gray-800" }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{label}</label>
        <p className={`text-sm font-black uppercase ${color}`}>{value}</p>
    </div>
);