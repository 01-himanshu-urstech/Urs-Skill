"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PageHeader from "../../../../components/ui/PageHeader";
import { Shield, Check, Save, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { useGetAdminByIdQuery, useUpdateAdminByIdMutation } from "../../../../redux/service/adminApi";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";

//    IDs match your database permission strings exactly
const MODULES = [
    { id: 'admin', label: 'Admin Management' },
    { id: 'customers', label: 'Customer Records' },
    { id: 'courses', label: 'Course Content' },      // New
    { id: 'transaction', label: 'Transactions' },    // New
    { id: 'General', label: 'General' },
    { id: 'coupons', label: 'Coupon Management' },
    { id: 'Enquiry', label: 'Enquiry' },
    { id: 'logs', label: 'System Logs' }             // New
];

export default function EditAdminPermissions() {
    const { id } = useParams();
    const router = useRouter();

    //    Fetching data from RTK Query
    const { data: adminData, isLoading, isError } = useGetAdminByIdQuery(id);
    const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminByIdMutation();

    const [role, setRole] = useState("SUBADMIN");
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    //    FIXED: Extract admin from nested data based on Postman structure
    const currentAdmin = adminData?.data?.admin;

    useEffect(() => {
        if (currentAdmin) {
            setRole(currentAdmin.role || "SUBADMIN");
            setSelectedPermissions(currentAdmin.permissions || []);
        }
    }, [currentAdmin]);

    const togglePermission = (moduleId) => {
        if (role === "SUPERADMIN") return; // Superadmins bypass permission checks
        setSelectedPermissions(prev =>
            prev.includes(moduleId) ? prev.filter(i => i !== moduleId) : [...prev, moduleId]
        );
    };

    const handleSave = async () => {
        try {
            await updateAdmin({
                id,
                role,
                // If upgraded to Superadmin, grant all modules automatically
                permissions: role === "SUPERADMIN" ? MODULES.map(m => m.id) : selectedPermissions
            }).unwrap();
            router.push("/admin/list");
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <p className="text-[10px]      text-gray-400 uppercase tracking-widest">Loading Admin Profile...</p>
        </div>
    );

    if (isError || !currentAdmin) return (
        <div className="p-10 text-center text-red-500 font-bold uppercase tracking-widest">
            <AlertCircle className="mx-auto mb-4" size={40} />
            Administrator not found
        </div>
    );

    return (
        <main className="p-4 sm:p-8 bg-gray-50/30 min-h-screen">
            <PermissionGuardian permissionId="admins">

                {/*    FIXED: Name and Role extraction from currentAdmin */}
                <PageHeader
                    title={`Permissions: ${currentAdmin?.name}`}
                    description={`Current Role: ${currentAdmin?.role} | Update access levels for this staff member.`}
                />

                <div className="max-w-4xl mt-10 space-y-6 pb-20">
                    {/*    ROLE SELECTION CARD */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <label className="text-[10px]      text-gray-400 uppercase tracking-widest block mb-4 ml-1">Account Authority</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {['SUBADMIN', 'SUPERADMIN'].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={`flex-1 py-4 rounded-2xl      hover:cursor-pointer text-[10px] tracking-[0.2em] transition-all border-2 ${role === r
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100'
                                        : 'bg-gray-50/50 border-gray-100 text-gray-400 hover:border-gray-200'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/*    PERMISSION GRID CARD */}
                    <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
                            <h3 className="text-xs      text-gray-800 uppercase tracking-widest flex items-center gap-2">
                                <Shield size={18} className="text-indigo-600" /> Module Access
                            </h3>
                            {role === "SUPERADMIN" && (
                                <span className="text-[9px]      text-amber-500 uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-100">Full Access Locked</span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {MODULES.map((mod) => {
                                // Active if manually selected OR if the user is a Superadmin
                                const isActive = role === "SUPERADMIN" || selectedPermissions.includes(mod.id);
                                return (
                                    <button
                                        key={mod.id}
                                        disabled={role === "SUPERADMIN"}
                                        onClick={() => togglePermission(mod.id)}
                                        className={`flex items-center justify-between hover:cursor-pointer p-5 rounded-2xl border-2 transition-all group ${isActive
                                            ? 'border-indigo-600 bg-indigo-50/30 text-indigo-700'
                                            : 'border-gray-50 text-gray-300 hover:border-gray-200 bg-gray-50/30'
                                            }`}
                                    >
                                        <span className="text-[11px]      uppercase tracking-tight">{mod.label}</span>
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 hover:cursor-pointer transition-all ${isActive ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200 bg-white'
                                            }`}>
                                            {isActive && <Check size={14} className="text-white" strokeWidth={4} />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/*    SAVE ACTION */}
                    <div className="pt-4">
                        <button
                            onClick={handleSave}
                            disabled={isUpdating}
                            className="w-full py-5 bg-black text-white rounded-[1.5rem] hover:cursor-pointer      uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                        >
                            {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            Save System Permissions
                        </button>
                    </div>
                </div>
            </PermissionGuardian>
        </main >
    );
}