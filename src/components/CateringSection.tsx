import React from 'react';
import { CATERING_EVENTS, CLIENT_LOGOS, SITE_CONFIG } from '../data/siteData';
import { ChefHat, Phone, ArrowRight } from 'lucide-react';

interface CateringSectionProps {
  onOpenBooking: () => void;
}

export const CateringSection: React.FC<CateringSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="catering" className="py-24 bg-linen-100/60 dark:bg-charcoal-950 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">
            <ChefHat className="w-4 h-4" />
            <span>Servicio a Empresas e Instituciones</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal-950 dark:text-white tracking-tight">
            Catering & Colectividades <br />
            <span className="italic text-brand-600 dark:text-brand-400 font-normal">para tus eventos en Murcia</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 dark:text-linen-300">
            Llevamos nuestra propuesta gastronómica a tu sede o espacio preferido: congresos, cócteles de networking, coffee breaks ejecutivos, comidas de gala y celebraciones privadas.
          </p>
        </div>

        {/* 3 Pillars of Catering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-7 rounded-2xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 shadow-sm hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-5">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900 dark:text-white mb-2">
              100% Personalizable
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-linen-300 leading-relaxed">
              Diseñamos menús y estaciones a medida para tu presupuesto y tipo de evento, adaptados a celíacos, vegetarianos e intolerancias.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 shadow-sm hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-5">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900 dark:text-white mb-2">
              Logística y Montaje Completo
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-linen-300 leading-relaxed">
              Nos encargamos del transporte isotérmico, vajilla, cristalería, mantelería, mobiliario y servicio de camareros profesionales.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 shadow-sm hover:border-brand-300 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold mb-5">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900 dark:text-white mb-2">
              Valor Social Corporativo (RSC)
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-linen-300 leading-relaxed">
              Al contratar el catering de eh!, tu empresa cumple con sus objetivos de Responsabilidad Social Corporativa e inclusión laboral.
            </p>
          </div>
        </div>

        {/* Real Events Gallery Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-charcoal-900 dark:text-white">
                Eventos Realizados
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-linen-400">
                Algunas de las empresas e instituciones que han confiado en nuestro servicio en Murcia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATERING_EVENTS.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl overflow-hidden bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-charcoal-950/80 text-white text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-charcoal-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-1">
                      {event.title}
                    </h4>
                    <span className="text-xs font-medium text-brand-600 dark:text-brand-400 block mb-2">
                      {event.client}
                    </span>
                    <p className="text-xs text-charcoal-600 dark:text-linen-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Trust & Client Logos */}
        <div className="p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-charcoal-500 dark:text-linen-400 block mb-6">
            Cofinanciadores y Entidades Colaboradoras
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-linen-50/80 dark:bg-charcoal-850/80 border border-linen-200/60 dark:border-charcoal-750 flex items-center justify-center h-20 transition-all hover:scale-105"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Direct Quote / Catering Request Box */}
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-terracotta-DEFAULT p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-bold text-brand-200 block mb-2">
              Atención Personalizada para Empresas
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              ¿Organizas un evento o reunión de trabajo?
            </h3>
            <p className="text-brand-100 text-sm sm:text-base leading-relaxed mb-8">
              Pídenos presupuesto sin compromiso. Adaptamos la propuesta a tus necesidades: sala privada con proyector, coffee breaks, cócteles o menús servidos.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-full bg-white text-brand-800 hover:bg-brand-50 font-semibold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Solicitar Presupuesto de Catering</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`}
                className="px-6 py-3.5 rounded-full border border-white/50 hover:bg-white/10 text-white font-medium text-sm flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{SITE_CONFIG.phoneBooking}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
