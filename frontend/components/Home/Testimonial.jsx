'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '@/components/ui/VideoSection';

export default function AlumniTestimonials() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardsPerPage = 3;

  const testimonials = [
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      video: '/videos/video1.mp4',
      // name: 'Rachit Vijh',
      position: 'Category Lead',
      company: 'Haldirams',
      logo: '/partners/dodev.webp',
      program: 'eCommerce Executive Learning Program',
      cohort: 'Cohort 4',
      quote: '"urstechsolutionel helped me learn how a brand thinks about a platform and how a platform thinks about brands. This helped me have really meaningful conversations with brands during my role at Blinkit."',
      duration: '0:45'
    },
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      video: '/videos/video2.mp4',
      // name: 'Preethi Puram',
      position: 'Regional Sales Manager',
      company: 'ITC',
      logo: '/partners/workbox.png',
      program: 'eCommerce Executive Learning Program',
      cohort: 'Cohort 3',
      quote: '"Learning from industry mentors who had worked on and solved real world problems was very interesting. The curriculum helped me appreciate the concerns of retailer and sharp focus our offerings for them."',
      duration: '1:20'
    },
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      video: '/videos/video3.mp4',
      // name: 'Lakshita',
      position: 'Bachelor of Arts',
      company: 'Delhi University',
      logo: '/partners/urswriter-removebg-preview.webp',
      program: 'PGP in Applied Marketing',
      cohort: 'Batch of 24',
      quote: '"The peer set at urstechsolutionel is very competitive. The learning here is from the world from the lessons that you learn everyday. If you are somebody who wants to learn world from the leaders in the industry then this is the best place for it."',
      duration: '1:15'
    },
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      video: '/videos/video4.mp4',
      // name: 'Nikhil Agrawal',
      position: 'Marketing Professional',
      company: 'Tech Startup',
      logo: '/logos/company.png',
      program: 'PGP in Applied Marketing',
      cohort: 'Batch of 24',
      quote: '"This has been the most eye opening experience of my life. The mentors are unlike my previous teachers. They bring break down concepts to an elementary level and probe you discover answers. This helps you not only learn concept but also apply it."',
      duration: '1:10'
    },
    {
      thumbnail: '/thumbnail/thumbnail5.avif',
      video: '/videos/video5.mp4',
      // name: 'Ananya Sharma',
      position: 'Brand Manager',
      company: 'Nestle',
      logo: '/logos/nestle.png',
      program: 'eCommerce Executive Learning Program',
      cohort: 'Cohort 5',
      quote: '"The practical approach to learning and real case studies made all the difference. I could immediately apply what I learned to my work."',
      duration: '1:30'
    },
    {
      thumbnail: '/thumbnail/thumbnail6.avif',
      video: '/videos/video6.mp4',
      // name: 'Rohit Kumar',
      position: 'Digital Marketing Lead',
      company: 'Amazon',
      logo: '/logos/amazon.png',
      program: 'PGP in Applied Marketing',
      cohort: 'Batch of 24',
      quote: '"Best investment in my career. The mentors are industry leaders who share real insights."',
      duration: '0:55'
    }
  ];

  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  const goToPrevious = () => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToPage = (pageIndex) => {
    if (pageIndex !== currentPage && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(pageIndex);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section className="py-16 px-6 bg-[#E8E9F3]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              URS SKILL Video Section
            </h2>
            <p className="text-md text-gray-600 max-w-2xl">
              Hear directly from our students how URS SKILL&apos;s Programs have helped them accelerate their professional journey.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={goToPrevious}
              disabled={currentPage === 0 || isAnimating}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages - 1 || isAnimating}
              className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Testimonial Cards Grid with Smooth Animation */}
        <div className="relative overflow-hidden">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{
              animation: isAnimating ? 'fadeInSlide 0.5s ease-in-out' : 'none'
            }}
          >
            {currentTestimonials.map((testimonial, index) => (
              <div
                key={startIndex + index}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Page Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              disabled={isAnimating}
              className={`h-2 rounded-full transition-all duration-500 ease-in-out ${currentPage === index
                ? 'bg-[#4B4E9D] w-8'
                : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
