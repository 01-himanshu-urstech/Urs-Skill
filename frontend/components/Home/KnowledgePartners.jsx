'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function KnowledgePartners() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal
      gsap.from('.kp-heading', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });

      // Staggered Card Entrance
      gsap.from(cardRefs.current, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // Ultra-smooth Background Floating
      gsap.to(bgRef.current, {
        backgroundPosition: '100% 0%',
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-16 bg-white"
    >
      {/* Premium Animated Mesh Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 0% 0%, #F6F3FF 0%, transparent 50%), radial-gradient(circle at 100% 100%, #F0F7FF 0%, transparent 50%), radial-gradient(circle at 50% 50%, #FFFFFF 0%, transparent 100%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        
        {/* Concise Header */}
        <div className="kp-heading text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-[#8B19E6]/40" />
            <span className="text-[#8B19E6] text-xs font-bold uppercase tracking-[0.3em]">Proud Knowledge Partners to</span>
            <div className="h-[1px] w-8 bg-[#8B19E6]/40" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Urs Group of <span className="text-[#8B19E6]">Companies</span>
          </h2>
        </div>

        {/* Premium Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
          
          {/* Card 1 */}
          <div className="w-full flex justify-center" ref={(el) => (cardRefs.current[0] = el)}>
            <CardShell>
              <img
                src="/partners/urstechsolution-logo.webp"
                alt="Urs Tech Solution"
                className="max-h-[65px] md:max-h-[85px] w-auto object-contain transition-all duration-700 group-hover:scale-110"
              />
            </CardShell>
          </div>

          {/* Minimalist Divider */}
          <div className="hidden md:flex items-center justify-center opacity-20">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
          </div>

          {/* Card 2 */}
          <div className="w-full flex justify-center" ref={(el) => (cardRefs.current[1] = el)}>
            <CardShell>
              <img
                src="/partners/urswriter-removebg-preview.webp"
                alt="Urs Writer"
                className="max-h-[65px] md:max-h-[85px] w-auto object-contain transition-all duration-700 group-hover:scale-110"
              />
            </CardShell>
          </div>

        </div>
      </div>
    </section>
  );
}

function CardShell({ children }) {
  return (
    <div
      className="
        group
        relative
        w-full max-w-[480px]
        h-[200px] md:h-[260px]
        bg-white/50 backdrop-blur-sm
        border border-gray-100
        rounded-[40px]
        flex items-center justify-center
        px-12
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:bg-white
        hover:shadow-[0_30px_60px_-15px_rgba(139,25,230,0.12)]
        hover:border-[#8B19E6]/20
        cursor-pointer
        overflow-hidden
      "
    >
      {/* Subtle Inner Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B19E6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}