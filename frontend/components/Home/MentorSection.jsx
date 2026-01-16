'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function MentorsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const mentors = [
    {
      image: '/profilepic.avif',
      name: 'Ankur Devpura',
      title: 'Ex. Head of eCommerce',
      company: 'GSK',
      logo: '/partners/workbox.png'
    },
    {
      image: '/profilepic.avif',
      name: 'Aalekh Tripathi',
      title: 'Ex Marketing Manager',
      company: 'lovebeauty AND planet',
      logo: '/partners/dodev.webp'
    },
    {
      image: '/profilepic.avif',
      name: 'Atul Mehta',
      title: 'Chief Operating Officer',
      company: 'Shiprocket',
      logo: '/partners/urswriter-removebg-preview.webp'
    },
    {
      image: '/mentors/pearl.jpg',
      name: 'Pearl Shah',
      title: 'Vice President Marketing',
      company: 'Nykaa',
      logo: '/logos/nykaa.png'
    },
    {
      image: '/man.webp',
      name: 'Prakriti Sharma',
      title: 'Marketing Head',
      company: 'Urban Company',
      logo: '/Hero/d-f3.png'
    }
  ];

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % mentors.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const getCardStyle = (offset) => {
    if (offset === 0) {
      // Center card
      return {
        transform: 'translateX(0) scale(1)',
        opacity: 1,
        zIndex: 30,
        filter: 'brightness(1)'
      };
    } else if (offset === -1) {
      // Left card
      return {
        transform: 'translateX(-110%) scale(0.85)',
        opacity: 0.6,
        zIndex: 20,
        filter: 'brightness(0.8)'
      };
    } else if (offset === 1) {
      // Right card
      return {
        transform: 'translateX(110%) scale(0.85)',
        opacity: 0.6,
        zIndex: 20,
        filter: 'brightness(0.8)'
      };
    } else {
      // Hidden cards
      return {
        transform: `translateX(${offset * 110}%) scale(0.7)`,
        opacity: 0,
        zIndex: 10,
        pointerEvents: 'none'
      };
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Mentors
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our mentors comprise of leaders from some of India's Leading Marketing, Tech & Product Organisations.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
          {/* Cards */}
          <div className="relative w-full max-w-[400px] h-full flex items-center justify-center">
            {mentors.map((mentor, index) => {
              const offset = index - currentIndex;
              const normalizedOffset =
                offset > mentors.length / 2
                  ? offset - mentors.length
                  : offset < -mentors.length / 2
                    ? offset + mentors.length
                    : offset;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-600 ease-out"
                  style={getCardStyle(normalizedOffset)}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-2xl w-[380px] hover:shadow-3xl transition-shadow">
                    {/* Profile Image with Border */}
                    <div className="relative mb-6">
                      <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-1">
                        <div className="w-full h-full rounded-full bg-white p-1">
                          <Image
                            src={mentor.image}
                            alt={mentor.name}
                            width={180}
                            height={180}
                            className="w-full h-full rounded-full object-contain"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {mentor.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">
                        {mentor.title}
                      </p>

                      {/* Company Logo */}
                      <div className="flex justify-center">
                        <Image
                          src={mentor.logo}
                          alt={mentor.company}
                          width={120}
                          height={50}
                          className="h-12 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            disabled={isAnimating}
            className="absolute left-4 z-40 w-14 h-14 rounded-full bg-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50"
          >
            <ChevronLeft className="w-7 h-7 text-gray-700" />
          </button>
          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-4 z-40 w-14 h-14 rounded-full bg-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50"
          >
            <ChevronRight className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {mentors.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(idx);
                  setTimeout(() => setIsAnimating(false), 600);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                  ? 'w-8 bg-purple-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
