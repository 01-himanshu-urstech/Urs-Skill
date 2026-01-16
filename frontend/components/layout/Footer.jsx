'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');

  const footerData = {
    courses: [
      { name: 'Full Stack Development with AI', href: '/courses/full-stack' },
      { name: 'Business Administration & Management with AI', href: '/courses/business-admin' },
      { name: 'Digital Marketing with AI', href: '/courses/digital-marketing' },
      { name: 'App Development with AI', href: '/courses/app-development' }
    ],
    contacts: [
      {
        name: '15th & 16th Floor, ESquare Building, Plot C-2, Sector 96, Noida, Uttar Pradesh 201301',
        href: 'https://maps.google.com',
        type: 'address'
      },
      { name: '+91 93102 40714', href: 'tel:+919310240714', type: 'phone' },
      { name: 'contact@urstechsolution.com', href: 'mailto:contact@urstechsolution.com', type: 'email' }
    ],
    policyPages: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Refund & Cancellation Policy', href: '/refund-cancellation-policy' },
      { name: 'Terms & Conditions', href: '/terms-conditions' }
    ],
    subscribe: {
      title: 'Subscribe',
      description: 'Get news & updates',
      placeholder: 'Subscribe to our newsletter. Be in trends.'
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#3d4a7d] text-white">
      {/* First Section - 5 Columns with Individual Angled Borders */}
      <div className="relative">
        <div className="container mx-auto px-6 lg:px-12 pt-16 pb-12 lg:pt-20 lg:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Courses Column */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <svg
                className="absolute -top-10 left-0 w-full"
                height="20"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,0 85,0 100,20"
                  fill="none"
                  stroke="#6b7abf"
                  strokeWidth="1.5"
                />
              </svg>

              <h3 className="text-[11px] uppercase tracking-[0.2em] text-gray-300 font-semibold mb-6">
                Courses
              </h3>
              <ul className="space-y-3">
                {footerData.courses.map((item, index) => (
                  <li key={index} className="group">
                    <Link
                      href={item.href}
                      className="text-[14px] text-white hover:text-gray-300 transition-all duration-300 leading-relaxed inline-flex items-center gap-2 relative overflow-hidden"
                    >
                      <span className="relative z-10">
                        {item.name}
                      </span>
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts Column */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <svg
                className="absolute -top-10 left-0 w-full"
                height="20"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,0 85,0 100,20"
                  fill="none"
                  stroke="#6b7abf"
                  strokeWidth="1.5"
                />
              </svg>

              <h3 className="text-[11px] uppercase tracking-[0.2em] text-gray-300 font-semibold mb-6">
                Contacts
              </h3>
              <ul className="space-y-3">
                {footerData.contacts.map((item, index) => (
                  <li key={index} className="group">
                    <Link
                      href={item.href}
                      className="text-[14px] text-white hover:text-gray-300 transition-all duration-300 leading-relaxed block relative"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policy Pages Column */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <svg
                className="absolute -top-10 left-0 w-full"
                height="20"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,0 85,0 100,20"
                  fill="none"
                  stroke="#6b7abf"
                  strokeWidth="1.5"
                />
              </svg>

              <h3 className="text-[11px] uppercase tracking-[0.2em] text-gray-300 font-semibold mb-6">
                Policy Pages
              </h3>
              <ul className="space-y-3">
                {footerData.policyPages.map((item, index) => (
                  <li key={index} className="group">
                    <Link
                      href={item.href}
                      className="text-[14px] text-white hover:text-gray-300 transition-all duration-300 inline-flex items-center gap-2 relative"
                    >
                      <span>
                        {item.name}
                      </span>
                      <svg
                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe Column */}
            <div className="relative lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <svg
                className="absolute -top-10 left-0 w-full"
                height="20"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,0 85,0 100,20"
                  fill="none"
                  stroke="#6b7abf"
                  strokeWidth="1.5"
                />
              </svg>

              <h3 className="text-[11px] uppercase tracking-[0.2em] text-gray-300 font-semibold mb-4">
                {footerData.subscribe.title}
              </h3>
              <p className="text-[14px] text-white mb-4">
                {footerData.subscribe.description}
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-[#2d3965] border border-[#4d5a94] rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#6b7abf] focus:ring-2 focus:ring-[#6b7abf] focus:ring-opacity-50 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-[#3d4a7d] font-semibold rounded hover:bg-gray-100 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-[12px] text-gray-400 mt-2">
                {footerData.subscribe.placeholder}
              </p>

              {/* In Socials */}
              <div className="mt-8">
                <h4 className="text-[11px] uppercase tracking-[0.2em] text-gray-300 font-semibold mb-4">
                  In Socials
                </h4>
                <div className="flex items-center gap-3">
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#4d5a94] flex items-center justify-center text-white hover:bg-[#5d6aa4] hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#4d5a94] flex items-center justify-center text-white hover:bg-[#5d6aa4] hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>

                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#4d5a94] flex items-center justify-center text-white hover:bg-[#5d6aa4] hover:scale-110 hover:shadow-lg active:scale-95 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Copyright & Large Logo */}
      <div className="relative overflow-hidden bg-[#3d4a7d] border-t border-[#4d5a94]">
        <div className="container mx-auto px-6 lg:px-12 py-8 lg:py-12">
          {/* Copyright at top */}
          <div className="text-[13px] text-gray-300 mb-8 animate-fade-in">
            <p>Copyright © 2025 | All Rights Reserved. Designed & developed by UrsTechSolution</p>
          </div>

          {/* Large URS SKILL Text */}
          {/* <div className="relative">
            <h2 className="text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-black text-[#ecedf3] leading-none tracking-tighter -ml-2 lg:-ml-4 hover:text-[#7283c7] transition-colors duration-500">
              Urs Skill
            </h2>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
