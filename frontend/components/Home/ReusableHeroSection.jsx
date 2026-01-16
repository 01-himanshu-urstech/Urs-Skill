'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ReusableHeroSection = ({ data }) => {
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

  // Default values if data is not provided
  const {
    backgroundImage = '/Hero/fullstackdev1.avif',
    backgroundOpacity = 30,
    stats = {
      count: '10K+',
      title: 'Professionals & Corporate',
      subtitle: 'Learners Trained',
      image: '/Hero/hero-header.png'
    },
    heading = {
      title: 'Master Full Stack Development with AI —',
      subtitle: 'Anywhere, Anytime'
    },
    cta = {
      text: 'Start Your Training Today',
      link: '/shop'
    },
    description = "Join India's most advanced AI-powered Full Stack Development Program — powered by URSSkill and URSTech Solution.",
    textBox = {
      content: 'We empower professionals and teams to build end-to-end web applications integrated with Artificial Intelligence.'
    },
    decorations = [
      {
        id: 1,
        image: '/Hero/d-f1.png',
        width: 60,
        height: 60,
        position: 'top-10 right-10',
        depth: '0.35',
        background: 'from-blue-100 to-blue-200'
      },
      {
        id: 2,
        image: '/Hero/nextjs-icon.webp',
        width: 120,
        height: 120,
        position: 'top-20 right-1/3',
        depth: '-0.35',
        background: null
      },
      {
        id: 3,
        image: '/Hero/d-f3.png',
        width: 100,
        height: 100,
        position: 'bottom-20 right-16',
        depth: '0.3',
        background: 'from-orange-100 to-orange-200'
      },
      {
        id: 4,
        image: '/Hero/d-f4.svg',
        width: 90,
        height: 90,
        position: 'top-1/3 right-4',
        depth: '-0.3',
        background: null
      }
    ]
  } = data || {};

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-16 lg:py-24 overflow-hidden min-h-screen">
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0" 
          style={{ opacity: backgroundOpacity / 100 }}
        >
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

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
            {stats && (
              <div className="flex items-center gap-4">
                {stats.image && (
                  <div className="relative w-48 h-20 flex-shrink-0">
                    <Image 
                      src={stats.image} 
                      alt={stats.title} 
                      width={192} 
                      height={80}
                      className="object-contain"
                    />
                  </div>
                )}
                
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-indigo-900">
                    {stats.count}
                  </div>
                  <div className="text-sm text-gray-600 leading-tight">
                    {stats.title}<br />{stats.subtitle}
                  </div>
                </div>
              </div>
            )}

            {/* Main Heading */}
            {heading && (
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-indigo-900 leading-[1.1]">
                  {heading.title}
                </h1>
                {heading.subtitle && (
                  <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-indigo-900 leading-[1.1]">
                    {heading.subtitle}
                  </h2>
                )}
              </div>
            )}

            {/* CTA Button */}
            {cta && (
              <Link 
                href={cta.link}
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
                <span className="font-semibold">{cta.text}</span>
              </Link>
            )}

            {/* Bottom Text */}
            {description && (
              <div 
                className="text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>

          {/* Right Column */}
          <div 
            ref={parallaxRef}
            className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center"
          >
            {/* Text Box */}
            {textBox && (
              <div className="relative z-10 bg-white/70 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-2xl border border-white/50 max-w-md">
                <div 
                  className="text-gray-700 text-lg lg:text-xl leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: textBox.content }}
                />
              </div>
            )}

            {/* Parallax Decorations */}
            {decorations && decorations.map((decoration) => (
              <div 
                key={decoration.id}
                className={`parallax-layer absolute ${decoration.position} transition-transform duration-200 ease-out ${
                  decoration.background ? `rounded-full overflow-hidden bg-gradient-to-br ${decoration.background} p-3` : ''
                }`}
                data-depth={decoration.depth}
              >
                <Image 
                  src={decoration.image} 
                  alt={`Decoration ${decoration.id}`} 
                  width={decoration.width} 
                  height={decoration.height}
                  className="object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReusableHeroSection;
