"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useGetPublicBlogsQuery } from "@/store/api/BlogApi";
import styles from "./PopularBlogs.module.css";

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
    <section
      className={`py-12 px-4 md:px-12 bg-gradient-to-b from-gray-50 to-white ${styles.fadeUp}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Blogs
            </h2>
            <p className="text-gray-600">
              Stay updated with our latest coverage in the Blogs.
            </p>
          </div>

          {/* DESKTOP ARROWS */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-12 h-12 border rounded-full flex items-center justify-center
                         hover:bg-gray-900 hover:text-white transition
                         disabled:opacity-30"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === maxSlide}
              className="w-12 h-12 border rounded-full flex items-center justify-center
                         hover:bg-gray-900 hover:text-white transition
                         disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* MOBILE SCROLL */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {mediaArticles.map((article, i) => (
            <div
              key={article._id}
              className={`min-w-full px-2 snap-center ${styles.cardIn}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <BlogCard article={article} />
            </div>
          ))}
        </div>

        {/* DESKTOP / TABLET CAROUSEL */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${(currentSlide * 100) / ITEMS_PER_VIEW}%)`,
            }}
          >
            {mediaArticles.map((article, i) => (
              <div
                key={article._id}
                className={`w-1/2 lg:w-1/3 px-3 flex-shrink-0 ${styles.cardIn}`}
                style={{ animationDelay: `${i * 80}ms` }}
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

/* BLOG CARD */
function BlogCard({ article }) {
  return (
    <div
      className="
        bg-white mb-3 rounded-2xl shadow-md h-[420px] flex flex-col
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:shadow-xl
        group
      "
    >
      {/* IMAGE */}
      <div className="relative h-[180px] overflow-hidden">
        <Image
          src={article.coverImage.url}
          alt={article.title}
          fill
          className="
            object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-110
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-gray-700 line-clamp-3 mb-2 transition-colors duration-300 group-hover:text-gray-900">
          {article.excerpt}
        </p>

        <div className="mt-auto">
          <Link
            href={`/blogs/${article.slug}`}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold
                       transition-all duration-300 group/link"
          >
            <span className="group-hover/link:translate-x-1 transition-transform duration-300">
              Read More
            </span>
            <span
              className="
                w-6 h-6 border rounded-full flex items-center justify-center
                transition-all duration-300
                group-hover/link:bg-blue-600 group-hover/link:text-white
              "
            >
              <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
