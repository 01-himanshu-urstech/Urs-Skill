'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const footerData = {
    courses: [
      { name: 'Full Stack Development with AI', href: '/courses/full-stack-development' },
      { name: 'Business Administration & Management with AI', href: '/courses/business-administration' },
    ],
    contacts: [
      { name: 'Sector 96, Noida, UP 201301', icon: <MapPin size={16} />, href: '#' },
      { name: '+91 93102 40714', icon: <Phone size={16} />, href: 'tel:+919310240714' },
      { name: 'contact@urstechsolution.com', icon: <Mail size={16} />, href: 'mailto:contact@urstechsolution.com' }
    ],
    policyPages: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Refund Policy', href: '/refund-cancellation-policy' },
      { name: 'Terms & Conditions', href: '/terms-conditions' }
    ]
  };

  return (
    <footer className="bg-[#3d4a7d] text-white overflow-hidden">
      {/* MAIN FOOTER SECTION */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          
          {/* Courses Column with Angled Line */}
          <div className="relative pt-10 group">
            <FooterLine />
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-blue-200 font-bold mb-8">Courses</h3>
            <ul className="space-y-4">
              {footerData.courses.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-[14px] text-white hover:text-blue-200 transition-all duration-300 block hover:translate-x-1">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts Column with Angled Line */}
          <div className="relative pt-10 group">
            <FooterLine />
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-blue-200 font-bold mb-8">Contacts</h3>
            <ul className="space-y-4">
              {footerData.contacts.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="flex items-start gap-3 text-[14px] text-white hover:text-blue-200 transition-colors">
                    <span className="mt-1 opacity-70">{item.icon}</span>
                    <span className="leading-relaxed">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Column with Angled Line */}
          <div className="relative pt-10 group">
            <FooterLine />
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-blue-200 font-bold mb-8">Policy</h3>
            <ul className="space-y-4">
              {footerData.policyPages.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-[14px] text-white hover:text-blue-200 transition-all duration-300 block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe & Social Column (Spans 2 columns) */}
          <div className="relative pt-10 lg:col-span-2 group">
            <FooterLine />
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-blue-200 font-bold mb-6">Subscribe</h3>
            <p className="text-[14px] text-blue-100 mb-6 font-medium">Get news & updates straight to your inbox.</p>
            
            <form className="flex flex-col sm:flex-row gap-3 mb-8">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-[#2d3965] border border-[#4d5a94] rounded-lg px-5 py-3 text-sm text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 transition-all"
              />
              <button className="bg-white text-[#3d4a7d] px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all">
                Subscribe
              </button>
            </form>

            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
              <SocialIcon icon={<Facebook size={20} />} href="#" />
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="bg-[#34406d] border-t border-[#4d5a94]/30 py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-blue-200 font-bold uppercase tracking-[0.2em] opacity-80">
            Copyright © 2026 | UrsTechSolution. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
            <span className="text-[10px] text-white font-black uppercase tracking-[0.5em]">URS SKILL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* --- Angled Line Component --- */
const FooterLine = () => (
  <svg
    className="absolute top-0 left-0 w-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
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
);

/* --- Social Icon Component --- */
const SocialIcon = ({ icon, href }) => (
  <Link href={href} className="w-10 h-10 rounded-full bg-[#4d5a94] flex items-center justify-center text-white hover:bg-white hover:text-[#3d4a7d] transition-all duration-500 hover:-translate-y-1">
    {icon}
  </Link>
);

export default Footer;