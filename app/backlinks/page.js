"use client";
import PageHeader from "../../components/ui/PageHeader";
import { Link as LinkIcon, Trash2, ExternalLink, Loader2, Globe, Tag, Navigation, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../components/auth/PermissionGuardian";
import { useGetBacklinksQuery, useDeleteBacklinkByIdMutation } from "../../redux/service/adminApi";

export default function BacklinkListPage() {
    const router = useRouter();
    const { data, isLoading, isError } = useGetBacklinksQuery();
    const [deleteBacklink] = useDeleteBacklinkByIdMutation();

    // ✅ Backend structure: data.data.backlinks
    const backlinks = data?.data?.backlinks || [];

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this backlink?")) {
            try {
                await deleteBacklink(id).unwrap();
            } catch (err) {
                alert("Failed to delete backlink");
            }
        }
    };

    return (
        <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
            <PermissionGuardian permissionId="General">
                <PageHeader
                    title="SEO Backlinks"
                    description="Monitor and track external links pointing to UrsSkill"
                    addButtonLabel="Add Backlink"
                    onAddClick={() => router.push("/backlinks/create")}
                />

                <div className="mt-4 sm:mt-6">
                    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto no-scrollbar">
                            <div className="min-w-[900px]">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                        <tr>
                                            <th className="p-4 font-semibold w-16 text-center">S.No</th>
                                            <th className="p-4 font-semibold">Partner & URL</th>
                                            <th className="p-4 font-semibold">Type</th>
                                            <th className="p-4 font-semibold">Position</th>
                                            <th className="p-4 font-semibold">Status</th>
                                            <th className="p-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="6" className="p-10 text-center">
                                                    <Loader2 className="animate-spin mx-auto text-[#7C3AED]" />
                                                </td>
                                            </tr>
                                        ) : backlinks.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="p-10 text-center text-gray-400 italic">
                                                    No backlinks found.
                                                </td>
                                            </tr>
                                        ) : (
                                            backlinks.map((link, index) => (
                                                <tr key={link._id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="p-4 text-xs text-gray-400 font-medium text-center">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-gray-800 flex items-center gap-1">
                                                                <Globe size={14} className="text-gray-400" />
                                                                {link.name}
                                                            </span>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-xs text-blue-600 truncate max-w-[200px]">{link.url}</span>
                                                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                                                                    <ExternalLink size={12} />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">
                                                            <Tag size={10} />
                                                            {link.type}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="text-xs font-semibold text-gray-600 flex items-center gap-1">
                                                            <Navigation size={12} className="text-[#7C3AED]" />
                                                            {link.position}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${link.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                            {link.isActive ? 'ACTIVE' : 'INACTIVE'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <button
                                                            onClick={() => router.push(`/backlinks/update/${link._id}`)}
                                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(link._id)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                            title="Delete Backlink"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
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
            </PermissionGuardian>
        </main>
    );
}