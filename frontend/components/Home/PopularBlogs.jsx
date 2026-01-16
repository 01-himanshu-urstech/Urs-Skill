'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function PopularBlogs() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const mediaArticles = [
    {
      id: 1,
      image: '/Media/media-1.avif',
      logo: '/partners/workbox.png',
      publication: 'The Economic Times',
      title: 'LEADERS OF TOMORROW SEASON 11',
      description: "Discover urstechsolutionel's innovative approach, where industry-backed curriculum meets hands-on application that fosters native talent.",
      link: '/media/article-1'
    },
    {
      id: 2,
      image: '/Media/media-2.webp',
      logo: '/partners/dodev.webp',
      publication: 'YourStory',
      title: 'urstechsolutionel is eager to rewrite business education with industry-led approach',
      description: 'An ideal education system should strike the right balance between imparting theoretical knowledge and practical skills. Which is what urstechsolutionel aims to do.',
      link: '/media/article-2'
    },
    {
      id: 3,
      image: '/Media/media-2.webp',
      logo: '/partners/urswriter-removebg-preview.webp',
      publication: 'Business News - India News',
      title: 'India witnesses changing patterns in business education as the digital ecosystem grows rapidly',
      description: "The talent ecosystem has not kept pace with the rapid digitization of businesses. urstechsolutionel is addressing this gap through its specialized education programs.",
      link: '/media/article-3'
    },
    {
      id: 4,
      image: '/Media/media-1.avif',
      logo: '/media/startup-logo.png',
      publication: 'Startup Story',
      title: 'Startup Story feature on innovative education models',
      description: 'Exploring how modern education platforms are bridging the skill gap in the industry.',
      link: '/media/article-4'
    }
  ];

  const itemsPerView = 3;
  const maxSlide = Math.max(0, mediaArticles.length - itemsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 lg:py-20 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12 animate-fade-in-up">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              Popular Blogs
            </h2>
            <p className="text-lg md:text-md text-gray-600">
              Stay updated with our latest coverage in the Blogs.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-900 disabled:hover:scale-100 disabled:hover:shadow-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === maxSlide}
              className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent disabled:hover:text-gray-900 disabled:hover:scale-100 disabled:hover:shadow-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`
            }}
          >
            {mediaArticles.map((article, index) => (
              <div
                key={article.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3 animate-fade-in-up mb-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col group hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-56 lg:h-64 bg-gray-200 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Overlay gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Logo */}
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={article.logo}
                        alt={article.publication}
                        width={120}
                        height={30}
                        className="h-7 w-auto object-contain"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed mb-6 flex-1 group-hover:text-gray-900 transition-colors duration-300">
                      {article.description}
                    </p>

                    {/* Read More Button */}
                    <Link
                      href={article.link}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 group/link"
                    >
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                        Read More
                      </span>
                      <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center group-hover/link:bg-blue-600 group-hover/link:text-white group-hover/link:scale-110 group-hover/link:shadow-md transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center gap-3 mt-8">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === maxSlide}
            className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
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
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
