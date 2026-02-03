"use client";
import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import {
    Eye, Edit2, Trash2, Loader2, Mail, Phone,
    ChevronLeft, ChevronRight, Search, Inbox
} from "lucide-react";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import { useGetCustomersQuery, useDeleteCustomerMutation } from "../../../redux/service/adminApi";

export default function CustomerListPage() {
    const router = useRouter();

    //    1. Pagination & Search State
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 10;

    //    2. API Queries
    const { data, isLoading, isFetching, isError, refetch } = useGetCustomersQuery();
    const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

    const customersList = data?.data?.customers || [];

    //    3. STRICT FRONTEND FILTERING & SLICING (Restored Logic)
    const { displayCustomers, totalRecords, filteredAll } = useMemo(() => {
        let filtered = customersList.filter(user =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const total = filtered.length;
        const startIndex = (page - 1) * limit;
        const sliced = filtered.slice(startIndex, startIndex + limit);

        return { displayCustomers: sliced, totalRecords: total, filteredAll: filtered };
    }, [customersList, searchTerm, page]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    //    4. DIRECT CSV EXPORT LOGIC (Integrated into original button)
    const handleExportCSV = () => {
        if (filteredAll.length === 0) return alert("No records available to export.");

        const headers = ["S.No", "Name", "Email", "Phone", "Status", "Joined Date"];
        const rows = filteredAll.map((user, index) => [
            index + 1,
            user.name || "N/A",
            user.email || "N/A",
            user.phone || "N/A",
            user.status || "Active",
            new Date(user.createdAt).toLocaleDateString('en-GB')
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(val => `"${val}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Customers_List_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    //    5. Auto-reset to page 1 on search
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to permanently remove ${name}?`)) {
            try {
                await deleteCustomer(id).unwrap();
                alert("Customer deleted successfully");
                refetch();
            } catch (err) {
                alert(err?.data?.message || "Failed to delete customer");
            }
        }
    };

    return (
        <PermissionGuardian permissionId="customers">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                {/*    Original Header Design with Aligned Export */}
                <PageHeader
                    title="Customer Directory"
                    description={`Monitoring ${totalRecords} active customer accounts.`}
                    showExport={true}
                    addButtonLabel="Add Customer"
                    onAddClick={() => router.push("/customer/add")}
                    onExportClick={handleExportCSV} // Direct logic attached here
                />

                {/*    Original Search Bar Integration */}
                <div className="mt-6 mb-6 max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className=" text-black w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm font-medium"
                    />
                </div>

                {/*    Original Table Container Design */}
                <div className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase      tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-5 text-center w-20">S.No</th>
                                    <th className="p-5">Customer Profile</th>
                                    <th className="p-5">Contact Details</th>
                                    <th className="p-5 text-center">Status</th>
                                    <th className="p-5">Registration</th>
                                    <th className="p-5 text-right pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="6" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" size={40} /></td></tr>
                                ) : displayCustomers.length === 0 ? (
                                    <tr><td colSpan="6" className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs"><Inbox className="mx-auto mb-2 opacity-20" size={48} /> No Records Found</td></tr>
                                ) : (
                                    displayCustomers.map((user, index) => (
                                        <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-5 text-center text-xs      text-gray-300">
                                                {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600      text-xs border border-emerald-100/50">
                                                        {user.name?.slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm      text-gray-800 tracking-tight">{user.name}</span>
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
                                                    <button onClick={() => router.push(`/customer/edit/${user._id}`)} className="p-2 text-emerald-600 hover:cursor-pointer hover:bg-emerald-50 rounded-xl transition-all">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(user._id, user.name)} disabled={isDeleting} className="p-2 text-red-500 hover:cursor-pointer hover:bg-red-50 rounded-xl transition-all disabled:opacity-30">
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

                    {/*    Original Pagination Footer */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px]      uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-emerald-500 uppercase">Showing {displayCustomers.length} of {totalRecords} Customer Accounts</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isFetching}
                                className="p-2 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages || isFetching}
                                className="p-2 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}