"use client";
import PageHeader from "../../../components/ui/PageHeader";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { Edit, Trash2, ShieldCheck, Mail, Calendar, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetAdminsQuery, useDeleteAdminMutation } from "../../../redux/service/adminApi"; // ✅

export default function AdminListPage() {
    const router = useRouter();

    // ✅ Fetch dynamic data from your backend
    const { data: response, isLoading, isError, refetch } = useGetAdminsQuery();
    const [deleteAdmin] = useDeleteAdminMutation();

    // Mapping based on your backend JSON: data.admins
    const admins = response?.data?.admins || [];

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to revoke this admin's access?")) {
            await deleteAdmin(id);
            refetch(); // Refresh list after deletion
        }
    };

    return (
        <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden min-h-screen bg-gray-50/30">
            <PermissionGuardian permissionId="admins">
                <PageHeader
                    title="Administrator Management"
                    description={`Managing ${admins.length} active system administrators`}
                    addButtonLabel="Add New Admin"
                    onAddClick={() => router.push("/admin/add")}
                />

                <div className="mt-4 sm:mt-6">
                    <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
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
                                                <td colSpan="6" className="p-20 text-center text-gray-400 italic font-medium">
                                                    No system administrators found.
                                                </td>
                                            </tr>
                                        ) : (
                                            admins.map((admin, index) => (
                                                <tr key={admin._id} className="hover:bg-gray-50/30 transition-colors group">
                                                    <td className="p-5 text-xs text-gray-400 font-bold text-center">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs">
                                                                {admin.name?.slice(0, 2).toUpperCase()}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-gray-800">{admin.name}</span>
                                                                <span className="text-[11px] text-gray-500 flex items-center gap-1 font-medium">
                                                                    <Mail size={10} /> {admin.email}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-5">
                                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${admin.role === 'SUPERADMIN' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                                                            }`}>
                                                            <ShieldCheck size={12} />
                                                            {admin.role}
                                                        </div>
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                            {admin.permissions?.length > 0 ? (
                                                                admin.permissions.map((perm, i) => (
                                                                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-bold rounded uppercase">
                                                                        {perm}
                                                                    </span>
                                                                ))
                                                            ) : (
                                                                <span className="text-[10px] text-gray-400 italic">No specific permissions</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-5 text-[11px] text-gray-400 font-medium">
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar size={12} />
                                                            {new Date(admin.createdAt).toLocaleDateString('en-GB')}
                                                        </div>
                                                    </td>
                                                    <td className="p-5 text-right pr-8">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => router.push(`/admin/edit/${admin._id}`)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            {/* Prevent self-deletion if needed */}
                                                            <button
                                                                onClick={() => handleDelete(admin._id)}
                                                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <p className="lg:hidden text-[10px] text-gray-400 mt-4 text-center font-bold uppercase tracking-widest italic">
                        Swipe horizontally to manage administrators
                    </p>
                </div>
            </PermissionGuardian>
        </main>
    );
}