'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Specialist Business Education',
      subtitle: 'to Accelerate Careers',
      tags: ['Marketing', 'eCommerce', 'Growth'],
      buttonText: 'Explore Programs',
      buttonLink: '/courses',
      image: '/banners/HeroBanner.jpeg',
    },
    {
      id: 2,
      title: 'Master Digital Marketing',
      subtitle: 'with Industry Experts',
      tags: ['SEO', 'Social Media', 'Analytics'],
      buttonText: 'View Courses',
      buttonLink: '/courses',
      image: '/banners/HeroBanner.jpeg',
    },
    {
      id: 3,
      title: 'Become an eCommerce Pro',
      subtitle: 'Learn from Real Projects',
      tags: ['Amazon', 'Shopify', 'Flipkart'],
      buttonText: 'Get Started',
      buttonLink: '/courses',
      image: '/banners/HeroBanner.jpeg',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative w-full h-[500px] sm:h-[400px] md:h-[450px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image src={slide.image} alt={slide.title} fill className="object-cover" priority={index === 0} />
            <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r
              from-black/90 via-black/70 to-black/40
              sm:from-black/85 sm:via-black/60 sm:to-black/30"></div>
          </div>

          {/* Content - USE CSS CLASS */}
          <div className="relative z-20 h-full flex items-center banner-content-wrapper">
            <div className="w-full max-w-2xl">
              <div className="text-center sm:text-left">
                {/* Logo Text */}
                <div className="mb-4 flex justify-center sm:justify-start">
                  <span className="text-white text-2xl font-bold">Urs Skill</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-sm md:text-base lg:text-base text-gray-200 mb-4 sm:mb-6 font-light">
                  {slide.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6 justify-center sm:justify-start">
                  {slide.tags.map((tag, idx) => (
                    <span key={idx} className="text-white text-sm sm:text-sm md:text-base font-medium">
                      {tag}
                      {idx < slide.tags.length - 1 && <span className="mx-2 sm:mx-3 text-orange-400">|</span>}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center sm:justify-start">
                  <Link
                    href={slide.buttonLink}
                    className="inline-block !px-2 !py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {slide.buttonText}
                  </Link>

                </div>


              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button onClick={prevSlide} className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center transition-all" aria-label="Previous">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button onClick={nextSlide} className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center transition-all" aria-label="Next">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 sm:h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/50 hover:bg-white/75 w-2.5 sm:w-3'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
