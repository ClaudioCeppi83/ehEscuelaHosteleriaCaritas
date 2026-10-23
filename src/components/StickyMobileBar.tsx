import React from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { Utensils, Phone, MessageCircle } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Acciones rápidas en móvil"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-lg border-t border-linen-200 dark:border-charcoal-800 shadow-[0_-8px_25px_rgba(0,0,0,0.1)] px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-colors"
    >
      <div className="flex items-center gap-2 max-w-lg mx-auto">
        {/* Botón Llamar Rápido */}
        <a
          href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`}
          className="flex-1 min-w-[70px] min-h-[48px] py-2 px-2.5 rounded-xl bg-linen-100 hover:bg-linen-200 dark:bg-charcoal-800 dark:hover:bg-charcoal-750 text-charcoal-800 dark:text-linen-100 text-center flex flex-col items-center justify-center transition-colors border border-linen-200/80 dark:border-charcoal-700/80"
          aria-label={`Llamar por teléfono a reservas: ${SITE_CONFIG.phoneBooking}`}
        >
          <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Llamar</span>
        </a>

        {/* Botón Principal: Reservar Mesa */}
        <button
          type="button"
          onClick={onOpenBooking}
          className="flex-[2.5] min-h-[48px] py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-bold text-xs shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all"
        >
          <Utensils className="w-4 h-4" />
          <span>Reservar Mesa</span>
        </button>

        {/* Botón WhatsApp Directo */}
        <a
          href={SITE_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[70px] min-h-[48px] py-2 px-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-center flex flex-col items-center justify-center transition-colors border border-emerald-300/40 dark:border-emerald-800/60"
          aria-label="Abrir chat de WhatsApp con eh! Escuela de Hostelería"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>
      </div>
    </aside>
  );
};
