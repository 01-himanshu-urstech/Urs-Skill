'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSectionWithTextBox = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;
      
      const layers = parallaxRef.current.querySelectorAll('.parallax-layer');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth);
        const moveX = (clientX - innerWidth / 2) * depth;
        const moveY = (clientY - innerHeight / 2) * depth;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-10 lg:py-16 overflow-hidden ">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/Hero/worldmap.avif"
          alt="World Map"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-indigo-900 text-white p-4 rounded-full shadow-lg hover:bg-indigo-800 transition-all hover:scale-110 z-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
          {/* Left Column */}
          <div className="space-y-6 lg:space-y-8 pt-8 lg:pt-0">
            {/* Stats Badge */}
            <div className="flex items-center gap-4">
            {/* Single Image Container with all 3 profiles */}
            <div className="relative w-48 h-20 flex-shrink-0">
                <Image 
                src="/Hero/hero-header.png" 
                alt="Professionals trained" 
                width={192} 
                height={80}
                className="object-contain"
                />
            </div>
            
            <div>
                <div className="text-4xl lg:text-5xl font-bold text-indigo-900">
                10K+
                </div>
                <div className="text-sm text-gray-600 leading-tight">
                Professionals & Corporate<br />Learners Trained
                </div>
            </div>
            </div>


            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-indigo-900 leading-[1.1]">
                Master Full Stack Development with AI —
              </h1>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-indigo-900 leading-[1.1]">
                Anywhere, Anytime
              </h2>
            </div>

            {/* CTA Button */}
            <Link 
              href="/shop"
              className="inline-flex items-center gap-3 bg-indigo-900 text-white px-8 py-4 rounded-lg hover:bg-indigo-800 transition-all hover:shadow-xl hover:scale-105 group"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="16" 
                viewBox="0 0 18 16"
                className="group-hover:translate-x-1 transition-transform"
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M0 7.99999C0 7.70162 0.118527 7.41547 0.329505 7.20449C0.540484 6.99351 0.826631 6.87499 1.125 6.87499H14.1593L9.3285 2.04649C9.11726 1.83524 8.99858 1.54873 8.99858 1.24999C8.99858 0.951242 9.11726 0.664732 9.3285 0.453487C9.53974 0.242242 9.82625 0.123566 10.125 0.123566C10.4237 0.123566 10.7103 0.242242 10.9215 0.453487L17.6715 7.20349C17.7763 7.30799 17.8594 7.43213 17.9161 7.56881C17.9728 7.70549 18.002 7.85201 18.002 7.99999C18.002 8.14796 17.9728 8.29449 17.9161 8.43116C17.8594 8.56784 17.7763 8.69199 17.6715 8.79649L10.9215 15.5465C10.7103 15.7577 10.4237 15.8764 10.125 15.8764C9.82625 15.8764 9.53974 15.7577 9.3285 15.5465C9.11726 15.3352 8.99858 15.0487 8.99858 14.75C8.99858 14.4512 9.11726 14.1647 9.3285 13.9535L14.1593 9.12499H1.125C0.826631 9.12499 0.540484 9.00646 0.329505 8.79548C0.118527 8.58451 0 8.29836 0 7.99999Z"
                />
              </svg>
              <span className="font-semibold">Start Your Training Today</span>
            </Link>

            {/* Bottom Text */}
            <p className="text-base text-gray-700">
              Join India&apos;s most advanced{' '}
              <strong className="text-indigo-900">AI-powered</strong>
            </p>
          </div>

          {/* Right Column - Text Box with Parallax Background */}
          <div 
            ref={parallaxRef}
            className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center"
          >
            {/* Text Box */}
            <div className="relative z-10 bg-white/70 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-2xl border border-white/50 max-w-md">
              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
                We empower professionals and teams to build{' '}
                <strong className="text-indigo-900">
                  end-to-end web applications integrated with Artificial Intelligence
                </strong>
                .
              </p>
            </div>

            {/* Parallax Images */}
            <div 
              className="parallax-layer absolute top-10 right-10 transition-transform duration-200 ease-out"
              data-depth="0.35"
            >
              <Image 
                src="/Hero/h-f1.webp" 
                alt="Decoration 1" 
                width={120} 
                height={80}
                className="object-contain"
              />
            </div>

            <div 
              className="parallax-layer absolute top-20 right-1/3 transition-transform duration-200 ease-out"
              data-depth="-0.35"
            >
              <Image 
                src="/Hero/h-f2.webp" 
                alt="Decoration 2" 
                width={240} 
                height={180}
                className="object-contain"
              />
            </div>

            <div 
              className="parallax-layer absolute bottom-20 right-16 transition-transform duration-200 ease-out"
              data-depth="0.3"
            >
              <Image 
                src="/Hero/h-f3.webp" 
                alt="Decoration 3" 
                width={120} 
                height={100}
                className="object-contain"
              />
            </div>

            <div 
              className="parallax-layer absolute top-1/3 right-4 transition-transform duration-200 ease-out"
              data-depth="-0.3"
            >
              <Image 
                src="/Hero/h-f4.webp" 
                alt="Decoration 4" 
                width={160} 
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionWithTextBox;
