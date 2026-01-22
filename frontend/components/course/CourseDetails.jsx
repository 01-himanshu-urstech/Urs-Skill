'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'month-1-2', label: 'Month 1 & 2', title: 'Foundational Skills' },
  { id: 'month-3-4', label: 'Month 3 & 4', title: 'Functional Skills' },
  { id: 'month-5-6', label: 'Month 5 & 6', title: 'Skills Mastery' },
  { id: 'month-7-9', label: 'Month 7 to 9', title: 'Internship' },
  { id: 'month-9-plus', label: 'Month 9+', title: 'Get Placed' },
];

export default function CourseCurriculum() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef([]);
  const navRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActive(index);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="bg-[#2D1B47] py-16 md:py-24">
      {/* HEADER: Unified Typography */}
      <div className="max-w-[1440px] mx-auto px-6 mb-12 md:mb-20 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
           <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-300 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-500/20">
             • Curriculum
           </span>
        </div>
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          New-Age Curriculum <br className="hidden md:block" />
          <span className="text-white/60">to Level you Up</span>
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col md:flex-row relative gap-8 lg:gap-16">
        
        {/* MOBILE STICKY NAV: Minimal change to design logic */}
        <div className="md:hidden sticky top-0 z-40 bg-[#2D1B47]/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-white/5 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 min-w-max">
            {sections.map((s, i) => (
              <button 
                key={s.id} 
                onClick={() => scrollToSection(i)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${active === i ? 'text-[#FF6F2C]' : 'text-white/40'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* LEFT SIDEBAR: Kept original design with slight spacing fix */}
        <aside className="w-[260px] shrink-0 hidden md:block">
          <div className="sticky top-32 space-y-0">
            {sections.map((s, i) => (
              <div key={s.id} className="relative">
                <button
                  onClick={() => scrollToSection(i)}
                  className="flex items-start gap-4 text-left group py-4"
                >
                  <span className={`mt-1.5 h-2.5 w-2.5 rounded-full border-2 transition-all duration-500 shrink-0 ${
                      active === i ? 'bg-[#FF6F2C] border-[#FF6F2C] scale-125 shadow-[0_0_15px_rgba(255,111,44,0.5)]' : 'border-purple-300/20'
                    }`}
                  />
                  <div>
                    <p className={`text-[10px] uppercase font-black tracking-widest transition-opacity ${active === i ? 'text-white opacity-100' : 'text-white/30'}`}>
                      {s.label}
                    </p>
                    <p className={`text-sm font-bold transition-all mt-1 ${active === i ? 'text-[#FF6F2C]' : 'text-white/20 group-hover:text-white/40'}`}>
                      {s.title}
                    </p>
                  </div>
                </button>
                {i < sections.length - 1 && (
                  <div className="absolute left-[4.5px] top-10 bottom-0 w-[1px] bg-white/5" />
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT: Synced with CourseCard alignment */}
        <div className="flex-1 space-y-8 md:space-y-12">
          {sections.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => (sectionRefs.current[i] = el)}
              className={`bg-white rounded-[2rem] p-8 md:p-12 min-h-[400px] transition-all duration-700 ${active === i ? 'opacity-100 translate-x-0' : 'opacity-40 scale-[0.98]'}`}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[#FF6F2C] font-black text-xs uppercase tracking-widest">Phase 0{i+1}</span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-[#2D1B47] mb-8 tracking-tight">
                {s.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                 <div className="space-y-4">
                    <p className="text-gray-500 font-medium leading-relaxed">
                      Deep dive into industry-ready skills with master-led sessions and hands-on case studies designed for the modern AI economy.
                    </p>
                    <ul className="space-y-3">
                       {['Advanced Excel', 'Growth Frameworks', 'Market Analysis'].map((item) => (
                         <li key={item} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                           <div className="h-1.5 w-1.5 rounded-full bg-[#FF6F2C]" /> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="h-[200px] bg-purple-50 rounded-2xl flex items-center justify-center border border-dashed border-purple-200">
                    <span className="text-[10px] font-black uppercase text-purple-300 tracking-widest">Module Visualization</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}