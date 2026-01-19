"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { useGetAdminLogsQuery } from "../../../redux/service/adminApi";
import {
    ShieldCheck, Box, Search, RefreshCw, Clock, Loader2
} from "lucide-react";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";

export default function AdminLogsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    // Fetching data - limit 1000 rakha hai taaki bina pagination ke saara data ek saath aaye
    const { data, isLoading, isFetching, refetch } = useGetAdminLogsQuery({ page: 1, limit: 1000 });

    // ✅ Path Fix: data.data.logs se array nikalna
    const logsList = data?.data?.logs || [];

    // ✅ Count Fix: Aapke latest screenshot mein 20 logs dikh rahe hain
    const totalLogsCount = logsList.length;

    // Filter logic for Searching
    const filteredLogs = logsList.filter(log =>
        log.performedBy?.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.target?.entity?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PermissionGuardian permissionId="logs">
            <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
                <PageHeader
                    title="Admin Activity Logs"
                    // ✅ Dynamic Count display
                    description={`Monitoring all ${totalLogsCount} platform administrative actions.`}
                />

                {/* UI Header Actions */}
                <div className="mt-6 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search across all records..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-[#7C3AED]/20"
                        />
                    </div>
                    <button
                        onClick={refetch}
                        disabled={isLoading || isFetching}
                        className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${(isLoading || isFetching) ? 'animate-spin' : ''}`} />
                        Sync Data
                    </button>
                </div>

                {/* Table Section matching image_137a43 design */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-10">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-5 text-center w-20">S.No</th>
                                    <th className="p-5">Performed By</th>
                                    <th className="p-5 text-center">Action</th>
                                    <th className="p-5 text-center">Resource</th>
                                    <th className="p-5 text-right">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="5" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-[#7C3AED]" size={40} /></td></tr>
                                ) : (
                                    filteredLogs.map((log, index) => (
                                        <tr key={log._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-5 text-center text-xs font-bold text-gray-400">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>

                                            <td className="p-5">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={14} className="text-emerald-500" />
                                                    <span className="text-sm font-bold text-gray-700 uppercase">{log.performedBy?.role}</span>
                                                </div>
                                            </td>

                                            <td className="p-5 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${log.action?.includes('DELETE') ? 'bg-red-50 text-red-500' :
                                                        log.action?.includes('UPDATE') ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-600'
                                                        }`}>
                                                        {log.action?.replace('_', ' ')}
                                                    </span>
                                                    {/* Meta Preview like 'UrsSkill Partner' */}
                                                    <span className="text-[10px] text-gray-400 mt-1">{log.metadata?.name || log.metadata?.code || ""}</span>
                                                </div>
                                            </td>

                                            <td className="p-5 text-center">
                                                <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-500 uppercase">
                                                    <Box size={14} className="text-[#7C3AED]" />
                                                    {log.target?.entity}
                                                </div>
                                            </td>

                                            <td className="p-5 text-right">
                                                <div className="flex flex-col items-end text-gray-400 font-mono text-[11px]">
                                                    <span className="font-bold text-gray-600">{new Date(log.createdAt).toLocaleDateString('en-GB')}</span>
                                                    <span className="flex items-center gap-1">
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

                    {/* Footer matching total in image_137a43 */}
                    <div className="p-5 bg-gray-50/30 border-t border-gray-100 flex justify-center">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">
                            --- TOTAL {totalLogsCount} ACTIVITY RECORDS SHOWN ---
                        </span>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}