import React from 'react';
import { REVIEWS } from '../data/siteData';
import { Newspaper, ExternalLink, Star } from 'lucide-react';

export const PressReviews: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-charcoal-900 border-t border-linen-200 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">
            <Newspaper className="w-4 h-4" />
            <span>Prensa y Reconocimientos</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal-950 dark:text-white tracking-tight">
            Lo que dicen <br />
            <span className="italic text-brand-600 dark:text-brand-400 font-normal">de nuestra labor</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 dark:text-linen-300">
            Medios de comunicación, críticos y comensales destacan la doble excelencia de nuestra escuela: calidad en el plato y dignidad laboral.
          </p>
        </div>

        {/* Press Links Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <a
            href="https://ehescueladehosteleria.com/reportaje-la-verdad"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-linen-50 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-750 hover:border-brand-500 flex items-center justify-between group transition-all shadow-sm hover:shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 block mb-1">
                Reportaje Especial · Diario La Verdad
              </span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                «La receta de Cáritas para cambiar vidas a través de los fogones»
              </h3>
            </div>
            <ExternalLink className="w-5 h-5 text-charcoal-400 group-hover:text-brand-600 shrink-0 ml-4 transition-colors" />
          </a>

          <a
            href="https://ehescueladehosteleria.com/jornadas-interescuelas"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-linen-50 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-750 hover:border-brand-500 flex items-center justify-between group transition-all shadow-sm hover:shadow-md"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 block mb-1">
                Encuentro Culinario Profesional
              </span>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Jornadas InterEscuelas de Hostelería de la Región de Murcia
              </h3>
            </div>
            <ExternalLink className="w-5 h-5 text-charcoal-400 group-hover:text-brand-600 shrink-0 ml-4 transition-colors" />
          </a>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-linen-50/70 dark:bg-charcoal-850/70 border border-linen-200 dark:border-charcoal-750 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif text-sm sm:text-base text-charcoal-800 dark:text-linen-200 italic leading-relaxed mb-6">
                  «{review.content}»
                </p>
              </div>

              <div className="pt-4 border-t border-linen-200/80 dark:border-charcoal-750">
                <h4 className="font-sans font-bold text-sm text-charcoal-950 dark:text-white">
                  {review.author}
                </h4>
                <span className="text-xs text-brand-700 dark:text-brand-400 font-medium">
                  {review.role}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
