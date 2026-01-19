"use client";
import PageHeader from "../../../components/ui/PageHeader";
import { Download, Eye, CheckCircle2, XCircle, Clock, Loader2, Copy, Wallet } from "lucide-react";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { useGetTransactionsQuery } from "../../../redux/service/adminApi";

export default function TransactionListPage() {
    // ✅ Fetching the real data stream from your API
    const { data: response, isLoading } = useGetTransactionsQuery();
    const transactions = response?.data?.transactions || [];

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert("ID Copied to clipboard");
    };

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-[#7C3AED]" size={40} />
        </div>
    );

    return (
        <PermissionGuardian permissionId="transaction">
            <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden bg-gray-50/30 min-h-screen">
                <PageHeader
                    title="Transaction Ledger"
                    description={`Detailed audit for ${transactions.length} system transactions.`}
                    addButtonLabel="Export Data"
                    onAddClick={() => alert("Generating Report...")}
                />

                <div className="mt-6">
                    <div className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
                        <div className="overflow-x-auto no-scrollbar">
                            {/* Increased min-width to accommodate all new data fields */}
                            <div className="min-w-[1200px]">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                                        <tr>
                                            <th className="p-5 text-center w-16">S.No</th>
                                            <th className="p-5">Transaction & Gateway</th>
                                            <th className="p-5">Entity Links (IDs)</th>
                                            <th className="p-5">Pricing Audit</th>
                                            <th className="p-5">Status & Timeline</th>
                                            {/* <th className="p-5 text-center">Actions</th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {transactions.map((txn, index) => (
                                            <tr key={txn._id} className="hover:bg-gray-50/30 transition-colors group">
                                                {/* 1. Serial Number */}
                                                <td className="p-5 text-xs text-gray-300 font-bold text-center">
                                                    {String(index + 1).padStart(2, '0')}
                                                </td>

                                                {/* 2. Transaction ID & Gateway */}
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-black text-gray-800 font-mono tracking-tight">
                                                            {txn.transactionId}
                                                        </span>
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                                                            <Wallet size={12} /> {txn.paymentGateway}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* 3. Customer & Course IDs */}
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-1">
                                                        <button
                                                            onClick={() => handleCopy(txn.customerId)}
                                                            className="text-[10px] text-gray-400 hover:text-indigo-600 flex items-center gap-1 transition-colors uppercase font-bold"
                                                        >
                                                            User: {txn.customerId.slice(-6)}... <Copy size={10} />
                                                        </button>
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                                                            Course ID: {txn.courseId}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* 4. Pricing Details (Amount, Discount, Final) */}
                                                <td className="p-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-gray-900">₹{txn.finalAmount}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] text-gray-400 line-through">₹{txn.amount}</span>
                                                            {txn.couponCode && (
                                                                <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-black border border-emerald-100 uppercase">
                                                                    {txn.couponCode} (-₹{txn.discountAmount})
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* 5. Status & Date */}
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-2">
                                                        <StatusBadge status={txn.status} />
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                                            {new Date(txn.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* 6. Action Icons
                                                <td className="p-5 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all shadow-sm">
                                                            <Download size={18} />
                                                        </button>
                                                    </div>
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-4 text-center font-black uppercase tracking-[0.2em]">
                        All transactions are processed via secure end-to-end encryption
                    </p>
                </div>
            </main>
        </PermissionGuardian>
    );
}

// 🎨 Enhanced Status Badge
const StatusBadge = ({ status }) => {
    const config = {
        SUCCESS: { color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle2 },
        FAILED: { color: "text-red-500 bg-red-50 border-red-100", icon: XCircle },
        PENDING: { color: "text-amber-600 bg-amber-50 border-amber-100", icon: Clock }
    };

    const style = config[status?.toUpperCase()] || config.PENDING;
    const Icon = style.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black border uppercase tracking-wider ${style.color}`}>
            <Icon size={12} strokeWidth={3} />
            {status}
        </span>
    );
};