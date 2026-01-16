'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'month-1-2', label: 'Month 1 & 2', title: 'Build Foundational Skills' },
  { id: 'month-3-4', label: 'Month 3 & 4', title: 'Functional Skills' },
  { id: 'month-5-6', label: 'Month 5 & 6', title: 'Functional Skills Mastery' },
  { id: 'month-7-9', label: 'Month 7 to 9', title: 'Internship' },
  { id: 'month-9-plus', label: 'Month 9+', title: 'Get Placed' },
];

export default function CourseCurriculum() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (el) => el === entry.target
            );
            if (index !== -1) setActive(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#2D1B47]">
      {/* HEADER */}
      <div className="py-24 text-center px-6">
        <h2 className="text-white text-[2em] md:text-[2.25em] font-light leading-[135%]">
          <span className="font-semibold">
            New-Age Curriculum to Level you Up
          </span>
          <br />
          <span className="text-white/80">
            on Key eCommerce & Marketing Skills
          </span>
        </h2>
      </div>

      {/* BODY */}
      <div className="max-w-[1400px] mx-auto flex relative">
        {/* LEFT SIDEBAR */}
        <aside className="w-[280px] shrink-0 hidden md:block ml-16">
          <div className="sticky top-40 pl-10">
            {sections.map((s, i) => (
              <div key={s.id}>
                <button
                  onClick={() =>
                    sectionRefs.current[i]?.scrollIntoView({
                      behavior: 'smooth',
                    })
                  }
                  className="flex items-start gap-3 text-left mb-6"
                >
                  {/* CIRCLE (ORANGE KEPT) */}
                  <span
                    className={`mt-1 h-3 w-3 rounded-full border transition-all ${
                      active === i
                        ? 'bg-[#FF6F2C] border-[#FF6F2C]'
                        : 'border-purple-300/40'
                    }`}
                  />

                  {/* TEXT */}
                  <div>
                    <p className="text-white/70 text-sm">{s.label}</p>
                    <p
                      className={`text-sm font-semibold transition-all ${
                        active === i
                          ? 'text-[#FF6F2C]'
                          : 'text-white/60'
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                </button>

                {i < sections.length - 1 && (
                  <div className="h-6 w-px bg-purple-300/30 ml-[6px]" />
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="flex-1 px-6 md:px-16 pb-32 space-y-10">
          {sections.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              ref={(el) => (sectionRefs.current[i] = el)}
              className="bg-[#F6F1FF] rounded-xl p-8 min-h-[420px]"
            >
              <h3 className="text-[1.6em] font-bold mb-6 text-[#2D1B47]">
                {s.title}
              </h3>

              <div className="h-[220px] flex items-center justify-center text-purple-900/50 text-sm border border-dashed border-purple-300 rounded-lg">
                Replace this block with actual cards/content for <br />
                <strong>{s.title}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
