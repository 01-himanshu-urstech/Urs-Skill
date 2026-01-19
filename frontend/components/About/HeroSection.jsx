'use client';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="py-16 lg:py-20 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <p className="text-sm md:text-base text-blue-600 font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              About Us | URSSkill by URSTech Solution
            </p>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Professionals with Future-Ready Skills
            </h1>
            
            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                Welcome to <span className="font-bold text-gray-900">URSSkill</span>, the corporate training and upskilling division of <span className="font-bold text-gray-900">URSTech Solution</span>, dedicated to bridging the gap between traditional learning and modern industry needs.
              </p>
              
              <p>
                We specialize in <span className="font-bold text-gray-900">AI-powered technical training programs</span> that prepare individuals and teams to thrive in the fast-evolving digital ecosystem — combining <span className="font-bold text-gray-900">hands-on development</span>, <span className="font-bold text-gray-900">real-world projects</span>, and <span className="font-bold text-gray-900">corporate-ready expertise</span>.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in-right">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/About/utpalrai.jpg"
                alt="URSSkill Training Environment"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -z-10 top-8 right-8 w-full h-full bg-blue-100 rounded-3xl"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards 0.3s;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
