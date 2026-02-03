"use client";
import { useState } from "react";
import { useGetRawLeadsQuery } from "../../../redux/service/adminApi";
import PageHeader from "../../../components/ui/PageHeader";
import { Loader2, Mail, Phone, ChevronLeft, ChevronRight, UserCircle, Filter } from "lucide-react";
import PermissionGuardian from "../../../components/auth/PermissionGuardian";


export default function RawLeadsPage() {
  const [page, setPage] = useState(1);
  const [sourceFilter, setSourceFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");

  //   API Hook with dynamic filters
  const { data, isLoading, isError } = useGetRawLeadsQuery({ 
    page, 
    source: sourceFilter, 
    eventType: eventFilter 
  });

  const leads = data?.leads || [];
  const hasNextPage = data?.hasNextPage;

  if (isLoading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-[#8B19E6]" size={40} /></div>;

  return (
    <PermissionGuardian permissionId="logs">
    <main className="p-2 sm:p-4 md:p-6 lg:p-8">
      <PageHeader title="Raw Leads" description="Comprehensive list of customer inquiries and activity logs with smart filtering." />

      {/*   FILTERS SECTION */}
      <div className="mt-6 flex flex-wrap gap-4 mb-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Filter size={16} className="text-gray-400" />
          <select 
            value={sourceFilter} 
            onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-black outline-none focus:border-[#8B19E6]"
          >
            <option value="">All Sources</option>
            <option value="course_detail">Course Detail</option>
            <option value="home_explore_section">Home Explore</option>
            <option value="checkout_page">Checkout Page</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <select 
            value={eventFilter} 
            onChange={(e) => { setEventFilter(e.target.value); setPage(1); }}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-black outline-none focus:border-[#8B19E6]"
          >
            <option value="">All Event Types</option>
            <option value="COURSE_VIEW">Course View</option>
            <option value="CHECKOUT_VIEW">Checkout View</option>
            <option value="PAYMENT_INITIATED">Payment Initiated</option>
            <option value="PAYMENT_SUCCESS">Payment Success</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-[11px] uppercase text-gray-400 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold w-16">S.No</th>
                <th className="p-4 font-semibold">Customer Details</th>
                <th className="p-4 font-semibold">Source</th>
                <th className="p-4 font-semibold">Event Type</th>
                <th className="p-4 text-right font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.length > 0 ? leads.map((lead, index) => (
                <tr key={lead._id} className="hover:bg-gray-50/5 text-black border-b border-gray-50">
                  {/*   DYNAMIC SERIAL NUMBER */}
                  <td className="p-4 text-sm font-medium text-gray-400">
                    {(page - 1) * 10 + (index + 1)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <UserCircle size={24} className={lead.customerId ? "text-[#8B19E6]" : "text-gray-300"} />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{lead.customerId?.name || "Anonymous"}</span>
                        {lead.customerId && <span className="text-[10px] text-gray-500">{lead.customerId.email}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-tight">
                      {lead.source?.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                        lead.eventType.includes('SUCCESS') ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {lead.eventType}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 text-right">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-400 italic">No leads match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/*   PAGINATION FOOTER */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <span className="text-xs font-bold text-gray-400">PAGE {page}</span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 border border-gray-200 rounded-xl disabled:opacity-30 cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              disabled={!hasNextPage}
              onClick={() => setPage(p => p + 1)}
              className="p-2 border border-gray-200 rounded-xl disabled:opacity-30 cursor-pointer hover:bg-gray-50 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </main>
    </PermissionGuardian>
  );
}