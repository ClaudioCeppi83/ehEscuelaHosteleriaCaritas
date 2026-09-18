import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { X, Phone, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'menu-7-tiempos',
    date: '',
    time: '14:00',
    guests: '2',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div 
        className="relative max-w-xl w-full bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-linen-200 dark:border-charcoal-800 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-charcoal-500 hover:text-charcoal-900 dark:text-linen-400 dark:hover:text-white hover:bg-linen-100 dark:hover:bg-charcoal-800 transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-charcoal-950 dark:text-white mb-2">
              ¡Solicitud Recibida con Éxito!
            </h3>
            <p className="text-sm text-charcoal-600 dark:text-linen-300 max-w-md mx-auto mb-6">
              Gracias, <strong>{formData.name}</strong>. Nuestro equipo de sala de eh! Escuela de Hostelería revisará tu reserva para el día <strong>{formData.date || 'solicitado'}</strong> y te contactará en breve al teléfono <strong>{formData.phone}</strong> para confirmar todos los detalles.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all"
            >
              Entendido
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400 block mb-1">
                eh! Escuela de Hostelería · Murcia
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-white">
                Reservar Mesa o Espacio
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-linen-400 mt-1">
                Restaurante gastronómico (L-V 13:30h - 17:30h) o sala privada para reuniones.
              </p>
            </div>

            {/* Direct Dish Engine Fast Button */}
            <div className="p-4 rounded-2xl bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-xs font-bold text-brand-800 dark:text-brand-300 block">
                  ¿Prefieres confirmación online inmediata?
                </span>
                <span className="text-[11px] text-brand-700 dark:text-brand-400">
                  Usa nuestro motor de reserva oficial en tiempo real de Dish.
                </span>
              </div>
              <a
                href={SITE_CONFIG.dishBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Abrir Dish Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                  Tipo de Servicio
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option value="menu-7-tiempos">Menú Gastronómico (7 tiempos) - Restaurante</option>
                  <option value="sala-privada">Sala Privada con Proyector (Reuniones / Empresa)</option>
                  <option value="catering-empresa">Catering para Empresa o Evento Privado</option>
                  <option value="bono-experiencia">Solicitud de Bono Regalo Experiencias</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carmen Martínez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                    Teléfono de Contacto *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 685 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                    Fecha deseada
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                    Hora (13:30 a 15:30)
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    min="13:30"
                    max="16:00"
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                    Comensales
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="80"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                  Notas o Alérgenos
                </label>
                <textarea
                  rows={2}
                  placeholder="Indícanos si hay alguna intolerancia, preferencia o si requieres sala privada con proyector..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`}
                  className="text-xs text-charcoal-600 dark:text-linen-400 hover:text-brand-600 flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>¿Prefieres llamar? {SITE_CONFIG.phoneBooking}</span>
                </a>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitud</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
