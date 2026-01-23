/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    ChevronLeft, Save, Loader2, Info,
    Calendar, Percent, IndianRupee, Tag
} from "lucide-react";
import {
    useGetCouponByIdQuery,
    useUpdateCouponMutation
} from "../../../../redux/service/adminApi";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";

export default function EditCouponPage() {
    const router = useRouter();
    const { id } = useParams();

    // API Hooks
    const { data: response, isLoading: isFetching } = useGetCouponByIdQuery(id);
    const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        discountType: "1",
        discountValue: "",
        minCartAmount: "",
        totalUsageLimit: "",
        validTill: "",
        status: "ACTIVE"
    });
    console.log("Submitting data:", formData);


    // Populate form when data arrives
    useEffect(() => {
        if (response?.data?.coupon) {
            const coupon = response.data.coupon;
            setFormData({
                name: coupon.name || "",
                description: coupon.description || "",
                discountType: coupon.discountType || "1",
                discountValue: coupon.discountValue || "",
                minCartAmount: coupon.minCartAmount || "",
                totalUsageLimit: coupon.totalUsageLimit || "",
                validTill: coupon.validTill ? new Date(coupon.validTill).toISOString().split('T')[0] : "",
                status: coupon.status || "ACTIVE"
            });
        }
    }, [response]);

const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
        id: id, // <--- Add this line to include the ID from useParams()
        ...formData,
        discountType: Number(formData.discountType),
        discountValue: Number(formData.discountValue),
        minCartAmount: Number(formData.minCartAmount),
        totalUsageLimit: Number(formData.totalUsageLimit),
    };

    try {
        // This now sends { id: "actual-id", name: "...", etc }
        await updateCoupon(finalData).unwrap(); 
        router.push("/coupon/list");
    } catch (err) {
        console.error("Update failed:", err);
    }
};

    if (isFetching) return (
        <div className="h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
        </div>
    );

    return (
        <PermissionGuardian permissionId="coupons">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors hover:cursor-pointer"
                    >
                        <div className="p-2 rounded-xl bg-white border border-gray-100 group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all">
                            <ChevronLeft size={20} />
                        </div>
                        {/* <span className="text-[10px]   uppercase tracking-[2px]">Back to Rules</span> */}
                    </button>

                    <div className="text-right">
                        <h1 className="text-2xl   text-gray-800 tracking-tight uppercase">Update Rule</h1>
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">
                            Modifying: {response?.data?.coupon?.code}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                    {/* Main Rule Config Card */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                                <Tag size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm   text-gray-800 uppercase tracking-tight">General Information</h3>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Base settings for this discount</p>
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px]   text-gray-400 uppercase tracking-widest ml-1">Coupon Rule Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="text-black w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 transition-all font-bold text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px]   text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="text-black w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 transition-all font-bold text-sm appearance-none cursor-pointer"
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px]   text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="text-black w-full px-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-200 transition-all font-bold text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Benefit & Limits Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Percent className="text-indigo-600" size={20} />
                                <h3 className="text-sm   text-gray-800 uppercase">Discount Logic</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px]   text-gray-400 uppercase tracking-widest">Type</label>
                                    <div className="flex gap-2 mt-2">
                                        {["1", "2"].map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, discountType: t })}
                                                className={`flex-1 py-3 rounded-xl text-[10px]   uppercase transition-all border ${formData.discountType === t
                                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100"
                                                    : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {t === "1" ? "Percentage" : "Fixed Amount"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <label className="text-[10px]   text-gray-400 uppercase tracking-widest">Value</label>
                                    <div className="relative mt-2">
                                        <input
                                            type="number"
                                            value={formData.discountValue}
                                            onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                            className="text-black w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl font-bold text-sm"
                                        />
                                        {formData.discountType === "1" ? (
                                            <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        ) : (
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar className="text-indigo-600" size={20} />
                                <h3 className="text-sm   text-gray-800 uppercase">Constraints</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px]   text-gray-400 uppercase tracking-widest">Valid Till</label>
                                    <input
                                        type="date"
                                        value={formData.validTill}
                                        onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                                        className="text-black w-full px-5 py-4 mt-2 bg-gray-50/50 border border-gray-100 rounded-2xl font-bold text-sm outline-none focus:bg-white transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px]   text-gray-400 uppercase tracking-widest">Total Usage Cap</label>
                                    <input
                                        type="number"
                                        value={formData.totalUsageLimit}
                                        onChange={(e) => setFormData({ ...formData, totalUsageLimit: e.target.value })}
                                        className="text-black w-full px-5 py-4 mt-2 bg-gray-50/50 border border-gray-100 rounded-2xl font-bold text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between p-8 bg-indigo-900 rounded-[2rem] shadow-2xl shadow-indigo-200">
                        <div className="hidden sm:flex items-center gap-3 text-indigo-200/50">
                            <Info size={20} />
                            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                Changes will be logged <br /> for audit purposes.
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full sm:w-auto px-10 py-5 bg-white hover:bg-indigo-50 text-indigo-900 rounded-2xl   uppercase tracking-[2px] text-xs flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 hover:cursor-pointer"
                        >
                            {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            Commit Changes
                        </button>
                    </div>
                </form>
            </main>
        </PermissionGuardian>
    );
}