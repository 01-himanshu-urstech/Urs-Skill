'use client';
import { useState, useEffect } from 'react';
import StatCard from './StatCard';

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      id="stats-section" 
      className="py-20 md:py-28 bg-[#FAFAFB] border-y border-gray-100 overflow-hidden"
    >
      {/* 1440px MASTER ALIGNMENT: Exactly synced with Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* OPTIONAL: Subtle Section Header for Professional Context */}
        <div className="flex flex-col items-center mb-16">
           <span className="text-[#8B19E6] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
             • Impact in Numbers
           </span>
           <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#8B19E6]/30 to-transparent" />
        </div>

        {/* REFINED GRID: Balanced 3-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="relative">
            <StatCard
              target={50}
              suffix="+"
              label="Corporate Programs"
              isVisible={isVisible}
            />
            {/* Minimal Vertical Divider for Desktop */}
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 h-16 w-[1px] bg-gray-200/60" />
          </div>

          <div className="relative">
            <StatCard
              target={98}
              suffix="%"
              label="Learner Satisfaction"
              isVisible={isVisible}
            />
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-0 h-16 w-[1px] bg-gray-200/60" />
          </div>

          <StatCard
            target={10}
            suffix="K+"
            label="Professionals Empowered"
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}