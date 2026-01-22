'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GraduationCap, Briefcase, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HowWeTeach() {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section Title Animation
            gsap.from(".section-title-reveal", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                }
            });

            // Progressive "Staircase" Reveal
            gsap.from(cardRefs.current, {
                y: 60,
                opacity: 0,
                stagger: 0.2,
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
            {/* 1440px Alignment - Fixed for Website Consistency */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER: Defined Self-Explanation */}
                <div className="section-title-reveal mb-16 md:mb-24">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                            • Our Methodology
                        </span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex-1">
                            {/* UNIVERSAL TITLE SIZE: 3xl to 5xl sync */}
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                                How we <span className="text-[#8B19E6]">Teach</span>
                            </h2>
                        </div>
                        
                        <div className="max-w-xs md:border-l border-gray-100 md:pl-6">
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                Our curriculum is structured as an upward journey, where each phase builds the foundation for your ultimate industry launch.
                            </p>
                        </div>
                    </div>
                </div>

                {/* THE GROWTH LADDER GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
                    
                    {/* PHASE 01: Foundation (Low position) */}
                    <div ref={(el) => (cardRefs.current[0] = el)} className="relative md:mt-20">
                        <GrowthCard
                            phase="01"
                            icon={<GraduationCap size={24} />}
                            title="The Foundation"
                            subtitle="Learn & Master"
                            description="Master industry-critical skills from elite professionals who bring real-world AI strategies to the classroom."
                            image="https://assets.digiaccel.in/website/images/bootcamp/learn-phase.webp"
                        />
                        {/* Connecting Visual Line for Growth */}
                        <div className="hidden md:block absolute -right-8 top-1/2 w-16 h-[2px] bg-gradient-to-r from-[#8B19E6]/20 to-transparent z-0" />
                    </div>

                    {/* PHASE 02: Application (Mid position) */}
                    <div ref={(el) => (cardRefs.current[1] = el)} className="relative md:mt-10">
                        <GrowthCard
                            phase="02"
                            icon={<Briefcase size={24} />}
                            title="The Application"
                            subtitle="Intern & Apply"
                            description="Translate theory into execution by working directly with our partner eCommerce and Media giants."
                            image="https://assets.digiaccel.in/website/images/bootcamp/intern-phase.webp"
                        />
                        <div className="hidden md:block absolute -right-8 top-1/2 w-16 h-[2px] bg-gradient-to-r from-[#8B19E6]/20 to-transparent z-0" />
                    </div>

                    {/* PHASE 03: Elevation (High position) */}
                    <div ref={(el) => (cardRefs.current[2] = el)} className="relative">
                        <GrowthCard
                            phase="03"
                            icon={<Rocket size={24} />}
                            title="The Launch"
                            subtitle="Placement & Impact"
                            description="Step into high-impact Analyst roles with lifetime access to our mentor network and alumni community."
                            image="https://assets.digiaccel.in/website/images/bootcamp/get-placed-phase.webp"
                            isHighImpact
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

/* ---------------- PREMIUM GROWTH CARD COMPONENT ---------------- */

const GrowthCard = ({ phase, title, subtitle, description, image, icon, isHighImpact }) => {
    return (
        <div className="group relative z-10">
            {/* Visual Header with Floating Glass Phase Number */}
            <div className="relative aspect-[16/10] mb-8 rounded-3xl overflow-hidden shadow-sm">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60" />
                
                {/* Glass Phase Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white">
                    <span className="text-xs font-black tracking-tighter">{phase}</span>
                    <div className="w-[1px] h-3 bg-white/30" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{subtitle}</span>
                </div>

                {/* Phase Icon */}
                <div className="absolute bottom-4 right-4 p-3 bg-white rounded-2xl text-[#8B19E6] shadow-xl transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {icon}
                </div>
            </div>

            {/* Content synced with Universal Typography */}
            <div className="px-2">
                <div className="flex items-center gap-3 mb-3">
                    <h3 className={`text-xl font-bold transition-colors duration-300 ${isHighImpact ? 'text-[#8B19E6]' : 'text-gray-900'}`}>
                        {title}
                    </h3>
                    <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#8B19E6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {description}
                </p>

                {/* Progress Bar (Interactive Growth indicator) */}
                <div className="mt-6 w-12 h-[2px] bg-gray-100 overflow-hidden">
                    <div className="h-full bg-[#8B19E6] transition-all duration-700 w-0 group-hover:w-full" />
                </div>
            </div>
        </div>
    );
};