'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Questions' },
  { id: 'program', label: 'Program Details' },
  { id: 'eligibility', label: 'Eligibility & Outcomes' },
  { id: 'fees', label: 'Fees & Admissions' },
];

const faqs = [
  {
    id: 1,
    category: 'program',
    question: 'Where is the program conducted?',
    answer: 'The program is primarily conducted in-person at our premium Cyber City campus, with dedicated weekend sessions and hybrid components for weekday projects.',
  },
  {
    id: 2,
    category: 'program',
    question: 'What is the duration and structure of the program?',
    answer: 'The program runs for a rigorous 6 to 9 months, including classroom learning, real-world projects, and strategic industry mentorship.',
  },
  {
    id: 3,
    category: 'fees',
    question: 'Are scholarships available?',
    answer: 'Yes, merit-based scholarships are available for eligible candidates to ensure top talent has access to our learning ecosystem.',
  },
  {
    id: 4,
    category: 'fees',
    question: 'Are EMI or financing options available?',
    answer: 'Flexible EMI and zero-interest financing options are available to help you manage your investment in your future.',
  },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(1);

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <section className="bg-white py-20 md:py-28 border-b border-gray-100">
      {/* 1440px Master Alignment */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER: Unified 3xl/5xl Title Scale */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
              • Support Center
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Frequently Asked <br />
                <span className="text-[#8B19E6]">Questions.</span>
              </h2>
            </div>
            
            <p className="max-w-xs text-gray-500 text-sm md:text-base font-medium leading-relaxed border-l-2 border-purple-100 pl-6">
              Find answers to common queries about our methodology, career outcomes, and enrollment process.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* DESKTOP SIDEBAR: Premium Navigation */}
          <div className="hidden lg:block w-1/4">
            <div className="sticky top-32 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-6 py-4 text-xs font-black uppercase tracking-widest rounded-2xl transition-all duration-300
                    ${activeCategory === cat.id
                      ? 'bg-[#8B19E6] text-white shadow-lg shadow-purple-100 translate-x-2'
                      : 'bg-transparent text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* MOBILE TABS: Sticky Navigation */}
          <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md py-4 -mx-4 px-4 overflow-x-auto no-scrollbar border-b border-gray-100">
            <div className="flex gap-4 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-all
                    ${activeCategory === cat.id
                      ? 'bg-[#8B19E6] border-[#8B19E6] text-white'
                      : 'bg-white border-gray-200 text-gray-400'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ LIST: Minimalist Interaction */}
          <div className="flex-1">
            <div className="divide-y divide-gray-100">
              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="group py-8 transition-all duration-500 cursor-pointer"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                  >
                    <div className="flex justify-between items-start gap-6">
                      <div className="flex gap-4">
                        <HelpCircle className={`w-5 h-5 shrink-0 transition-colors duration-500 ${isOpen ? 'text-[#8B19E6]' : 'text-gray-200 group-hover:text-gray-400'}`} />
                        <span className={`text-base md:text-lg font-bold transition-colors duration-500 ${isOpen ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {faq.question}
                        </span>
                      </div>

                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 
                        ${isOpen ? 'bg-[#8B19E6] border-[#8B19E6] text-white' : 'border-gray-200 text-gray-400'}`}>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        />
                      </div>
                    </div>

                    {/* ANSWER: Smooth Accordion Transition */}
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] mt-6 opacity-100' : 'grid-rows-[0fr] mt-0 opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium pl-9">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* CTA: Integrated Support Link */}
            <div className="mt-12 p-8 bg-gray-50 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
               <p className="text-gray-600 text-sm font-bold tracking-tight">Still have questions about the ecosystem?</p>
               <button className="px-8 py-3 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#8B19E6] hover:text-white hover:border-transparent transition-all duration-500">
                  Connect with Mentors
               </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}