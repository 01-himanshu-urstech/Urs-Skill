"use client";
import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import { StatusBadge } from "../../components/ui/StatusBadge";
import {
    Edit2, Trash2, Loader2, BookOpen,
    AlertCircle, Inbox, ChevronLeft, ChevronRight, Search
} from "lucide-react";
import { useRouter } from "next/navigation";
import PermissionGuardian from "../../components/auth/PermissionGuardian";
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../../redux/service/adminApi";

export default function BlogListPage() {
    const router = useRouter();

    //    1. Pagination & Filter State
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 10; // Strict limit per page

    const { data, isLoading, isError, isFetching, refetch } = useGetAllBlogsQuery();
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

    const allBlogs = data?.data?.blogs || [];

    //    2. Strict Frontend Filtering & Slicing (Same as Coupons)
    const { displayBlogs, totalRecords } = useMemo(() => {
        let filtered = allBlogs.filter(blog =>
            blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const total = filtered.length;
        const startIndex = (page - 1) * limit;
        const sliced = filtered.slice(startIndex, startIndex + limit);

        return { displayBlogs: sliced, totalRecords: total };
    }, [allBlogs, searchTerm, page]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    //    3. Auto-reset to page 1 on search
    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await deleteBlog(id).unwrap();
            } catch (err) {
                alert(err?.data?.message || "Failed to delete blog.");
            }
        }
    };

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <PageHeader
                    title="Blogs & Articles"
                    description={`Monitoring ${totalRecords} published articles.`}
                    addButtonLabel="Create Blog"
                    onAddClick={() => router.push("/blog/create")}
                />

                {/*    4. Search Bar Integration */}
                <div className="mt-6 mb-6 max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search articles by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-purple-500/5 transition-all text-sm font-medium text-black"
                    />
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase      tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-6 text-center w-20">Index</th>
                                    <th className="p-6">Article Identity</th>
                                    <th className="p-6">Created By</th>
                                    <th className="p-6 text-center">Status</th>
                                    <th className="p-6 text-right pr-10">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="5" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-purple-600" size={40} /></td></tr>
                                ) : displayBlogs.length === 0 ? (
                                    <tr><td colSpan="5" className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs"><Inbox className="mx-auto mb-2 opacity-20" size={48} /> No Articles Found</td></tr>
                                ) : (
                                    displayBlogs.map((blog, index) => (
                                        <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors group">
                                            {/*    5. Corrected Indexing: Page 2 starts at 11 */}
                                            <td className="p-6 text-center text-xs      text-gray-300">
                                                {String((page - 1) * limit + index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                                                        <BookOpen size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm      text-gray-800 tracking-tight">{blog.title}</span>
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(blog.createdAt).toLocaleDateString('en-GB')}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="text-[10px]      uppercase px-2 py-1 bg-gray-100 text-gray-500 rounded-lg">
                                                    {blog.createdBy?.role || 'ADMIN'}
                                                </span>
                                            </td>
                                            <td className="p-6 text-center">
                                                <StatusBadge status={blog.status || "PUBLISHED"} />
                                            </td>
                                            <td className="p-6 text-right pr-10">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => router.push(`/blog/edit/${blog._id}`)} className="p-2 text-emerald-600 hover:bg-emerald-50 hover:cursor-pointer rounded-xl transition-all">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(blog._id)} disabled={isDeleting} className="p-2 text-red-500 hover:bg-red-50 hover:cursor-pointer rounded-xl transition-all disabled:opacity-30">
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

                    {/*    6. PAGINATION FOOTER - Exact Coupon Design */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px]      uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-purple-400 uppercase">Showing {displayBlogs.length} of {totalRecords} Records</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isFetching}
                                className="p-2 bg-white border border-gray-200 hover:cursor-pointer rounded-xl disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages || isFetching}
                                className="p-2 bg-white border border-gray-200 hover:cursor-pointer rounded-xl disabled:opacity-30 hover:bg-gray-50 shadow-sm transition-all active:scale-90"
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