'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetHomeBannersQuery } from '@/store/api/publicBannerApi';

const HeroBanner = () => {
  const { data, isLoading } = useGetHomeBannersQuery();

  // 🔒 SAFE mapping (prevents empty image crash)
  const slides = (data?.data?.banners || []).filter(
    (b) => b.image?.url
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading || !slides.length) return null;

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative w-full h-[300px] sm:h-[300px] md:h-[380px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src={slide.image.url}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div
              className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r
              from-black/70 via-black/40 to-black/20
              sm:from-black/75 sm:via-black/40 sm:to-black/20"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center banner-content-wrapper">
            <div className="w-full max-w-2xl">
              <div className="text-center sm:text-left">
                <div className="mb-4 flex justify-center sm:justify-start">
                  <span className="text-white text-2xl font-bold">Urs Skill</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-sm md:text-base lg:text-base text-gray-200 mb-4 sm:mb-6 font-light">
                  {slide.subtitle}
                </p>

                <div className="flex justify-center sm:justify-start">
                  <Link
                    href={slide.link || '/courses'}
                    className="inline-block !px-2 !py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Explore Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 sm:h-3 rounded-full transition-all ${index === currentSlide
              ? 'bg-white w-6 sm:w-8'
              : 'bg-white/50 hover:bg-white/75 w-2.5 sm:w-3'
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
