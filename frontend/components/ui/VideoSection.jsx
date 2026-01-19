'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function VideoSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3;

  const testimonials = [
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      logo: '/partners/dodev.webp',
      program: 'eCommerce Executive Learning Program',
      cohort: 'Cohort 4',
      quote: '“Great hands-on learning experience.”',
    },
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      logo: '/partners/workbox.png',
      program: 'PGP in Marketing',
      cohort: 'Batch 24',
      quote: '“Mentors were industry experts.”',
    },
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      logo: '/partners/urswriter-removebg-preview.webp',
      program: 'Applied Marketing',
      cohort: 'Batch 23',
      quote: '“Very competitive peer learning.”',
    },
    {
      thumbnail: '/thumbnail/thumbnail1.avif',
      logo: '/partners/dodev.webp',
      program: 'Marketing Program',
      cohort: 'Batch 25',
      quote: '“Amazing exposure to real problems.”',
    },
  ];

  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  return (
    <section className="py-14 px-4 bg-[#E8E9F3]">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">URS SKILL Video Section</h2>
            <p className="text-gray-600">Hear from our students</p>
          </div>

          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
              className="w-12 h-12 border rounded-full flex items-center justify-center disabled:opacity-30"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={currentPage === totalPages - 1}
              className="w-12 h-12 border rounded-full flex items-center justify-center disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* MOBILE ONE-LINE SCROLL */}
        <div className="sm:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full px-2 snap-center">
              <VideoCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials
            .slice(currentPage * cardsPerPage, currentPage * cardsPerPage + cardsPerPage)
            .map((t, i) => (
              <VideoCard key={i} testimonial={t} />
            ))}
        </div>
      </div>
    </section>
  );
}

/* VIDEO CARD */
function VideoCard({ testimonial }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[380px] flex flex-col">
      <div className="relative aspect-video">
        <Image src={testimonial.thumbnail} alt="" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
            <Play className="text-white ml-1" />
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h4 className="text-purple-500 italic">{testimonial.program}</h4>
        <p className="text-sm text-gray-500 mb-2">{testimonial.cohort}</p>
        <p className="text-sm text-gray-700 line-clamp-4">
          {testimonial.quote}
        </p>
      </div>
    </div>
  );
}
