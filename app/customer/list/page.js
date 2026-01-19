"use client";
import { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Eye, Edit2, Trash2, Loader2, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
// ✅ Added useDeleteCustomerMutation to the imports
import { useGetCustomersQuery, useDeleteCustomerMutation } from "../../../redux/service/adminApi";

export default function CustomerListPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ API Queries & Mutations
    const { data, isLoading, isError, refetch } = useGetCustomersQuery({ page: 1, limit: 1000 });
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

    const customersList = data?.data?.customers || [];
    const totalCustomers = data?.data?.total || customersList.length;

    // ✅ Handlers
    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to permanently remove ${name}?`)) {
            try {
                //
                await deleteCustomer(id).unwrap();
                alert("Customer deleted successfully");
                refetch(); // Refresh the list after deletion
            } catch (err) {
                alert(err?.data?.message || "Failed to delete customer");
            }
        }
    };

    const filteredCustomers = customersList.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PermissionGuardian permissionId="customers">
            <main className="p-4 sm:p-8 min-h-screen bg-gray-50/30">
                <PageHeader
                    title="Customer Directory"
                    description={`Monitoring ${totalCustomers} active customer accounts.`}
                    showExport={true}
                    addButtonLabel="Add Customer"
                    onAddClick={() => router.push("/customer/add")}
                    onExportClick={() => alert("Exporting Customer List...")}
                />

                <div className="mt-6 mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md px-6 py-3 bg-white border border-gray-200 rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                </div>

                <div className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="min-w-[900px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-[2px] text-gray-400 border-b border-gray-100">
                                    <tr>
                                        <th className="p-5 text-center w-20">S.No</th>
                                        <th className="p-5">Customer Profile</th>
                                        <th className="p-5">Contact Details</th>
                                        <th className="p-5 text-center">Account Status</th>
                                        <th className="p-5">Registration Date</th>
                                        <th className="p-5 text-right pr-8">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        <tr><td colSpan="6" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" size={40} /></td></tr>
                                    ) : (
                                        filteredCustomers.map((user, index) => (
                                            <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="p-5 text-center text-xs font-black text-gray-300">
                                                    {String(index + 1).padStart(2, '0')}
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-black text-xs border border-emerald-100/50 uppercase">
                                                            {user.name?.slice(0, 2)}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-black text-gray-800 tracking-tight">{user.name}</span>
                                                            <span className="text-[10px] text-gray-400 font-mono">UID: {user._id?.slice(-8)}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                                                            <Mail size={12} className="text-emerald-500" /> {user.email}
                                                        </span>
                                                        <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1.5">
                                                            <Phone size={10} /> {user.phone || 'No phone added'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-5 text-center">
                                                    <StatusBadge status={user.status || "Active"} />
                                                </td>
                                                <td className="p-5">
                                                    <span className="text-xs font-bold text-gray-700">
                                                        {new Date(user.createdAt).toLocaleDateString('en-GB')}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-right pr-8">
                                                    <div className="flex items-center justify-end gap-2">

                                                        {/* ✅ Navigates to Edit Page */}
                                                        <button
                                                            onClick={() => router.push(`/customer/edit/${user._id}`)}
                                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                                            title="Edit Account"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>

                                                        {/* ✅ Triggers Deletion logic */}
                                                        <button
                                                            onClick={() => handleDelete(user._id, user.name)}
                                                            disabled={isDeleting}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-30"
                                                            title="Delete Customer"
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

                    <div className="p-5 bg-gray-50/30 border-t border-gray-100 flex justify-center">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest italic">
                            --- Total {totalCustomers} Customer Accounts Synchronized ---
                        </span>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}