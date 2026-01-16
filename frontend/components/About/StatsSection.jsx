'use client';
import { useState, useEffect } from 'react';
import StatCard from './StatCard';

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="stats-section" className="py-20 lg:py-32 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          <StatCard
            target={50}
            suffix="+"
            label="Corporate Training Programs Completed"
            isVisible={isVisible}
          />
          <StatCard
            target={98}
            suffix="%"
            label="Learner Satisfaction Rate"
            isVisible={isVisible}
          />
          <StatCard
            target={10}
            suffix="K+"
            label="Professionals Trained"
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}
