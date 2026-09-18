import React, { useState } from 'react';
import { GASTRONOMIC_MENU, SITE_CONFIG } from '../data/siteData';
import { Utensils, Sparkles, Gift, Clock, Phone, ChevronRight, CheckCircle2 } from 'lucide-react';

interface GastronomicMenuProps {
  onOpenBooking: () => void;
}

export const GastronomicMenu: React.FC<GastronomicMenuProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'experiencia'>('menu');

  return (
    <section id="menu" className="py-24 bg-linen-50 dark:bg-charcoal-950 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">
              <Utensils className="w-4 h-4" />
              <span>Experiencia Culinaria Exclusiva</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal-950 dark:text-white tracking-tight">
              Menú Gastronómico <br />
              <span className="italic text-brand-600 dark:text-brand-400 font-normal">de siete tiempos</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-charcoal-700 dark:text-linen-300">
              Cada pase representa semanas de formación, técnica rigurosa y pasión por el producto de proximidad de la Región de Murcia.
            </p>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center p-1.5 rounded-full bg-linen-200/80 dark:bg-charcoal-900 border border-linen-300 dark:border-charcoal-800 self-start md:self-end">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'menu'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-charcoal-700 dark:text-linen-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              Los 7 Pases Culinarios
            </button>
            <button
              onClick={() => setActiveTab('experiencia')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'experiencia'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-charcoal-700 dark:text-linen-300 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Regala Experiencias</span>
            </button>
          </div>
        </div>

        {/* Tab 1: The 7-Course Menu */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start animate-fade-in">
            
            {/* Courses Timeline List */}
            <div className="lg:col-span-8 space-y-6">
              {GASTRONOMIC_MENU.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 hover:border-brand-300 dark:hover:border-brand-700/60 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 font-serif font-bold text-xs flex items-center justify-center border border-brand-200 dark:border-brand-800">
                        0{item.id}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 dark:text-linen-400">
                        {item.course}
                      </span>
                    </div>

                    {item.dietary && (
                      <div className="flex gap-1.5">
                        {item.dietary.map((diet) => (
                          <span
                            key={diet}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-linen-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-linen-300 font-medium"
                          >
                            {diet}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-charcoal-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                    {item.name}
                  </h3>

                  <p className="text-sm text-charcoal-600 dark:text-linen-300 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {item.highlights && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-linen-100 dark:border-charcoal-850">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1 text-[11px] text-brand-700 dark:text-brand-300 font-medium"
                        >
                          <Sparkles className="w-3 h-3 text-brand-500" />
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar / Info Column */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* Schedule & Info Box */}
              <div className="p-7 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 shadow-premium dark:shadow-premium-dark">
                <span className="text-xs uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400 block mb-2">
                  Información del Servicio
                </span>
                <h4 className="font-serif text-2xl font-bold text-charcoal-950 dark:text-white mb-4">
                  Horario de Restaurante
                </h4>

                <div className="space-y-3.5 text-sm text-charcoal-700 dark:text-linen-300 mb-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-charcoal-900 dark:text-white">Lunes a Viernes</strong>
                      <span>Servicio de comidas: 13:30h a 17:30h</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-charcoal-900 dark:text-white">Reservas telefónicas</strong>
                      <span>{SITE_CONFIG.phoneBooking}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-charcoal-900 dark:text-white">Reserva para Grupos</strong>
                      <span>Salón para eventos o sala privada con proyector.</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Reservar Mesa Online</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`}
                    className="w-full py-3 px-6 rounded-xl border border-charcoal-300 dark:border-charcoal-700 hover:bg-linen-100 dark:hover:bg-charcoal-800 text-charcoal-800 dark:text-linen-200 font-medium text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span>Llamar para Reservar</span>
                  </a>
                </div>
              </div>

              {/* Real Food Plate Feature Card */}
              <div className="rounded-3xl overflow-hidden shadow-lg border border-linen-200 dark:border-charcoal-800 relative group">
                <img
                  src="https://ehescueladehosteleria.com/wp-content/uploads/2024/09/cropped-DSC07148-scaled-1.jpg"
                  alt="Plato gastronómico elaborado por los alumnos"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-semibold text-brand-300 uppercase tracking-widest">
                    Elaboración en Vivo
                  </span>
                  <p className="text-sm font-medium">
                    Técnicas de vanguardia aplicadas con mimo y dedicación por nuestra cantera de profesionales.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Regala Experiencias */}
        {activeTab === 'experiencia' && (
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-8 sm:p-12 border border-linen-200 dark:border-charcoal-800 shadow-premium dark:shadow-premium-dark animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">
                  <Gift className="w-4 h-4" />
                  <span>Bono Regalo Gastronómico</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-950 dark:text-white mb-4">
                  Regala una experiencia con propósito social
                </h3>
                <p className="text-charcoal-600 dark:text-linen-300 text-base leading-relaxed mb-6">
                  Sorprende a tus familiares, amigos o empleados con nuestro bono de regalo de degustación gastronómica para dos personas. Un regalo inolvidable que apoya directamente la formación y empleo de jóvenes y personas en vulnerabilidad social.
                </p>

                <ul className="space-y-3 mb-8 text-sm text-charcoal-700 dark:text-linen-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>Menú gastronómico completo de 7 tiempos para 2 comensales</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>Maridaje seleccionado de vinos de la Región de Murcia</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>Validez durante todo el curso escolar (cita previa)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>Formato tarjeta regalo física o voucher digital instantáneo</span>
                  </li>
                </ul>

                <button
                  onClick={onOpenBooking}
                  className="px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Solicitar Bono Regalo</span>
                </button>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-linen-100 dark:border-charcoal-800">
                  <img
                    src={SITE_CONFIG.images.experienceGift}
                    alt="Tarjeta regalo gastronómica eh! Escuela de Hostelería"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
