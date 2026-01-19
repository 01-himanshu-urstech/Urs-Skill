"use client";
import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import {
    Plus, Edit2, Trash2, Globe, Eye,
    Check, X, Loader2, Camera, ExternalLink, RefreshCw, ImageIcon, Hash
} from "lucide-react";
import PermissionGuardian from "../../components/auth/PermissionGuardian";
import {
    useGetBannersQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation
} from "../../redux/service/adminApi";
import { useRouter } from "next/navigation";

export default function BannerPage() {
    const router = useRouter();
    const { data, isLoading, isFetching, refetch } = useGetBannersQuery(); //
    const [deleteBanner] = useDeleteBannerMutation(); //

    const banners = data?.data?.banners || [];

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await deleteBanner(id).unwrap(); //
            } catch (err) { console.error(err); }
        }
    };

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
                <PageHeader
                    title="Marketing Banners"
                    description="Manage hero sections and promotional sliders in a structured list."
                    addButtonLabel="Add New Banner"
                    onAddClick={() => router.push('/banners/add')} // Navigating to create page
                />

                {/* Toolbar */}
                <div className="mt-6 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => refetch()}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 flex items-center gap-2 transition-all shadow-sm"
                        >
                            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
                            Refresh List
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-center w-20">Index</th>
                                    <th className="p-6">Banner Preview</th>
                                    <th className="p-6">Content Info</th>
                                    <th className="p-6 text-center">Placement</th>
                                    <th className="p-6 text-center">Status</th>
                                    <th className="p-6 text-right pr-10">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="p-20 text-center">
                                            <Loader2 className="animate-spin mx-auto text-emerald-500" size={40} />
                                        </td>
                                    </tr>
                                ) : banners.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-20 text-center text-gray-400 italic font-bold">
                                            No banners found in the system.
                                        </td>
                                    </tr>
                                ) : (
                                    banners.map((banner, index) => (
                                        <tr key={banner._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-6 text-center text-xs font-black text-gray-300">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>

                                            <td className="p-6">
                                                <div className="w-24 h-14 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 relative group/img">
                                                    <img
                                                        src={banner.image?.url}
                                                        alt={banner.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                                    />
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{banner.title}</span>
                                                    <span className="text-[10px] text-gray-400 font-bold mt-0.5 line-clamp-1">{banner.subtitle}</span>
                                                </div>
                                            </td>

                                            <td className="p-6 text-center">
                                                <div className="inline-flex flex-col items-center">
                                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                                        {banner.position}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Order: {banner.order}</span>
                                                </div>
                                            </td>

                                            <td className="p-6 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${banner.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${banner.isActive ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                                                    {banner.isActive ? 'Active' : 'Paused'}
                                                </span>
                                            </td>

                                            <td className="p-6 text-right pr-10">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => router.push(`/banners/view/${banner._id}`)} //
                                                        className="p-2.5 bg-white border border-gray-100 text-blue-500 rounded-xl hover:bg-blue-50 hover:border-blue-100 transition-all shadow-sm"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => router.push(`/banners/edit/${banner._id}`)} //
                                                        className="p-2.5 bg-white border border-gray-100 text-emerald-600 rounded-xl hover:bg-emerald-50 hover:border-emerald-100 transition-all shadow-sm"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(banner._id)} //
                                                        className="p-2.5 bg-white border border-gray-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all shadow-sm"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer summary */}
                    <div className="p-6 bg-gray-50/30 border-t border-gray-100 flex justify-center">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">
                            --- Total {banners.length} Marketing Assets Configured ---
                        </span>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}