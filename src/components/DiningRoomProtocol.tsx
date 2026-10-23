import React, { useState } from 'react';
import { ROOM_PROTOCOL_PILLARS } from '../data/siteData';
import { DiningRoomProtocolPillar } from '../types';
import { Sparkles, Wine, Utensils, HeartHandshake, Quote, Check } from 'lucide-react';

export const DiningRoomProtocol: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = ROOM_PROTOCOL_PILLARS[activePillarIndex];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-brass-500" />;
      case 'Wine':
        return <Wine className="w-4 h-4 text-brass-500" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-brass-500" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-4 h-4 text-brass-500" />;
    }
  };

  return (
    <section 
      id="protocolo" 
      className="py-24 sm:py-28 bg-white dark:bg-charcoal-900 border-t border-linen-200/80 dark:border-charcoal-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linen-100/90 dark:bg-charcoal-800 border border-linen-200 dark:border-charcoal-700 text-brass-700 dark:text-brass-400 text-xs font-medium tracking-[0.2em] uppercase mb-4 shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-brass-500" />
            <span>Liturgia de Sala & Ceremonial</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-950 dark:text-linen-50 tracking-tight leading-[1.14]">
            La nobleza del servicio silencioso, <br />
            <span className="italic font-normal text-brand-700 dark:text-brand-400">el arte del gran anfitrión.</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-charcoal-600 dark:text-linen-300 font-light leading-relaxed">
            En eh! la sala no es un simple tránsito de bandejas: es una escuela de ceremonial donde el silencio armónico, la cadencia del servicio sincronizado y el calor humano devuelven la dignidad al noble oficio de la hospitalidad.
          </p>
        </div>

        {/* Selector de Pilares de Sala (Pestañas Editoriales) */}
        <div
          role="tablist"
          aria-label="Pilares del protocolo de sala"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
        >
          {ROOM_PROTOCOL_PILLARS.map((pillar: DiningRoomProtocolPillar, idx: number) => {
            const isSelected = idx === activePillarIndex;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                id={`tab-pillar-${pillar.id}`}
                aria-selected={isSelected}
                aria-controls="panel-active-pillar"
                onClick={() => setActivePillarIndex(idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border ${
                  isSelected
                    ? 'bg-linen-100/90 dark:bg-charcoal-800/90 border-brand-700/40 dark:border-brand-500/40 shadow-subtle'
                    : 'bg-linen-50/50 dark:bg-charcoal-850/50 border-linen-200/60 dark:border-charcoal-800/60 hover:border-linen-300 dark:hover:border-charcoal-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs tracking-widest font-semibold uppercase text-brass-600 dark:text-brass-400">
                    Pilar {pillar.pillarNumber}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-charcoal-700 flex items-center justify-center shrink-0">
                    {getIcon(pillar.iconName)}
                  </div>
                </div>
                <h3 className={`font-serif text-sm sm:text-base font-medium line-clamp-2 ${
                  isSelected ? 'text-charcoal-950 dark:text-linen-50' : 'text-charcoal-700 dark:text-linen-300'
                }`}>
                  {pillar.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Escenario del Pilar Activo */}
        <div
          id="panel-active-pillar"
          role="tabpanel"
          aria-labelledby={`tab-pillar-${activePillar.id}`}
          className="p-8 sm:p-12 lg:p-14 rounded-[2.5rem] bg-linen-50/70 dark:bg-charcoal-850/60 border border-linen-200/80 dark:border-charcoal-800/80 shadow-premium dark:shadow-premium-dark transition-all duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Columna Texto & Cita de Sala */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs tracking-widest text-brass-600 dark:text-brass-400 uppercase font-semibold">
                    Liturgia {activePillar.pillarNumber} / 04
                  </span>
                  <span className="text-charcoal-400 dark:text-charcoal-600">·</span>
                  <span className="text-xs uppercase tracking-wider text-brand-700 dark:text-brand-400 font-medium">
                    Escuela de Hostelería
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-charcoal-950 dark:text-linen-50 mb-2 leading-tight">
                  {activePillar.title}
                </h3>

                <p className="font-serif italic text-sm sm:text-base text-brass-700 dark:text-brass-400 mb-6">
                  {activePillar.subtitle}
                </p>

                <p className="text-sm sm:text-base text-charcoal-700 dark:text-linen-300 font-light leading-relaxed mb-6">
                  {activePillar.description}
                </p>

                {/* Lista de Detalles Pedagógicos */}
                <div className="space-y-3 mb-8">
                  {activePillar.details.map((detail: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brass-500/10 dark:bg-brass-500/20 text-brass-700 dark:text-brass-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="text-xs sm:text-sm text-charcoal-700 dark:text-linen-300 font-light leading-snug">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cita de Sala */}
              {activePillar.quote && (
                <div className="pt-6 border-t border-linen-200/80 dark:border-charcoal-750">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-brass-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-serif italic text-sm sm:text-base text-charcoal-800 dark:text-linen-200 leading-relaxed mb-1">
                        «{activePillar.quote}»
                      </p>
                      {activePillar.author && (
                        <span className="font-mono text-[11px] tracking-wider uppercase text-brass-700 dark:text-brass-400">
                          {activePillar.author}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Columna Fotografía con Enmarcado Editorial */}
            <div className="lg:col-span-5">
              <div className="p-3 bg-white dark:bg-charcoal-900 rounded-3xl border border-linen-200/90 dark:border-charcoal-800 shadow-premium">
                <div className="relative rounded-2xl overflow-hidden bg-charcoal-950">
                  <img
                    src={activePillar.image || '/assets/photos/cropped-WhatsApp-Image-2023-10-03-at-19.18.04-1-1.webp'}
                    alt={activePillar.title}
                    width={560}
                    height={420}
                    className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-linen-100">
                    <span className="text-[10px] font-mono tracking-widest text-brass-300 uppercase block mb-1">
                      Servicio en Sala Viva
                    </span>
                    <span className="font-serif text-sm font-light text-linen-100">
                      Alumnos de la Diócesis de Cartagena en ejercicio real con comensales.
                    </span>
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
