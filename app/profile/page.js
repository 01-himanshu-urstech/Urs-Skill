"use client";
import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { User, Lock, Bell, Check } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <main className="p-4 sm:p-6 lg:p-8">
            <PageHeader
                title="Settings"
                description="Manage your account preferences and security settings."
            />

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Tab Navigation - Responsive */}
                <div className="flex flex-col sm:flex-row border-b border-gray-100 bg-gray-50/50 text-black">
                    <TabButton
                        active={activeTab === "profile"}
                        onClick={() => setActiveTab("profile")}
                        icon={<User size={18} />}
                        label="Profile"
                    />
                    <TabButton
                        active={activeTab === "security"}
                        onClick={() => setActiveTab("security")}
                        icon={<Lock size={18} />}
                        label="Security"
                    />
                    <TabButton
                        active={activeTab === "notifications"}
                        onClick={() => setActiveTab("notifications")}
                        icon={<Bell size={18} />}
                        label="Notifications"
                    />
                </div>

                {/* Content Area - Responsive */}
                <div className="p-4 sm:p-6 lg:p-8 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto">
                    {activeTab === "profile" ? (
                        <ProfileTab saved={saved} onSave={handleSave} />
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

//    TabButton
const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-3 hover:cursor-pointer sm:px-6 sm:py-4 text-sm font-semibold transition-all border-b-2 w-full sm:flex-1 ${active
            ? "border-primary text-primary bg-white shadow-sm"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
            }`}
    >
        {icon}
        <span className="whitespace-nowrap">{label}</span>
    </button>
);

//    Profile Tab
const ProfileTab = ({ saved, onSave }) => (
    <div className="space-y-5 sm:space-y-6">
        <InputField label="Admin Name" defaultValue="Ankit Sharma" />
        <InputField label="Email Address" defaultValue="ankit@ursskill.com" />
        <InputField label="Phone Number" defaultValue="+91 96613 29991" />
        <div className="pt-4 sm:pt-6">
            <button
                onClick={onSave}
                className="w-full sm:w-auto bg-[#7C3AED] hover:cursor-pointer hover:bg-[#7C3AED]/90 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm sm:text-base"
            >
                {saved ? (
                    <>
                        <Check size={16} className="animate-pulse sm:w-5 sm:h-5" />
                        Saved Successfully
                    </>
                ) : (
                    <>
                        <Check size={16} className="sm:w-5 sm:h-5" />
                        Save Changes
                    </>
                )}
            </button>
        </div>
    </div>
);

//    Security Tab
const SecurityTab = () => (
    <div className="space-y-5 sm:space-y-6">
        <InputField label="Current Password" type="password" placeholder="Enter current password" />
        <InputField label="New Password" type="password" placeholder="Enter new password" />
        <InputField label="Confirm New Password" type="password" placeholder="Confirm new password" />
        <div className="pt-4 sm:pt-6">
            <button className="w-full sm:w-auto bg-emerald-500 hover:cursor-pointer hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm sm:text-base">
                <Lock size={16} className="sm:w-5 sm:h-5" />
                Update Password
            </button>
        </div>
    </div>
);

//    Notifications Tab
const NotificationsTab = () => (
    <div className="space-y-5 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
            {/* Each toggle now works independently */}
            <NotificationToggle label="Email Notifications" id="email_notif" />
            <NotificationToggle label="Push Notifications" id="push_notif" />
            <NotificationToggle label="Marketing Emails" id="market_notif" />
        </div>
        <div className="pt-4 sm:pt-6">
            <button className="w-full sm:w-auto bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md text-sm sm:text-base">
                Save Notification Settings
            </button>
        </div>
    </div>
);

//    Notification Toggle
const NotificationToggle = ({ label, id }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <label
            htmlFor={id}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 border-dashed transition-all group select-none cursor-pointer ${isChecked ? "bg-[#7C3AED]/5 border-[#7C3AED]/40" : "bg-gray-50 border-gray-200 hover:border-[#7C3AED]/30"
                }`}
        >
            <div className="relative flex items-center justify-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="sr-only"
                />
                {/* Visual Checkbox */}
                <div className={`w-6 h-6 sm:w-5 sm:h-5 rounded-lg border-2 transition-all flex items-center justify-center ${isChecked ? "bg-[#7C3AED] border-[#7C3AED]" : "bg-white border-gray-300 group-hover:border-[#7C3AED]/50"
                    }`}>
                    {isChecked && <Check size={14} className="text-white stroke-[4]" />}
                </div>
            </div>
            <span className={`text-sm font-medium leading-tight flex-1 transition-colors ${isChecked ? "text-[#7C3AED]" : "text-gray-700"
                }`}>
                {label}
            </span>
        </label>
    );
};

//    Updated InputField with black text and dark gray placeholder
const InputField = ({ label, ...props }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <input
            {...props}
            className="w-full px-3 sm:px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-black placeholder-gray-600 h-12 shadow-sm font-medium"
        />
    </div>
);