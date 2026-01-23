"use client";
import { useSelector } from "react-redux";
import { ShieldAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PermissionGuardian({ permissionId, children }) {
    const { user, isLoading } = useSelector((state) => state.auth || {});
    const router = useRouter();

    // 1. Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
                <p className="text-[10px]   text-gray-400 uppercase tracking-widest">Verifying Authorization...</p>
            </div>
        );
    }

    // 2. Role Bypass: Superadmins bypass all checks
    const isAuthorized = user?.role === "SUPERADMIN" || user?.permissions?.includes(permissionId);

    if (!isAuthorized) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center bg-white rounded-[3rem] border border-gray-100 shadow-xl m-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-6 border border-red-100">
                    <ShieldAlert size={40} />
                </div>
                <h1 className="text-xl   text-gray-800 uppercase tracking-tight mb-2">Access Denied</h1>
                <p className="text-gray-400 text-sm max-w-xs font-medium leading-relaxed">
                    Your account does not have permissions for the <span className="text-indigo-600 font-bold uppercase">{permissionId}</span> module.
                </p>
                <button
                    onClick={() => router.push("/")}
                    className="mt-8 px-10 py-4 bg-gray-900 text-white rounded-2xl   uppercase text-[10px] tracking-widest hover:bg-black transition-all active:scale-95"
                >
                    Back to Safety
                </button>
            </div>
        );
    }

    return <>{children}</>;
}