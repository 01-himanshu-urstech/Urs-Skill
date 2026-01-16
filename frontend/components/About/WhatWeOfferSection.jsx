'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WhatWeOfferSection() {
  const offerings = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Offline & Corporate Training Options',
      description: 'We deliver hands-on, instructor-led classroom sessions and customized corporate programs that align with your organization\'s goals.',
      highlight: 'Experience the power of interactive, practical learning built to transform technical knowledge into real-world impact.',
      link: '/training/offline'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Learn on Your Time',
      description: 'Our flexible training schedules include weekday, weekend, and corporate batch options, tailored for working professionals and students.',
      highlight: 'URSSkills ensures learning fits seamlessly into your routine — helping you grow without compromising your professional commitments.',
      link: '/training/flexible'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Skill-Based Learning Focus',
      description: 'Our programs are designed to sharpen specific technical competencies — from Full Stack Web Development and AI Integration to Data Analytics and Cloud Deployment.',
      highlight: 'Each course follows a project-based structure, ensuring every learner gains hands-on, job-ready experience.',
      link: '/programs'
    }
  ];

  return (
    <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-[#3d4a7d] via-[#4a5a9d] to-[#3d4a7d] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <div>
            <p className="text-sm md:text-base text-blue-300 font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
              What We Offer
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlock the Future with AI-Powered Skill Development
            </h2>
          </div>
          
          <div className="flex items-center">
            <p className="text-lg md:text-xl text-gray-200">
              At <span className="font-bold text-white">URSSkill</span>, we offer <span className="font-bold text-white">corporate and professional training programs</span> designed by experts from <span className="font-bold text-white">URSTech Solution</span> — an established IT consulting and software development company.
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {offerings.map((offer, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                {offer.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-200 transition-colors">
                {offer.title}
              </h3>

              {/* Description */}
              <p className="text-gray-200 mb-4 leading-relaxed">
                {offer.description}
              </p>

              {/* Highlight */}
              <p className="text-sm text-blue-200 mb-6 leading-relaxed">
                {offer.highlight}
              </p>

              {/* Arrow Button */}
              <Link href={offer.link}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300 cursor-pointer">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
