'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ArrowRight, Quote, Plus } from 'lucide-react';
import gsap from 'gsap';

export default function VideoSection() {
  const [activeTab, setActiveTab] = useState(0);

  const testimonials = [
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      program: 'eCommerce Executive Learning Program',
      cohort: 'Cohort 4',
      name: 'Priyanka Chopra',
      quote: '“The hands-on methodology at URS Skill completely changed my perspective on platform thinking.”',
    },
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      program: 'PGP in Marketing',
      cohort: 'Batch 24',
      name: 'Rahul Sharma',
      quote: '“Learning from industry mentors who have solved real-world problems was an eye-opener.”',
    },
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      program: 'Applied Marketing',
      cohort: 'Batch 23',
      name: 'Aditi Rao',
      quote: '“The peer set is very competitive. It is the best place if you want to learn from industry leaders.”',
    }
  ];

  useEffect(() => {
    gsap.fromTo(".main-spotlight", 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <section className="py-20 md:py-32 bg-[#F8F9FB] overflow-hidden">
      {/* 1440px ALIGNMENT */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* UNIQUE HEADER: Vertical Stacked Typography */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-[2px] bg-[#8B19E6]"></span>
                <span className="text-[#8B19E6] text-[11px] font-black uppercase tracking-[0.4em]">The Spotlight</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter leading-[0.9]">
              Stories of <br />
              <span className="text-[#8B19E6]">Impact.</span>
            </h2>
          </div>
          <div className="lg:w-2/3 flex items-end">
            <p className="text-gray-500 text-base md:text-lg font-medium max-w-xl leading-relaxed border-l-2 border-purple-100 pl-8">
              Move beyond theory. Watch how our students transition from learners to industry leaders through immersive, real-world execution.
            </p>
          </div>
        </div>

        {/* SPOTLIGHT CANVAS */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* LEFT: Major Feature (Selected Video) */}
          <div className="lg:w-2/3 main-spotlight">
            <div className="relative h-full min-h-[400px] md:min-h-[500px] rounded-[3rem] overflow-hidden group bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]">
              <Image 
                src={testimonials[activeTab].thumbnail} 
                alt="Alumni Spotlight" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/40 text-white rounded-full flex items-center justify-center hover:bg-[#8B19E6] hover:scale-110 transition-all duration-500 shadow-2xl group/play">
                  <Play fill="currentColor" className="ml-1 group-hover:text-white" size={32} />
                </button>
              </div>

              {/* Bottom Content Detail */}
              <div className="absolute bottom-10 left-10 right-10">
                <div className="p-2 bg-purple-50 w-fit rounded-xl text-[#8B19E6] mb-6 shadow-sm">
                   <Quote size={24} fill="currentColor" className="opacity-20" />
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 max-w-2xl tracking-tight">
                  {testimonials[activeTab].quote}
                </h3>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{testimonials[activeTab].cohort}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                    <span className="text-[10px] font-black text-[#8B19E6] uppercase tracking-widest">{testimonials[activeTab].program}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Selector Rail */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {testimonials.map((item, i) => (
              <button 
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex-1 text-left p-6 rounded-[2rem] transition-all duration-500 border ${
                  activeTab === i 
                  ? 'bg-white border-transparent shadow-xl translate-x-2' 
                  : 'bg-transparent border-gray-100 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl overflow-hidden shrink-0 transition-all duration-500 ${activeTab === i ? 'scale-110' : 'grayscale opacity-50'}`}>
                     <Image src={item.thumbnail} alt="" width={48} height={48} className="object-cover h-full" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className={`text-sm font-bold truncate transition-colors ${activeTab === i ? 'text-gray-900' : 'text-gray-400'}`}>
                      {item.program}
                    </h4>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${activeTab === i ? 'text-[#8B19E6]' : 'text-gray-300'}`}>
                      {item.cohort}
                    </p>
                  </div>
                  {activeTab === i && <ArrowRight size={16} className="text-[#8B19E6]" />}
                </div>
              </button>
            ))}

            {/* Premium CTA Link */}
            <button className="mt-4 flex items-center justify-between px-8 py-6 bg-gray-900 text-white rounded-[2.5rem] group hover:bg-[#8B19E6] transition-all duration-500 shadow-lg shadow-gray-200">
               <span className="text-[11px] font-black uppercase tracking-[0.3em]">View All Stories</span>
               <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}