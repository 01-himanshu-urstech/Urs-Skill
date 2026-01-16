"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "@/components/ui/CourseCard";

export default function ExploreCoursesSection() {
  const courses = [
    {
      id: 1,
      title: "AI-Powered Full Stack Development Corporate Training Program",
      category: "Full Stack Development",
      image: "/Courses/full-stack-Development.png",
      originalPrice: 99999,
      price: 49999,
      duration: "9 Months",
      mode: "Hybrid",
      onSale: true,
      features: [
        "Weekend On Campus",
        "Weekdays Hybrid",
        "Industry Projects"
      ],
      link: "/courses/full-stack-development"
    },
    {
      id: 2,
      title: "MBA-Pro: AI-Powered Business Administration Mastery Corporate Training Program",
      category: "Business Administration & Management",
      image: "/Courses/image1.png",
      originalPrice: 99999,
      price: 49999,
      duration: "6-8 Months",
      mode: "Hybrid",
      onSale: true,
      features: [
        "UG/PG | 0-5 YRS WORK EX",
        "Diploma/Campus Program",
        "Program Starts Feb '26"
      ],
      link: "/courses/business-administration"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 3;
  const maxSlide = Math.max(0, courses.length - itemsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 animate-fade-in-up">
          <div>
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 text-sm font-bold rounded-full mb-4">
              • Our Courses
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              Explore Our Courses
            </h2>
            <p className="text-lg md:text-md text-gray-600">
              Discover industry-leading programs designed to accelerate your career.
            </p>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden lg:flex items-center gap-4 mt-6 lg:mt-0">
            <Link
              href="/courses"
              className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View All Courses
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-900 disabled:hover:scale-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
                className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-900 disabled:hover:scale-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div> */}
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 "
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`
            }}
          >
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3 py-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All & Navigation */}
        <div className="flex lg:hidden flex-col items-center gap-4 mt-8">
          <Link
            href="/courses"
            className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
          >
            View All Courses
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Mobile Navigation */}
          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === maxSlide}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        {/* <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index
                ? 'w-8 bg-blue-600'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}

        {/* Stats Section */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Expert Trainers</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600 font-medium">Students Trained</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div className="text-gray-600 font-medium">Courses Offered</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600 font-medium">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Animations CSS */}
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

        .animate-fade-in-up {
          animation: fade-in-up 0.8s  forwards;
        }
      `}</style>
    </section>
  );
}
