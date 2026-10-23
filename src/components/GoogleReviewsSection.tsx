import React, { useState, useEffect } from 'react';
import { getGoogleReviews } from '../services/googleReviewsService';
import { GoogleReview, GooglePlaceSummary } from '../types';
import { SITE_CONFIG, REVIEWS } from '../data/siteData';
import { Star, ExternalLink, MapPin, Sparkles, Newspaper, ShieldCheck, Quote, ChevronRight, Loader2 } from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
  const [place, setPlace] = useState<GooglePlaceSummary | null>(null);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'highest_rating'>('relevant');
  const [activeTab, setActiveTab] = useState<'google' | 'prensa'>('google');

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const result = await getGoogleReviews({ sortBy, limit: 6 });
        if (isMounted) {
          setPlace(result.place);
          setReviews(result.reviews);
        }
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchReviews();
    return () => {
      isMounted = false;
    };
  }, [sortBy]);

  return (
    <section 
      id="resenas" 
      className="py-24 sm:py-28 bg-linen-50 dark:bg-charcoal-950 border-t border-linen-200/80 dark:border-charcoal-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linen-100/90 dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 text-brass-700 dark:text-brass-400 text-xs font-medium tracking-[0.2em] uppercase mb-4 shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-brass-500" />
            <span>Opiniones Verificadas & Prensa</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-charcoal-950 dark:text-linen-50 tracking-tight leading-[1.12]">
            El testimonio de la mesa, <br />
            <span className="italic font-normal text-brand-700 dark:text-brand-400">la huella de la experiencia.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-charcoal-600 dark:text-linen-300 font-light leading-relaxed">
            Críticos gastronómicos, comensales cotidianos y comités de empresa avalan la doble dimensión de nuestro restaurante: técnica culinaria irreprochable y dignidad humana.
          </p>
        </div>

        {/* Resumen Google Places & Filtros */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200/80 dark:border-charcoal-800/80 shadow-premium dark:shadow-premium-dark flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Valoración Consolidada */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl font-normal text-charcoal-950 dark:text-linen-50">
                {place ? place.rating.toFixed(1) : '4.9'}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-brass-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brass-400 text-brass-500" />
                  ))}
                </div>
                <span className="text-xs text-charcoal-500 dark:text-linen-400 mt-0.5">
                  Sobre 5.0 en Google Places
                </span>
              </div>
            </div>

            <div className="h-10 w-px bg-linen-200 dark:bg-charcoal-800 hidden sm:block" />

            <div>
              <span className="font-serif text-lg font-medium text-charcoal-900 dark:text-linen-100 block">
                {place ? `${place.totalReviews} Reseñas Verificadas` : '184 Reseñas Verificadas'}
              </span>
              <span className="text-xs text-charcoal-500 dark:text-linen-400">
                Comensales reales · Máxima puntuación en servicio y menú
              </span>
            </div>
          </div>

          {/* Enlace Oficial a Google Maps */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={place?.mapsUrl || SITE_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-linen-300 dark:border-charcoal-750 hover:bg-linen-100 dark:hover:bg-charcoal-800 text-charcoal-800 dark:text-linen-200 text-xs font-medium tracking-wide transition-all shadow-subtle"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-700 dark:text-brand-400" />
              <span>Ver ficha en Google Maps</span>
              <ExternalLink className="w-3 h-3 text-charcoal-400" />
            </a>

            {/* Selector de Pestaña: Reseñas / Prensa */}
            <div
              role="tablist"
              aria-label="Origen de testimonios"
              className="inline-flex p-1 rounded-full bg-linen-100 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-750"
            >
              <button
                type="button"
                role="tab"
                id="tab-google-reviews"
                aria-selected={activeTab === 'google'}
                aria-controls="panel-google-reviews"
                onClick={() => setActiveTab('google')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'google'
                    ? 'bg-brand-700 text-white shadow-subtle'
                    : 'text-charcoal-600 dark:text-linen-400 hover:text-brand-700'
                }`}
              >
                Google Reviews
              </button>
              <button
                type="button"
                role="tab"
                id="tab-prensa-reviews"
                aria-selected={activeTab === 'prensa'}
                aria-controls="panel-prensa-reviews"
                onClick={() => setActiveTab('prensa')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'prensa'
                    ? 'bg-brand-700 text-white shadow-subtle'
                    : 'text-charcoal-600 dark:text-linen-400 hover:text-brand-700'
                }`}
              >
                <Newspaper className="w-3 h-3" />
                <span>Prensa</span>
              </button>
            </div>
          </div>

        </div>

        {/* Contenido Pestaña 1: Google Reviews Verificadas */}
        {activeTab === 'google' && (
          <div
            id="panel-google-reviews"
            role="tabpanel"
            aria-labelledby="tab-google-reviews"
          >
            {/* Opciones de Ordenación de Reseñas */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-linen-200/70 dark:border-charcoal-800/70">
              <span className="text-xs font-mono tracking-wider uppercase text-charcoal-500 dark:text-linen-400">
                Mostrando las opiniones más destacadas de comensales
              </span>
              <div
                role="group"
                aria-label="Criterio de ordenación"
                className="flex items-center gap-2 text-xs"
              >
                <span className="text-charcoal-500 dark:text-linen-400 hidden sm:inline">Ordenar por:</span>
                <button
                  type="button"
                  aria-pressed={sortBy === 'relevant'}
                  onClick={() => setSortBy('relevant')}
                  className={`px-3 py-1 rounded-full ${
                    sortBy === 'relevant'
                      ? 'bg-brass-500/15 text-brass-800 dark:text-brass-300 font-semibold'
                      : 'text-charcoal-600 dark:text-linen-400 hover:text-charcoal-900'
                  }`}
                >
                  Relevancia
                </button>
                <button
                  type="button"
                  aria-pressed={sortBy === 'newest'}
                  onClick={() => setSortBy('newest')}
                  className={`px-3 py-1 rounded-full ${
                    sortBy === 'newest'
                      ? 'bg-brass-500/15 text-brass-800 dark:text-brass-300 font-semibold'
                      : 'text-charcoal-600 dark:text-linen-400 hover:text-charcoal-900'
                  }`}
                >
                  Más recientes
                </button>
              </div>
            </div>

            {/* Estado de Carga o Retícula de Reseñas */}
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-charcoal-500 dark:text-linen-400">
                <Loader2 className="w-8 h-8 text-brand-700 dark:text-brand-400 animate-spin" />
                <span className="font-serif italic text-sm">Consultando reseñas verificadas...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200/80 dark:border-charcoal-800/80 shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between group"
                  >
                  <div>
                    {/* Encabezado Autor & Medalla Local Guide */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.authorPhotoUrl}
                          alt={rev.authorName}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-full object-cover border border-linen-200 dark:border-charcoal-800 shadow-subtle"
                          loading="lazy"
                        />
                        <div>
                          <h3 className="font-serif text-sm sm:text-base font-medium text-charcoal-950 dark:text-linen-50 leading-snug">
                            {rev.authorName}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {rev.isLocalGuide ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-brass-700 dark:text-brass-400 font-semibold">
                                <ShieldCheck className="w-3 h-3 text-brass-500" />
                                Local Guide
                              </span>
                            ) : (
                              <span className="text-[10px] text-charcoal-500 dark:text-linen-400">
                                Comensal Verificado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] text-charcoal-400 dark:text-charcoal-600 font-light shrink-0">
                        {rev.relativeTimeDescription}
                      </span>
                    </div>

                    {/* Estrellas en Latón Cálido */}
                    <div className="flex items-center gap-1 mb-4 text-brass-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-brass-400 text-brass-500" />
                      ))}
                    </div>

                    {/* Testimonio */}
                    <p className="font-serif italic text-xs sm:text-sm text-charcoal-700 dark:text-linen-200 leading-relaxed font-light mb-4">
                      «{rev.text}»
                    </p>
                  </div>

                  {/* Highlights Culinarios */}
                  {rev.highlights && rev.highlights.length > 0 && (
                    <div className="pt-4 border-t border-linen-100 dark:border-charcoal-800 flex flex-wrap gap-1.5">
                      {rev.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-linen-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-linen-400 font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
            )}
          </div>
        )}

        {/* Contenido Pestaña 2: Prensa Especializada & Reconocimientos */}
        {activeTab === 'prensa' && (
          <div
            id="panel-prensa-reviews"
            role="tabpanel"
            aria-labelledby="tab-prensa-reviews"
            className="space-y-8 animate-fade-in"
          >
            {/* Titulares de Prensa */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a
                href="https://ehescueladehosteleria.com/reportaje-la-verdad"
                target="_blank"
                rel="noopener noreferrer"
                className="p-7 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200/80 dark:border-charcoal-800/80 hover:border-brand-500/40 shadow-subtle hover:shadow-premium transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-brand-700 dark:text-brand-400 block mb-1.5">
                    Reportaje Especial · Diario La Verdad
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-charcoal-950 dark:text-linen-50 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                    «La receta de Cáritas para cambiar vidas a través de los fogones y el protocolo de sala»
                  </h3>
                </div>
                <ChevronRight className="w-5 h-5 text-charcoal-400 group-hover:text-brand-700 group-hover:translate-x-1 shrink-0 ml-4 transition-all" />
              </a>

              <a
                href="https://ehescueladehosteleria.com/jornadas-interescuelas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-7 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200/80 dark:border-charcoal-800/80 hover:border-brand-500/40 shadow-subtle hover:shadow-premium transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-brass-700 dark:text-brass-400 block mb-1.5">
                    Encuentro Culinario Profesional
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-charcoal-950 dark:text-linen-50 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
                    Jornadas InterEscuelas de Hostelería de la Región de Murcia
                  </h3>
                </div>
                <ChevronRight className="w-5 h-5 text-charcoal-400 group-hover:text-brand-700 group-hover:translate-x-1 shrink-0 ml-4 transition-all" />
              </a>
            </div>

            {/* Citas Institucionales y de la Crítica */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-7 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200/80 dark:border-charcoal-800/80 shadow-subtle flex flex-col justify-between"
                >
                  <div>
                    <Quote className="w-5 h-5 text-brass-500 mb-3" />
                    <p className="font-serif italic text-sm text-charcoal-800 dark:text-linen-200 leading-relaxed mb-6 font-light">
                      «{rev.content}»
                    </p>
                  </div>
                  <div className="pt-4 border-t border-linen-100 dark:border-charcoal-800">
                    <h4 className="font-serif text-sm font-medium text-charcoal-950 dark:text-linen-50">
                      {rev.author}
                    </h4>
                    <span className="text-xs text-brand-700 dark:text-brand-400 font-medium">
                      {rev.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
