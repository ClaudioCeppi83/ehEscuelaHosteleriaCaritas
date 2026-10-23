import React, { useState } from 'react';
import { SPACES } from '../data/siteData';
import { ReservationServiceType } from '../types';
import { Building2, Check, ArrowRight, Clock } from 'lucide-react';

interface SpacesSectionProps {
  onOpenBooking: (service?: ReservationServiceType) => void;
}

export const SpacesSection: React.FC<SpacesSectionProps> = ({ onOpenBooking }) => {
  const [selectedSpace, setSelectedSpace] = useState(SPACES[0].id);

  const currentSpace = SPACES.find((s) => s.id === selectedSpace) || SPACES[0];

  return (
    <section id="espacios" className="py-24 bg-white dark:bg-charcoal-900 border-t border-linen-200 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linen-100/90 dark:bg-charcoal-800 border border-linen-200 dark:border-charcoal-700 text-brass-700 dark:text-brass-400 text-xs font-medium tracking-[0.2em] uppercase mb-4 shadow-subtle">
            <Building2 className="w-3.5 h-3.5 text-brass-500" />
            <span>Espacios de la Casa & Escuela</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-950 dark:text-linen-50 tracking-tight leading-[1.12]">
            Escenarios concebidos para <br />
            <span className="italic font-normal text-brand-700 dark:text-brand-400">el aprendizaje y la acogida.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 dark:text-linen-300 font-light leading-relaxed">
            Descubre nuestras tres áreas dedicadas: el restaurante gastronómico de alta escuela, la sala privada corporativa y la cafetería de especialidad diaria.
          </p>
        </div>

        {/* Space Selection Navigation Tabs */}
        <div
          role="tablist"
          aria-label="Espacios de la Escuela y Restaurante"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {SPACES.map((space) => {
            const isSelected = space.id === selectedSpace;
            return (
              <button
                key={space.id}
                type="button"
                role="tab"
                id={`tab-space-${space.id}`}
                aria-selected={isSelected}
                aria-controls="panel-space-detail"
                onClick={() => setSelectedSpace(space.id)}
                className={`text-left p-6 sm:p-7 rounded-3xl border transition-all duration-300 ${
                  isSelected
                    ? 'bg-linen-100/90 dark:bg-charcoal-800/90 border-brand-700/40 dark:border-brand-500/40 shadow-subtle'
                    : 'bg-linen-50/50 dark:bg-charcoal-850/50 border-linen-200/70 dark:border-charcoal-800/70 hover:border-linen-300 dark:hover:border-charcoal-700'
                }`}
              >
                <span className={`text-[10px] font-mono font-semibold uppercase tracking-widest block mb-1.5 ${
                  isSelected ? 'text-brass-700 dark:text-brass-400' : 'text-charcoal-500 dark:text-linen-400'
                }`}>
                  {space.id === 'restaurante' && '01 / Gastronomía'}
                  {space.id === 'sala-privada' && '02 / Empresa & Privacidad'}
                  {space.id === 'cafeteria' && '03 / Cafetería Diaria'}
                </span>
                <h3 className="font-serif text-lg font-medium text-charcoal-950 dark:text-linen-50 mb-2">
                  {space.name}
                </h3>
                <p className="text-xs text-charcoal-600 dark:text-linen-400 line-clamp-2 font-light">
                  {space.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Space Detail Showcase Card */}
        <div
          id="panel-space-detail"
          role="tabpanel"
          aria-labelledby={`tab-space-${currentSpace.id}`}
          className="bg-linen-50/70 dark:bg-charcoal-850/60 rounded-[2.5rem] p-8 sm:p-12 border border-linen-200/80 dark:border-charcoal-800/80 shadow-premium dark:shadow-premium-dark transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Space Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brass-700 dark:text-brass-400 block mb-1">
                  Espacio Seleccionado
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal-950 dark:text-linen-50 mb-3">
                  {currentSpace.name}
                </h3>
                <p className="text-sm sm:text-base text-charcoal-600 dark:text-linen-300 leading-relaxed font-light">
                  {currentSpace.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-900 border border-linen-200/80 dark:border-charcoal-800 text-xs sm:text-sm text-charcoal-700 dark:text-linen-300 flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-700 dark:text-brand-400 shrink-0" />
                <span><strong className="font-medium text-charcoal-950 dark:text-linen-50">Horario de Servicio:</strong> {currentSpace.schedule}</span>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-charcoal-900 dark:text-linen-100 mb-3">
                  Equipamiento y Atenciones:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSpace.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-600 dark:text-linen-300 font-light">
                      <span className="w-4 h-4 rounded-full bg-brass-500/10 dark:bg-brass-500/20 text-brass-700 dark:text-brass-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                {currentSpace.id === 'cafeteria' ? (
                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-medium text-sm tracking-wide shadow-subtle transition-all"
                  >
                    <span>{currentSpace.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    onClick={() => onOpenBooking(currentSpace.id === 'sala-privada' ? 'sala-privada' : 'menu-7-tiempos')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-medium text-sm tracking-wide shadow-subtle transition-all"
                  >
                    <span>{currentSpace.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Space Photo Preview with passepartout */}
            <div className="lg:col-span-6">
              <div className="p-3 bg-white dark:bg-charcoal-900 rounded-3xl border border-linen-200/90 dark:border-charcoal-800 shadow-premium">
                <div className="relative rounded-2xl overflow-hidden bg-charcoal-950 group">
                  <img
                    src={currentSpace.image}
                    alt={currentSpace.name}
                    width={600}
                    height={440}
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-transparent to-transparent flex items-end p-6">
                    <div className="text-linen-50">
                      <span className="text-[10px] font-mono tracking-widest text-brass-300 uppercase block mb-1">
                        C. Sta. Cecilia, 1 · Murcia
                      </span>
                      <p className="font-serif text-base font-normal text-linen-100">
                        Instalaciones profesionales al servicio de la gastronomía y la sociedad.
                      </p>
                    </div>
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
