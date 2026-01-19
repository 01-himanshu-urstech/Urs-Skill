"use client";
import PageHeader from "../../components/ui/PageHeader";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Eye, Edit2, Trash2, Loader2, BookOpen, AlertCircle, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../components/auth/PermissionGuardian";
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../../redux/service/adminApi";

export default function BlogListPage() {
    const router = useRouter();

    // ✅ Redux Query with extra states for better UX
    const { data, isLoading, isError, refetch } = useGetAllBlogsQuery();
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

    // ✅ FIX: Extracting blogs array correctly based on your API response
    const blogs = data?.data?.blogs || [];

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                // ✅ Mutation trigger based on your adminApi definition
                await deleteBlog(id).unwrap();
            } catch (err) {
                alert(err?.data?.message || "Failed to delete blog. Please try again.");
            }
        }
    };

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden min-h-screen bg-gray-50/30">
                {/* Header Section */}
                <PageHeader
                    title="Blogs & Articles"
                    description="Manage your website's content and SEO articles"
                    showExport={false}
                    addButtonLabel="Create Blog"
                    onAddClick={() => router.push("/blog/create")}
                />

                <div className="mt-4 sm:mt-6">
                    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto no-scrollbar">
                            <div className="min-w-[900px]">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                        <tr>
                                            <th className="p-4 font-semibold w-16 text-center">S.No</th>
                                            <th className="p-4 font-semibold">Title & Category</th>
                                            <th className="p-4 font-semibold">Author</th>
                                            <th className="p-4 font-semibold">Date</th>
                                            <th className="p-4 font-semibold">Status</th>
                                            <th className="p-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {/* 1. LOADING STATE */}
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="6" className="p-20 text-center">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <Loader2 className="animate-spin text-[#7C3AED]" size={40} />
                                                        <p className="text-sm text-gray-400 font-medium tracking-wide">Syncing with server...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : isError ? (
                                            /* 2. ERROR STATE */
                                            <tr>
                                                <td colSpan="6" className="p-20 text-center">
                                                    <div className="flex flex-col items-center gap-3 text-red-500">
                                                        <AlertCircle size={40} />
                                                        <p className="font-bold">Could not load blogs</p>
                                                        <button onClick={() => refetch()} className="text-xs bg-gray-100 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-all">Try Again</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : blogs.length === 0 ? (
                                            /* 3. EMPTY STATE */
                                            <tr>
                                                <td colSpan="6" className="p-20 text-center">
                                                    <div className="flex flex-col items-center gap-3 text-gray-400">
                                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                                            <Inbox size={32} />
                                                        </div>
                                                        <p className="text-sm font-medium italic">No blogs found. Start by creating your first post!</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            /* 4. DATA RENDER */
                                            blogs.map((blog, index) => (
                                                <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="p-4 text-xs text-gray-400 font-medium text-center">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                                                <BookOpen size={20} />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <span className="text-sm font-semibold text-gray-800 block truncate max-w-[300px]" title={blog.title}>
                                                                    {blog.title}
                                                                </span>
                                                                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                                                    {blog.category || 'General Content'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                            {blog.createdBy?.role || 'SUPERADMIN'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-sm text-gray-600">
                                                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                                                    </td>
                                                    <td className="p-4">
                                                        <StatusBadge status={blog.status || "PUBLISHED"} />
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex items-center justify-end gap-1">

                                                            <button
                                                                onClick={() => router.push(`/blog/edit/${blog._id}`)}
                                                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                                title="Edit"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(blog._id)}
                                                                disabled={isDeleting}
                                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30"
                                                                title="Delete"
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
                </div>
                {/* Footer Note */}
                <p className="mt-6 text-center text-[10px] text-gray-400 font-medium uppercase tracking-[2px]">
                    Powered by UrsSkill Internal CMS System
                </p>
            </main>
        </PermissionGuardian>
    );
}