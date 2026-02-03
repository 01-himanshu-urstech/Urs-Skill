// "use client";

// import { useState, useMemo, useEffect } from "react";
// import PageHeader from "../../components/ui/PageHeader";
// import {
//   User, Calendar, Search, Loader2, Eye, X,
//   RefreshCw, ChevronLeft, ChevronRight, ChevronDown,
//   Inbox, AlertCircle
// } from "lucide-react";

// import PermissionGuardian from "../../components/auth/PermissionGuardian";

// import {
//   useGetAllEnquiriesQuery,
//   useUpdateEnquiryStatusMutation,
// } from "../../redux/service/adminApi";

// export default function HelpEnquiriesPage() {
//   /* ================= STATE ================= */
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [selectedEnquiry, setSelectedEnquiry] = useState(null);

//   const limit = 10;

//   /* ================= API ================= */
//   const { data, isLoading, isFetching, refetch } =
//     useGetAllEnquiriesQuery();

//   const [updateStatus, { isLoading: isUpdating }] =
//     useUpdateEnquiryStatusMutation();

//   const enquiries = data?.data?.enquiries || [];

//   /* ================= FILTERING ================= */
//   const { displayData, totalRecords } = useMemo(() => {
//     let filtered = enquiries.filter(e => {
//       const matchesSearch =
//         e.background.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         e.courseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         e.domain.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus =
//         statusFilter === "ALL" || e.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });

//     const total = filtered.length;
//     const start = (page - 1) * limit;

//     return {
//       displayData: filtered.slice(start, start + limit),
//       totalRecords: total
//     };
//   }, [enquiries, searchTerm, statusFilter, page]);

//   const totalPages = Math.ceil(totalRecords / limit) || 1;

//   useEffect(() => setPage(1), [searchTerm, statusFilter]);

//   useEffect(() => {
//     document.body.style.overflow = selectedEnquiry ? "hidden" : "unset";
//     return () => (document.body.style.overflow = "unset");
//   }, [selectedEnquiry]);

//   const handleStatusUpdate = async (id, status) => {
//     await updateStatus({ id, status }).unwrap();
//     setSelectedEnquiry(null);
//   };

//   /* ================= UI ================= */
//   return (
//     <PermissionGuardian permissionId="Enquiry">
//       <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 text-black">
//         <PageHeader
//           title="Help Enquiries"
//           description={`Monitoring ${totalRecords} help requests submitted from website.`}
//         />

//         {/* FILTER BAR */}
//         <div className="mt-8 mb-6 flex flex-col md:flex-row gap-4 justify-between">
//           <div className="flex gap-3 w-full md:max-w-xl">
//             <div className="relative flex-1">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search background / course / domain"
//                 className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 font-bold text-sm"
//               />
//             </div>

//             <div className="relative min-w-[180px]">
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="w-full appearance-none pl-6 pr-12 py-4 bg-white rounded-2xl border border-gray-100      text-[10px] uppercase tracking-widest"
//               >
//                 <option value="ALL">All</option>
//                 <option value="PENDING">Pending</option>
//                 <option value="CONTACTED">Contacted</option>
//                 <option value="RESOLVED">Resolved</option>
//               </select>
//               <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
//             </div>
//           </div>

//           <button
//             onClick={refetch}
//             disabled={isFetching}
//             className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
//           >
//             <RefreshCw size={18} className={isFetching ? "animate-spin" : ""} />
//           </button>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
//           <table className="w-full">
//             <thead className="bg-gray-50 text-[10px] uppercase tracking-widest      text-gray-400">
//               <tr>
//                 <th className="p-6 w-20 text-center">S.No</th>
//                 <th className="p-6">User</th>
//                 <th className="p-6">Background</th>
//                 <th className="p-6">Course</th>
//                 <th className="p-6">Domain</th>
//                 <th className="p-6 text-center">Status</th>
//                 <th className="p-6 text-right pr-10">Action</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {isLoading ? (
//                 <tr>
//                   <td colSpan="7" className="p-24 text-center">
//                     <Loader2 className="animate-spin mx-auto" size={40} />
//                   </td>
//                 </tr>
//               ) : displayData.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="p-24 text-center">
//                     <Inbox size={48} className="mx-auto text-gray-200" />
//                     <p className="text-xs      uppercase text-gray-400">
//                       No enquiries found
//                     </p>
//                   </td>
//                 </tr>
//               ) : (
//                 displayData.map((e, i) => (
//                   <tr key={e._id} className="hover:bg-gray-50">
//                     <td className="p-6 text-center text-gray-300     ">
//                       {String((page - 1) * limit + i + 1).padStart(2, "0")}
//                     </td>
//                     <td className="p-6">
//                       <div className="flex flex-col">
//                         <span className="font-bold text-gray-800">
//                           {e.customerId?.name || "Guest"}
//                         </span>

//                         <span className="text-[10px] font-mono text-gray-400 mt-1">
//                           ID: {e.customerId?._id
//                             ? e.customerId._id.slice(-8)
//                             : "—"}
//                         </span>
//                       </div>
//                     </td>


//                     <td className="p-6">{e.background}</td>
//                     <td className="p-6">{e.courseType}</td>
//                     <td className="p-6">{e.domain}</td>
//                     <td className="p-6 text-center      text-xs">
//                       {e.status}
//                     </td>
//                     <td className="p-6 text-right pr-10">
//                       <button
//                         onClick={() => setSelectedEnquiry(e)}
//                         className="p-2.5 rounded-xl border hover:bg-indigo-50"
//                       >
//                         <Eye size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>

//           {/* PAGINATION */}
//           <div className="p-6 flex justify-between bg-gray-50 border-t">
//             <p className="text-xs font-bold">
//               Page {page} of {totalPages}
//             </p>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setPage(p => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="p-2 border rounded-xl"
//               >
//                 <ChevronLeft size={18} />
//               </button>
//               <button
//                 onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                 disabled={page >= totalPages}
//                 className="p-2 border rounded-xl"
//               >
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* MODAL */}
//         {selectedEnquiry && (
//           <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
//             <div className="bg-white rounded-3xl max-w-xl w-full p-8">
//               <h3 className="     mb-4">Enquiry Details</h3>

//               <p><b>Background:</b> {selectedEnquiry.background}</p>
//               <p><b>Course:</b> {selectedEnquiry.courseType}</p>
//               <p><b>Domain:</b> {selectedEnquiry.domain}</p>

//               <div className="mt-6 flex justify-end gap-4">
//                 <button
//                   onClick={() =>
//                     handleStatusUpdate(selectedEnquiry._id, "CONTACTED")
//                   }
//                   className="px-6 py-3 border rounded-xl"
//                 >
//                   Mark Contacted
//                 </button>
//                 <button
//                   onClick={() =>
//                     handleStatusUpdate(selectedEnquiry._id, "RESOLVED")
//                   }
//                   className="px-6 py-3 bg-indigo-600 text-white rounded-xl"
//                 >
//                   Resolve
//                 </button>
//                 <button onClick={() => setSelectedEnquiry(null)}>
//                   <X />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </PermissionGuardian>
//   );
// }



"use client";

import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import {
  User, Calendar, Search, Loader2, Eye, X,
  RefreshCw, ChevronLeft, ChevronRight, ChevronDown,
  Inbox, MessageSquare, Clock, CheckCircle2, MoreHorizontal
} from "lucide-react";

import PermissionGuardian from "../../components/auth/PermissionGuardian";
import {
  useGetAllEnquiriesQuery,
  useUpdateEnquiryStatusMutation,
} from "../../redux/service/adminApi";

export default function HelpEnquiriesPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const limit = 10;
  const { data, isLoading, isFetching, refetch } = useGetAllEnquiriesQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateEnquiryStatusMutation();

  const enquiries = data?.data?.enquiries || [];

  // Redesign logic: Status Colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "PENDING": return "bg-orange-50 text-orange-600 border-orange-100";
      case "CONTACTED": return "bg-blue-50 text-blue-600 border-blue-100";
      case "RESOLVED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const { displayData, totalRecords } = useMemo(() => {
    let filtered = enquiries.filter(e => {
      const matchesSearch =
        e.background?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.courseType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.customerId?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || e.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return {
      displayData: filtered.slice((page - 1) * limit, page * limit),
      totalRecords: filtered.length
    };
  }, [enquiries, searchTerm, statusFilter, page]);

  const totalPages = Math.ceil(totalRecords / limit) || 1;

  const handleStatusUpdate = async (id, status) => {
    await updateStatus({ id, status }).unwrap();
    setSelectedEnquiry(null);
  };

  return (
    <PermissionGuardian permissionId="Enquiry">
      <main className="p-4 sm:p-8 min-h-screen bg-[#F8F9FD] text-black font-inter">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <PageHeader
              title="Help Enquiries"
              description={`Manage and respond to ${totalRecords} platform requests.`}
            />

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System Status</span>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Enquiries
                </span>
              </div>
              <button
                onClick={refetch}
                className="p-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <RefreshCw size={20} className={isFetching ? "animate-spin text-indigo-600" : "text-gray-600"} />
              </button>
            </div>
          </div>

          {/* QUICK STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <QuickStatCard icon={<Clock className="text-orange-500" />} label="Pending" count={enquiries.filter(e => e.status === 'PENDING').length} color="border-orange-100" />
            <QuickStatCard icon={<MessageSquare className="text-blue-500" />} label="Contacted" count={enquiries.filter(e => e.status === 'CONTACTED').length} color="border-blue-100" />
            <QuickStatCard icon={<CheckCircle2 className="text-emerald-500" />} label="Resolved" count={enquiries.filter(e => e.status === 'RESOLVED').length} color="border-emerald-100" />
          </div>

          {/* FILTER & SEARCH */}
          <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm mb-8 flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, background or domain..."
                className="w-full pl-14 pr-6 py-4 bg-gray-50/50 rounded-2xl border border-transparent focus:border-indigo-100 focus:bg-white outline-none font-medium text-sm transition-all"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative min-w-[180px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none pl-6 pr-12 py-4 bg-gray-50/50 rounded-2xl border border-transparent focus:bg-white outline-none text-xs font-bold uppercase tracking-widest text-gray-600 cursor-pointer"
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* ENQUIRIES TABLE */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-50 text-[10px] uppercase tracking-[0.15em] text-gray-400 font-bold">
                  <tr>
                    <th className="p-6 text-center w-24">Order</th>
                    <th className="p-6">User Info</th>
                    <th className="p-6">Context</th>
                    <th className="p-6">Requirement</th>
                    <th className="p-6 text-center">Status</th>
                    <th className="p-6 text-right pr-12">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <TablePlaceholder icon={<Loader2 className="animate-spin" size={40} />} text="Fetching requests..." />
                  ) : displayData.length === 0 ? (
                    <TablePlaceholder icon={<Inbox size={48} />} text="No inquiries found for this filter" />
                  ) : (
                    displayData.map((e, i) => (
                      <tr key={e._id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 text-center font-mono text-sm text-gray-300">
                          #{String((page - 1) * limit + i + 1).padStart(3, "0")}
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                              {e.customerId?.name?.charAt(0) || "G"}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-800 text-sm leading-tight">{e.customerId?.name || "Guest User"}</span>
                              <span className="text-[10px] text-gray-400 font-medium mt-0.5 tracking-wider uppercase">{e.customerId?.email?.split('@')[0] || "No Email"}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-700">{e.background}</span>
                            <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Background</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600">{e.courseType}</span>
                            <span className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-gray-600">{e.domain}</span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border border-transparent uppercase ${getStatusStyle(e.status)}`}>
                            {e.status}
                          </span>
                        </td>
                        <td className="p-6 text-right pr-10">
                          <button
                            onClick={() => setSelectedEnquiry(e)}
                            className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all active:scale-90"
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* MODERN PAGINATION */}
            <div className="p-8 flex items-center justify-between bg-gray-50/30 border-t border-gray-50">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Page <span className="text-gray-900">{page}</span> of {totalPages}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
                >
                  <ChevronLeft size={14} /> Prev
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODERN MODAL / OVERLAY */}
        {selectedEnquiry && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2.5rem] max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Request Review</h3>
                  <p className="text-xs text-gray-400 font-medium">Update the status of this enquiry.</p>
                </div>
                <button onClick={() => setSelectedEnquiry(null)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X className="text-gray-400" />
                </button>
              </div>

              <div className="p-10">
                <div className="space-y-6">
                  <DetailItem label="Full Name" value={selectedEnquiry.customerId?.name || "Guest User"} icon={<User className="text-indigo-500" size={16} />} />
                  <DetailItem label="Professional Background" value={selectedEnquiry.background} icon={<Calendar className="text-orange-500" size={16} />} />
                  <div className="grid grid-cols-2 gap-4">
                    <DetailItem label="Preferred Course" value={selectedEnquiry.courseType} />
                    <DetailItem label="Target Domain" value={selectedEnquiry.domain} />
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-50 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate(selectedEnquiry._id, "CONTACTED")}
                      disabled={isUpdating}
                      className="flex-1 py-4 bg-white border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-gray-50 transition-all active:scale-95"
                    >
                      Mark Contacted
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedEnquiry._id, "RESOLVED")}
                      disabled={isUpdating}
                      className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                    >
                      {isUpdating ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Resolve Case"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </PermissionGuardian>
  );
}

// Helper Components
function QuickStatCard({ icon, label, count, color }) {
  return (
    <div className={`bg-white p-6 rounded-3xl border ${color} flex items-center justify-between shadow-sm`}>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-2xl">{icon}</div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-2xl font-black text-gray-800 tracking-tight">{String(count).padStart(2, '0')}</span>
    </div>
  );
}

function TablePlaceholder({ icon, text }) {
  return (
    <tr>
      <td colSpan="7" className="p-32 text-center">
        <div className="flex flex-col items-center gap-4 text-gray-300">
          {icon}
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">{text}</p>
        </div>
      </td>
    </tr>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </span>
      <span className="text-sm font-bold text-gray-800 bg-gray-50/50 p-3 rounded-xl border border-gray-100">{value}</span>
    </div>
  );
}