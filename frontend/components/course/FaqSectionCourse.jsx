'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'program', label: 'Program Details' },
  { id: 'eligibility', label: 'Eligibility & Outcomes' },
  { id: 'fees', label: 'Fees & Admissions' },
];

const faqs = [
  {
    id: 1,
    category: 'program',
    question: 'Where is the program conducted?',
    answer:
      'The AMP is primarily an offline program, conducted in person at the Cyber City campus over the weekends, with some online components during the week for projects and guided learning.',
  },
  {
    id: 2,
    category: 'program',
    question: 'What is the duration and structure of the program?',
    answer:
      'The program runs for 6 months with classroom learning, projects, and mentorship.',
  },
  {
    id: 3,
    category: 'fees',
    question: 'Are scholarships available?',
    answer:
      'Yes, scholarships are available based on merit and eligibility.',
  },
  {
    id: 4,
    category: 'fees',
    question: 'Are EMI or financing options available?',
    answer:
      'Yes, flexible EMI and financing options are available.',
  },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState(1);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section className="bg-gradient-to-b from-white to-[#FCFFF9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-[5.6em] py-20">

{/* HEADING */}
<div className="mb-10 sm:text-center lg:text-left">
  <h2 className="text-[2.25em] sm:text-[1.75em] font-jakarta font-[300] leading-[135%] text-[#2C2C2C]">
    <span className="font-[600]">Frequently</span>
    <br />
    Asked Questions
  </h2>
</div>


        {/* MOBILE TABS */}
        <div className="lg:hidden mb-8 overflow-x-auto no-scrollbar">
          <div className="flex border rounded-md overflow-hidden min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 text-sm whitespace-nowrap border-r last:border-r-0 transition
                  ${
                    activeCategory === cat.id
                      ? 'bg-[#3B432C] text-white'
                      : 'bg-white text-[#000F38]'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-24">

          {/* DESKTOP LEFT SIDEBAR */}
          <div className="hidden lg:block w-[27%]">
            <div className="border rounded-md overflow-hidden shadow-[0_12px_25px_rgba(98,105,86,0.05)]">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-6 py-4 text-sm border-b last:border-b-0 transition
                    ${
                      activeCategory === cat.id
                        ? 'bg-[#3B432C] text-white font-medium'
                        : 'bg-white text-[#000F38]'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ LIST */}
          <div className="flex-1 bg-white shadow-[0_0_35px_rgba(98,105,86,0.05)] max-h-[38em] overflow-hidden">
            <div className="max-h-[38em] overflow-y-auto no-scrollbar">

              {filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className="px-8 py-7 border-b border-[rgba(120,120,122,0.15)] cursor-pointer"
                    onClick={() =>
                      setOpenId(isOpen ? null : faq.id)
                    }
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[0.9em] font-[600] text-[#2C2C2C]">
                        {faq.question}
                      </span>

                      <div className="ml-4 w-5 h-5 border border-[#2C2C2C] rounded-full flex items-center justify-center">
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            isOpen ? 'rotate-0' : 'rotate-180'
                          }`}
                        />
                      </div>
                    </div>

                    {/* ANSWER */}
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <p className="overflow-hidden text-[#78787A] text-[0.87em] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
