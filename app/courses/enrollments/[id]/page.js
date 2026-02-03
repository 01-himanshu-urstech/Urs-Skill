"use client";
import { useState, useMemo, useEffect, React } from "react";
import PageHeader from "../../../../components/ui/PageHeader";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
import {
    CheckCircle2, Loader2, Inbox, Mail, ChevronLeft, ChevronRight, Calendar, Ticket, FilterX
} from "lucide-react";
import { useGetTransactionsQuery } from "../../../../redux/service/adminApi";

export default function CourseEnrollmentsPage({ params }) {
    const [resolvedParams, setResolvedParams] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState("ALL");
    const [selectedCoupon, setSelectedCoupon] = useState("ALL");
    const limit = 10;

    const { data: response, isLoading, isFetching } = useGetTransactionsQuery();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        Promise.resolve(params).then(setResolvedParams);
    }, [params]);

    const targetId = resolvedParams?.id;

    //   Combined Logic: Filtering SUCCESS, Date, Coupon, and Pagination
    const { displayEnrollments, totalRecords, availableCoupons } = useMemo(() => {
        const allTxns = response?.data?.transactions || [];

        // Base Filtering
        const filtered = allTxns.filter(txn => {
            const matchesCourse = String(txn.courseId).trim() === String(targetId).trim();
            const isSuccess = txn.status === "SUCCESS";
            const txnDate = new Date(txn.createdAt);
            const matchesYear = txnDate.getFullYear().toString() === selectedYear;
            const matchesMonth = selectedMonth === "ALL" || txnDate.getMonth().toString() === selectedMonth;
            const matchesCoupon = selectedCoupon === "ALL" || txn.couponCode === selectedCoupon;

            return matchesCourse && isSuccess && matchesYear && matchesMonth && matchesCoupon;
        });

        const coupons = [...new Set(allTxns.filter(t => String(t.courseId) === String(targetId) && t.couponCode).map(t => t.couponCode))];
        const startIndex = (page - 1) * limit;

        return {
            displayEnrollments: filtered.slice(startIndex, startIndex + limit),
            totalRecords: filtered.length,
            availableCoupons: coupons
        };
    }, [response, targetId, selectedYear, selectedMonth, selectedCoupon, page]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    if (!mounted || !resolvedParams) return null;

    return (
        <PermissionGuardian permissionId="courses">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden text-black">
                <PageHeader title="Course Analytics" description={`Successful enrollments for Course: ${targetId}`} showBackButton={true} />

                {/*   Fully Responsive Filter Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                    <FilterDropdown label="Year" value={selectedYear} onChange={setSelectedYear} options={[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(String)} />
                    <FilterDropdown label="Month" value={selectedMonth} onChange={setSelectedMonth} options={["ALL", ...Array.from({ length: 12 }, (_, i) => i.toString())]} monthLabels />
                    <FilterDropdown label="Coupon" value={selectedCoupon} onChange={setSelectedCoupon} options={["ALL", ...availableCoupons]} />
                    <div className="flex items-end">
                        <button onClick={() => { setSelectedMonth("ALL"); setSelectedCoupon("ALL"); }} className="w-full py-3 bg-red-50 text-red-600 rounded-xl   text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-100 border border-red-100 transition-all"><FilterX size={14} /> Reset</button>
                    </div>
                </div>

                <div className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mt-8 mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px]   uppercase tracking-widest text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-5 text-center w-20">S.No</th>
                                    <th className="p-5">Student Info</th>
                                    <th className="p-5">Offer / Coupon</th>
                                    <th className="p-5">Investment</th>
                                    <th className="p-5 text-center">Payment</th>
                                    <th className="p-5">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="6" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" /></td></tr>
                                ) : displayEnrollments.length === 0 ? (
                                    <tr><td colSpan="6" className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs"><Inbox size={48} className="mx-auto mb-2 opacity-20" /> No Successful Records</td></tr>
                                ) : (
                                    displayEnrollments.map((txn, index) => (
                                        <tr key={txn._id} className="hover:bg-gray-50/30 transition-colors group">
                                            <td className="p-5 text-center text-xs   text-gray-300">{String((page - 1) * limit + index + 1).padStart(2, '0')}</td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center   text-xs border border-indigo-100">{txn.customerId?.name?.slice(0, 2).toUpperCase()}</div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm   text-gray-800 tracking-tight">{txn.customerId?.name}</span>
                                                        <span className="text-[9px] text-gray-400 font-bold flex items-center gap-1"><Mail size={10} /> {txn.customerId?.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">{txn.couponCode ? <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px]   border border-blue-100 uppercase">{txn.couponCode}</span> : <span className="text-gray-300 text-[10px] font-bold italic">N/A</span>}</td>
                                            <td className="p-5"><span className="text-sm   text-gray-900">₹{txn.finalAmount}</span></td>
                                            <td className="p-5 text-center"><span className="px-3 py-1 rounded-lg text-[9px]   border uppercase tracking-wider bg-emerald-50 text-emerald-600 border-emerald-100">PAID</span></td>
                                            <td className="p-5">
                                                <div className="flex flex-col">
                                                    <span className="text-xs   text-gray-700">{new Date(txn.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                                                    <span className="text-[9px] text-gray-400 font-bold">{new Date(txn.createdAt).getFullYear()}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/*   Standard Pagination Footer */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px] uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-indigo-400 uppercase">Showing {displayEnrollments.length} of {totalRecords} Verified Students</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 active:scale-90 transition-all"><ChevronLeft size={18} /></button>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-2 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 active:scale-90 transition-all"><ChevronRight size={18} /></button>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}

// 🎨 Utility Component for Filters
const FilterDropdown = ({ label, value, onChange, options, monthLabels }) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <div className="relative">
            <label className="text-[9px]   uppercase text-gray-400 ml-1 mb-1 block">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-sm appearance-none text-black cursor-pointer"
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>
                        {/*   Fix: Check if it's 'ALL' and then show relevant label based on the dropdown 'label' prop */}
                        {opt === "ALL"
                            ? (label === "Month" ? "All Months" : "All Coupons")
                            : (monthLabels ? months[parseInt(opt)] : opt)
                        }
                    </option>
                ))}
            </select>

            {/* Custom Arrow Icon */}
            <div className="absolute right-4 top-[34px] pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};