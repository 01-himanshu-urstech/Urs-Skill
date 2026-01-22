"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Target, Briefcase } from "lucide-react";

const roles = [
    { title: "Business Analyst", description: "Bridge the gap between business needs and data-driven solutions.", points: ["Requirement gathering", "Data modeling", "Stakeholder communication"] },
    { title: "Media & Performance Analyst", description: "Optimize digital ad spend and maximize ROI across global channels.", points: ["Channel attribution", "Budget optimization", "ROI forecasting"] },
    {
        title: "Growth Analyst",
        description:
            "Devise strategies based on consumer data to drive sustainable acquisition and retention at the center stage of modern business.",
        points: [
            "Analyse complex data for marketing strategies",
            "Conduct A/B experiments to test hypotheses",
            "Create dashboards for stakeholder insights",
        ],
        image: "https://assets.digiaccel.in/website/images/bootcamp/graphs/growth-analyst-2.webp",
    },
    { title: "eCommerce Analyst", description: "Manage digital storefront performance and customer funnel health.", points: ["Conversion rate optimization", "Inventory analytics", "Cart abandonment studies"] },
    { title: "Operations Analyst", description: "Streamline backend efficiencies and supply chain management.", points: ["Logistics optimization", "Process mapping", "Efficiency benchmarking"] },
];

export default function CareerSection() {
    const [active, setActive] = useState(2);

    return (
        <section className="bg-[#0F0F1A] py-20 md:py-28 text-white overflow-hidden">
            {/* 1440px UNIVERSAL ALIGNMENT */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* HEADER: Defined with Site-Wide Typography */}
                <div className="mb-16 md:mb-24">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="inline-block px-3 py-1 bg-purple-500/10 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-500/20">
                            • Career Horizons
                        </span>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            {/* UNIVERSAL TITLE SIZE */}
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                                Open Doors to a <br />
                                <span className="text-[#8B19E6]">Range of Careers.</span>
                            </h2>
                        </div>
                        
                        <div className="max-w-xs border-l border-white/10 pl-6">
                            <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
                                Expected average CTC in the <span className="text-white font-bold">6 LPA to 7 LPA</span> range for early career Analyst roles.
                            </p>
                        </div>
                    </div>
                </div>

                {/* PREMIUM ACCORDION SLIDER */}
                <div className="flex gap-4 h-[450px] md:h-[500px]">
                    {roles.map((role, index) => (
                        <div
                            key={index}
                            onClick={() => setActive(index)}
                            className={`
                                relative rounded-[2.5rem] overflow-hidden cursor-pointer
                                border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                                ${index === active
                                    ? "flex-[4] bg-white text-gray-900 shadow-[0_40px_80px_-15px_rgba(139,25,230,0.3)]"
                                    : "flex-1 bg-white/5 hover:bg-white/10"
                                }
                            `}
                        >
                            {index === active ? (
                                <div className="flex h-full animate-in fade-in slide-in-from-right-10 duration-700">
                                    {/* CONTENT AREA */}
                                    <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#8B19E6] mb-6">
                                            <Target size={24} />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter">{role.title}</h3>
                                        <p className="text-gray-500 text-sm md:text-base font-medium mb-8 leading-relaxed max-w-md">
                                            {role.description}
                                        </p>
                                        <ul className="space-y-4">
                                            {role.points?.map((point, i) => (
                                                <li key={i} className="flex gap-4 text-xs md:text-sm font-bold text-gray-700">
                                                    <div className="w-1.5 h-1.5 bg-[#8B19E6] rounded-full mt-1.5 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* VISUAL AREA */}
                                    <div className="hidden md:flex w-1/2 bg-purple-50 items-center justify-center p-12">
                                        {role.image ? (
                                            <img src={role.image} alt={role.title} className="max-w-full h-auto drop-shadow-2xl" />
                                        ) : (
                                            <Briefcase size={120} className="text-purple-100" />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <p className="font-black text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/40 vertical-text whitespace-nowrap rotate-180" 
                                       style={{ writingMode: 'vertical-rl' }}>
                                        {role.title}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* PREMIUM CONTROLS */}
                <div className="flex justify-between items-center mt-12 md:mt-16">
                    <div className="flex gap-2">
                        {roles.map((_, i) => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "bg-[#8B19E6] w-12" : "bg-white/10 w-4"}`} />
                        ))}
                    </div>
                    
                    <div className="flex gap-3">
                        <button
                            onClick={() => setActive(active === 0 ? roles.length - 1 : active - 1)}
                            className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#8B19E6] hover:border-transparent transition-all duration-500 group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => setActive(active === roles.length - 1 ? 0 : active + 1)}
                            className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#8B19E6] hover:border-transparent transition-all duration-500 group"
                        >
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}