'use client';
import { useState, useEffect } from 'react';

export default function StatCard({ target, suffix, label, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div className="text-center group">
      <div className="mb-6">
        <span className="text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600 inline-block group-hover:scale-110 transition-transform duration-300">
          {count}{suffix}
        </span>
      </div>
      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
        {label}
      </h3>
    </div>
  );
}
