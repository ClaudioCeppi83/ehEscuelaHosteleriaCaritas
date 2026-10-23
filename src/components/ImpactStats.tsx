import React from 'react';
import { HOUSE_CREDENTIALS } from '../data/siteData';
import { ShieldCheck, Heart, Award, Sparkles } from 'lucide-react';

export const ImpactStats: React.FC = () => {
  return (
    <section 
      id="credenciales" 
      className="py-20 sm:py-24 bg-white dark:bg-charcoal-900 border-y border-linen-200/70 dark:border-charcoal-800/80 transition-colors"
    >
      {/* Anchor invisible para compatibilidad retroactiva con enlaces a #impacto */}
      <span id="impacto" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial Reposada */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linen-100/90 dark:bg-charcoal-800/90 border border-linen-200 dark:border-charcoal-700 text-brass-700 dark:text-brass-400 text-xs font-medium tracking-[0.2em] uppercase mb-4 shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-brass-500" />
            <span>Credenciales de la Casa y Oficio</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-950 dark:text-linen-50 tracking-tight leading-[1.15]">
            El rigor de la alta escuela, <br />
            <span className="italic font-normal text-brand-700 dark:text-brand-400">el impacto verificable de Cáritas.</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-charcoal-600 dark:text-linen-300 font-light leading-relaxed max-w-2xl mx-auto">
            Cada comensal que ocupa una mesa en nuestro restaurante gastronómico participa de un ecosistema real de aprendizaje, inserción laboral digna y respeto absoluto por la huerta murciana.
          </p>
        </div>

        {/* Retícula de Credenciales Nobles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {HOUSE_CREDENTIALS.map((cred) => (
            <div
              key={cred.id}
              className="relative p-7 sm:p-8 rounded-3xl bg-linen-50/60 dark:bg-charcoal-850/50 border border-linen-200/80 dark:border-charcoal-800/80 transition-all duration-300 hover:border-brand-500/30 dark:hover:border-brand-500/30 flex flex-col justify-between group shadow-subtle hover:shadow-premium"
            >
              {/* Parte Superior: Orden & Cifra Noble Serene */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs tracking-widest text-brass-600 dark:text-brass-400 uppercase font-semibold">
                    {cred.order}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-linen-200/60 dark:bg-charcoal-750 flex items-center justify-center text-charcoal-400 dark:text-linen-400 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                    {cred.id === 'cred-years' && <Award className="w-3.5 h-3.5" />}
                    {cred.id === 'cred-insertion' && <ShieldCheck className="w-3.5 h-3.5" />}
                    {cred.id === 'cred-courses' && <Sparkles className="w-3.5 h-3.5" />}
                    {cred.id === 'cred-ethics' && <Heart className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Cifra con Tipografía Serif Solemne */}
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-serif text-5xl sm:text-6xl font-normal text-charcoal-950 dark:text-linen-50 tracking-tight">
                    {cred.value}
                  </span>
                  {cred.suffix && (
                    <span className="font-serif text-xl sm:text-2xl font-light text-brand-700 dark:text-brand-400">
                      {cred.suffix}
                    </span>
                  )}
                </div>

                {/* Título de la Credencial */}
                <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal-900 dark:text-linen-100 mb-1.5 leading-snug group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                  {cred.title}
                </h3>

                {/* Subtítulo breve de contexto */}
                <p className="text-xs font-medium text-brass-700 dark:text-brass-400 mb-3 tracking-wide">
                  {cred.subtitle}
                </p>

                {/* Narrativa reposada */}
                <p className="text-xs sm:text-sm text-charcoal-600 dark:text-linen-300 font-light leading-relaxed">
                  {cred.narrative}
                </p>
              </div>

              {/* Parte Inferior: Sello de Dignificación */}
              {cred.badge && (
                <div className="mt-6 pt-4 border-t border-linen-200/70 dark:border-charcoal-750 flex items-center gap-2 text-[11px] font-medium text-charcoal-500 dark:text-linen-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-700 dark:bg-brand-400" />
                  <span>{cred.badge}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

