'use client';
import Link from 'next/link';
import { ArrowRight, Globe, Zap, Layers } from 'lucide-react';

export default function WhatWeOfferSection() {
  const offerings = [
    {
      icon: <Globe size={28} />,
      title: 'Offline & Corporate Training',
      description: 'We deliver instructor-led classroom sessions and customized programs that align with global organizational goals.',
      highlight: 'Built to transform technical knowledge into real-world professional impact.',
      link: '/training/offline'
    },
    {
      icon: <Zap size={28} />,
      title: 'Learn on Your Time',
      description: 'Flexible schedules including weekday and weekend batches, tailored for working professionals and students.',
      highlight: 'Growth that fits seamlessly into your routine without compromising commitments.',
      link: '/training/flexible'
    },
    {
      icon: <Layers size={28} />,
      title: 'Skill-Based Learning',
      description: 'Programs designed to sharpen competencies in Full Stack Web Development, AI Integration, and Cloud Deployment.',
      highlight: 'Every course follows a project-based structure for job-ready experience.',
      link: '/programs'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#0F0F1A] text-white relative overflow-hidden border-b border-white/5">
      {/* 1440px MASTER ALIGNMENT: Exactly synced with Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Unified 3xl/5xl Scale */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 bg-purple-500/10 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-500/20">
                • Our Ecosystem
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Unlock the Future with <br />
              <span className="text-[#8B19E6]">AI-Powered Development.</span>
            </h2>
          </div>
          
          <div className="max-w-md border-l border-white/10 pl-8 pt-2">
            <p className="text-gray-400 text-base md:text-lg font-medium leading-relaxed">
              Designed by experts from <span className="text-white font-bold">URSTech Solution</span> — bridging the gap between traditional learning and modern industry needs.
            </p>
          </div>
        </div>

        {/* Cards Grid: High-Density Minimalist */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {offerings.map((offer, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-10 transition-all duration-700 hover:bg-white/[0.06] hover:shadow-[0_40px_80px_-15px_rgba(139,25,230,0.15)] hover:-translate-y-2 overflow-hidden"
            >
              {/* Subtle Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />

              {/* Icon Container: Classic Premium Style */}
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#8B19E6] mb-8 transition-transform group-hover:scale-110">
                {offer.icon}
              </div>

              {/* Title & Description: High Readability Hierarchy */}
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-[#8B19E6] transition-colors">
                {offer.title}
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-medium">
                {offer.description}
              </p>

              <div className="pt-6 border-t border-white/5">
                <p className="text-xs md:text-sm text-[#8B19E6] mb-8 font-black uppercase tracking-widest leading-relaxed">
                   {offer.highlight}
                </p>

                {/* CTA Hub: Integrated Interaction */}
                <Link href={offer.link} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-[#8B19E6] transition-colors">
                   View Program Details
                   <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:border-[#8B19E6] group-hover:bg-[#8B19E6]">
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}