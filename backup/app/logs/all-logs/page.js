"use client";
import { useState, useEffect } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { useGetAllLogsQuery } from "../../../redux/service/adminApi";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import {
    ChevronLeft, ChevronRight, Loader2, Activity,
    Clock, User, Box, AlertCircle, Inbox
} from "lucide-react";

export default function LogsPage() {
    const [page, setPage] = useState(1);
    const limit = 10;

    //    Pass page and limit to the query
    const { data, isLoading, isFetching, isError, refetch } = useGetAllLogsQuery({
        page,
        limit
    });

    //    Backend Response Mapping
    // Ensure your backend returns 'total' count in data.data.total
    const logsData = data?.data?.logs || [];
    const totalLogs = data?.data?.total || 0;
    const totalPages = Math.ceil(totalLogs / limit) || 1;

    // Reset scroll to top when page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <PermissionGuardian permissionId="logs">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <PageHeader
                    title="System Activity Logs"
                    description={`Tracking ${totalLogs} total platform activities across ${totalPages} pages.`}
                />

                <div className="mt-8 bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase      tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-center w-24">S.No</th>
                                    <th className="p-6">Action & Event</th>
                                    <th className="p-6">Target Entity</th>
                                    <th className="p-6">Performed By</th>
                                    <th className="p-6 text-right pr-10">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isFetching ? (
                                    <tr><td colSpan="5" className="p-24 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" size={40} /></td></tr>
                                ) : logsData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-24 text-center">
                                            <Inbox size={48} className="mx-auto mb-3 opacity-20 text-gray-400" />
                                            <p className="text-xs      uppercase tracking-widest text-gray-400">No Logs Found</p>
                                        </td>
                                    </tr>
                                ) : (
                                    logsData.map((log, index) => (
                                        <tr key={log._id} className="hover:bg-gray-50/50 transition-colors group">
                                            {/*    Sequential Indexing based on Page */}
                                            <td className="p-6 text-center text-xs      text-gray-300">
                                                {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                            </td>

                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100/50">
                                                        <Activity size={18} />
                                                    </div>
                                                    <span className="text-sm      text-gray-800 uppercase tracking-tight">
                                                        {log.action?.replace('_', ' ')}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                                                        <Box size={14} className="text-indigo-400" />
                                                        {log.target?.entity}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-gray-300 truncate max-w-[200px]">ID: {log.target?.entityId}</span>
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400"><User size={14} /></div>
                                                    <span className="text-xs font-bold text-gray-600 uppercase">{log.performedBy?.role}</span>
                                                </div>
                                            </td>

                                            <td className="p-6 text-right pr-10">
                                                <div className="flex flex-col items-end font-mono text-[11px]">
                                                    <span className="     text-gray-600">{new Date(log.createdAt).toLocaleDateString('en-GB')}</span>
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

                    {/*    Standardized Pagination Footer */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <p className="text-[10px]      uppercase text-gray-400 tracking-widest">
                                Page {page} of {totalPages}
                            </p>
                            <p className="text-[9px] font-bold text-indigo-500 uppercase">
                                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalLogs)} of {totalLogs} Logs
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