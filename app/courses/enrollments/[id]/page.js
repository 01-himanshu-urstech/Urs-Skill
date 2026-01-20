"use client";
import PageHeader from "../../../../components/ui/PageHeader";
import { Search, Filter, Eye, Edit2, Download, CheckCircle2, Clock, XCircle, Users } from "lucide-react";
import PermissionGuardian from "../../../../components/auth/PermissionGuardian";
export default function CourseEnrollmentsPage({ params }) {
    const { courseId } = params;

    const enrollments = [
        { id: "ENR-001", name: "Anish Kumar Mishra", email: "anish@email.com", phone: "9661329991", status: "paid", amount: "₹4,999", date: "Jan 12, 2026", progress: 85 },
        { id: "ENR-002", name: "Priya Patel", email: "priya@email.com", phone: "9876543210", status: "pending", amount: "-", date: "Jan 11, 2026", progress: 0 },
        { id: "ENR-003", name: "Rahul Sharma", email: "rahul@email.com", phone: "9123456789", status: "failed", amount: "₹4,999", date: "Jan 10, 2026", progress: 0 },
        { id: "ENR-004", name: "Sarah Wilson", email: "sarah@email.com", phone: "9988776655", status: "paid", amount: "₹4,999", date: "Jan 9, 2026", progress: 62 },
        { id: "ENR-005", name: "Mike Johnson", email: "mike@email.com", phone: "9444332211", status: "pending", amount: "-", date: "Jan 8, 2026", progress: 23 },
    ];

    const stats = {
        total: 1247,
        paid: 892,
        pending: 245,
        failed: 110
    };

    const getStatusConfig = (status) => {
        const configs = {
            paid: { color: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle2 },
            pending: { color: "text-amber-600 bg-amber-50 border-amber-100", icon: Clock },
            failed: { color: "text-red-500 bg-red-50 border-red-100", icon: XCircle }
        };
        return configs[status] || configs.pending;
    };

    const StatCard = ({ label, value, icon: Icon, color }) => (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-2xl font-bold text-gray-800">{value.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">{label}</p>
                </div>
                <div className={`p-2.5 ${color === 'blue' ? 'bg-blue-50' : color === 'emerald' ? 'bg-emerald-50' : color === 'amber' ? 'bg-amber-50' : 'bg-red-50'} rounded-lg`}>
                    <Icon size={20} className={`${color === 'blue' ? 'text-blue-600' : color === 'emerald' ? 'text-emerald-600' : color === 'amber' ? 'text-amber-600' : 'text-red-500'}`} />
                </div>
            </div>
        </div>
    );

    const EnrollmentTableRow = ({ enrollment, index }) => {
        const config = getStatusConfig(enrollment.status);
        const Icon = config.icon;

        return (
            <tr className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-4 text-xs text-gray-400 font-medium text-center w-16">
                    {String(index).padStart(2, '0')}
                </td>
                <td className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                            {enrollment.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <span className="text-sm font-semibold text-gray-800 block truncate" title={enrollment.name}>{enrollment.name}</span>
                            <span className="text-xs text-[#7C3AED] font-mono font-bold uppercase block" title={enrollment.id}>ID: {enrollment.id}</span>
                        </div>
                    </div>
                </td>
                <td className="p-4 max-w-[220px]">
                    <span className="text-sm text-gray-600 truncate block" title={enrollment.email}>{enrollment.email}</span>
                </td>
                <td className="p-4">
                    <span className="text-sm font-mono text-gray-700">{enrollment.phone}</span>
                </td>
                <td className="p-4">
                    <span className={`px-2.5 py-1.5 ${config.color} rounded-lg text-xs font-semibold shadow-sm inline-flex items-center gap-1`}>
                        <Icon size={12} />
                        {enrollment.status.toUpperCase()}
                    </span>
                </td>
                <td className="p-4 text-right">
                    <span className="text-lg font-bold text-[#10B981]">{enrollment.amount}</span>
                </td>
                <td className="p-4">
                    <span className="text-sm text-gray-600">{enrollment.date}</span>
                </td>
                <td className="p-4">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${enrollment.progress}%` }} />
                    </div>
                    <span className="text-xs text-gray-600 ml-2">{enrollment.progress}%</span>
                </td>
                <td className="p-4 text-right w-32">
                    <div className="flex items-center justify-end gap-2">
                        <button className="p-2.5 text-blue-600 hover:bg-blue-50 hover:scale-105 rounded-lg transition-all shadow-sm hover:shadow-md" title="View">
                            <Eye size={18} />
                        </button>
                        <button className="p-2.5 text-emerald-600 hover:bg-emerald-50 hover:scale-105 rounded-lg transition-all shadow-sm hover:shadow-md" title="Edit">
                            <Edit2 size={18} />
                        </button>
                        <button className="p-2.5 text-red-500 hover:bg-red-50 hover:scale-105 rounded-lg transition-all shadow-sm hover:shadow-md" title="Invoice">
                            <Download size={18} />
                        </button>
                    </div>
                </td>
            </tr>
        );
    };

    return (
        <PermissionGuardian permissionId="courses">
            <main className="p-2 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
                <PageHeader
                    title={`CRS-${courseId} Enrollments`}
                    description="Complete enrollment management and analytics"
                    addButtonLabel="Export CSV"
                    showExport={true}
                    onAddClick={() => console.log("Export CSV")}
                    onExportClick={() => console.log("Export Enrollments")}
                    showBackButton={true}
                    onBackClick={() => window.history.back()}
                />

                <div className="mt-4 sm:mt-6 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <StatCard label="Total Enrollments" value={stats.total} icon={Users} color="blue" />
                        <StatCard label="Paid" value={stats.paid} icon={CheckCircle2} color="emerald" />
                        <StatCard label="Pending" value={stats.pending} icon={Clock} color="amber" />
                        <StatCard label="Failed" value={stats.failed} icon={XCircle} color="red" />
                    </div>

                    {/* Filters & Search */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                            <div className="flex flex-col sm:flex-row gap-3 flex-1 min-w-0">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, email, phone..."
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                                    />
                                </div>
                                <select className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-black">
                                    <option>All Status</option>
                                    <option>Paid</option>
                                    <option>Pending</option>
                                    <option>Failed</option>
                                </select>
                            </div>
                            <button className="px-6 py-2.5 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                                <Filter size={16} /> Filters
                            </button>
                        </div>
                    </div>

                    {/*    SAME TABLE EVERYWHERE - HORIZONTAL SCROLL ONLY */}
                    <div className="w-full">
                        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="min-w-[1400px]">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
                                        <tr>
                                            <th className="p-4 font-semibold text-center w-16">#</th>
                                            <th className="p-4 font-semibold whitespace-nowrap">Student Details</th>
                                            <th className="p-4 font-semibold whitespace-nowrap max-w-[220px]">Email</th>
                                            <th className="p-4 font-semibold whitespace-nowrap">Phone</th>
                                            <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                                            <th className="p-4 font-semibold text-right whitespace-nowrap w-28">Amount</th>
                                            <th className="p-4 font-semibold whitespace-nowrap">Date</th>
                                            <th className="p-4 font-semibold whitespace-nowrap">Progress</th>
                                            <th className="p-4 font-semibold text-right whitespace-nowrap w-32">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {enrollments.slice(0, 20).map((enroll, index) => (
                                            <EnrollmentTableRow key={enroll.id} enrollment={enroll} index={index + 1} />
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
                    <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                            <span className="text-sm text-gray-500">Showing 1-20 of {stats.total} enrollments</span>
                            <div className="flex gap-1">
                                <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-black">Previous</button>
                                <button className="px-4 py-2 text-sm bg-[#7C3AED] text-white rounded-lg font-semibold shadow-sm">1</button>
                                <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-black">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PermissionGuardian>
    );
}
