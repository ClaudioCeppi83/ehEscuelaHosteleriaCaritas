import React from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { ArrowRight, UtensilsCrossed, Sparkles, Heart, Award, Calendar, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 right-10 w-[300px] h-[300px] bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 text-brand-800 dark:text-brand-300 text-xs font-semibold tracking-wide uppercase mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Gastronomía Social de Alta Cocina · Murcia</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-charcoal-950 dark:text-white leading-[1.1] mb-6">
              Alta gastronomía <br />
              <span className="italic font-normal text-brand-600 dark:text-brand-400">con alma</span> y futuro.
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-charcoal-700 dark:text-linen-300 font-normal leading-relaxed max-w-2xl mb-8">
              Bienvenido al restaurante donde cada plato cuenta una historia de superación. 
              Degusta nuestro <strong className="font-semibold text-charcoal-950 dark:text-white">Menú Gastronómico de siete tiempos</strong> elaborado y servido por los alumnos de la escuela de hostelería de <span className="text-brand-600 dark:text-brand-400 font-medium">Cáritas</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base shadow-lg hover:shadow-glow-orange transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Reservar Mesa Online</span>
              </button>

              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-charcoal-300 dark:border-charcoal-700 hover:border-brand-600 dark:hover:border-brand-400 text-charcoal-800 dark:text-linen-200 font-medium text-base hover:bg-linen-100 dark:hover:bg-charcoal-900 transition-all"
              >
                <span>Ver Menú de 7 Tiempos</span>
                <ArrowRight className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              </a>
            </div>

            {/* Trust Elements */}
            <div className="pt-6 border-t border-linen-200 dark:border-charcoal-800/80 w-full flex flex-wrap items-center gap-6 text-xs text-charcoal-600 dark:text-linen-400">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>Iniciativa Social sin ánimo de lucro</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Formación certificada para el empleo</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>De Lunes a Viernes 13:30h - 17:30h</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-end Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Card with subtle shadow & border */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-charcoal-800 group">
                <img
                  src={SITE_CONFIG.images.heroDish}
                  alt="Plato del Menú Gastronómico elaborado en eh! Escuela de Hostelería"
                  className="w-full h-[460px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-brand-300 font-semibold mb-1 block">
                    Cocina de Temporada
                  </span>
                  <p className="font-serif text-xl font-medium leading-snug">
                    Producto fresco de la huerta y mar de Murcia tratado con técnicas de alta gastronomía.
                  </p>
                </div>
              </div>

              {/* Floating Highlight Card 1: Experience & Pairing */}
              <div className="absolute -top-6 -left-6 sm:-left-8 glass-card border border-white/80 dark:border-charcoal-700 p-4 rounded-2xl shadow-xl max-w-[210px] hidden sm:block animate-fade-in">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-800 dark:text-linen-200">
                    Menú Degustación
                  </span>
                </div>
                <p className="text-xs text-charcoal-600 dark:text-linen-300 font-medium">
                  7 pases maridados con vinos D.O.P. Jumilla y Bullas.
                </p>
              </div>

              {/* Floating Highlight Card 2: Rating badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 glass-card border border-white/80 dark:border-charcoal-700 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 animate-fade-up">
                <div className="w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  4.9
                </div>
                <div>
                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs font-semibold text-charcoal-900 dark:text-white block mt-0.5">
                    Excelencia Gastronómica
                  </span>
                  <span className="text-[10px] text-charcoal-500 dark:text-linen-400">
                    Cáritas Diócesis de Cartagena
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 text-center">
          <a
            href="#impacto"
            className="inline-flex flex-col items-center text-xs text-charcoal-500 dark:text-linen-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <span className="mb-1 uppercase tracking-widest text-[10px]">Descubre nuestro proyecto</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-brand-600 dark:text-brand-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
