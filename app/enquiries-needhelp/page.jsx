"use client";

import { useState, useMemo, useEffect } from "react";
import PageHeader from "../../components/ui/PageHeader";
import {
  User, Calendar, Search, Loader2, Eye, X,
  RefreshCw, ChevronLeft, ChevronRight, ChevronDown,
  Inbox, AlertCircle
} from "lucide-react";

import PermissionGuardian from "../../components/auth/PermissionGuardian";

import {
  useGetAllEnquiriesQuery,
  useUpdateEnquiryStatusMutation,
} from "../../redux/service/adminApi";

export default function HelpEnquiriesPage() {
  /* ================= STATE ================= */
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const limit = 10;

  /* ================= API ================= */
  const { data, isLoading, isFetching, refetch } =
    useGetAllEnquiriesQuery();

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateEnquiryStatusMutation();

  const enquiries = data?.data?.enquiries || [];

  /* ================= FILTERING ================= */
  const { displayData, totalRecords } = useMemo(() => {
    let filtered = enquiries.filter(e => {
      const matchesSearch =
        e.background.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.courseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.domain.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || e.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    const total = filtered.length;
    const start = (page - 1) * limit;

    return {
      displayData: filtered.slice(start, start + limit),
      totalRecords: total
    };
  }, [enquiries, searchTerm, statusFilter, page]);

  const totalPages = Math.ceil(totalRecords / limit) || 1;

  useEffect(() => setPage(1), [searchTerm, statusFilter]);

  useEffect(() => {
    document.body.style.overflow = selectedEnquiry ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [selectedEnquiry]);

  const handleStatusUpdate = async (id, status) => {
    await updateStatus({ id, status }).unwrap();
    setSelectedEnquiry(null);
  };

  /* ================= UI ================= */
  return (
    <PermissionGuardian permissionId="Enquiry">
      <main className="p-4 sm:p-6 md:p-8 min-h-screen bg-gray-50/30 text-black">
        <PageHeader
          title="Help Enquiries"
          description={`Monitoring ${totalRecords} help requests submitted from website.`}
        />

        {/* FILTER BAR */}
        <div className="mt-8 mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-3 w-full md:max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search background / course / domain"
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 font-bold text-sm"
              />
            </div>

            <div className="relative min-w-[180px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none pl-6 pr-12 py-4 bg-white rounded-2xl border border-gray-100   text-[10px] uppercase tracking-widest"
              >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="CONTACTED">Contacted</option>
                <option value="RESOLVED">Resolved</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            </div>
          </div>

          <button
            onClick={refetch}
            disabled={isFetching}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
          >
            <RefreshCw size={18} className={isFetching ? "animate-spin" : ""} />
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-[10px] uppercase tracking-widest   text-gray-400">
              <tr>
                <th className="p-6 w-20 text-center">S.No</th>
                <th className="p-6">User</th>
                <th className="p-6">Background</th>
                <th className="p-6">Course</th>
                <th className="p-6">Domain</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-right pr-10">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="p-24 text-center">
                    <Loader2 className="animate-spin mx-auto" size={40} />
                  </td>
                </tr>
              ) : displayData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-24 text-center">
                    <Inbox size={48} className="mx-auto text-gray-200" />
                    <p className="text-xs   uppercase text-gray-400">
                      No enquiries found
                    </p>
                  </td>
                </tr>
              ) : (
                displayData.map((e, i) => (
                  <tr key={e._id} className="hover:bg-gray-50">
                    <td className="p-6 text-center text-gray-300  ">
                      {String((page - 1) * limit + i + 1).padStart(2, "0")}
                    </td>
<td className="p-6">
  <div className="flex flex-col">
    <span className="font-bold text-gray-800">
      {e.customerId?.name || "Guest"}
    </span>

    <span className="text-[10px] font-mono text-gray-400 mt-1">
      ID: {e.customerId?._id
        ? e.customerId._id.slice(-8)
        : "—"}
    </span>
  </div>
</td>


                    <td className="p-6">{e.background}</td>
                    <td className="p-6">{e.courseType}</td>
                    <td className="p-6">{e.domain}</td>
                    <td className="p-6 text-center   text-xs">
                      {e.status}
                    </td>
                    <td className="p-6 text-right pr-10">
                      <button
                        onClick={() => setSelectedEnquiry(e)}
                        className="p-2.5 rounded-xl border hover:bg-indigo-50"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="p-6 flex justify-between bg-gray-50 border-t">
            <p className="text-xs font-bold">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border rounded-xl"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 border rounded-xl"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {selectedEnquiry && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl max-w-xl w-full p-8">
              <h3 className="  mb-4">Enquiry Details</h3>

              <p><b>Background:</b> {selectedEnquiry.background}</p>
              <p><b>Course:</b> {selectedEnquiry.courseType}</p>
              <p><b>Domain:</b> {selectedEnquiry.domain}</p>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() =>
                    handleStatusUpdate(selectedEnquiry._id, "CONTACTED")
                  }
                  className="px-6 py-3 border rounded-xl"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdate(selectedEnquiry._id, "RESOLVED")
                  }
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl"
                >
                  Resolve
                </button>
                <button onClick={() => setSelectedEnquiry(null)}>
                  <X />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </PermissionGuardian>
  );
}
