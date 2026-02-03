"use client";
import PageHeader from "../../../components/ui/PageHeader";
import { Users } from "lucide-react";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";

export default function CustomerGroupsPage() {
    const groups = [
        { id: "GRP-01", name: "Premium Members", members: 450, tag: "High Value" },
        { id: "GRP-02", name: "Beta Testers", members: 25, tag: "New Features" },
    ];

    return (
        <PermissionGuardian permissionId="customers">
            <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
                <PageHeader title="Customer Groups" description="Organize users into segments." addButtonLabel="New Group" />
                <div className="mt-6 w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="min-w-[800px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 text-[11px] uppercase text-gray-400 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 font-semibold">Group Name</th>
                                        <th className="p-4 font-semibold text-center">Member Count</th>
                                        <th className="p-4 font-semibold">Badge Tag</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {groups.map((group) => (
                                        <tr key={group.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 font-bold text-sm text-gray-800">{group.name}</td>
                                            <td className="p-4 text-center"><span className="flex items-center justify-center gap-1 text-sm text-gray-500"><Users size={14} /> {group.members}</span></td>
                                            <td className="p-4"><span className="px-2 py-1 bg-[#7C3AED10] text-[#7C3AED] text-[10px] font-bold rounded-lg uppercase">{group.tag}</span></td>
                                            <td className="p-4 text-right"><button className="text-xs font-bold text-[#7C3AED] hover:underline">View Members</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}