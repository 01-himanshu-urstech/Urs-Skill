/* eslint-disable react/jsx-no-undef */
"use client";
import { useState } from "react";
import { useGetAdminProfileQuery } from "../../redux/service/adminApi";
import PageHeader from "../../components/ui/PageHeader";
import { User, Lock, Bell, Loader2, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    
    //   Data fetching from /me endpoint
    const { data: admin, isLoading, isError } = useGetAdminProfileQuery();

    if (isLoading) return (
        <div className="flex h-96 items-center justify-center">
            <Loader2 className="animate-spin text-[#7C3AED]" size={40} />
        </div>
    );

    if (isError) return <div className="p-8 text-red-500">Failed to load profile. Please login again.</div>;

    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <PageHeader
                title="Settings"
                description="View your account details and role permissions."
            />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex flex-col sm:flex-row border-b border-gray-100 bg-gray-50/50">
                    <TabButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={<User size={18} />} label="Profile" />
                    {/* <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} icon={<Lock size={18} />} label="Security" />
                    <TabButton active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} icon={<Bell size={18} />} label="Notifications" /> */}
                </div>

                <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
                    {activeTab === "profile" ? (
                        <div className="space-y-6">
                            {/* Displaying Data from image_1b5252.png */}
                            <InputField label="Admin Name" value={admin?.name} />
                            <InputField label="Email Address" value={admin?.email} />
                            
                            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                                <ShieldCheck className="text-[#7C3AED]" size={20} />
                                <div>
                                    <p className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">Account Role</p>
                                    <p className="text-sm font-bold text-gray-900">{admin?.role}</p>
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-400 italic">
                                Account created on: {new Date(admin?.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ) : activeTab === "security" ? (
                        <SecurityTab />
                    ) : (
                        <NotificationsTab />
                    )}
                </div>
            </div>
        </main>
    );
}

// Updated InputField for Display
const InputField = ({ label, value }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-black text-sm font-medium h-12 flex items-center">
            {value || "Loading..."}
        </div>
    </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 w-full sm:flex-1 cursor-pointer ${
            active ? "border-[#7C3AED] text-[#7C3AED] bg-white" : "border-transparent text-gray-500 hover:text-gray-700"
        }`}
    >
        {icon} <span>{label}</span>
    </button>
);