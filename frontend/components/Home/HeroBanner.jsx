'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetHomeBannersQuery } from '@/store/api/publicBannerApi';

const HeroBanner = () => {
  const { data, isLoading } = useGetHomeBannersQuery();

  const slides = (data?.data?.banners || []).filter((b) => b.image?.url);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading || !slides.length) return null;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[520px] lg:h-[600px] overflow-hidden bg-white">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Layer */}
          <div className="absolute inset-0">
            <Image
              src={slide.image.url}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Adjusted overlay to be subtle but ensure text contrast */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />
          </div>

          {/* CONTENT WRAPPER: Matches Navbar alignment exactly */}
          <div className="relative z-20 h-full flex items-center">
            {/* These classes: max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8
                are what align the text to your Logo 
            */}
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl md:max-w-xl">
                {/* Brand label aligned with logo vertical line */}
                <div className="mb-2 flex items-center gap-2">
                  <div className="w-10 h-[2px] bg-[#8B19E6]" />
                  <span className="text-white text-xs md:text-sm font-bold uppercase tracking-[0.3em]">Urs Skill</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 font-medium max-w-lg leading-relaxed">
                  {slide.subtitle}
                </p>

                <Link
                  href={slide.link || '/courses'}
                  className="inline-flex items-center px-8 py-3.5 bg-[#8B19E6] hover:bg-[#7415C1] text-white font-bold rounded-lg transition-all duration-300 shadow-xl active:scale-95"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows: Positioned at far viewport corners */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-between px-2 md:px-4 lg:px-6">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-[#8B19E6] backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/10 text-white group"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="pointer-events-auto w-10 h-10 md:w-14 md:h-14 bg-white/10 hover:bg-[#8B19E6] backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/10 text-white group"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-[#8B19E6] w-10' : 'bg-white/40 w-4 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;