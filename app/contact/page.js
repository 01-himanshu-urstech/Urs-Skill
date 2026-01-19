"use client";
import { useState, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import {
    Mail, Phone, User, Calendar,
    Search, Trash2, CheckCircle2,
    Clock, MessageSquare, Loader2, Eye, X, AlertCircle,
    RefreshCw
} from "lucide-react";
import PermissionGuardian from "../../components/auth/PermissionGuardian";
import {
    useGetAllContactsQuery,
    useUpdateContactStatusMutation,
    // useDeleteContactMutation
} from "../../redux/service/adminApi";

export default function ContactQueriesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [selectedQuery, setSelectedQuery] = useState(null);

    // ✅ HOOKS INTEGRATION
    const { data: response, isLoading, isFetching, refetch } = useGetAllContactsQuery();
    const [updateStatus, { isLoading: isUpdating }] = useUpdateContactStatusMutation();
    // const [deleteContact] = useDeleteContactMutation();

    // Data extraction based on your provided slice logic
    const queries = response?.data || [];

    useEffect(() => {
        if (selectedQuery) {
            // Disable scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scroll when modal is closed
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to ensure scroll is restored if component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedQuery]);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateStatus({ id, status: newStatus }).unwrap();
            // Automatically close modal if open
            if (selectedQuery?._id === id) setSelectedQuery(null);
        } catch (err) {
            alert("Failed to update status: " + (err?.data?.message || "Unknown error"));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanent deletion cannot be undone. Proceed?")) {
            try {
                await deleteContact(id).unwrap();
            } catch (err) {
                console.error("Deletion error:", err);
            }
        }
    };

    // Filter Logic
    const filteredQueries = queries.filter(q => {
        const matchesSearch = q.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || q.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <PermissionGuardian permissionId="enquiry">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30">
                <PageHeader
                    title="Customer Queries"
                    description="Live dashboard for website contact form submissions."
                />

                <div className="mt-8 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-xl flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Filter by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm transition-all"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm font-black uppercase text-[10px] tracking-widest text-gray-500 cursor-pointer focus:border-indigo-500 transition-all"
                        >
                            <option value="ALL">All Entries</option>
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="CLOSED">Closed</option>
                        </select>
                    </div>
                    <button onClick={() => refetch()} disabled={isFetching} className="p-4 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all text-gray-400">
                        <RefreshCw className={isFetching ? "animate-spin" : ""} size={18} />
                    </button>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-200/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-6">Sender Identity</th>
                                    <th className="p-6">Contact Info</th>
                                    <th className="p-6">Message Preview</th>
                                    <th className="p-6 text-center">Current Status</th>
                                    <th className="p-6 text-right pr-10">Manage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="5" className="p-24 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" size={40} /></td></tr>
                                ) : filteredQueries.length === 0 ? (
                                    <tr><td colSpan="5" className="p-24 text-center text-gray-400 font-bold uppercase tracking-widest text-xs italic">No Customer Records Found</td></tr>
                                ) : (
                                    filteredQueries.map((query) => (
                                        <tr key={query._id} className="hover:bg-gray-50/30 transition-all group">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                                        {query.fullName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{query.fullName}</span>
                                                        <span className="text-[9px] text-gray-400 font-bold mt-1 flex items-center gap-1">
                                                            <Clock size={10} /> {new Date(query.createdAt).toLocaleDateString()}
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
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${query.status === 'NEW' ? 'bg-orange-50 text-orange-500 border-orange-100' :
                                                    query.status === 'CONTACTED' ? 'bg-blue-50 text-blue-500 border-blue-100' :
                                                        'bg-emerald-50 text-emerald-500 border-emerald-100'
                                                    }`}>
                                                    {query.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right pr-10">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => setSelectedQuery(query)} className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100">
                                                        <Eye size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(query._id)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100">
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
                </div>

                {/* ✅ DETAIL OVERLAY MODAL */}
                {selectedQuery && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in">
                        <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-indigo-600 shadow-sm">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-gray-800 uppercase tracking-tight">Query Detail</h3>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">ID: {selectedQuery._id}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedQuery(null)} className="p-2 hover:bg-white rounded-full transition-all text-gray-400 hover:text-red-500"><X size={20} /></button>
                            </div>
                            <div className="p-10 space-y-8">
                                <div className="grid grid-cols-2 gap-8 border-b border-gray-50 pb-8">
                                    <div>
                                        <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-2">Sender Name</label>
                                        <p className="font-bold text-gray-700">{selectedQuery.fullName}</p>
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-2">Phone</label>
                                        <p className="font-bold text-gray-700">{selectedQuery.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-4 flex items-center gap-2">
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
                                    className="px-8 py-4 bg-white text-blue-600 border border-blue-100 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-50 transition-all disabled:opacity-50"
                                >
                                    Mark Contacted
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedQuery._id, 'CLOSED')}
                                    disabled={isUpdating}
                                    className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
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