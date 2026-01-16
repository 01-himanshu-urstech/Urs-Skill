'use client';
import React, { useState } from 'react';

const FAQAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 p-6 lg:p-12 max-w-7xl mx-auto">
      {/* Left Section - Title */}
      <div className="lg:w-2/5">
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Frequently Asked Questions
        </h1>
      </div>

      {/* Right Section - FAQ Items */}
      <div className="lg:w-3/5 space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border-b border-gray-200 pb-4"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-start gap-4 text-left group"
            >
              <span className="text-base lg:text-lg font-normal text-gray-900">
                {faq.question}
              </span>
              <span 
                className={`text-2xl text-orange-500 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            
            {openIndex === index && (
              <div className="mt-3 text-gray-600 text-sm lg:text-base animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
