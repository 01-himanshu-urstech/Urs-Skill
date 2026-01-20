"use client";
import PageHeader from "../../../components/ui/PageHeader";
import { Edit2, Trash2, Eye, Users } from "lucide-react";
import { useRouter } from "next/navigation";
// import PermissionGuardian from "../../../components/PermissionGuardian";

export default function CourseListPage() {
    const router = useRouter();

    const courses = [
        { id: "CRS-501", title: "Advanced React Patterns", category: "Development", price: "₹4,999", initials: "AR" },
        { id: "CRS-502", title: "UI Design Fundamentals", category: "Design", price: "₹2,499", initials: "UF" },
        { id: "CRS-503", title: "Backend Node.js Mastery", category: "Development", price: "Free", initials: "BN" },
    ];

    const handleViewEnrollments = (courseId) => {
        // Navigate to: /course/enrollment/CRS-501
        router.push(`/courses/enrollments/${courseId}`);
    };

    return (
        // <PermissionGuardian permissionId="courses">
        <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden max-w-7xl mx-auto">
            <PageHeader
                title="Courses Catalog"
                description="Manage your educational content and pricing."
                // addButtonLabel="Add New Course"
                showExport={true}
                onAddClick={() => router.push('/course/new')}
                onExportClick={() => console.log("Export Courses Clicked")}
            />

            <div className="mt-4 sm:mt-6 space-y-6">
                {/* Filters/Search Section */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
                            <div className="relative flex-1">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                                />
                            </div>
                            <select className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-black">
                                <option className="text-black" value="">All Categories</option>
                                <option className="text-black" value="development">Development</option>
                                <option className="text-black" value="design">Design</option>
                                <option className="text-black" value="marketing">Marketing</option>
                            </select>

                        </div>
                        <button className="px-6 py-2.5 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                            Filters
                        </button>
                    </div>
                </div>

                {/*    PERFECT TABLE - HORIZONTAL SCROLL ONLY */}
                <div className="w-full">
                    <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="min-w-[950px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 font-semibold text-center w-16">S.No</th>
                                        <th className="p-4 font-semibold whitespace-nowrap">Course Details</th>
                                        <th className="p-4 font-semibold whitespace-nowrap">Category</th>
                                        <th className="p-4 font-semibold whitespace-nowrap text-right w-32">Price</th>
                                        <th className="p-4 font-semibold whitespace-nowrap text-right w-48">Enrollments</th>
                                        <th className="p-4 font-semibold text-right whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {courses.map((course, index) => (
                                        <tr key={course.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="p-4 text-xs text-gray-400 font-medium text-center w-16">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-[#7C3AED15] flex items-center justify-center text-[#7C3AED] font-bold text-xs flex-shrink-0">
                                                        {course.initials}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-sm font-semibold text-gray-800 truncate" title={course.title}>
                                                            {course.title}
                                                        </span>
                                                        <span className="text-xs text-[#7C3AED] font-mono font-bold uppercase">
                                                            ID: {course.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2.5 py-1.5 bg-[#7C3AED10] text-[#7C3AED] rounded-lg text-xs font-semibold shadow-sm">
                                                    {course.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className="text-lg font-bold text-[#10B981]">
                                                    {course.price}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewEnrollments(course.id);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all transform hover:scale-[1.02] flex-shrink-0"
                                                    title={`View ${course.id} Enrollments`}
                                                >
                                                    <Users size={14} />
                                                    <span>View</span>
                                                </button>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2.5 text-blue-600 hover:bg-blue-50 hover:scale-105 rounded-lg transition-all shadow-sm hover:shadow-md" title="View Course">
                                                        <Eye size={18} />
                                                    </button>
                                                    <button className="p-2.5 text-emerald-600 hover:bg-emerald-50 hover:scale-105 rounded-lg transition-all shadow-sm hover:shadow-md" title="Edit Course">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button className="p-2.5 text-red-500 hover:bg-red-50 hover:scale-105 rounded-lg transition-all shadow-sm hover:shadow-md" title="Delete Course">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Helper */}
                    <p className="lg:hidden text-xs text-gray-400 mt-2 text-center italic">
                        👉 Swipe horizontally to view full table
                    </p>
                </div>

                {/* Pagination */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                        <span className="text-sm text-gray-500">Showing 1-3 of 124 courses</span>
                        <div className="flex gap-1">
                            <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-black">Previous</button>
                            <button className="px-4 py-2 text-sm bg-[#7C3AED] text-white rounded-lg font-semibold shadow-sm">1</button>
                            <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-black">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        // </PermissionGuardian>
    );
}
