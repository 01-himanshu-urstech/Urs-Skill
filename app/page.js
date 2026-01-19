"use client"; //
import { useState, useEffect } from "react";
import StatsGrid from "./dashboard/StatsGrid";
import PageHeader from "../components/ui/PageHeader";
import { ArrowUpRight, Zap, Clock } from "lucide-react";

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // ✅ Live Clock Effect: Updates every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
      <PageHeader
        title="System Overview"
        description="Live insights aggregated from all platform modules."
      />

      {/* Live Stats Component */}
      <StatsGrid />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Quick Actions Card */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Zap size={20} />
              </div>
              <h3 className="font-black text-gray-800 uppercase tracking-tight text-sm">Shortcut Management</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickActionLink title="Create New Blog" href="/blog/create" color="text-orange-500" />
            <QuickActionLink title="Launch Coupon Rule" href="/coupon/add" color="text-purple-500" />
            <QuickActionLink title="Update Home Banners" href="/banners" color="text-blue-500" />
            <QuickActionLink title="Review Customers" href="/customer/list" color="text-emerald-500" />
          </div>
        </div>

        {/* System Status Card */}
        <div className="bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200/50 flex flex-col justify-between">
          <div>
            <h3 className="font-black uppercase tracking-[2px] text-xs opacity-70 mb-6">Database Health</h3>
            <div className="space-y-6">
              <HealthItem label="API Connectivity" status="Stable" />
              <HealthItem label="Cloudinary Sync" status="Active" />
              <HealthItem label="User Authentication" status="Secure" />
            </div>
          </div>

          {/* ✅ Real-time Clock Section */}
          <div className="mt-10 p-5 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Clock size={80} />
            </div>

            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              Live System Time
            </p>

            {/* tabular-nums ensures the width doesn't jump as seconds change */}
            <p className="text-2xl font-black tracking-tighter tabular-nums">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              })}
            </p>

            <p className="text-[9px] font-bold opacity-60 uppercase mt-1">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function QuickActionLink({ title, href, color }) {
  return (
    <a href={href} className="group flex items-center justify-between p-5 bg-gray-50/50 hover:bg-white rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300">
      <span className={`text-[11px] font-black uppercase tracking-widest ${color}`}>{title}</span>
      <ArrowUpRight size={18} className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
    </a>
  );
}

function HealthItem({ label, status }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold opacity-90">{label}</span>
      <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        {status}
      </span>
    </div>
  );
}