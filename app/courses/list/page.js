"use client";
import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";
import {
    Eye, Edit2, Trash2, Loader2, Inbox, Users, ChevronLeft, ChevronRight, Search
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetTransactionsQuery } from "../../../redux/service/adminApi";

const courseMapping = {
    "1": { name: "Full Stack Web Development", category: "Development", price: "₹49,999", color: "bg-purple-50 text-purple-600" },
    "2": { name: "Business Administration", category: "Management", price: "₹49,999", color: "bg-blue-50 text-blue-600" }
};

export default function CourseListPage() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const limit = 10;

    const { data: response, isLoading, isFetching } = useGetTransactionsQuery();
    const allTransactions = response?.data?.transactions || [];

    //   Sync logic: Search and Pagination like Customer Page
    const { displayCourses, totalRecords } = useMemo(() => {
        const baseCourses = Object.keys(courseMapping).map(id => {
            const enrollCount = allTransactions.filter(txn => String(txn.courseId) === String(id) && txn.status === "SUCCESS").length;
            return { id, ...courseMapping[id], enrollments: enrollCount };
        });

        const filtered = baseCourses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const startIndex = (page - 1) * limit;
        return { displayCourses: filtered.slice(startIndex, startIndex + limit), totalRecords: filtered.length };
    }, [allTransactions, searchTerm, page]);

    const totalPages = Math.ceil(totalRecords / limit) || 1;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { setPage(1); }, [searchTerm]);

    return (
        <PermissionGuardian permissionId="General">
            <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 overflow-x-hidden">
                <PageHeader title="Course Management" description={`Managing ${totalRecords} active courses.`} />

                {/*   Responsive Search Bar */}
                <div className="mt-6 mb-6 max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="text-black w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm font-medium"
                    />
                </div>

                <div className="w-full bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden mb-10">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[10px] uppercase   tracking-[2px] text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-5 text-center w-20">S.No</th>
                                    <th className="p-5">Course Details</th>
                                    <th className="p-5">Category</th>
                                    <th className="p-5">Price</th>
                                    <th className="p-5">Enrollments</th>
                                    {/* <th className="p-5 text-right pr-8">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr><td colSpan="6" className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" size={40} /></td></tr>
                                ) : displayCourses.map((course, index) => (
                                    <tr key={course.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-5 text-center text-xs   text-gray-300">{String((page - 1) * limit + index + 1).padStart(2, '0')}</td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center   text-xs ${course.color}`}>{course.name.slice(0, 2).toUpperCase()}</div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm   text-gray-800 tracking-tight">{course.name}</span>
                                                    <span className="text-[10px] text-gray-400 font-mono">ID: CRS-{course.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5"><span className="px-3 py-1 bg-gray-50 rounded-lg text-[10px]   uppercase text-gray-500 border">{course.category}</span></td>
                                        <td className="p-5"><span className="text-sm   text-emerald-600">{course.price}</span></td>
                                        <td className="p-5">
                                            <button onClick={() => router.push(`/courses/enrollments/${course.id}`)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7C3AED] to-blue-600 text-white rounded-xl text-[10px]   uppercase tracking-widest shadow-lg shadow-indigo-100 hover:scale-[1.03] transition-all">
                                                <Users size={14} /> {course.enrollments} ENROLLED
                                            </button>
                                        </td>
                                        {/* <td className="p-5 text-right pr-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Eye size={18} /></button>
                                                <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                            </div>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/*   Responsive Pagination Footer */}
                    <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex flex-col">
                            <p className="text-[10px] uppercase text-gray-400 tracking-widest">Page {page} of {totalPages}</p>
                            <p className="text-[9px] font-bold text-emerald-500 uppercase">Total {totalRecords} Courses</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 active:scale-90 transition-all"><ChevronLeft size={18} /></button>
                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-2 bg-white border border-gray-200 rounded-xl hover:cursor-pointer disabled:opacity-30 active:scale-90 transition-all"><ChevronRight size={18} /></button>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}