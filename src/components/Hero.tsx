import React from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { ArrowRight, UtensilsCrossed, Sparkles, ChevronDown, Award, Wine } from 'lucide-react';
import { ReservationServiceType } from '../types';

interface HeroProps {
  onOpenBooking: (service?: ReservationServiceType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-linen-50 dark:bg-charcoal-950 transition-colors">
      {/* Sutiles gradientes de ambiente sosegado (tonos lino y brand apagado) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-brand-700/[0.04] dark:bg-brand-700/[0.03] rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />
      <div 
        className="absolute -top-20 right-10 w-[420px] h-[420px] bg-brass-400/[0.06] dark:bg-brass-500/[0.03] rounded-full blur-3xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Columna Izquierda: Composición Editorial Noble */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Distintivo de Oficio & Casa */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-linen-100/90 dark:bg-charcoal-900/90 border border-linen-300/80 dark:border-charcoal-800 text-charcoal-800 dark:text-linen-200 text-xs tracking-wider uppercase font-medium mb-6 transition-colors shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-500 dark:bg-brass-400" />
              <span>Restaurante Escuela & Alta Gastronomía Social</span>
              <span className="text-charcoal-400 dark:text-charcoal-600">·</span>
              <span className="text-brand-700 dark:text-brand-400 font-semibold">Cáritas Murcia</span>
            </div>

            {/* Titular Editorial de Gran Porte */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight text-charcoal-950 dark:text-linen-50 leading-[1.08] mb-6">
              La liturgia de la mesa, <br />
              <span className="italic font-normal text-brand-700 dark:text-brand-400">el porvenir de las personas.</span>
            </h1>

            {/* Subtítulo: Valor de hospitalidad, pedagogía y producto */}
            <p className="text-lg sm:text-xl text-charcoal-700 dark:text-linen-300 font-light leading-relaxed max-w-2xl mb-8">
              Una experiencia culinaria de <strong className="font-medium text-charcoal-900 dark:text-linen-100">siete tiempos</strong> concebida con técnicas contemporáneas y la despensa viva de la huerta murciana. Elaborada y servida con devoción por los alumnos de la Escuela de Hostelería de <span className="text-brand-700 dark:text-brand-400 font-medium">Cáritas</span>.
            </p>

            {/* Botones de Acción Sobrios y Pulidos */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={() => onOpenBooking('menu-7-tiempos')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white font-medium text-sm sm:text-base tracking-wide transition-all duration-300 shadow-subtle hover:shadow-premium"
              >
                <UtensilsCrossed className="w-4 h-4 text-brass-200" />
                <span>Reservar Mesa Online</span>
              </button>

              <a
                href="#minuta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-linen-300 dark:border-charcoal-750 text-charcoal-800 dark:text-linen-200 hover:text-brand-700 dark:hover:text-brand-400 hover:border-brand-600/40 dark:hover:border-brand-500/40 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-sm font-medium text-sm sm:text-base transition-all duration-300"
              >
                <span>Ver Minuta Gastronómica</span>
                <ArrowRight className="w-4 h-4 text-brand-700 dark:text-brand-400" />
              </a>
            </div>

            {/* Rasgos de Confianza Litúrgicos */}
            <div className="pt-6 border-t border-linen-200/90 dark:border-charcoal-800/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-600 dark:text-linen-400">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-linen-200/70 dark:bg-charcoal-850 flex items-center justify-center text-brass-600 dark:text-brass-400 shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </span>
                <span className="font-medium text-charcoal-800 dark:text-linen-200">12+ años de oficio y magisterio</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-linen-200/70 dark:bg-charcoal-850 flex items-center justify-center text-brand-700 dark:text-brand-400 shrink-0">
                  <Wine className="w-3.5 h-3.5" />
                </span>
                <span className="font-medium text-charcoal-800 dark:text-linen-200">Maridaje D.O.P. Jumilla, Bullas y Yecla</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-linen-200/70 dark:bg-charcoal-850 flex items-center justify-center text-brass-600 dark:text-brass-400 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="font-medium text-charcoal-800 dark:text-linen-200">Minuta 32 € · L-V 13:30h - 17:30h</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Fotografía Protagonista con Enmarcado de Alta Escuela */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Passepartout de Alta Gastronomía */}
              <div className="p-3.5 sm:p-4 rounded-[2rem] bg-white/80 dark:bg-charcoal-900/80 border border-linen-200/90 dark:border-charcoal-800/90 shadow-premium dark:shadow-premium-dark backdrop-blur-sm transition-all duration-500">
                
                {/* Contenedor de la Imagen con Línea Capilar Interior */}
                <div className="relative rounded-[1.6rem] overflow-hidden bg-charcoal-950 group">
                  <img
                    src={SITE_CONFIG.images.heroDish}
                    alt="Pase culinario del Menú Gastronómico elaborado en eh! Escuela de Hostelería"
                    fetchPriority="high"
                    width={600}
                    height={540}
                    className="w-full h-[440px] sm:h-[500px] object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Gradiente sutil inferior para legibilidad editorial */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/25 to-transparent" />
                  
                  {/* Cartela Tipográfica de la Minuta */}
                  <div className="absolute bottom-6 left-6 right-6 text-linen-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brass-300 font-sans">
                        Pase de Temporada
                      </span>
                      <span className="text-white/40">·</span>
                      <span className="text-[10px] text-linen-300 tracking-wider uppercase font-light">
                        Huerta & Mar Menor
                      </span>
                    </div>
                    <p className="font-serif text-lg sm:text-xl font-normal leading-snug text-linen-100">
                      Producto noble de cercanía reinterpretado con rigor técnico y emoción contenida.
                    </p>
                  </div>
                </div>

                {/* Pie de Enmarcado: Cartucho de Autenticidad */}
                <div className="mt-3.5 px-3 py-2 flex items-center justify-between text-[11px] text-charcoal-600 dark:text-linen-400 border-t border-linen-100 dark:border-charcoal-800/60">
                  <span className="font-serif italic text-charcoal-800 dark:text-linen-200">
                    Vajilla artesanal de Totana & lino puro
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-brass-600 dark:text-brass-400 uppercase">
                    Servicio en Sala Viva
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Indicador de Descubrimiento Sosegado */}
        <div className="mt-16 text-center">
          <a
            href="#credenciales"
            className="inline-flex flex-col items-center text-xs text-charcoal-500 dark:text-linen-400 hover:text-brand-700 dark:hover:text-brand-400 transition-colors group"
          >
            <span className="mb-1.5 uppercase tracking-[0.2em] text-[10px] font-medium text-charcoal-500 dark:text-linen-400 group-hover:text-brand-700 dark:group-hover:text-brand-400">
              Credenciales de la Casa y Oficio
            </span>
            <ChevronDown className="w-4 h-4 text-charcoal-400 dark:text-charcoal-500 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
