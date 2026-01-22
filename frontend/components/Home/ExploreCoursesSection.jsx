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
    <section className="py-12 md:py-12 bg-white">
      {/* ALIGNMENT: Identical to Navbar max-width and gutters for pixel-perfect vertical lines */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Premium Minimalist Header */}
        <div className="mb-10 md:mb-16 border-b border-gray-50 pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.4em] leading-none">
                  Academic Programs
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Elevate Your <span className="text-[#8B19E6]">Career</span>
              </h2>
            </div>
            
            <div className="max-w-xs md:border-l border-gray-100 md:pl-8 pb-1">
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Industry-leading programs designed to accelerate your growth in the AI-driven economy.
              </p>
            </div>
          </div>
        </div>

        {/* RESPONSIVE GRID: 
            - 1 column on mobile (max-w for center balance)
            - 2 columns on tablet
            - 3 columns on desktop 
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group w-full transition-all duration-700 ease-out hover:-translate-y-[1px]"
            >
              {/* Ultra-subtle shadow expansion on hover */}
              <div className="transition-shadow duration-700 group-hover:shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] rounded-2xl">
                <CourseCard course={course} />
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}