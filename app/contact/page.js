"use client";
import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import {
    Mail, Phone, User, Calendar,
    Search, Trash2, CheckCircle2,
    Clock, MessageSquare, Loader2, Eye, X, AlertCircle,
    RefreshCw, ChevronLeft, ChevronRight, ChevronDown, Inbox
} from "lucide-react";
import PermissionGuardian from "../../components/auth/PermissionGuardian";
import {
    useGetAllContactsQuery,
    useUpdateContactStatusMutation,
} from "../../redux/service/adminApi";

export default function ContactQueriesPage() {
    //    1. Pagination & Filter State
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedQuery, setSelectedQuery] = useState(null);
    const limit = 10; // Strict limit per page

    //    2. API Hooks
    const { data: response, isLoading, isFetching, refetch } = useGetAllContactsQuery();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateContactStatusMutation();

    const queries = response?.data || [];

    //    3. STRICT FRONTEND FILTERING & SLICING (Matches your other lists)
    const { displayQueries, totalRecords } = useMemo(() => {
        // Step A: Search and Status Filtering
        let filtered = queries.filter(q => {
            const matchesSearch = q.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "ALL" || q.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        const total = filtered.length;

        // Step B: Manual Slice for exact 10 items per page view
        const startIndex = (page - 1) * limit;
        const slicedData = filtered.slice(startIndex, startIndex + limit);

        return { displayQueries: slicedData, totalRecords: total };
    }, [queries, searchTerm, statusFilter, page]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    //    4. Auto-reset to page 1 on search or filter change
    useEffect(() => {
        setPage(1);
    }, [searchTerm, statusFilter]);

    useEffect(() => {
        if (selectedQuery) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedQuery]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            if (selectedQuery?._id === id) setSelectedQuery(null);
        } catch (err) {
            alert("Failed: " + (err?.data?.message || "Unknown error"));
        }
    };

    return (
        <PermissionGuardian permissionId="Enquiry">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <PageHeader
                    title="Customer Queries"
                    description={`Monitoring ${totalRecords} website contact form submissions.`}
                />

                {/* Filter Section */}
                <div className="mt-8 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-xl flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Filter by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-black w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm transition-all"
                            />
                        </div>

                        {/*    CUSTOM DROPDOWN WITH INCREASED ARROW SPACING */}
                        <div className="relative min-w-[180px]">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full appearance-none pl-6 pr-12 py-4 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm   uppercase text-[10px] tracking-widest text-gray-500 cursor-pointer focus:border-indigo-500 transition-all"
                            >
                                <option value="ALL">All Entries</option>
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                            {/* Custom Arrow Icon with precise spacing */}
                            <ChevronDown
                                size={14}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 hover:cursor-pointer transition-all text-gray-400 shadow-sm active:scale-95"
                    >
                        <RefreshCw className={isFetching ? "animate-spin" : ""} size={18} />
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-200/20 overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase   tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-center w-20">S.No</th>
                                    <th className="p-6">Sender Identity</th>
                                    <th className="p-6">Contact Info</th>
                                    <th className="p-6">Message Preview</th>
                                    <th className="p-6 text-center">Status</th>
                                    <th className="p-6 text-right pr-10">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="6" className="p-24 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" size={40} /></td></tr>
                                ) : displayQueries.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-24 text-center">
                                            <Inbox size={48} className="mx-auto mb-2 text-gray-200 opacity-20" />
                                            <p className="text-xs   uppercase tracking-widest text-gray-400 italic">No records matching your criteria</p>
                                        </td>
                                    </tr>
                                ) : (
                                    displayQueries.map((query, index) => (
                                        <tr key={query._id} className="hover:bg-gray-50/30 transition-all group">
                                            {/*    5. Corrected Sequential Indexing */}
                                            <td className="p-6 text-center text-xs   text-gray-300">
                                                {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm">
                                                        {query.fullName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm   text-gray-800 uppercase tracking-tight">{query.fullName}</span>
                                                        <span className="text-[9px] text-gray-400 font-bold mt-1 flex items-center gap-1">
                                                            <Clock size={10} /> {new Date(query.createdAt).toLocaleDateString('en-GB')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-xs font-bold text-gray-600 space-y-1">
                                                <div className="flex items-center gap-2"><Mail size={12} className="text-indigo-400" /> {query.email}</div>
                                                <div className="flex items-center gap-2"><Phone size={12} className="text-indigo-400" /> {query.phone}</div>
                                            </td>
                                            <td className="p-6 max-w-[200px]">
                                                <p className="text-xs text-gray-400 italic line-clamp-1">{query.message}</p>
                                            </td>
                                            <td className="p-6 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px]   uppercase tracking-widest border transition-all ${query.status === 'NEW' ? 'bg-orange-50 text-orange-500 border-orange-100' :
                                                    query.status === 'CONTACTED' ? 'bg-blue-50 text-blue-500 border-blue-100' :
                                                        'bg-emerald-50 text-emerald-500 border-emerald-100'
                                                    }`}>
                                                    {query.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right pr-10">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => setSelectedQuery(query)} className="p-2.5 text-indigo-600 hover:bg-indigo-50 hover:cursor-pointer rounded-xl transition-all border border-transparent hover:border-indigo-100 shadow-sm active:scale-90">
                                                        <Eye size={18} />
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
                            <p className="text-[10px]   uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-indigo-400 uppercase">
                                Showing {displayQueries.length} of {totalRecords} Customer Entries
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isFetching}
                                className="p-2 bg-white border border-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-50 hover:cursor-pointer shadow-sm transition-all active:scale-90"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages || isFetching}
                                className="p-2 bg-white border border-gray-200 rounded-xl disabled:opacity-30 hover:bg-gray-50 hover:cursor-pointer shadow-sm transition-all active:scale-90"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* MODAL (Same as your previous version) */}
                {selectedQuery && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in">
                        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                            {/* ... Modal Header ... */}
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-indigo-600 shadow-sm">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base   text-gray-800 uppercase tracking-tight">Query Detail</h3>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">ID: {selectedQuery._id}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedQuery(null)} className="p-2 hover:bg-white rounded-full hover:cursor-pointer transition-all text-gray-400 hover:text-red-500"><X size={20} /></button>
                            </div>

                            <div className="p-10 space-y-8">
                                <div className="grid grid-cols-2 gap-8 border-b border-gray-50 pb-8">
                                    <div>
                                        <label className="text-[9px]   text-indigo-400 uppercase tracking-widest block mb-2">Sender Name</label>
                                        <p className="font-bold text-gray-700">{selectedQuery.fullName}</p>
                                    </div>
                                    <div>
                                        <label className="text-[9px]   text-indigo-400 uppercase tracking-widest block mb-2">Phone</label>
                                        <p className="font-bold text-gray-700">{selectedQuery.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px]   text-gray-400 uppercase tracking-widest block mb-4 flex items-center gap-2">
                                        <AlertCircle size={10} /> Customer Message
                                    </label>
                                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-gray-600 font-medium leading-relaxed italic text-sm">
                                        "{selectedQuery.message}"
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex gap-4 justify-end">
                                <button
                                    onClick={() => handleStatusUpdate(selectedQuery._id, 'CONTACTED')}
                                    disabled={isUpdating}
                                    className="px-8 py-4 bg-white text-blue-600 border border-blue-100 rounded-2xl   hover:cursor-pointer uppercase text-[10px] tracking-widest hover:bg-blue-50 transition-all disabled:opacity-50"
                                >
                                    Mark Contacted
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedQuery._id, 'CLOSED')}
                                    disabled={isUpdating}
                                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl   hover:cursor-pointer uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
                                >
                                    {isUpdating ? "Processing..." : "Close Ticket"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </PermissionGuardian>
    );
}
