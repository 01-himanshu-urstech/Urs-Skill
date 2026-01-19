"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { useGetAllLogsQuery } from "../../../redux/service/adminApi";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import {
    ChevronLeft, ChevronRight, Loader2, Activity,
    Clock, User, Database, Box, AlertCircle
} from "lucide-react";

export default function LogsPage() {
    const [page, setPage] = useState(1);
    const limit = 10; // ✅ Requested limit of 10 logs per page

    // Fetching logs from your API
    const { data, isLoading, isError, refetch } = useGetAllLogsQuery({ page, limit });

    // Extracting data based on your specific backend JSON structure
    const logsData = data?.data?.logs || [];
    const totalLogs = data?.data?.total || 0;
    const totalPages = Math.ceil(totalLogs / limit);

    return (
        <PermissionGuardian permissionId="logs">
            <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden min-h-screen bg-gray-50/30">
                <PageHeader
                    title="System Activity Logs"
                    description={`Tracking ${totalLogs} total platform activities`}
                />

                <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="min-w-[900px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-[2px] text-gray-400 border-b border-gray-100">
                                    <tr>
                                        <th className="p-5 text-center w-20">S.No</th>
                                        <th className="p-5">Action & Event</th>
                                        <th className="p-5">Target Entity</th>
                                        <th className="p-5">Performed By</th>
                                        <th className="p-5">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="5" className="p-20 text-center">
                                                <Loader2 className="animate-spin mx-auto text-[#7C3AED]" size={32} />
                                            </td>
                                        </tr>
                                    ) : isError ? (
                                        <tr>
                                            <td colSpan="5" className="p-20 text-center">
                                                <div className="flex flex-col items-center gap-2 text-red-500">
                                                    <AlertCircle size={32} />
                                                    <p className="font-bold">Failed to load logs</p>
                                                    <button onClick={() => refetch()} className="text-xs underline text-gray-400">Retry</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : logsData.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-20 text-center text-gray-400 italic font-medium">No logs recorded.</td>
                                        </tr>
                                    ) : (
                                        logsData.map((log, index) => (
                                            <tr key={log._id} className="hover:bg-gray-50/50 transition-colors">
                                                {/* Serial Number Calculation */}
                                                <td className="p-5 text-center text-xs font-bold text-gray-400">
                                                    {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                                </td>

                                                {/* Action Type */}
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${log.action?.includes('CREATE') ? 'bg-emerald-50 text-emerald-600' :
                                                            log.action?.includes('DELETE') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                                            }`}>
                                                            <Activity size={16} />
                                                        </div>
                                                        <span className="text-sm font-black text-gray-800 uppercase tracking-tight">
                                                            {log.action?.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Target Entity */}
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                                                            <Box size={12} className="text-[#7C3AED]" />
                                                            {log.target?.entity}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-gray-400 truncate max-w-[150px]">
                                                            ID: {log.target?.entityId}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Performed By */}
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-bold text-gray-700 flex items-center gap-1">
                                                            <User size={12} className="text-gray-400" />
                                                            {log.performedBy?.role}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 font-medium italic">
                                                            UID: {log.performedBy?.userId?.slice(-6)}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Timestamp */}
                                                <td className="p-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-600">
                                                            {new Date(log.createdAt).toLocaleDateString('en-GB')}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                            <Clock size={10} /> {new Date(log.createdAt).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="p-5 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <div className="flex flex-col">
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                Page {page} of {totalPages || 1}
                            </p>
                            <span className="text-[10px] text-gray-400">Total Activities: {totalLogs}</span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                disabled={page <= 1 || isLoading}
                                onClick={() => setPage(p => p - 1)}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-100 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button
                                disabled={page >= totalPages || isLoading}
                                onClick={() => setPage(p => p + 1)}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-100 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}