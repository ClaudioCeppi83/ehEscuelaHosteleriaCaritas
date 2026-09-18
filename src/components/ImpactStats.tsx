import React, { useState, useEffect, useRef } from 'react';
import { IMPACT_STATS } from '../data/siteData';

export const ImpactStats: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    years: 0,
    courses: 0,
    insertion: 0,
    quality: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1800; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const nextCounts: { [key: string]: number } = {};
      IMPACT_STATS.forEach((stat) => {
        nextCounts[stat.id] = Math.round(stat.target * ease);
      });

      setCounts(nextCounts);

      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [hasAnimated]);

  return (
    <section id="impacto" ref={containerRef} className="py-16 bg-white dark:bg-charcoal-900 border-y border-linen-200 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-600 dark:text-brand-400 block mb-2">
            Compromiso y Resultados Reales
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-900 dark:text-white">
            El impacto de una formación con propósito
          </h2>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {IMPACT_STATS.map((stat, idx) => (
            <div
              key={stat.id}
              className="relative p-6 rounded-2xl bg-linen-50/70 dark:bg-charcoal-850/70 border border-linen-200/80 dark:border-charcoal-750 hover:border-brand-300 dark:hover:border-brand-800 transition-all duration-300 group"
            >
              <div className="text-4xl sm:text-5xl font-serif font-bold text-brand-600 dark:text-brand-400 mb-2 tracking-tight flex items-baseline">
                <span>{counts[stat.id] || 0}</span>
                <span className="text-2xl sm:text-3xl ml-1 text-charcoal-800 dark:text-linen-100 font-sans font-light">
                  {stat.suffix}
                </span>
              </div>
              <h3 className="text-base font-semibold text-charcoal-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {stat.label}
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-linen-400 leading-relaxed">
                {stat.description}
              </p>

              <div className="absolute top-4 right-4 text-xs font-mono text-charcoal-300 dark:text-charcoal-700 font-bold">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
