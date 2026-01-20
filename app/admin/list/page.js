"use client";
import { useState, useEffect } from "react"; // Added useEffect and useState
import { useSelector } from "react-redux";
import PageHeader from "../../../components/ui/PageHeader";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { Edit, Trash2, ShieldCheck, Mail, Calendar, Loader2, Lock, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetAdminsQuery, useDeleteAdminMutation } from "../../../redux/service/adminApi";

export default function AdminListPage() {
    const router = useRouter();

    // ✅ FIX: Hydration state management
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { user: currentUser } = useSelector((state) => state.auth || {});
    const { data: response, isLoading, refetch } = useGetAdminsQuery();
    const [deleteAdmin] = useDeleteAdminMutation();

    const admins = response?.data?.admins || [];

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to revoke this admin's access?")) {
            await deleteAdmin(id);
            refetch();
        }
    };

    // ✅ FIX: While not mounted, return the EXACT structure the server generates
    if (!mounted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    return (
        <PermissionGuardian permissionId="admin">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <PageHeader
                    title="Administrator Management"
                    description={`Managing ${admins.length} active system administrators`}
                    addButtonLabel={currentUser?.role === "SUPERADMIN" ? "Add New Admin" : null}
                    onAddClick={() => router.push("/admin/add")}
                />

                <div className="mt-8">
                    <div className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
                        <div className="overflow-x-auto no-scrollbar">
                            <div className="min-w-[1000px]">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-black tracking-[2px] border-b border-gray-100">
                                        <tr>
                                            <th className="p-5 text-center w-20">S.No</th>
                                            <th className="p-5">Administrator Details</th>
                                            <th className="p-5">Security Role</th>
                                            <th className="p-5">Access Permissions</th>
                                            <th className="p-5">Account Created</th>
                                            <th className="p-5 text-right pr-8">Management</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="6" className="p-20 text-center">
                                                    <Loader2 className="animate-spin mx-auto text-blue-600" size={40} />
                                                </td>
                                            </tr>
                                        ) : admins.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="p-24 text-center">
                                                    <Inbox size={48} className="mx-auto mb-3 opacity-20 text-gray-400" />
                                                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 italic">No Administrators Found</p>
                                                </td>
                                            </tr>
                                        ) : (
                                            admins.map((admin, index) => (
                                                <tr key={admin._id} className="hover:bg-gray-50/30 transition-colors group">
                                                    <td className="p-5 text-center text-xs font-black text-gray-300">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs border border-blue-100/50">
                                                                {admin.name?.slice(0, 2).toUpperCase()}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-black text-gray-800 tracking-tight">{admin.name}</span>
                                                                <span className="text-[11px] text-gray-500 flex items-center gap-1 font-medium">
                                                                    <Mail size={10} /> {admin.email}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-5">
                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${admin.role === 'SUPERADMIN' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                                            <ShieldCheck size={12} />
                                                            {admin.role}
                                                        </div>
                                                    </td>
                                                    <td className="p-5">
                                                        <p className="text-[11px] font-bold text-gray-500 max-w-[200px] truncate">
                                                            {admin.permissions?.join(', ') || 'No Permissions'}
                                                        </p>
                                                    </td>
                                                    <td className="p-5 text-xs font-bold text-gray-400">
                                                        {new Date(admin.createdAt).toLocaleDateString('en-GB')}
                                                    </td>
                                                    <td className="p-5 text-right pr-8">
                                                        {currentUser?.role === "SUPERADMIN" ? (
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => router.push(`/admin/edit/${admin._id}`)}
                                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm active:scale-90"
                                                                >
                                                                    <Edit size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(admin._id)}
                                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm active:scale-90"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center justify-end gap-2 text-gray-300 italic text-[10px] font-black uppercase tracking-widest">
                                                                <Lock size={14} /> Read Only
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}