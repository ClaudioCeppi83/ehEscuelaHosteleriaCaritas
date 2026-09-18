import React, { useState } from 'react';
import { SPACES } from '../data/siteData';
import { Building2, Check, ArrowRight, Clock } from 'lucide-react';

interface SpacesSectionProps {
  onOpenBooking: () => void;
}

export const SpacesSection: React.FC<SpacesSectionProps> = ({ onOpenBooking }) => {
  const [selectedSpace, setSelectedSpace] = useState(SPACES[0].id);

  const currentSpace = SPACES.find((s) => s.id === selectedSpace) || SPACES[0];

  return (
    <section id="espacios" className="py-24 bg-white dark:bg-charcoal-900 border-t border-linen-200 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">
            <Building2 className="w-4 h-4" />
            <span>Nuestras Instalaciones en Murcia</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal-950 dark:text-white tracking-tight">
            Espacios diseñados para <br />
            <span className="italic text-brand-600 dark:text-brand-400 font-normal">disfrutar y compartir</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 dark:text-linen-300">
            Descubre nuestras tres áreas polivalentes: el restaurante gastronómico, la sala privada corporativa con proyector y nuestra nueva cafetería diaria.
          </p>
        </div>

        {/* Space Selection Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {SPACES.map((space) => {
            const isSelected = space.id === selectedSpace;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpace(space.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-500 shadow-md transform -translate-y-1'
                    : 'bg-linen-50/60 dark:bg-charcoal-850/60 border-linen-200 dark:border-charcoal-800 hover:border-linen-300 dark:hover:border-charcoal-700'
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                  isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-charcoal-500 dark:text-linen-400'
                }`}>
                  {space.id === 'restaurante' && 'Gastronomía'}
                  {space.id === 'sala-privada' && 'Reuniones & Empresas'}
                  {space.id === 'cafeteria' && 'Desayunos & Café'}
                </span>
                <h3 className="font-serif text-lg font-bold text-charcoal-900 dark:text-white mb-2">
                  {space.name}
                </h3>
                <p className="text-xs text-charcoal-600 dark:text-linen-400 line-clamp-2">
                  {space.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Space Detail Showcase Card */}
        <div className="bg-linen-50 dark:bg-charcoal-950 rounded-3xl p-6 sm:p-10 border border-linen-200 dark:border-charcoal-800 shadow-premium dark:shadow-premium-dark transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Space Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-brand-600 dark:text-brand-400 block mb-1">
                  Espacio Seleccionado
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-white mb-3">
                  {currentSpace.name}
                </h3>
                <p className="text-sm sm:text-base text-charcoal-600 dark:text-linen-300 leading-relaxed">
                  {currentSpace.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 text-xs sm:text-sm text-charcoal-700 dark:text-linen-300 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span><strong>Horario:</strong> {currentSpace.schedule}</span>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-bold text-charcoal-900 dark:text-white mb-3">
                  Equipamiento y Ventajas:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSpace.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal-600 dark:text-linen-300">
                      <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all hover:shadow-glow-orange"
                >
                  <span>{currentSpace.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Space Photo Preview */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-charcoal-850 group">
                <img
                  src={currentSpace.image}
                  alt={currentSpace.name}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs font-semibold text-brand-300 uppercase tracking-widest block mb-1">
                      C. Sta. Cecilia, 1 · Murcia
                    </span>
                    <p className="font-serif text-lg font-medium">
                      Instalaciones profesionales al servicio de la gastronomía y la sociedad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
