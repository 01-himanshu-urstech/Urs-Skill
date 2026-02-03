"use client";
import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import {
    Plus, Edit2, Trash2, Globe, Eye,
    Check, X, Loader2, Camera, ExternalLink, RefreshCw,
    ImageIcon, Hash, ChevronLeft, ChevronRight, Inbox, Search
} from "lucide-react";
import PermissionGuardian from "../../components/auth/PermissionGuardian";
import {
    useGetBannersQuery,
    useDeleteBannerMutation
} from "../../redux/service/adminApi";
import { useRouter } from "next/navigation";

export default function BannerPage() {
    const router = useRouter();

    //    1. Pagination & Search State
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 10; // Strict display limit per page

    const { data, isLoading, isFetching, refetch } = useGetBannersQuery();
    const [deleteBanner] = useDeleteBannerMutation();

    const allBanners = data?.data?.banners || [];

    //    2. STRICT FRONTEND FILTERING & SLICING
    const { displayBanners, totalRecords } = useMemo(() => {
        // Step A: Filter by Title or Position
        let filtered = allBanners.filter(banner =>
            banner.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            banner.position?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const total = filtered.length;

        // Step B: Manual Slice for current page view
        const startIndex = (page - 1) * limit;
        const slicedData = filtered.slice(startIndex, startIndex + limit);

        return { displayBanners: slicedData, totalRecords: total };
    }, [allBanners, searchTerm, page]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    //    3. Auto-reset to page 1 on search
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await deleteBanner(id).unwrap();
            } catch (err) { console.error(err); }
        }
    };

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <PageHeader
                    title="Marketing Banners"
                    description={`Managing ${totalRecords} promotional hero sections and sliders.`}
                    addButtonLabel="Add New Banner"
                    onAddClick={() => router.push('/banners/add')}
                />

                {/* Toolbar: Search and Sync */}
                <div className="mt-8 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Filter by title or position..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/5 transition-all font-medium text-sm text-black"
                        />
                    </div>
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="px-6 py-3.5 bg-white border border-gray-100 rounded-2xl text-[10px]      uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:cursor-pointer flex items-center gap-3 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
                        Sync Assets
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-emerald-900/5 overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase      tracking-[2px] text-gray-400 border-b border-gray-100">
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
                                    <tr><td colSpan="6" className="p-24 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" size={40} /></td></tr>
                                ) : displayBanners.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-24 text-center">
                                            <Inbox size={48} className="mx-auto mb-3 opacity-20 text-gray-400" />
                                            <p className="text-xs      uppercase tracking-widest text-gray-400 italic">No Banners Configured</p>
                                        </td>
                                    </tr>
                                ) : (
                                    displayBanners.map((banner, index) => (
                                        <tr key={banner._id} className="hover:bg-gray-50/50 transition-colors group">
                                            {/*    4. Sequential Indexing logic */}
                                            <td className="p-6 text-center text-xs      text-gray-300">
                                                {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                            </td>

                                            <td className="p-6">
                                                <div className="w-24 h-14 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 relative group/img shadow-sm">
                                                    <img
                                                        src={banner.image?.url}
                                                        alt={banner.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                                    />
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm      text-gray-800 uppercase tracking-tight">{banner.title}</span>
                                                    <span className="text-[10px] text-gray-400 font-bold mt-0.5 line-clamp-1">{banner.subtitle}</span>
                                                </div>
                                            </td>

                                            <td className="p-6 text-center">
                                                <div className="inline-flex flex-col items-center">
                                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px]      uppercase tracking-widest border border-indigo-100">
                                                        {banner.position}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Order: {banner.order}</span>
                                                </div>
                                            </td>

                                            <td className="p-6 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px]      uppercase tracking-widest ${banner.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-50 text-gray-400 border border-gray-200'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${banner.isActive ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                                                    {banner.isActive ? 'Active' : 'Paused'}
                                                </span>
                                            </td>

                                            <td className="p-6 text-right pr-10">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => router.push(`/banners/edit/${banner._id}`)} className="p-2.5 bg-white border border-gray-100 hover:cursor-pointer text-emerald-600 rounded-xl hover:bg-emerald-50 transition-all shadow-sm active:scale-90">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(banner._id)} className="p-2.5 bg-white border border-gray-100 hover:cursor-pointer text-red-500 rounded-xl hover:bg-red-50 transition-all shadow-sm active:scale-90">
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

                    {/*    5. STANDARD PAGINATION FOOTER */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px]      uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-emerald-500 uppercase">
                                Showing {displayBanners.length} of {totalRecords} Asset Entries
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isFetching}
                                className="p-2.5 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages || isFetching}
                                className="p-2.5 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}