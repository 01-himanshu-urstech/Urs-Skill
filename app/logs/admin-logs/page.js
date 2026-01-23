"use client";
import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { useGetAdminLogsQuery } from "../../../redux/service/adminApi";
import {
    ShieldCheck, Box, Search, RefreshCw, Clock, Loader2, ChevronLeft, ChevronRight, Inbox
} from "lucide-react";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";

export default function AdminLogsPage() {
    //    1. Pagination & Search State
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 10; // Strict limit per page

    const { data, isLoading, isFetching, refetch } = useGetAdminLogsQuery();

    const logsList = data?.data?.logs || [];

    //    2. STRICT FRONTEND FILTERING & SLICING (Matches Coupon/Blog logic)
    const { displayLogs, totalRecords } = useMemo(() => {
        // Step A: Search Filtering
        let filtered = logsList.filter(log =>
            log.performedBy?.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.target?.entity?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const total = filtered.length;

        // Step B: Manual Slice for exact 10 items per page view
        const startIndex = (page - 1) * limit;
        const slicedData = filtered.slice(startIndex, startIndex + limit);

        return { displayLogs: slicedData, totalRecords: total };
    }, [logsList, searchTerm, page]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    //    3. Auto-reset to page 1 on search
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    return (
        <PermissionGuardian permissionId="logs">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <PageHeader
                    title="Admin Activity Logs"
                    description={`Monitoring ${totalRecords} platform administrative actions.`}
                />

                {/* UI Header Actions */}
                <div className="mt-6 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-black w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-[#7C3AED]/5 transition-all text-sm font-medium"
                        />
                    </div>
                    <button
                        onClick={refetch}
                        disabled={isLoading || isFetching}
                        className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 border hover:cursor-pointer border-gray-100 rounded-2xl   uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all shadow-sm active:scale-95 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${(isLoading || isFetching) ? 'animate-spin' : ''}`} />
                        Sync Data
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase   tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-center w-20">S.No</th>
                                    <th className="p-6">Performed By</th>
                                    <th className="p-6 text-center">Action</th>
                                    <th className="p-6 text-center">Resource</th>
                                    <th className="p-6 text-right pr-10">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="5" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-[#7C3AED]" size={40} /></td></tr>
                                ) : displayLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-20 text-center">
                                            <Inbox size={48} className="mx-auto mb-2 text-gray-200 opacity-20" />
                                            <p className="text-xs   uppercase tracking-widest text-gray-400">No activity records found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    displayLogs.map((log, index) => (
                                        <tr key={log._id} className="hover:bg-gray-50/50 transition-colors group">
                                            {/*    4. Corrected Indexing */}
                                            <td className="p-6 text-center text-xs   text-gray-300">
                                                {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                            </td>

                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#7C3AED] border border-indigo-100/50">
                                                        <ShieldCheck size={18} />
                                                    </div>
                                                    <span className="text-sm   text-gray-700 uppercase tracking-tight">{log.performedBy?.role}</span>
                                                </div>
                                            </td>

                                            <td className="p-6 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className={`px-2 py-1 rounded text-[10px]   uppercase tracking-wider ${log.action?.includes('DELETE') ? 'bg-red-50 text-red-500' :
                                                        log.action?.includes('UPDATE') ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-600'
                                                        }`}>
                                                        {log.action?.replace('_', ' ')}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 font-bold">{log.metadata?.name || log.metadata?.code || ""}</span>
                                                </div>
                                            </td>

                                            <td className="p-6 text-center">
                                                <div className="inline-flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-lg border border-gray-200/50">
                                                    <Box size={14} className="text-[#7C3AED]" />
                                                    {log.target?.entity}
                                                </div>
                                            </td>

                                            <td className="p-6 text-right pr-10">
                                                <div className="flex flex-col items-end font-mono text-[11px]">
                                                    <span className="  text-gray-600">{new Date(log.createdAt).toLocaleDateString('en-GB')}</span>
                                                    <span className="flex items-center gap-1 text-gray-400 font-bold">
                                                        <Clock size={10} /> {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/*    5. PAGINATION FOOTER */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px]   uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider">
                                Showing {displayLogs.length} of {totalRecords} Records
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isFetching}
                                className="p-2 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages || isFetching}
                                className="p-2 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-center text-[10px] text-gray-400   uppercase tracking-[0.2em]">
                    --- Secure Administrative Audit Log ---
                </p>
            </main>
        </PermissionGuardian>
    );
}