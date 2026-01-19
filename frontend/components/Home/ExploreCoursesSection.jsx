"use client";
import { useState } from "react";
import CourseCard from "@/components/ui/CourseCard";

export default function ExploreCoursesSection() {
  const courses = [
    {
      id: 1,
      title: "AI-Powered Full Stack Development Corporate Training Program",
      category: "Full Stack Development",
      image: "/Courses/full-stack-Development.png",
      duration: "9 Months",
      link: "/courses/full-stack-development",
    },
    {
      id: 2,
      title: "MBA-Pro: AI-Powered Business Administration Mastery Corporate Training Program",
      category: "Business Administration & Management",
      image: "/Courses/image1.png",
      duration: "6-8 Months",
      link: "/courses/business-administration",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerView = 3;

  return (
    <section className="py-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-24">

        {/* Header */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 text-sm font-bold rounded-full mb-4">
            • Our Courses
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Explore Our Courses
          </h2>
          <p className="text-gray-600">
            Discover industry-leading programs designed to accelerate your career.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            className="
              flex
              overflow-x-auto
              lg:overflow-hidden
              snap-x snap-mandatory
              scroll-smooth
              no-scrollbar
              transition-transform duration-700
            "
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="
                  w-[85%] sm:w-[70%] md:w-1/2 lg:w-1/3
                  flex-shrink-0
                  snap-center
                  px-3 py-6
                "
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
