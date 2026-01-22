"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../components/ui/PageHeader";
import {
    Search,Edit2, Trash2, RefreshCw, Loader2, Calendar,
    AlertTriangle, ShieldCheck, ChevronLeft, ChevronRight, Filter, UserCheck
} from "lucide-react";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { useGetCouponsQuery, useDeleteCouponMutation } from "../../../redux/service/adminApi";


export default function CouponListPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const limit = 10;

    // Fetch coupons with filters
    const { data: response, isLoading, isFetching, refetch } = useGetCouponsQuery({
        page,
        limit,
        search: searchTerm.length >= 2 ? searchTerm : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
    });

    const [deleteCoupon] = useDeleteCouponMutation();
    
    const allCoupons = response?.data?.coupons || [];
    const totalRecords = response?.data?.total || 0;
    const totalPages = Math.ceil(totalRecords / limit) || 1;

    // Reset to page 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [searchTerm, statusFilter]);

    const handleDelete = async (id) => {
        if (window.confirm("Permanently remove this discount rule? This will stop all future referrals for this code.")) {
            try {
                await deleteCoupon(id).unwrap();
            } catch (err) {
                console.error("Deletion failed:", err);
            }
        }
    };

    if (!mounted) return null;

    return (
        <PermissionGuardian permissionId="coupons">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30">
                <PageHeader
                    title="Discount Rules"
                    description="Live campaign monitoring and referral assignments."
                    addButtonLabel="Create Coupon"
                    onAddClick={() => router.push("/coupon/add")}
                />

                {/* Filters Section */}
                <div className="mt-6 mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-1 w-full gap-4">
                        <div className="relative flex-1 lg:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search code, rule or sub-admin..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="text-black w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm font-bold text-sm focus:ring-4 focus:ring-indigo-500/5 transition-all"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="text-black pl-10 pr-8 py-4 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm font-bold text-sm appearance-none min-w-[150px] cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="ACTIVE">Active Only</option>
                                <option value="EXPIRED">Expired Only</option>
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-600 border border-gray-100 rounded-2xl hover:cursor-pointer font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all active:scale-95"
                    >
                        <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} /> Sync Data
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="min-w-[1100px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-[2px] text-gray-400 border-b border-gray-100">
                                    <tr>
                                        <th className="p-6 text-center w-20">Index</th>
                                        <th className="p-6">Rule Identity</th>
                                        <th className="p-6">Assigned Representative</th>
                                        <th className="p-6 text-center">Benefit</th>
                                        <th className="p-6 text-center">Current Status</th>
                                        <th className="p-6 text-center">Usage</th>
                                        <th className="p-6">Expiry Window</th>
                                        <th className="p-6 text-right pr-10">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        <tr><td colSpan="8" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-indigo-600" size={40} /></td></tr>
                                    ) : allCoupons.length === 0 ? (
                                        <tr><td colSpan="8" className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">No Records Found</td></tr>
                                    ) : (
                                        allCoupons.map((item, index) => {
                                            const isExpired = new Date() > new Date(item.validTill);
                                            return (
                                                <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="p-6 text-center text-xs font-black text-gray-300">
                                                        {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="flex flex-col">
                                                            <span className={`text-sm font-black tracking-tight uppercase ${isExpired ? 'text-gray-400' : 'text-gray-800'}`}>{item.name}</span>
                                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded w-fit mt-1 border ${isExpired ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                                                                {item.code}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* FIXED: Assigned Representative Cell */}
<td className="p-6">
    {/* Use assignedSubAdmins[0] because the API returns an array */}
    {item.assignedSubAdmins && item.assignedSubAdmins.length > 0 ? (
        <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 uppercase tracking-tighter">
                <UserCheck size={12} /> Assigned
            </div>
            <span className="text-xs font-bold text-gray-700">
                {item.assignedSubAdmins[0].name}
            </span>
            <span className="text-[9px] text-gray-400 font-medium">
                {item.assignedSubAdmins[0].email}
            </span>
        </div>
    ) : (
        <div className="flex flex-col">
             <span className="text-[10px] text-gray-300 font-bold uppercase italic tracking-widest text-center">Public/Organic</span>
        </div>
    )}
</td>

                                                    <td className={`p-6 text-center font-black text-sm ${isExpired ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        {item.discountType === "1" ? `${item.discountValue}%` : `₹${item.discountValue}`}
                                                    </td>
                                                    <td className="p-6 text-center">
    <div className="flex justify-center">
        {/* Check for Date Expiry FIRST, then check for Manual Inactive Status */}
        {isExpired ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-500 rounded-full border border-red-100">
                <AlertTriangle size={12} /><span className="text-[10px] font-black uppercase tracking-widest">Expired</span>
            </div>
        ) : item.status === "INACTIVE" ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 rounded-full border border-gray-200">
                <AlertTriangle size={12} /><span className="text-[10px] font-black uppercase tracking-widest">Inactive</span>
            </div>
        ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                <ShieldCheck size={12} /><span className="text-[10px] font-black uppercase tracking-widest">Active</span>
            </div>
        )}
    </div>
</td>
                                                    <td className="p-6 text-center text-[10px] font-black uppercase text-gray-500">
                                                        {item.usedCount} / {item.totalUsageLimit}
                                                    </td>
                                                    <td className="p-6 text-[11px] font-black uppercase text-gray-500">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={14} className="text-gray-300" />
                                                            {new Date(item.validTill).toLocaleDateString('en-GB')}
                                                        </div>
                                                    </td>
                                                    <td className="p-6 text-right pr-10">
                                                        <div className="flex justify-end gap-2">
                                                            <button 
                                                                onClick={() => router.push(`/coupon/edit/${item._id}`)} 
                                                                className="p-2 text-indigo-400 hover:bg-indigo-50 rounded-xl hover:cursor-pointer transition-all border border-transparent hover:border-indigo-100"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(item._id)} 
                                                                className="p-2 text-red-400 hover:bg-red-50 rounded-xl hover:cursor-pointer transition-all border border-transparent hover:border-red-100"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-indigo-400 uppercase">Showing {allCoupons.length} of {totalRecords} Records</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 bg-white border border-gray-200 hover:cursor-pointer rounded-xl disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all"><ChevronLeft size={18} /></button>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-2 bg-white border border-gray-200 hover:cursor-pointer rounded-xl disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all"><ChevronRight size={18} /></button>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}