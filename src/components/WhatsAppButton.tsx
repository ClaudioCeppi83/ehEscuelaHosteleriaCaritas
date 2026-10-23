import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-750 shadow-xl text-xs text-charcoal-800 dark:text-linen-100 animate-fade-in">
          <span>¡Hola! ¿En qué podemos ayudarte hoy?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="p-1 text-charcoal-400 hover:text-charcoal-600 dark:hover:text-linen-200"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
        aria-label="Contactar por WhatsApp con eh! Escuela de Hostelería"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
