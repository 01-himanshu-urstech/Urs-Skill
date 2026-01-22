"use client";
import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import {
    Download, Eye, CheckCircle2, XCircle, Clock,
    Loader2, Copy, Wallet, ChevronLeft, ChevronRight, Search, Inbox, Filter, Ticket, UserCheck
} from "lucide-react";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { useGetTransactionsQuery } from "../../../redux/service/adminApi";
import ExportButton from "../../../components/ui/ExportButton";

const courseMapping = {
    "1": "Full Stack Development",
    "2": "Business Administration",
};

export default function TransactionListPage() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [courseFilter, setCourseFilter] = useState("ALL");
    const [couponFilter, setCouponFilter] = useState("ALL");
    const limit = 10;

    const { data: response, isLoading, isFetching } = useGetTransactionsQuery();
    const allTransactions = response?.data?.transactions || [];

    // 1. Extract Unique Coupons for dropdown
    const availableCoupons = useMemo(() => {
        const coupons = allTransactions
            .map(txn => txn.couponCode)
            .filter(code => code && code !== "");
        return [...new Set(coupons)];
    }, [allTransactions]);

    // 2. Enhanced Filtering Logic
    const { displayTransactions, totalRecords, filteredAll } = useMemo(() => {
        let filtered = allTransactions.filter(txn => {
            const matchesSearch =
                txn.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                txn.paymentGateway?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                txn.referredBy?.name?.toLowerCase().includes(searchTerm.toLowerCase());

            const courseName = courseMapping[txn.courseId] || "Unknown Course";
            const matchesCourse = courseFilter === "ALL" || courseName === courseFilter;
            const matchesCoupon = couponFilter === "ALL" || txn.couponCode === couponFilter;

            return matchesSearch && matchesCourse && matchesCoupon;
        });

        const total = filtered.length;
        const startIndex = (page - 1) * limit;
        const sliced = filtered.slice(startIndex, startIndex + limit);

        return { displayTransactions: sliced, totalRecords: total, filteredAll: filtered };
    }, [allTransactions, searchTerm, courseFilter, couponFilter, page]);

    // 3. Updated CSV Data to include Referral Info
    const csvData = useMemo(() => {
        return filteredAll.map((txn, index) => ({
            "S.No": index + 1,
            "Date": new Date(txn.createdAt).toLocaleString('en-IN'),
            "Transaction ID": txn.transactionId,
            "Customer Name": txn.customerId?.name || "N/A",
            "Customer Email": txn.customerId?.email || "N/A",
            "Referred By (Admin)": txn.referredBy ? txn.referredBy.name : "Direct/Organic",
            "Referrer Email": txn.referredBy ? txn.referredBy.email : "N/A",
            "Course Name": courseMapping[txn.courseId] || `ID: ${txn.courseId}`,
            "Coupon Code": txn.couponCode || "None",
            "Base Amount": txn.amount,
            "Discount": txn.discountAmount,
            "Final Amount": txn.finalAmount,
            "Status": txn.status
        }));
    }, [filteredAll]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    useEffect(() => {
        setPage(1);
    }, [searchTerm, courseFilter, couponFilter]);

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
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <PageHeader
                        title="Transaction Ledger"
                        description={`Detailed audit for ${totalRecords} system transactions.`}
                        showExport={false}
                    />
                    <div className="flex-shrink-0">
                        <ExportButton
                            data={csvData}
                            filename="transaction_ledger"
                            isLoading={isLoading}
                        />
                    </div>
                </div>

                {/* FILTER TOOLBAR */}
                <div className="mt-6 mb-6 flex flex-wrap gap-4 items-center">
                    <div className="relative flex-1 min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search ID, Gateway or Admin Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-black w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                        />
                    </div>

                    <div className="relative min-w-[200px]">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={courseFilter}
                            onChange={(e) => setCourseFilter(e.target.value)}
                            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm font-bold text-sm text-gray-600 appearance-none cursor-pointer"
                        >
                            <option value="ALL">All Courses</option>
                            {Object.values(courseMapping).map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative min-w-[180px]">
                        <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-4 h-4" />
                        <select
                            value={couponFilter}
                            onChange={(e) => setCouponFilter(e.target.value)}
                            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm font-bold text-sm text-gray-600 appearance-none cursor-pointer"
                        >
                            <option value="ALL">All Coupons</option>
                            {availableCoupons.map(code => (
                                <option key={code} value={code}>{code}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* TABLE SECTION */}
                <div className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="min-w-[1200px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                                    <tr>
                                        <th className="p-5 text-center w-16">S.No</th>
                                        <th className="p-5">Transaction & Gateway</th>
                                        <th className="p-5">Entity Links (IDs)</th>
                                        <th className="p-5">Referral Source</th>
                                        <th className="p-5">Pricing Audit</th>
                                        <th className="p-5 text-center">Status & Timeline</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {displayTransactions.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-20 text-center">
                                                <div className="flex flex-col items-center gap-3 text-gray-400">
                                                    <Inbox size={48} className="opacity-20" />
                                                    <p className="text-xs font-black uppercase tracking-widest">No matching results found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        displayTransactions.map((txn, index) => (
                                            <tr key={txn._id} className="hover:bg-gray-50/30 transition-colors group">
                                                <td className="p-5 text-center text-xs font-black text-gray-300">
                                                    {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm font-black text-gray-800 font-mono tracking-tight">{txn.transactionId}</span>
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                                                            <Wallet size={12} /> {txn.paymentGateway}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-1">
                                                        <button onClick={() => handleCopy(txn.customerId?._id || txn.customerId)} className="text-[10px] text-gray-400 hover:cursor-pointer hover:text-indigo-600 flex items-center gap-1 transition-colors uppercase font-bold">
                                                           {txn.customerId?.name || 'User'}: {String(txn.customerId?._id || txn.customerId || "").slice(-6)}... <Copy size={10} />
                                                        </button>
                                                        <span className="text-[10px] text-indigo-600 font-black uppercase tracking-tight">
                                                            {courseMapping[txn.courseId] || `ID: ${txn.courseId}`}
                                                        </span>
                                                    </div>
                                                </td>
                                                {/* NEW REFERRAL SOURCE COLUMN */}
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-0.5">
                                                        {txn.referredBy ? (
                                                            <>
                                                                <div className="flex items-center gap-1 text-[9px] font-black text-amber-500 uppercase tracking-tighter">
                                                                    <UserCheck size={12} /> Referral
                                                                </div>
                                                                <span className="text-xs font-bold text-gray-700">{txn.referredBy.name}</span>
                                                                <span className="text-[9px] text-gray-400 font-medium">{txn.referredBy.email}</span>
                                                            </>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-300 font-bold uppercase italic tracking-widest">Organic</span>
                                                        )}
                                                    </div>
                                                </td>
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
                                                <td className="p-5 text-center">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <StatusBadge status={txn.status} />
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                                            {new Date(txn.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
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

                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-indigo-400 uppercase">Showing {displayTransactions.length} of {totalRecords} Records</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1 || isFetching} className="p-2 bg-white border hover:cursor-pointer border-gray-300 rounded-xl disabled:opacity-30 hover:bg-gray-150 shadow-sm transition-all active:scale-90">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages || isFetching} className="p-2 bg-white border hover:cursor-pointer border-gray-300 rounded-xl disabled:opacity-30 hover:bg-gray-150 shadow-sm transition-all active:scale-90">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}

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