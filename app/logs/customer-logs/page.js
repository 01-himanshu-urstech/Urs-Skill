"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { useGetCustomerLogsQuery } from "../../../redux/service/adminApi"; // ✅
import {
    UserCircle, Search, RefreshCw, Clock, Loader2, Info, ArrowRight
} from "lucide-react";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";

export default function CustomerLogsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ Fetching customer-specific logs
    const { data, isLoading, isFetching, refetch } = useGetCustomerLogsQuery();

    // Mapping based on your backend response structure
    const logsList = data?.data?.logs || [];
    const totalLogsCount = logsList.length;

    // Filter logic for Searching (Email, Action, or Resource)
    const filteredLogs = logsList.filter(log =>
        log.metadata?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.target?.entity?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PermissionGuardian permissionId="logs">
            <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
                <PageHeader
                    title="Customer Activity"
                    description={`Monitoring ${totalLogsCount} customer-side interactions and account updates.`}
                />

                {/* UI Header Actions */}
                <div className="mt-6 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by email or action..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
                        />
                    </div>
                    <button
                        onClick={refetch}
                        disabled={isLoading || isFetching}
                        className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${(isLoading || isFetching) ? 'animate-spin' : ''}`} />
                        Sync Logs
                    </button>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-5 text-center w-20">S.No</th>
                                    <th className="p-5">Customer Identity</th>
                                    <th className="p-5">Activity Action</th>
                                    <th className="p-5 text-center">Resource</th>
                                    <th className="p-5 text-right pr-10">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="p-20 text-center">
                                            <Loader2 className="animate-spin mx-auto text-emerald-500" size={40} />
                                        </td>
                                    </tr>
                                ) : filteredLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-20 text-center text-gray-400 italic font-medium">
                                            No customer activity found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLogs.map((log, index) => (
                                        <tr key={log._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-5 text-center text-xs font-black text-gray-300">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>

                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100/50">
                                                        <UserCircle size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-gray-800 tracking-tight uppercase">Customer</span>
                                                        <span className="text-[10px] text-gray-400 font-bold">{log.metadata?.email || "System User"}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-5">
                                                <div className="flex flex-col">
                                                    <span className={`inline-flex items-center w-fit px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${log.action?.includes('DELETE') ? 'bg-red-50 text-red-500' :
                                                        log.action?.includes('CREATE') ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-500'
                                                        }`}>
                                                        {log.action?.replace('_', ' ')}
                                                    </span>
                                                    {/* Meta Preview like 'NEWYEAR100' */}
                                                    {log.metadata?.code && (
                                                        <span className="text-[10px] text-gray-400 mt-1 font-mono font-bold">Code: {log.metadata.code}</span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="p-5 text-center">
                                                <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase">
                                                    {log.target?.entity}
                                                </div>
                                            </td>

                                            <td className="p-5 text-right pr-10">
                                                <div className="flex flex-col items-end font-mono text-[11px]">
                                                    <span className="font-black text-gray-600">{new Date(log.createdAt).toLocaleDateString('en-GB')}</span>
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

                    {/* Footer matching image_137a43.png summary style */}
                    <div className="p-5 bg-gray-50/30 border-t border-gray-100 flex justify-center">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">
                            --- TOTAL {totalLogsCount} CUSTOMER ACTIVITY RECORDS LOADED ---
                        </span>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}