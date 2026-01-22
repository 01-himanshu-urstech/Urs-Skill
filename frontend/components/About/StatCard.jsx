'use client';
import { useState, useEffect } from 'react';

export default function StatCard({ target, suffix, label, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div className="text-center group p-8 rounded-[2.5rem] transition-all duration-500 hover:bg-[#FAFAFB]">
      {/* BRAND-ALIGNED STAT: Transitioned from blue to Brand Purple */}
      <div className="mb-4">
        <span className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter inline-block group-hover:text-[#8B19E6] transition-colors duration-500">
          {count}
          <span className="text-[#8B19E6] ml-1">{suffix}</span>
        </span>
      </div>

      {/* UNIFIED LABEL: Using font-black and tracking-widest for premium feel */}
      <div className="space-y-2">
        <div className="h-[2px] w-8 bg-purple-100 mx-auto transition-all duration-500 group-hover:w-16 group-hover:bg-[#8B19E6]" />
        <h3 className="text-[10px] lg:text-[12px] font-black text-gray-400 uppercase tracking-[0.3em] leading-tight transition-colors duration-500 group-hover:text-gray-900">
          {label}
        </h3>
      </div>
    </div>
  );
}