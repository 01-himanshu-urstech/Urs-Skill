"use client";
import PageHeader from "../../../components/ui/PageHeader";

export default function RawLeadsPage() {
    const leads = [
        { id: "LD-901", source: "Facebook Ads", phone: "98234XXXXX", interest: "React Course", date: "2026-01-14" },
        { id: "LD-902", source: "Website Contact", phone: "91234XXXXX", interest: "UI Design", date: "2026-01-13" },
    ];

    return (
        <main className="p-2 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
            <PageHeader title="Raw Leads" description="Potential customers from various marketing channels." />
            <div className="mt-6 w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <div className="min-w-[800px]">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/50 text-[11px] uppercase text-gray-400 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 font-semibold">Source</th>
                                    <th className="p-4 font-semibold">Contact Info</th>
                                    <th className="p-4 font-semibold">Interest</th>
                                    <th className="p-4 font-semibold text-right">Captured On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors text-black">
                                        <td className="p-4 text-sm font-medium">{lead.source}</td>
                                        <td className="p-4 text-sm font-mono">{lead.phone}</td>
                                        <td className="p-4 text-sm text-gray-600">{lead.interest}</td>
                                        <td className="p-4 text-sm text-gray-400 text-right">{lead.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}