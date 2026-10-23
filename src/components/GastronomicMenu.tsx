import React, { useState } from 'react';
import { GASTRONOMIC_COURSES, SITE_CONFIG } from '../data/siteData';
import { ReservationServiceType, GastronomicCourse } from '../types';
import { Wine, UtensilsCrossed, Gift, Clock, Phone, ChevronRight, Check, MapPin, Sparkles } from 'lucide-react';

interface GastronomicMenuProps {
  onOpenBooking: (service?: ReservationServiceType) => void;
}

export const GastronomicMenu: React.FC<GastronomicMenuProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'minuta' | 'bono'>('minuta');
  const [expandedIngredients, setExpandedIngredients] = useState<{ [key: string]: boolean }>({});

  const toggleIngredients = (courseId: string) => {
    setExpandedIngredients((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  return (
    <section 
      id="minuta" 
      className="py-24 sm:py-28 bg-linen-50 dark:bg-charcoal-950 transition-colors relative"
    >
      {/* Anchor retroactivo para enlaces a #menu */}
      <span id="menu" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial & Conmutador de Pestañas */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 pb-8 border-b border-linen-200/80 dark:border-charcoal-800/80">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linen-100/90 dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 text-brass-700 dark:text-brass-400 text-xs font-medium tracking-[0.2em] uppercase mb-4 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-brass-500" />
              <span>Minuta Degustación Estacional</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-950 dark:text-linen-50 tracking-tight leading-[1.12]">
              El recetario de la huerta y el mar, <br />
              <span className="italic font-normal text-brand-700 dark:text-brand-400">en siete pases de autor.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-charcoal-600 dark:text-linen-300 font-light leading-relaxed">
              Diseñado por el claustro docente y ejecutado en vivo por los alumnos de cocina y sala. Una cadencia pausada que armoniza el producto autóctono con los vinos de las tres Denominaciones de Origen de la Región.
            </p>

            {/* Cartela de Precio Distinguida (Sin estridencias de SaaS) */}
            <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t border-linen-200/60 dark:border-charcoal-800/60">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-normal text-charcoal-950 dark:text-linen-50">
                  32 €
                </span>
                <span className="text-xs uppercase tracking-wider text-charcoal-500 dark:text-linen-400 font-medium">
                  por comensal · IVA incluido
                </span>
              </div>
              <span className="hidden sm:inline-block text-charcoal-300 dark:text-charcoal-700">|</span>
              <span className="text-xs text-charcoal-600 dark:text-linen-300 font-light">
                Incluye pan artesano de masa madre y prepostre cítrico · Opción maridaje D.O.P.
              </span>
            </div>
          </div>

          {/* Conmutador Editorial de Pestañas */}
          <div
            role="tablist"
            aria-label="Modalidades gastronómicas"
            className="inline-flex items-center p-1 rounded-full bg-linen-200/70 dark:bg-charcoal-900 border border-linen-300/70 dark:border-charcoal-800 self-start lg:self-end shadow-subtle"
          >
            <button
              type="button"
              role="tab"
              id="tab-minuta"
              aria-selected={activeTab === 'minuta'}
              aria-controls="panel-minuta"
              onClick={() => setActiveTab('minuta')}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'minuta'
                  ? 'bg-brand-700 text-white shadow-subtle'
                  : 'text-charcoal-700 dark:text-linen-300 hover:text-brand-700 dark:hover:text-brand-400'
              }`}
            >
              Minuta 7 Tiempos
            </button>
            <button
              type="button"
              role="tab"
              id="tab-bono"
              aria-selected={activeTab === 'bono'}
              aria-controls="panel-bono"
              onClick={() => setActiveTab('bono')}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'bono'
                  ? 'bg-brand-700 text-white shadow-subtle'
                  : 'text-charcoal-700 dark:text-linen-300 hover:text-brand-700 dark:hover:text-brand-400'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Regala la Experiencia</span>
            </button>
          </div>
        </div>

        {/* Pestaña 1: Los 7 Pases de la Minuta Gastronómica */}
        {activeTab === 'minuta' && (
          <div
            id="panel-minuta"
            role="tabpanel"
            aria-labelledby="tab-minuta"
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            
            {/* Listado Editorial de los 7 Pases */}
            <div className="lg:col-span-8 space-y-6">
              {GASTRONOMIC_COURSES.map((course: GastronomicCourse) => (
                <article
                  key={course.id}
                  className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200/80 dark:border-charcoal-800/80 hover:border-brand-500/30 dark:hover:border-brand-500/30 transition-all duration-300 shadow-subtle group"
                >
                  {/* Encabezado del Pase: Número, Procedencia y Dietética */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold tracking-widest text-brass-700 dark:text-brass-400 bg-brass-500/10 dark:bg-brass-500/15 px-3 py-1 rounded-full uppercase">
                        Pase {course.courseNumber}
                      </span>
                      {course.provenance && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-charcoal-500 dark:text-linen-400 font-light">
                          <MapPin className="w-3 h-3 text-brass-500" />
                          {course.provenance}
                        </span>
                      )}
                    </div>

                    {/* Notas Dietéticas */}
                    {course.dietaryNotes && (
                      <div className="flex flex-wrap gap-1.5">
                        {course.dietaryNotes.map((note) => (
                          <span
                            key={note}
                            className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-linen-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-linen-300 font-medium"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Título & Sutileza Gastronómica */}
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal-950 dark:text-linen-50 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors mb-1">
                    {course.title}
                  </h3>

                  {course.subtitle && (
                    <p className="font-serif italic text-xs sm:text-sm text-brass-700 dark:text-brass-400 mb-3">
                      {course.subtitle}
                    </p>
                  )}

                  {/* Descripción Culinaria Reposada */}
                  <p className="text-sm sm:text-base text-charcoal-700 dark:text-linen-300 font-light leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Ingredientes de Proximidad (Desplegable sutil) */}
                  <div className="pt-3 border-t border-linen-100 dark:border-charcoal-850">
                    <button
                      type="button"
                      aria-expanded={Boolean(expandedIngredients[course.id])}
                      aria-controls={`ingredients-${course.id}`}
                      onClick={() => toggleIngredients(course.id)}
                      className="text-xs text-charcoal-500 dark:text-linen-400 hover:text-brand-700 dark:hover:text-brand-400 inline-flex items-center gap-1.5 font-medium transition-colors"
                    >
                      <span>
                        {expandedIngredients[course.id]
                          ? 'Ocultar ingredientes del pase'
                          : 'Ver ingredientes y procedencia de huerta'}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          expandedIngredients[course.id] ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {expandedIngredients[course.id] && (
                      <ul
                        id={`ingredients-${course.id}`}
                        className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-600 dark:text-linen-300 font-light bg-linen-50/70 dark:bg-charcoal-850/60 p-3.5 rounded-2xl animate-fade-in"
                      >
                        {course.ingredients.map((ingredient, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-brass-500" />
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Bloque Refinado de Maridaje D.O.P. */}
                  {course.pairing && (
                    <div className="mt-4 p-4 rounded-2xl bg-linen-100/60 dark:bg-charcoal-850/70 border border-linen-200/70 dark:border-charcoal-800/80">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-950/70 flex items-center justify-center text-brand-700 dark:text-brand-400 shrink-0 mt-0.5">
                          <Wine className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <h4 className="font-serif text-sm font-medium text-charcoal-900 dark:text-linen-100">
                              {course.pairing.wine}
                            </h4>
                            <span className="text-[10px] font-mono tracking-wider uppercase font-semibold text-brass-700 dark:text-brass-400 px-2 py-0.5 rounded bg-brass-500/10 dark:bg-brass-500/20">
                              {course.pairing.denomination}
                            </span>
                          </div>
                          {course.pairing.notes && (
                            <p className="text-xs text-charcoal-600 dark:text-linen-300 font-light leading-relaxed italic">
                              «{course.pairing.notes}»
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </article>
              ))}
            </div>

            {/* Columna Lateral Fija: Condiciones de Servicio & Reserva */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* Tarjeta de Servicio & Protocolo de Asistencia */}
              <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200/80 dark:border-charcoal-800/80 shadow-premium dark:shadow-premium-dark">
                <span className="font-mono text-xs tracking-widest uppercase font-semibold text-brass-700 dark:text-brass-400 block mb-2">
                  Protocolo del Comensal
                </span>
                <h3 className="font-serif text-2xl font-normal text-charcoal-950 dark:text-linen-50 mb-4">
                  Horario & Condiciones
                </h3>

                {/* Síntesis de Precio */}
                <div className="p-4 rounded-2xl bg-linen-50 dark:bg-charcoal-850 border border-linen-200/70 dark:border-charcoal-800 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-charcoal-500 dark:text-linen-400 block">
                      Minuta Degustación
                    </span>
                    <span className="font-serif text-2xl font-normal text-charcoal-950 dark:text-linen-50">
                      32 € <span className="font-sans text-xs text-charcoal-600 dark:text-linen-300 font-light">/ pax</span>
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-brand-700 text-white">
                    IVA Incluido
                  </span>
                </div>

                {/* Detalles de Servicio */}
                <div className="space-y-4 text-xs sm:text-sm text-charcoal-700 dark:text-linen-300 font-light mb-8">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-brand-700 dark:text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-charcoal-950 dark:text-linen-50 font-medium">De Lunes a Viernes</strong>
                      <span>Pase único de almuerzo: 13:30h a 17:30h</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-700 dark:text-brand-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-charcoal-950 dark:text-linen-50 font-medium">Atención de Maître</strong>
                      <span>{SITE_CONFIG.phoneBooking}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-brass-600 dark:text-brass-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-charcoal-950 dark:text-linen-50 font-medium">Adaptación de Alérgenos</strong>
                      <span>Indicar al reservar: carta adaptada a celiaquía e intolerancias.</span>
                    </div>
                  </div>
                </div>

                {/* Acciones de Reserva */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => onOpenBooking('menu-7-tiempos')}
                    className="w-full py-4 px-6 rounded-full bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white font-medium text-sm tracking-wide shadow-subtle transition-all flex items-center justify-center gap-2"
                  >
                    <UtensilsCrossed className="w-4 h-4 text-brass-200" />
                    <span>Reservar Mesa Online</span>
                  </button>

                  <a
                    href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`}
                    className="w-full py-3.5 px-6 rounded-full border border-linen-300 dark:border-charcoal-750 hover:bg-linen-100 dark:hover:bg-charcoal-800 text-charcoal-800 dark:text-linen-200 font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-700 dark:text-brand-400" />
                    <span>Llamada Directa a Sala</span>
                  </a>
                </div>
              </div>

              {/* Fotografía Testimonial de la Escuela */}
              <div className="rounded-3xl overflow-hidden shadow-subtle border border-linen-200/80 dark:border-charcoal-800/80 relative group">
                <img
                  src="/assets/photos/cropped-DSC07148-scaled-1.webp"
                  alt="Plato culinario del restaurante escuela"
                  width={400}
                  height={260}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/30 to-transparent p-5 flex flex-col justify-end text-linen-50">
                  <span className="text-[10px] font-mono tracking-widest text-brass-300 uppercase">
                    Vanguardia & Oficio
                  </span>
                  <p className="font-serif text-sm font-normal text-linen-100">
                    El aula viva donde la técnica culinaria se traduce en inserción y dignidad.
                  </p>
                </div>
              </div>

            </aside>

          </div>
        )}

        {/* Pestaña 2: Regala Experiencias (Bono Culinario) */}
        {activeTab === 'bono' && (
          <div
            id="panel-bono"
            role="tabpanel"
            aria-labelledby="tab-bono"
            className="bg-white dark:bg-charcoal-900 rounded-[2.5rem] p-8 sm:p-14 border border-linen-200/80 dark:border-charcoal-800/80 shadow-premium dark:shadow-premium-dark animate-fade-in"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linen-100/90 dark:bg-charcoal-800 border border-linen-200 dark:border-charcoal-700 text-brass-700 dark:text-brass-400 text-xs font-medium tracking-[0.2em] uppercase mb-4 shadow-subtle">
                  <Gift className="w-3.5 h-3.5 text-brass-500" />
                  <span>Bono Regalo Gastronómico</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal-950 dark:text-linen-50 mb-4 leading-tight">
                  Un obsequio memorable <br />
                  <span className="italic text-brand-700 dark:text-brand-400 font-normal">con hondo impacto social.</span>
                </h3>

                <p className="text-charcoal-600 dark:text-linen-300 text-base font-light leading-relaxed mb-6">
                  Regala a tus familiares, compromisos o colaboradores un almuerzo de siete tiempos en nuestro restaurante de alta cocina. Cada bono financia directamente el programa de becas y equipamiento para los alumnos de la Escuela de Hostelería de Cáritas.
                </p>

                <ul className="space-y-3.5 mb-8 text-xs sm:text-sm text-charcoal-700 dark:text-linen-200 font-light">
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-brass-500/10 dark:bg-brass-500/20 text-brass-700 dark:text-brass-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Menú gastronómico completo de 7 tiempos para dos comensales.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-brass-500/10 dark:bg-brass-500/20 text-brass-700 dark:text-brass-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Maridaje seleccionado con caldos D.O.P. Jumilla, Bullas y Yecla.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-brass-500/10 dark:bg-brass-500/20 text-brass-700 dark:text-brass-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Validez durante todo el curso escolar bajo reserva previa en sala.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-brass-500/10 dark:bg-brass-500/20 text-brass-700 dark:text-brass-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>Presentación en tarjeta física en sobre de lino o bono digital para envío inmediato.</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => onOpenBooking('bono-experiencia')}
                  className="px-8 py-4 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-medium text-sm tracking-wide shadow-subtle transition-all inline-flex items-center gap-2.5"
                >
                  <Gift className="w-4 h-4 text-brass-200" />
                  <span>Solicitar Bono Regalo Online</span>
                </button>
              </div>

              <div className="lg:col-span-6">
                <div className="p-3 bg-linen-100/90 dark:bg-charcoal-850 rounded-3xl border border-linen-200/90 dark:border-charcoal-800 shadow-premium">
                  <img
                    src={SITE_CONFIG.images.experienceGift}
                    alt="Tarjeta regalo gastronómica eh! Escuela de Hostelería Cáritas"
                    width={640}
                    height={480}
                    className="w-full h-auto rounded-2xl object-cover"
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

