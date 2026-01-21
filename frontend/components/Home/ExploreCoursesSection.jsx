"use client";
import CourseCard from "@/components/ui/CourseCard";
import { STATIC_COURSES } from "@/app/(root)/constants/constant";

export default function ExploreCoursesSection() {
  // Mapping the UI details to the static IDs (1 and 2)
  const courses = [
    {
      ...STATIC_COURSES[1], // Provides id: 1, name, price
      category: "Full Stack Development",
      image: "/Courses/full-stack-Development.png",
      alt: "Full Stack Development Course Thumbnail",
      duration: "9 Months",
      link: "/courses/full-stack-development", 
    },
    {
      ...STATIC_COURSES[2], // Provides id: 2, name, price
      category: "Business Administration & Management",
      image: "/Courses/image1.png",
      duration: "6-8 Months",
      alt: "Business Administration Course Thumbnail",  
      link: "/courses/business-administration",   
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-24">
        <div className="mb-10">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 text-sm font-bold rounded-full mb-4">
            • Our Courses
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Explore Our Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}