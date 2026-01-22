'use client';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden bg-white border-b border-gray-100">
      {/* 1440px MASTER ALIGNMENT: Syncs with Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Grid: Stacks on mobile, side-by-side on lg screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* TEXT BLOCK: Hierarchy and Brand Accents */}
          <div className="animate-fade-in-up order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                • Our Legacy
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.2] lg:leading-[1.1]">
              Empowering Professionals with <br className="hidden sm:block" />
              <span className="text-[#8B19E6]">Future-Ready Skills.</span>
            </h1>
            
            <div className="space-y-6 border-l-2 border-purple-100 pl-6 md:pl-8">
              <p className="text-gray-500 text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                Welcome to <span className="text-gray-900 font-bold">URSSkill</span>, the upskilling division of <span className="text-gray-900 font-bold">URSTech Solution</span>. We bridge the gap between academic theory and high-impact industry needs.
              </p>
              
              <p className="text-gray-500 text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                Our <span className="text-[#8B19E6] font-bold">AI-integrated programs</span> prepare individuals and corporate teams to thrive in the modern digital ecosystem through hands-on technical expertise.
              </p>
            </div>
          </div>

          {/* IMAGE BLOCK: Premium framing */}
          <div className="relative animate-fade-in-right order-1 lg:order-2">
            <div className="relative z-10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(139,25,230,0.2)] border border-gray-100">
              <Image
                src="/About/utpalrai.jpg"
                alt="URS Skill Leadership"
                width={800}
                height={900}
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                priority
              />
            </div>
            
            {/* Theme Accents: Decorative Glows */}
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-32 h-32 md:w-64 md:h-64 bg-purple-50 rounded-full blur-2xl md:blur-3xl -z-10 opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-24 h-24 md:w-40 md:h-40 border-2 border-purple-100 rounded-[2rem] -z-10 opacity-50"></div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s;
          opacity: 0;
        }
        /* Mobile adjustment for animations */
        @media (max-width: 1024px) {
          .animate-fade-in-right { animation-name: fade-in-up; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}