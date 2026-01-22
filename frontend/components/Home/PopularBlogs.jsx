"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useGetPublicBlogsQuery } from "@/store/api/BlogApi";

export default function PopularBlogs() {
  const { data, isLoading } = useGetPublicBlogsQuery();

  const mediaArticles = (data?.data?.blogs || []).filter(
    (b) => b.coverImage?.url && b.slug
  );

  const ITEMS_PER_VIEW = 3;
  const [currentSlide, setCurrentSlide] = useState(0);

  const maxSlide = Math.max(0, mediaArticles.length - ITEMS_PER_VIEW);

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));

  const prevSlide = () =>
    setCurrentSlide((prev) => Math.max(prev - 1, 0));

  if (isLoading || !mediaArticles.length) return null;

  return (
    <section className="py-12 md:py-20 bg-white">
      {/* ALIGNMENT: Exactly synced with Navbar and Courses grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER: Unified Title Size (text-3xl / text-5xl) and Brand Color */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-purple-50 text-[#8B19E6] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full border border-purple-100">
                • Insights & Updates
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Popular <span className="text-[#8B19E6]">Blogs</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block max-w-[200px] md:border-l border-gray-100 md:pl-6 mr-4">
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Stay updated with our latest industry coverage.
              </p>
            </div>

            {/* Premium Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#8B19E6] hover:text-white transition-all duration-500 disabled:opacity-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
                className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-[#8B19E6] hover:text-white transition-all duration-500 disabled:opacity-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE RESPONSIVE SCROLL */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4">
          {mediaArticles.map((article) => (
            <div key={article._id} className="min-w-[90%] snap-center">
              <BlogCard article={article} />
            </div>
          ))}
        </div>

        {/* DESKTOP / TABLET CAROUSEL: Unified Spacing */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out -mx-4"
            style={{
              transform: `translateX(-${(currentSlide * 100) / ITEMS_PER_VIEW}%)`,
            }}
          >
            {mediaArticles.map((article) => (
              <div
                key={article._id}
                className="w-1/2 lg:w-1/3 px-4 flex-shrink-0"
              >
                <BlogCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- UNIFIED BLOG CARD ---------------- */
function BlogCard({ article }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-[1px]">
      
      {/* Aspect Ratio synced with CourseCard/PhaseCard */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          src={article.coverImage.url}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Content: Synced with CourseCard Typography */}
      <div className="pt-6 pb-2 flex flex-col flex-1">
        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#8B19E6] transition-colors duration-300">
          {article.title}
        </h4>
        <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
          {article.excerpt}
        </p>

        <div className="mt-auto">
          <Link
            href={`/blogs/${article.slug}`}
            className="inline-flex items-center gap-3 text-[#8B19E6] text-xs font-bold uppercase tracking-widest group/link"
          >
            <span>Read Article</span>
            <div className="w-8 h-8 rounded-full border border-purple-100 flex items-center justify-center transition-all duration-500 group-hover/link:bg-[#8B19E6] group-hover/link:text-white">
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        </div>
      </div>

      {/* Signature Bottom Accent */}
      <div className="w-8 h-[2px] bg-gray-100 group-hover:bg-[#8B19E6] transition-colors duration-500 mt-4" />
    </div>
  );
}