'use client';
import Image from 'next/image';

export default function PartnersLogo() {
  const companies = [
    // Row 1 - Left to Right
    { name: 'HUL', logo: '/partners/dodev.webp' },
    { name: 'GroupM', logo: '/partners/urswriter-removebg-preview.webp' },
    { name: 'Levis', logo: '/partners/urstechsolution-logo.webp' },
    { name: 'Amazon', logo: '/partners/urswriter-removebg-preview.webp' },
    { name: 'Flipkart', logo: '/partners/urstechsolution-logo.webp' },

    // Row 2 - Right to Left  
    { name: 'Nestle', logo: '/partners/urswriter-removebg-preview.webp' },
    { name: 'Unilever', logo: '/partners/urstechsolution-logo.webp' },
    { name: 'Wavemaker', logo: '/partners/urswriter-removebg-preview.webp' },
    { name: 'TCS', logo: '/partners/dodev.webp' },
    { name: 'Mindshare', logo: '/partners/urstechsolution-logo.webp' },

    // Row 3 - Left to Right
    { name: 'Godrej', logo: '/partners/urswriter-removebg-preview.webp' },
    { name: 'Vini', logo: '/partners/dodev.webp' },
    { name: 'J&J', logo: '/partners/urswriter-removebg-preview.webp' },
    { name: 'Sanofi', logo: '/partners/urstechsolution-logo.webp' },
    { name: 'Ogilvy', logo: '/partners/urswriter-removebg-preview.webp' }
  ];

  const row1 = companies.slice(0, 5);
  const row2 = companies.slice(5, 10).reverse();
  const row3 = companies.slice(10, 15);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 max-w-4xl mx-auto leading-tight">
            3,000+ Alumni Work at India&apos;s Top Companies
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Our alumni across programs work at India&apos;s top companies and startups
          </p>
        </div>

        {/* Logos Carousel */}
        <div className="space-y-2 lg:space-y-4">
          {/* Row 1 - Left to Right - Blur on LEFT */}
          <div className="relative overflow-hidden">
            {/* Left fade overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee-left whitespace-nowrap py-3 lg:py-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-8 lg:gap-12 px-4 lg:px-8">
                  {row1.map((company, index) => (
                    <div
                      key={`${company.name}-${index}`}
                      className="flex items-center justify-center h-20 lg:h-24 w-24 lg:w-28 flex-shrink-0"
                    >
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={100}
                        height={80}
                        className="max-h-16 lg:max-h-20 w-auto h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left - Blur on RIGHT */}
          <div className="relative overflow-hidden">
            {/* Right fade overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee-right whitespace-nowrap py-3 lg:py-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-8 lg:gap-12 px-4 lg:px-8">
                  {row2.map((company, index) => (
                    <div
                      key={`${company.name}-${index}`}
                      className="flex items-center justify-center h-20 lg:h-24 w-24 lg:w-28 flex-shrink-0"
                    >
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={100}
                        height={80}
                        className="max-h-16 lg:max-h-20 w-auto h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Left to Right - Blur on LEFT */}
          <div className="relative overflow-hidden">
            {/* Left fade overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee-left whitespace-nowrap py-3 lg:py-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-8 lg:gap-12 px-4 lg:px-8">
                  {row3.map((company, index) => (
                    <div
                      key={`${company.name}-${index}`}
                      className="flex items-center justify-center h-20 lg:h-24 w-24 lg:w-28 flex-shrink-0"
                    >
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={100}
                        height={80}
                        className="max-h-16 lg:max-h-20 w-auto h-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-marquee-left {
          animation: marquee-left 15s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marquee-right 15s linear infinite;
        }
        
        /* Pause on hover */
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
