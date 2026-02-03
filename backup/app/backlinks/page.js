"use client";
import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import {
    Link as LinkIcon, Trash2, ExternalLink, Loader2,
    Globe, Tag, Navigation, Edit2, Search, ChevronLeft, ChevronRight, Inbox
} from "lucide-react";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../components/auth/PermissionGuardian";
import { useGetBacklinksQuery, useDeleteBacklinkByIdMutation } from "../../redux/service/adminApi";

export default function BacklinkListPage() {
    const router = useRouter();

    //    1. Pagination & Search State
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 10; // Strict limit per page

    //    2. API Hooks
    const { data, isLoading, isFetching, isError, refetch } = useGetBacklinksQuery();
    const [deleteBacklink] = useDeleteBacklinkByIdMutation();

    const backlinks = data?.data?.backlinks || [];

    //    3. STRICT FRONTEND FILTERING & SLICING (Matches your other lists)
    const { displayBacklinks, totalRecords } = useMemo(() => {
        // Step A: Search Filtering (by Partner Name or URL)
        let filtered = backlinks.filter(link =>
            link.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            link.url?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const total = filtered.length;

        // Step B: Manual Slice for exact 10 items per page view
        const startIndex = (page - 1) * limit;
        const slicedData = filtered.slice(startIndex, startIndex + limit);

        return { displayBacklinks: slicedData, totalRecords: total };
    }, [backlinks, searchTerm, page]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    //    4. Auto-reset to page 1 on search
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this backlink?")) {
            try {
                await deleteBacklink(id).unwrap();
            } catch (err) {
                alert("Failed to delete backlink");
            }
        }
    };

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <PageHeader
                    title="SEO Backlinks"
                    description={`Monitoring ${totalRecords} external links pointing to UrsSkill.`}
                    addButtonLabel="Add Backlink"
                    onAddClick={() => router.push("/backlinks/create")}
                />

                {/* Search Bar Integration */}
                <div className="mt-8 mb-6 max-w-md relative text-black">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search partner or URL..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm transition-all"
                    />
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-200/10 overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase      tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-center w-20">S.No</th>
                                    <th className="p-6">Partner & URL</th>
                                    <th className="p-6">Type</th>
                                    <th className="p-6">Position</th>
                                    <th className="p-6 text-center">Status</th>
                                    <th className="p-6 text-right pr-10">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="6" className="p-24 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" size={40} /></td></tr>
                                ) : displayBacklinks.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-24 text-center">
                                            <Inbox size={48} className="mx-auto mb-2 text-gray-200 opacity-20" />
                                            <p className="text-xs      uppercase tracking-widest text-gray-400 italic">No Backlinks Found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    displayBacklinks.map((link, index) => (
                                        <tr key={link._id} className="hover:bg-gray-50/30 transition-all group">
                                            {/*    5. Corrected Sequential Indexing */}
                                            <td className="p-6 text-center text-xs      text-gray-300">
                                                {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                            </td>

                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm      text-gray-800 flex items-center gap-2 uppercase tracking-tight">
                                                        <Globe size={14} className="text-indigo-400" />
                                                        {link.name}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-1.5">
                                                        <span className="text-[11px] text-indigo-600 font-bold truncate max-w-[250px]">{link.url}</span>
                                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="p-1 bg-indigo-50 text-indigo-400 rounded-md hover:text-indigo-600 transition-colors">
                                                            <ExternalLink size={10} />
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 text-[10px]      text-gray-500 uppercase tracking-wider border border-gray-200/50">
                                                    <Tag size={10} />
                                                    {link.type}
                                                </span>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase">
                                                    <Navigation size={14} className="text-indigo-500" />
                                                    {link.position}
                                                </div>
                                            </td>

                                            <td className="p-6 text-center">
                                                <span className={`px-3 py-1.5 rounded-full text-[9px]      uppercase tracking-widest border transition-all ${link.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                                    {link.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>

                                            <td className="p-6 text-right pr-10">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => router.push(`/backlinks/update/${link._id}`)}
                                                        className="p-2.5 text-emerald-600 hover:cursor-pointer hover:bg-emerald-50 rounded-xl transition-all shadow-sm active:scale-90"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(link._id)}
                                                        className="p-2.5 text-red-500 hover:cursor-pointer hover:bg-red-50 rounded-xl transition-all shadow-sm active:scale-90"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/*    6. PAGINATION FOOTER */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px]      uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-indigo-500 uppercase">
                                Showing {displayBacklinks.length} of {totalRecords} Backlink Records
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isFetching}
                                className="p-2.5 bg-white border border-gray-200 hover:cursor-pointer rounded-xl disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages || isFetching}
                                className="p-2.5 bg-white border border-gray-200 hover:cursor-pointer rounded-xl disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
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