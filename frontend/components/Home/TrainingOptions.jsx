'use client';
import Image from 'next/image';
import { CalendarClock, File, Calendar } from 'lucide-react';

export default function TrainingOptions() {
  const cards = [
    {
      icon: <Calendar className="w-12 h-12 text-emerald-600" />,
      title: 'Offline & Corporate Training Options',
      description: 'Our hands-on classroom sessions bring real-time learning to your workplace. We offer customized workshops and offline training modules tailored for teams and professionals.',
      cta: 'Learn More',
      bgColor: 'bg-[#E8F5E8]'
    },
    {
      icon: <CalendarClock className="w-12 h-12 text-blue-600" />,
      title: 'Flexible Learning',
      description: 'Weekends, weekdays, and workshops designed to enhance your business skills without compromising on work.',
      cta: 'Learn More',
      bgColor: 'bg-[#EBF3FD]'
    },
    {
      icon: <File className="w-12 h-12 text-blue-600" />,
      title: 'Project-Based Learning',
      description: 'Every module includes building dashboards and tools from scratch and ML tools.',
      cta: 'Learn More',
      bgColor: 'bg-[#EBF3FD]'
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-12 h-12 text-blue-600"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M10 7h4" />
          <path d="M10 18v4l2 -1l2 1v-4" />
          <path d="M10 19h-2a2 2 0 1 1 -2 -2v-12a2 2 0 1 1 2 -2h8a2 2 0 1 1 2 2v12a2 2 0 1 1 -2 2h-2" />
        </svg>
      ),
      title: 'AI-Driven Innovation',
      description: 'Our curriculum leverages cutting-edge AI, including TensorFlow, Python APIs.',
      cta: 'Learn More',
      bgColor: 'bg-[#EBF3FD]'
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header - Smaller fonts */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Unlock the Future with Full Stack Development & AI
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From frontend to backend systems, our training program is designed to build real-world tech stacks and integration skills using modern tools.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center bg-white/50 rounded-2xl">
                {card.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {card.title}
              </h3>
              <p className="text-gray-700 text-xs md:text-sm flex-grow mb-6 leading-relaxed">
                {card.description}
              </p>
              <button className="group flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
                <span>{card.cta}</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
