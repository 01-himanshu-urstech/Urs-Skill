"use client";
import { useState, useEffect } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import {
    Info, ShieldCheck, Zap,
    ArrowLeft, RefreshCw, Check, Calendar, ArrowRight, Mail
} from "lucide-react";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { useCreateCouponMutation } from "../../../redux/service/adminApi";

export default function AddCouponPage() {
    const router = useRouter();
    const [createCoupon, { isLoading }] = useCreateCouponMutation();
    const [activeTab, setActiveTab] = useState("information");
    const [error, setError] = useState("");

    // ✅ Precision Helper: Ensures time is always current and formatted for HTML5
    const getLiveDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    const [minDateTime, setMinDateTime] = useState(getLiveDateTime());

    // Sync min time every minute
    useEffect(() => {
        const timer = setInterval(() => setMinDateTime(getLiveDateTime()), 60000);
        return () => clearInterval(timer);
    }, []);

    const [formData, setFormData] = useState({
        name: "", description: "", code: "",
        validFrom: getLiveDateTime(),
        validTill: "",
        minCartAmount: 0, totalUsageLimit: 1, perUserUsageLimit: 1,
        allowedCustomers: "",
        discountType: "1", discountValue: 0
    });

    // ✅ FORCE TIME VALIDATION: Prevents selecting past time on current date
    const handleDateChange = (field, value) => {
        const selectedTime = new Date(value).getTime();
        const currentTime = new Date().getTime();

        if (selectedTime < currentTime) {
            // If user selects past time, force it to the current live time
            const now = getLiveDateTime();
            setFormData(prev => ({ ...prev, [field]: now }));
            setError("Past time is not allowed. Resetting to current time.");
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
            setError("");
        }
    };

    const handleUpdate = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError("");
    };

    const handleNext = (nextTab) => {
        if (activeTab === "information" && (!formData.name.trim() || !formData.code.trim())) {
            setError("Please fill Name and Code before proceeding.");
            return;
        }
        setActiveTab(nextTab);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.discountValue <= 0) {
            setError("Please set a discount value before publishing.");
            return;
        }

        const submissionData = {
            ...formData,
            allowedCustomers: formData.allowedCustomers
                ? formData.allowedCustomers.split(",").map(email => email.trim())
                : []
        };

        try {
            await createCoupon(submissionData).unwrap();
            router.push("/admin/coupons");
        } catch (err) {
            setError(err?.data?.message || "Creation failed");
        }
    };

    const generateCode = () => {
        if (!formData.name.trim()) {
            setError("Rule Name is required to generate a code.");
            return;
        }
        const prefix = formData.name.split(" ")[0].toUpperCase().replace(/[^A-Z0-9]/g, "");
        const randomStr = Math.random().toString(36).substring(2, 4).toUpperCase();
        handleUpdate('code', `${prefix}${randomStr}`);
    };

    return (
        <PermissionGuardian permissionId="coupons">
            <main className="min-h-screen bg-gray-50/50 p-3 sm:p-6 md:p-8 lg:p-10 overflow-x-hidden">
                <div className="w-full mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-8">
                    <div className="text-center sm:text-left">
                        <PageHeader title="Publish New Discount Rule" description="Configure campaign validity and target specific audiences." />
                        <div className="w-24 h-1.5 bg-indigo-600 rounded-full mt-4 mx-auto sm:mx-0" />
                    </div>
                    <button onClick={() => router.back()} className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-gray-500 hover:text-indigo-600 transition-all font-black uppercase text-[10px] tracking-widest shadow-sm">
                        <ArrowLeft size={16} /> Cancel Draft
                    </button>
                </div>

                <div className="w-full space-y-6">
                    {error && <div className="p-4 bg-red-50 border-2 border-red-100 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2">{error}</div>}

                    <div className="overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
                        <div className="inline-flex gap-2 p-1.5 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-500/5 min-w-full sm:min-w-max lg:w-fit">
                            <TabButton active={activeTab === "information"} onClick={() => setActiveTab("information")} icon={<Info size={18} />} label="1. Information" />
                            <TabButton active={activeTab === "conditions"} onClick={() => setActiveTab("conditions")} icon={<ShieldCheck size={18} />} label="2. Conditions" />
                            <TabButton active={activeTab === "actions"} onClick={() => setActiveTab("actions")} icon={<Zap size={18} />} label="3. Actions" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden">
                        <div className="p-5 sm:p-10 lg:p-16">
                            <div className="w-full">
                                {activeTab === "information" && (
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in duration-300">
                                        <div className="space-y-6 sm:space-y-8">
                                            <InputField label="Promotional Rule Name *" value={formData.name} onChange={(e) => handleUpdate('name', e.target.value)} required />
                                            <div className="flex flex-col sm:flex-row items-end gap-4">
                                                <div className="w-full"><InputField label="Public Coupon Code *" value={formData.code} onChange={(e) => handleUpdate('code', e.target.value.toUpperCase())} required /></div>
                                                <button type="button" onClick={generateCode} className="w-full sm:w-auto h-14 sm:h-16 px-10 bg-indigo-50 text-indigo-600 border-2 border-indigo-100 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all">Generate</button>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description ({formData.description.length}/120)</label>
                                            <textarea maxLength={120} rows={5} className="w-full p-6 sm:p-8 bg-gray-50/50 border-2 border-gray-100 rounded-[2rem] focus:outline-none focus:border-indigo-500 transition-all font-medium text-base leading-relaxed" value={formData.description} onChange={(e) => handleUpdate('description', e.target.value)} />
                                        </div>
                                    </div>
                                )}

                                {activeTab === "conditions" && (
                                    <div className="space-y-10 lg:space-y-12 animate-in fade-in duration-300">
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                                            <div className="space-y-4">
                                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Validity Window</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
                                                    <div className="relative w-full">
                                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                                        <input
                                                            min={minDateTime}
                                                            type="datetime-local"
                                                            className="w-full pl-12 pr-3 h-14 sm:h-16 bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-xs sm:text-sm focus:border-indigo-500 outline-none transition-all"
                                                            value={formData.validFrom}
                                                            onChange={(e) => handleDateChange('validFrom', e.target.value)}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-black text-gray-300 uppercase text-center">To</span>
                                                    <div className="relative w-full">
                                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                                        <input
                                                            min={formData.validFrom || minDateTime}
                                                            type="datetime-local"
                                                            className="w-full pl-12 pr-3 h-14 sm:h-16 bg-gray-50/50 border-2 border-gray-100 rounded-2xl font-bold text-xs sm:text-sm focus:border-indigo-500 outline-none transition-all"
                                                            value={formData.validTill}
                                                            onChange={(e) => handleDateChange('validTill', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <InputField label="Minimum Order Valuation (₹)" type="number" value={formData.minCartAmount} onChange={(e) => handleUpdate('minCartAmount', e.target.value)} />
                                        </div>

                                        <div className="pt-10 border-t border-gray-50">
                                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12 items-start">
                                                <div className="xl:col-span-2">
                                                    <InputField label="Allowed Customers (Optional)" placeholder="Enter emails separated by commas..." value={formData.allowedCustomers} onChange={(e) => handleUpdate('allowedCustomers', e.target.value)} />
                                                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-3 ml-1 flex items-center gap-1.5"><Mail size={10} /> Leave blank to allow all registered customers.</p>
                                                </div>
                                                <div className="grid grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
                                                    <InputField label="Global Quota" type="number" value={formData.totalUsageLimit} onChange={(e) => handleUpdate('totalUsageLimit', e.target.value)} />
                                                    <InputField label="User Limit" type="number" value={formData.perUserUsageLimit} onChange={(e) => handleUpdate('perUserUsageLimit', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "actions" && (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 animate-in fade-in duration-300">
                                        <div className="lg:col-span-2 space-y-6">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest block ml-1">Calculation Methodology</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                <RadioOption label="Percentage (%)" active={formData.discountType === "1"} onClick={() => handleUpdate('discountType', "1")} />
                                                <RadioOption label="Fixed Amount (₹)" active={formData.discountType === "2"} onClick={() => handleUpdate('discountType', "2")} />
                                            </div>
                                        </div>
                                        <InputField label={`Reward Value ${formData.discountType === "1" ? "(%)" : "(₹)"}`} type="number" value={formData.discountValue} onChange={(e) => handleUpdate('discountValue', e.target.value)} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 lg:p-12 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                {activeTab !== "information" && (
                                    <button type="button" onClick={() => setActiveTab(activeTab === "actions" ? "conditions" : "information")} className="w-full sm:w-auto px-10 py-4 sm:py-5 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-indigo-600 transition-all text-center">Back</button>
                                )}
                                {activeTab === "actions" ? (
                                    <button type="submit" disabled={isLoading} className="w-full sm:w-auto px-12 py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.2rem] sm:rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95">
                                        {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Check size={18} />} Securely Publish
                                    </button>
                                ) : (
                                    <button type="button" onClick={() => handleNext(activeTab === "information" ? "conditions" : "actions")} className="w-full sm:w-auto px-12 py-4 sm:py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.2rem] sm:rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95">
                                        Continue <ArrowRight size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </PermissionGuardian>
    );
}

/* Internal Components (Design maintained) */
const TabButton = ({ active, onClick, icon, label }) => (
    <button onClick={onClick} type="button" className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 rounded-[1.2rem] transition-all whitespace-nowrap ${active ? 'bg-indigo-600 text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:bg-gray-50'}`}>
        <span className="opacity-70">{icon}</span>
        <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest">{label}</span>
    </button>
);

const InputField = ({ label, onChange, ...props }) => (
    <div className="flex flex-col gap-2 sm:gap-3 w-full">
        <label className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <input {...props} onChange={onChange} className="w-full h-14 sm:h-16 px-5 sm:px-8 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-indigo-500 font-bold sm:font-black text-sm sm:text-lg transition-all" />
    </div>
);

const RadioOption = ({ label, active, onClick }) => (
    <button onClick={onClick} type="button" className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-[1.2rem] sm:rounded-[1.5rem] border-2 transition-all w-full ${active ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-gray-100 bg-white'}`}>
        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 flex items-center justify-center ${active ? 'border-indigo-600 bg-indigo-600 shadow-sm' : 'border-gray-200 bg-white'}`}>
            {active && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <span className={`text-[10px] sm:text-[12px] font-black uppercase tracking-wider ${active ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
    </button>
);