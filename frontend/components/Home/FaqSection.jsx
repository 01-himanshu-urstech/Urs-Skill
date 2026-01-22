'use client';
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // HARDCODED DATA PRESERVED
  const faqs = [
    {
      question: "How is URS Skill different from academic learning / other similar online programs?",
      answer: "URS Skill focuses on practical, industry-relevant skills with hands-on projects and real-world applications. Unlike traditional academic programs, we emphasize learning by building actual projects, working with modern tech stacks, and gaining job-ready skills that employers are looking for right now."
    },
    {
      question: "I am unsure about the correct program for me. Can I connect with someone from URS Skill's team before deciding?",
      answer: "Yes, absolutely! You can reach out to our team for a free consultation to discuss your career goals, current skill level, and find the perfect program that aligns with your objectives. We're here to guide you in making the right decision for your learning journey."
    },
    {
      question: "Can I learn without affecting other commitments at my current job?",
      answer: "Yes! Our programs are designed to be flexible and self-paced, allowing you to learn at your own schedule. You can balance your learning with your job, studies, or other commitments. Most students dedicate 8-10 hours per week and successfully complete the programs while working full-time."
    },
    {
      question: "Will the learning be through live or pre-recorded videos?",
      answer: "We offer a hybrid learning approach with pre-recorded video lectures that you can watch anytime, combined with live doubt-clearing sessions, mentorship calls, and project review sessions. This gives you the flexibility to learn at your pace while still getting real-time support when needed."
    },
    {
      question: "Does URS Skill conduct upskilling programs for corporates?",
      answer: "Yes, we provide customized corporate training programs for teams looking to upskill in modern web development, full-stack technologies, and other in-demand tech skills. Our programs can be tailored to your organization's specific needs and technology stack. Contact us to discuss corporate training solutions."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 md:py-16">
      {/* ALIGNMENT: Exactly synced with Navbar and Courses grid constraints */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT SECTION: Synchronized Title Hierarchy */}
          <div className="lg:w-2/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                • Help Center
              </span>
            </div>
            {/* Unified Title Size: 3xl on mobile, 5xl on desktop */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Frequently <br className="hidden md:block" />
              Asked <span className="text-[#8B19E6]">Questions</span>
            </h2>
            <p className="mt-6 text-gray-500 text-sm md:text-base font-medium leading-relaxed max-w-sm">
              Find answers to common queries about our methodology and professional programs.
            </p>
          </div>

          {/* RIGHT SECTION: Premium Minimalist Accordion */}
          <div className="lg:w-3/5">
            <div className="border-t border-gray-100">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div 
                    key={index}
                    className={`border-b border-gray-100 transition-all duration-500 ${isOpen ? 'bg-gray-50/50' : 'bg-transparent'}`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full py-6 md:py-8 flex justify-between items-start gap-6 text-left group transition-all"
                    >
                      <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-[#8B19E6]' : 'text-gray-900'}`}>
                        {faq.question}
                      </span>
                      <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-[#8B19E6] rotate-45' : 'bg-gray-100'}`}>
                        <Plus className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] pb-8' : 'max-h-0'}`}
                    >
                      <div className="pr-12 text-gray-500 text-sm md:text-base font-medium leading-relaxed border-l-2 border-[#8B19E6] ml-1 pl-6">
                        {faq.answer}
                      </div>
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
};

export default FAQAccordion;