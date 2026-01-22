import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Monitor, Calendar } from "lucide-react";

export default function CourseCard({ course }) {
  const safeHref = course.link || "#";

  return (
    <Link href={safeHref} className="block group">
      {/* OUTER CARD: Clean white with premium shadow lift */}
      <div className="bg-white rounded-[24px] p-3 h-[520px] 
        border border-gray-100 transition-all duration-700 ease-out 
        hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(139,25,230,0.15)]">

        <div className="flex flex-col h-full rounded-[20px] overflow-hidden">
          
          {/* 1. SECTION DEFINITION: The Visual Hook */}
          <div className="relative w-full h-[200px] flex-shrink-0 rounded-[18px] overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Soft brand overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent" />
            
          
          </div>

          {/* 2. CONTENT AREA: Clean Hierarchy */}
          <div className="flex flex-col px-3 flex-1 mt-6">
            
            {/* CATEGORY & PROGRAM DEFINITION */}
            <div className="text-[#8B19E6] font-bold text-[14px] uppercase tracking-[0.3em] mb-2">
              {course.category}
            </div>

            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
              {course.title}
            </h3>

            {/* ELIGIBILITY: Clear and Classic */}
            <div className="text-gray-400 font-bold text-[11px] uppercase tracking-wider mb-6">
              UG / PG | 0–5 Yrs Work Ex
            </div>

            {/* INFO GRID: Replaced icons with Lucide for a "Premium Tech" look */}
            <div className="grid grid-cols-2 gap-y-6 text-gray-600 mb-8">
              <InfoItem
                title={course.duration}
                subtitle="Incl. Internship"
                icon={<Clock size={18} className="text-[#8B19E6]" />}
              />
              <InfoItem
                title="Hybrid"
                subtitle="Flexible Mode"
                icon={<Monitor size={18} className="text-[#8B19E6]" />}
              />
              <InfoItem
                title="Gurugram"
                subtitle="On-Campus"
                icon={<MapPin size={18} className="text-[#8B19E6]" />}
              />
              <InfoItem
                title="Starts"
                subtitle="Feb ’26"
                icon={<Calendar size={18} className="text-[#8B19E6]" />}
              />
            </div>

            {/* 3. CTA: Integrated Growth Action */}
            <div className="mt-auto pb-2">
              <div className="h-[52px] rounded-2xl bg-[#8B19E6] hover:bg-[#7014ba] flex items-center justify-between px-6 transition-all duration-500 shadow-lg shadow-purple-100 group-hover:shadow-purple-200">
                <span className="text-white font-bold text-[14px] uppercase tracking-widest">
                  View Program
                </span>
                <div className="transition-transform duration-500 group-hover:translate-x-1">
                   <ArrowRight className="text-white" size={20} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
}

/* REUSABLE INFO ITEM - Premium Layout */
function InfoItem({ title, subtitle, icon }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-0.5">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[13px] font-bold text-gray-900 leading-none mb-1">
          {title}
        </span>
        <span className="text-[11px] font-medium text-gray-400 leading-none">
          {subtitle}
        </span>
      </div>
    </div>
  );
}