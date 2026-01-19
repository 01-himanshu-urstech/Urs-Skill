"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import {
    Ticket, Search, Trash2,
    RefreshCw, Loader2, Calendar, AlertTriangle, ShieldCheck
} from "lucide-react";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import {
    useGetCouponsQuery,
    useDeleteCouponMutation
} from "../../../redux/service/adminApi";

export default function CouponListPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: response, isLoading, isFetching, refetch } = useGetCouponsQuery();
    const [deleteCoupon] = useDeleteCouponMutation();

    const coupons = response?.data?.coupons || [];

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this rule?")) {
            try {
                await deleteCoupon(id).unwrap();
            } catch (err) {
                console.error("Deletion failed:", err);
            }
        }
    };

    const filteredCoupons = coupons.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PermissionGuardian permissionId="coupons">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30">
                <PageHeader
                    title="Discount Rules"
                    description="Live campaign monitoring based on system validity windows."
                    addButtonLabel="Create Coupon"
                    onAddClick={() => router.push("/coupon/add")}
                />

                <div className="mt-6 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full lg:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Filter by code or rule name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm transition-all"
                        />
                    </div>
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-600 border border-gray-100 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all"
                    >
                        <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
                        Sync Data
                    </button>
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-center w-20">Index</th>
                                    <th className="p-6">Rule Identity</th>
                                    <th className="p-6 text-center">Benefit</th>
                                    <th className="p-6 text-center">Current Status</th>
                                    <th className="p-6 text-center">Exhaustion</th>
                                    <th className="p-6">Expiry Window</th>
                                    {/* <th className="p-6 text-right pr-10">Action</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="7" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" size={40} /></td></tr>
                                ) : filteredCoupons.length === 0 ? (
                                    <tr><td colSpan="7" className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No Records Found</td></tr>
                                ) : (
                                    filteredCoupons.map((item, index) => {
                                        // ✅ DATE-BASED STATUS LOGIC
                                        const isExpired = new Date() > new Date(item.validTill);

                                        return (
                                            <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="p-6 text-center text-xs font-black text-gray-300">
                                                    {String(index + 1).padStart(2, '0')}
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex flex-col">
                                                        <span className={`text-sm font-black tracking-tight uppercase ${isExpired ? 'text-gray-400' : 'text-gray-800'}`}>
                                                            {item.name}
                                                        </span>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded w-fit mt-1 border ${isExpired
                                                            ? 'bg-gray-100 text-gray-400 border-gray-200'
                                                            : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                            }`}>
                                                            {item.code}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className={`p-6 text-center font-black text-sm ${isExpired ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {item.discountType === "1" ? `${item.discountValue}%` : `₹${item.discountValue}`}
                                                </td>

                                                {/* ✅ REMOVED TOGGLE - SHOWING STATUS LABELS ONLY */}
                                                <td className="p-6 text-center">
                                                    <div className="flex flex-col items-center gap-1">
                                                        {isExpired ? (
                                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-500 rounded-full border border-red-100">
                                                                <AlertTriangle size={12} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Expired</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                                                                <ShieldCheck size={12} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="p-6 text-center">
                                                    <span className={`text-[10px] font-black uppercase ${isExpired ? 'text-gray-300' : 'text-gray-500'}`}>
                                                        {item.usedCount} / {item.totalUsageLimit}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <div className={`flex items-center gap-2 text-[11px] font-black uppercase ${isExpired ? 'text-red-400' : 'text-gray-500'}`}>
                                                        <Calendar size={14} className={isExpired ? 'text-red-300' : 'text-gray-300'} />
                                                        {new Date(item.validTill).toLocaleDateString('en-GB')}
                                                    </div>
                                                </td>
                                                {/* <td className="p-6 text-right pr-10">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleDelete(item._id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td> */}
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}