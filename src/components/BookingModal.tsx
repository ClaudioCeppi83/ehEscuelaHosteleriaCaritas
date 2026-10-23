import React, { useState, useEffect, useRef, useId } from 'react';
import { SITE_CONFIG } from '../data/siteData';
import {
  X,
  Phone,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Copy,
  Check,
  CalendarPlus,
  Download,
  AlertTriangle,
  UtensilsCrossed,
  Loader2,
  Share2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useMockStore } from '../context/MockStoreContext';
import { useToast } from '../context/ToastContext';
import { Reservation, ReservationServiceType } from '../types';
import { SERVICE_NAMES } from '../services/mockService';
import { RgpdModal } from './RgpdModal';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: ReservationServiceType;
}

type ModalState = 'idle' | 'submitting' | 'confirmed';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'menu-7-tiempos',
}) => {
  const { createReservation, generateIcsCalendar, getGoogleCalendarUrl } = useMockStore();
  const toast = useToast();
  const formId = useId();

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const firstInputRef = useRef<HTMLSelectElement | HTMLInputElement | null>(null);
  const confirmedTitleRef = useRef<HTMLHeadingElement>(null);

  // Fecha mínima: Hoy
  const todayStr = new Date().toISOString().split('T')[0];

  const [state, setState] = useState<ModalState>('idle');
  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);

  // RGPD Consent States
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentHealth, setConsentHealth] = useState(false);
  const [isRgpdOpen, setIsRgpdOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    serviceType: defaultService as ReservationServiceType,
    date: '',
    time: '14:00',
    guests: 2,
    dietaryNotes: '',
    notes: '',
    _hp: '', // Honeypot anti-spam
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Sincronizar servicio por defecto si cambia con guardia de tipo defensiva
  useEffect(() => {
    if (typeof defaultService === 'string') {
      setFormData((prev) => ({ ...prev, serviceType: defaultService }));
    }
  }, [defaultService]);

  // Accesibilidad: Focus trap, tecla Escape y autofocus
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Timeout para garantizar que el DOM esté listo antes de enfocar
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen]);

  // Accesibilidad: Enfocar automáticamente el encabezado del ticket cuando se confirma la reserva
  useEffect(() => {
    if (state === 'confirmed') {
      const timer = setTimeout(() => {
        confirmedTitleRef.current?.focus();
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [state]);

  if (!isOpen) return null;

  // Validaciones
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPhone = (phone: string) => {
    const clean = phone.replace(/[\s-]/g, '');
    return /^(\+34)?[6789]\d{8}$/.test(clean);
  };
  const isNameValid = formData.customerName.trim().length >= 2;
  const isEmailValid = isValidEmail(formData.email);
  const isPhoneValid = isValidPhone(formData.phone);
  const isDateValid = Boolean(formData.date && formData.date >= todayStr);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleClose = () => {
    setState('idle');
    setCreatedReservation(null);
    setHasCopiedCode(false);
    setConsentPrivacy(false);
    setConsentHealth(false);
    onClose();
  };

  const handleResetForNewBooking = () => {
    setFormData({
      customerName: '',
      email: '',
      phone: '',
      serviceType: 'menu-7-tiempos',
      date: '',
      time: '14:00',
      guests: 2,
      dietaryNotes: '',
      notes: '',
      _hp: '',
    });
    setTouched({});
    setConsentPrivacy(false);
    setConsentHealth(false);
    setState('idle');
    setCreatedReservation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasDietaryNotes = formData.dietaryNotes.trim().length > 0;

    setTouched({
      customerName: true,
      email: true,
      phone: true,
      date: true,
      time: true,
      guests: true,
      consentPrivacy: true,
      consentHealth: hasDietaryNotes,
    });

    if (!isNameValid) {
      toast.error('Por favor, indica tu nombre completo.', 'Nombre requerido');
      return;
    }
    if (!isEmailValid) {
      toast.error('Introduce una dirección de correo válida.', 'Email requerido');
      return;
    }
    if (!isPhoneValid) {
      toast.error('Introduce un teléfono de contacto de 9 dígitos (ej. 685 07 79 86).', 'Teléfono incorrecto');
      return;
    }
    if (!formData.date) {
      toast.error('Debes seleccionar la fecha deseada para tu experiencia.', 'Fecha requerida');
      return;
    }
    if (formData.date < todayStr) {
      toast.error('La fecha no puede ser anterior al día de hoy.', 'Fecha no válida');
      return;
    }
    if (!consentPrivacy) {
      toast.error('Es imprescindible aceptar la política de privacidad para confirmar tu reserva.', 'Consentimiento requerido');
      return;
    }
    if (hasDietaryNotes && !consentHealth) {
      toast.error('Al indicar alergias o intolerancias, debes autorizar el tratamiento de datos de salud (Art. 9 RGPD) para adaptar tu menú.', 'Consentimiento de salud requerido');
      return;
    }

    setState('submitting');
    try {
      const reservation = await createReservation({
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        serviceName: SERVICE_NAMES[formData.serviceType],
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        dietaryNotes: formData.dietaryNotes,
        notes: formData.notes,
        _hp: formData._hp,
      });

      setCreatedReservation(reservation);
      setState('confirmed');
      toast.success(
        `Reserva ${reservation.code} registrada con éxito. ¡Te esperamos en Sala!`,
        'Reserva Confirmada'
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al procesar la reserva';
      toast.error(msg, 'No se pudo registrar');
      setState('idle');
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setHasCopiedCode(true);
      toast.info(`Localizador ${code} copiado al portapapeles.`, 'Código copiado');
      setTimeout(() => setHasCopiedCode(false), 2500);
    } catch {
      toast.error('No se pudo copiar automáticamente al portapapeles.');
    }
  };

  const handleShareDetails = async () => {
    if (!createdReservation) return;

    const summaryText = [
      `🍽️ Reserva en eh! Escuela de Hostelería (Cáritas Murcia)`,
      `📍 Código Localizador: ${createdReservation.code}`,
      `✨ Servicio: ${createdReservation.serviceName}`,
      `📅 Fecha: ${createdReservation.date} a las ${createdReservation.time}h`,
      `👥 Comensales: ${createdReservation.guests} personas`,
      `👤 Titular: ${createdReservation.customerName}`,
      createdReservation.dietaryNotes ? `⚠️ Dietas/Alérgenos: ${createdReservation.dietaryNotes}` : null,
      `📍 Ubicación: C. Sta. Cecilia, 1, Murcia (Tel: +34 685 07 79 86)`,
    ]
      .filter(Boolean)
      .join('\n');

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Reserva ${createdReservation.code} - eh! Escuela de Hostelería`,
          text: summaryText,
        });
        toast.success('Detalles compartidos con éxito');
        return;
      } catch {
        // Fallback a portapapeles
      }
    }

    try {
      await navigator.clipboard.writeText(summaryText);
      toast.success('Resumen completo de reserva copiado al portapapeles.', '¡Copiado!');
    } catch {
      toast.error('No se pudo copiar el resumen.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={handleClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative max-w-xl w-full bg-white dark:bg-charcoal-900 rounded-3xl p-5 sm:p-8 shadow-2xl border border-linen-200 dark:border-charcoal-800 my-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button con touch target accesible >= 44px */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-charcoal-500 hover:text-charcoal-900 dark:text-linen-400 dark:hover:text-white hover:bg-linen-100 dark:hover:bg-charcoal-800 transition-colors z-10"
          aria-label="Cerrar ventana de reserva"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ESTADO 3: CONFIRMACIÓN - TICKET GASTRONÓMICO EJECUTIVO */}
        {state === 'confirmed' && createdReservation ? (
          <div className="py-2 animate-fade-in">
            {/* Header de éxito */}
            <div className="text-center pb-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400">
                eh! Escuela de Hostelería · Mesa Confirmada
              </span>
              <h3
                id="booking-modal-title"
                ref={confirmedTitleRef}
                tabIndex={-1}
                className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-white mt-1 focus:outline-none"
              >
                ¡Tu Reserva está Lista!
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-linen-300 mt-1 max-w-md mx-auto">
                Nuestro Maître y el equipo de sala han registrado tu pase gastronómico.
              </p>
            </div>

            {/* Ticket Gastronómico Card */}
            <div className="my-4 rounded-3xl bg-linen-50 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-750 shadow-premium dark:shadow-premium-dark overflow-hidden relative">
              {/* Top Bar Ticket */}
              <div className="bg-brand-600 px-5 py-3 text-white flex items-center justify-between text-xs font-semibold tracking-wider uppercase">
                <div className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Ticket Gastronómico de Sala</span>
                </div>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-mono">
                  Confirmada
                </span>
              </div>

              {/* Locator Highlight */}
              <div className="p-5 sm:p-6 pb-4 bg-gradient-to-b from-white dark:from-charcoal-800 to-linen-50 dark:to-charcoal-850">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 dark:text-linen-400 block">
                      Localizador de Reserva
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-brand-700 dark:text-brand-300 tracking-wider">
                      {createdReservation.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(createdReservation.code)}
                    className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-charcoal-800 border border-linen-300 dark:border-charcoal-700 text-charcoal-800 dark:text-white hover:text-brand-600 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                    aria-label="Copiar código localizador"
                  >
                    {hasCopiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Perforated divider visual */}
                <div className="relative my-4 flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-linen-300 dark:border-charcoal-700" />
                  <span className="px-3 text-[10px] uppercase font-bold text-charcoal-400 dark:text-linen-400 bg-transparent tracking-widest">
                    Detalles del Pase
                  </span>
                  <div className="flex-1 border-t-2 border-dashed border-linen-300 dark:border-charcoal-700" />
                </div>

                {/* Grid con detalles */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-white dark:bg-charcoal-800/80 border border-linen-200/80 dark:border-charcoal-750">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-linen-400 block">
                      Servicio Elegido
                    </span>
                    <p className="font-semibold text-charcoal-900 dark:text-white mt-0.5">
                      {createdReservation.serviceName}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-charcoal-800/80 border border-linen-200/80 dark:border-charcoal-750">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-linen-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-600" /> Fecha & <Clock className="w-3 h-3 text-brand-600" /> Turno
                    </span>
                    <p className="font-semibold text-charcoal-900 dark:text-white mt-0.5">
                      {createdReservation.date} · {createdReservation.time}h
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-charcoal-800/80 border border-linen-200/80 dark:border-charcoal-750">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-linen-400 flex items-center gap-1">
                      <Users className="w-3 h-3 text-brand-600" /> Comensales
                    </span>
                    <p className="font-semibold text-charcoal-900 dark:text-white mt-0.5">
                      {createdReservation.guests} {createdReservation.guests === 1 ? 'persona' : 'personas'}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-charcoal-800/80 border border-linen-200/80 dark:border-charcoal-750">
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-400 dark:text-linen-400 block">
                      Titular
                    </span>
                    <p className="font-semibold text-charcoal-900 dark:text-white mt-0.5 truncate">
                      {createdReservation.customerName}
                    </p>
                  </div>

                  {createdReservation.dietaryNotes && (
                    <div className="col-span-2 p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50">
                      <span className="text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3 h-3 text-amber-600" /> Alérgenos / Restricciones
                      </span>
                      <p className="text-charcoal-800 dark:text-linen-200 mt-0.5">
                        {createdReservation.dietaryNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Botones de Integración de Calendario */}
              <div className="px-5 py-3.5 bg-linen-100/60 dark:bg-charcoal-900 border-t border-linen-200 dark:border-charcoal-800 flex flex-col sm:flex-row gap-2">
                <a
                  href={getGoogleCalendarUrl(createdReservation)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-charcoal-800 border border-linen-300 dark:border-charcoal-700 text-charcoal-800 dark:text-white hover:text-brand-600 hover:border-brand-300 dark:hover:border-brand-700 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-brand-600" />
                  <span>Google Calendar</span>
                </a>

                <button
                  type="button"
                  onClick={() => generateIcsCalendar(createdReservation)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-charcoal-800 border border-linen-300 dark:border-charcoal-700 text-charcoal-800 dark:text-white hover:text-brand-600 hover:border-brand-300 dark:hover:border-brand-700 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-brand-600" />
                  <span>Descargar Cita (.ics)</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareDetails}
                  className="py-2 px-3 rounded-xl bg-white dark:bg-charcoal-800 border border-linen-300 dark:border-charcoal-700 text-charcoal-800 dark:text-white hover:text-brand-600 hover:border-brand-300 dark:hover:border-brand-700 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  title="Compartir o copiar resumen"
                  aria-label="Compartir o copiar detalles"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compartir</span>
                </button>
              </div>
            </div>

            {/* Acciones Finales */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetForNewBooking}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-linen-300 dark:border-charcoal-700 text-charcoal-700 dark:text-linen-300 hover:bg-linen-100 dark:hover:bg-charcoal-800 text-xs font-semibold transition-colors"
              >
                Hacer otra reserva
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition-all"
              >
                Finalizar y Cerrar
              </button>
            </div>
          </div>
        ) : (
          /* ESTADO 1 & 2: FORMULARIO DE RESERVA / SUBMITTING */
          <div>
            <div className="mb-5">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>eh! Escuela de Hostelería · Murcia</span>
              </div>
              <h3
                id="booking-modal-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-white"
              >
                Reservar Mesa o Espacio
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-linen-400 mt-1">
                Restaurante gastronómico (L-V 13:30h - 17:30h) o sala privada para reuniones.
              </p>
            </div>

            {/* Direct Dish Engine Fast Button */}
            <div className="p-3.5 rounded-2xl bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/80 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
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
                className="shrink-0 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Abrir Dish</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
              {/* Honeypot field anti-spam */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  opacity: 0,
                  zIndex: -1,
                  width: 0,
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                <label htmlFor={`${formId}-hp`}>No rellenar</label>
                <input
                  type="text"
                  id={`${formId}-hp`}
                  name="_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._hp}
                  onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                />
              </div>

              {/* Tipo de Servicio */}
              <div>
                <label
                  htmlFor={`${formId}-service`}
                  className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1"
                >
                  Tipo de Servicio / Espacio *
                </label>
                <select
                  ref={firstInputRef as React.RefObject<HTMLSelectElement>}
                  id={`${formId}-service`}
                  disabled={state === 'submitting'}
                  value={formData.serviceType}
                  onChange={(e) =>
                    setFormData({ ...formData, serviceType: e.target.value as ReservationServiceType })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:opacity-60"
                >
                  <option value="menu-7-tiempos">Menú Gastronómico (7 tiempos) - Restaurante</option>
                  <option value="sala-privada">Sala Privada con Proyector (Reuniones / Empresa)</option>
                  <option value="catering-empresa">Catering para Empresa o Evento Privado</option>
                  <option value="bono-experiencia">Solicitud de Bono Regalo Experiencias</option>
                </select>
              </div>

              {/* Nombre y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor={`${formId}-name`}
                      className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300"
                    >
                      Nombre y Apellidos *
                    </label>
                    {touched.customerName && !isNameValid && (
                      <span className="text-[10px] text-red-500">Mínimo 2 caracteres</span>
                    )}
                  </div>
                  <input
                    id={`${formId}-name`}
                    type="text"
                    required
                    disabled={state === 'submitting'}
                    placeholder="Ej. Carmen Martínez"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    onBlur={() => handleBlur('customerName')}
                    className={`w-full px-3.5 py-2 rounded-xl border ${
                      touched.customerName && !isNameValid
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-linen-300 dark:border-charcoal-700 focus:ring-brand-500'
                    } bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:outline-none transition-all disabled:opacity-60`}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor={`${formId}-phone`}
                      className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300"
                    >
                      Teléfono *
                    </label>
                    {touched.phone && !isPhoneValid && (
                      <span className="text-[10px] text-red-500">9 dígitos válidos</span>
                    )}
                  </div>
                  <input
                    id={`${formId}-phone`}
                    type="tel"
                    required
                    disabled={state === 'submitting'}
                    placeholder="Ej. 685 07 79 86"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full px-3.5 py-2 rounded-xl border ${
                      touched.phone && !isPhoneValid
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-linen-300 dark:border-charcoal-700 focus:ring-brand-500'
                    } bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:outline-none transition-all disabled:opacity-60`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor={`${formId}-email`}
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300"
                  >
                    Correo Electrónico *
                  </label>
                  {touched.email && !isEmailValid && (
                    <span className="text-[10px] text-red-500">Email válido requerido</span>
                  )}
                </div>
                <input
                  id={`${formId}-email`}
                  type="email"
                  required
                  disabled={state === 'submitting'}
                  placeholder="carmen@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                  className={`w-full px-3.5 py-2 rounded-xl border ${
                    touched.email && !isEmailValid
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-linen-300 dark:border-charcoal-700 focus:ring-brand-500'
                  } bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:outline-none transition-all disabled:opacity-60`}
                />
              </div>

              {/* Fecha, Hora, Comensales */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      htmlFor={`${formId}-date`}
                      className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300"
                    >
                      Fecha *
                    </label>
                    {touched.date && !isDateValid && (
                      <span className="text-[10px] text-red-500">Fecha no válida</span>
                    )}
                  </div>
                  <input
                    id={`${formId}-date`}
                    type="date"
                    required
                    min={todayStr}
                    disabled={state === 'submitting'}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    onBlur={() => handleBlur('date')}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      touched.date && !isDateValid
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-linen-300 dark:border-charcoal-700 focus:ring-brand-500'
                    } bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:outline-none disabled:opacity-60`}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-time`}
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1"
                  >
                    Hora (13:30 a 16:00)
                  </label>
                  <select
                    id={`${formId}-time`}
                    disabled={state === 'submitting'}
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:opacity-60"
                  >
                    <option value="13:30">13:30 h</option>
                    <option value="14:00">14:00 h</option>
                    <option value="14:30">14:30 h</option>
                    <option value="15:00">15:00 h</option>
                    <option value="15:30">15:30 h</option>
                    <option value="21:00">21:00 h (Cena Especial)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-guests`}
                    className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1"
                  >
                    Comensales
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={`${formId}-guests`}
                      type="number"
                      min="1"
                      max="80"
                      disabled={state === 'submitting'}
                      value={formData.guests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guests: Math.max(1, Math.min(80, parseInt(e.target.value, 10) || 1)),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:opacity-60"
                    />
                  </div>
                </div>
              </div>

              {/* Alérgenos y Preferencias */}
              <div>
                <label
                  htmlFor={`${formId}-dietary`}
                  className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1"
                >
                  Alérgenos e Intolerancias
                </label>
                <input
                  id={`${formId}-dietary`}
                  type="text"
                  disabled={state === 'submitting'}
                  placeholder="Ej. 1 celíaco (sin gluten), intolerancia a lactosa..."
                  value={formData.dietaryNotes}
                  onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:opacity-60"
                />
              </div>

              {/* Observaciones */}
              <div>
                <label
                  htmlFor={`${formId}-notes`}
                  className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1"
                >
                  Observaciones o Peticiones Especiales
                </label>
                <textarea
                  id={`${formId}-notes`}
                  rows={2}
                  disabled={state === 'submitting'}
                  placeholder="Mesa próxima al ventanal, celebración de aniversario, necesidad de proyector..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none disabled:opacity-60"
                />
              </div>

              {/* Bloque de Primera Capa RGPD y Consentimientos */}
              <div className="space-y-2.5 pt-2 border-t border-linen-200 dark:border-charcoal-750">
                {/* 1. Consentimiento Privacidad General */}
                <div>
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id={`${formId}-consent-privacy`}
                      checked={consentPrivacy}
                      onChange={(e) => setConsentPrivacy(e.target.checked)}
                      onBlur={() => handleBlur('consentPrivacy')}
                      className="mt-1 h-4 w-4 rounded border-linen-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`${formId}-consent-privacy`}
                      className="text-xs text-charcoal-600 dark:text-linen-400 leading-snug cursor-pointer select-none"
                    >
                      Acepto el tratamiento de mis datos de contacto conforme a la{' '}
                      <button
                        type="button"
                        onClick={() => setIsRgpdOpen(true)}
                        className="font-semibold text-brand-600 dark:text-brand-400 underline hover:text-brand-700 dark:hover:text-brand-300 focus:outline-none focus:ring-1 focus:ring-brand-500 rounded"
                      >
                        política de privacidad (Primera Capa RGPD)
                      </button>{' '}
                      para tramitar y confirmar mi reserva de mesa.
                    </label>
                  </div>
                  {touched.consentPrivacy && !consentPrivacy && (
                    <p className="text-[11px] text-red-500 mt-1 pl-6 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Debes aceptar la política de privacidad.
                    </p>
                  )}
                </div>

                {/* 2. Consentimiento Art. 9 RGPD (Datos de salud / Alérgenos) */}
                {formData.dietaryNotes.trim().length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60 animate-fade-in">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id={`${formId}-consent-health`}
                        checked={consentHealth}
                        onChange={(e) => setConsentHealth(e.target.checked)}
                        onBlur={() => handleBlur('consentHealth')}
                        className="mt-1 h-4 w-4 rounded border-amber-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                      />
                      <label
                        htmlFor={`${formId}-consent-health`}
                        className="text-xs text-amber-900 dark:text-amber-200 leading-snug cursor-pointer select-none font-medium"
                      >
                        Autorizo expresamente el tratamiento de los datos de salud e intolerancias alimentarias indicados (Art. 9 RGPD) con la exclusiva finalidad de adaptar el servicio de cocina y sala a mis necesidades.
                      </label>
                    </div>
                    {touched.consentHealth && !consentHealth && (
                      <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 pl-6 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Requerido al informar alergias o intolerancias.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Botón de Enviar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`}
                  className="text-xs text-charcoal-600 dark:text-linen-400 hover:text-brand-600 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>¿Prefieres llamar? {SITE_CONFIG.phoneBooking}</span>
                </a>

                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirmando con el Maître...</span>
                    </>
                  ) : (
                    <>
                      <UtensilsCrossed className="w-4 h-4" />
                      <span>Confirmar Reserva</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Modal de Primera Capa RGPD */}
      <RgpdModal isOpen={isRgpdOpen} onClose={() => setIsRgpdOpen(false)} />
    </div>
  );
};
