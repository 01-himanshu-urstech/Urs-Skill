'use client';
import React from 'react';

const TechMarquee = ({ 
  technologies = [], 
  speed = 50
}) => {
  const defaultTechs = [
    'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Tailwind', 
    'React.js', 'Node.js', 'Express.js', 'MongoDB', 
    'Next.js', 'Git', 'GitHub'
  ];

  const techList = technologies.length > 0 ? technologies : defaultTechs;

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-white">
      {/* Gradient overlays for blur effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 lg:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex pause-animation"
          style={{
            animation: `scroll ${speed}s linear infinite`
          }}
        >
          {/* First set */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            {techList.map((tech, index) => (
              <React.Fragment key={`tech-1-${index}`}>
                <span className="text-3xl lg:text-5xl xl:text-6xl font-bold text-blue-300 whitespace-nowrap">
                  {tech}
                </span>
                <span className="text-3xl lg:text-5xl xl:text-6xl font-bold text-blue-300">
                  +
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Duplicate 2 */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            {techList.map((tech, index) => (
              <React.Fragment key={`tech-2-${index}`}>
                <span className="text-3xl lg:text-5xl xl:text-6xl font-bold text-blue-300 whitespace-nowrap">
                  {tech}
                </span>
                <span className="text-3xl lg:text-5xl xl:text-6xl font-bold text-blue-300">
                  +
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Duplicate 3 */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            {techList.map((tech, index) => (
              <React.Fragment key={`tech-3-${index}`}>
                <span className="text-3xl lg:text-5xl xl:text-6xl font-bold text-blue-300 whitespace-nowrap">
                  {tech}
                </span>
                <span className="text-3xl lg:text-5xl xl:text-6xl font-bold text-blue-300">
                  +
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
