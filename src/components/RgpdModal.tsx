import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck, Mail, Building, FileText, Lock } from 'lucide-react';

interface RgpdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RgpdModal: React.FC<RgpdModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap y manejo de accesibilidad (Escape, Focus restoration)
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Autofocus en el botón de cerrar
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Bloquear scroll del body mientras el modal esté abierto
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rgpd-modal-title"
        className="relative max-w-2xl w-full bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-linen-200 dark:border-charcoal-800 my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-linen-200 dark:border-charcoal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400 block">
                Primera Capa Informativa · RGPD UE 2016/679 & LOPDGDD 3/2018
              </span>
              <h3
                id="rgpd-modal-title"
                className="font-serif text-xl sm:text-2xl font-bold text-charcoal-950 dark:text-white"
              >
                Información Básica de Protección de Datos
              </h3>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-charcoal-400 hover:text-charcoal-900 dark:text-linen-400 dark:hover:text-white hover:bg-linen-100 dark:hover:bg-charcoal-800 transition-colors"
            aria-label="Cerrar modal de política de privacidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable content */}
        <div className="py-6 overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm text-charcoal-700 dark:text-linen-300">
          <div className="p-3.5 rounded-2xl bg-linen-100/70 dark:bg-charcoal-800/60 border border-linen-200 dark:border-charcoal-750 flex items-center gap-3">
            <Lock className="w-5 h-5 text-brand-600 shrink-0" />
            <p className="text-xs text-charcoal-800 dark:text-linen-200 font-medium">
              Tu privacidad y la de tus acompañantes es fundamental para nuestra labor social. Tus datos nunca serán comercializados.
            </p>
          </div>

          {/* Grid informativa por capas RGPD & LOPDGDD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 rounded-2xl bg-linen-50/80 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-800 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold text-xs uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>Responsable del Tratamiento</span>
              </div>
              <p className="text-charcoal-900 dark:text-white font-medium">
                eh! laboras (Iniciativa Social S.L.U.) · NIF B-73865660
              </p>
              <p className="text-[11px] text-charcoal-600 dark:text-linen-400">
                Empresa de Inserción promovida por Cáritas Diócesis de Cartagena (CIF R-3000037-J).
                <br />
                Domicilio social: C. Sta. Cecilia, 1, 30005 Murcia (España).
                <br />
                Contacto legal: reservas@eh-restaurante.es · Tel: +34 685 07 79 86
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-linen-50/80 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-800 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Finalidad del Tratamiento</span>
              </div>
              <p className="text-charcoal-900 dark:text-white font-medium">
                Gestión operativa y reservas gastronómicas
              </p>
              <p className="text-[11px] text-charcoal-600 dark:text-linen-400">
                Tramitación y confirmación de mesas en restaurante de prácticas, eventos en salas corporativas, presupuestos de catering e inserción laboral formativa.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-linen-50/80 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-800 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Bases de Legitimación Jurídica</span>
              </div>
              <p className="text-charcoal-900 dark:text-white font-medium">
                Relación de servicio & Consentimiento
              </p>
              <p className="text-[11px] text-charcoal-600 dark:text-linen-400">
                <strong>Art. 6.1.b RGPD:</strong> Ejecución del servicio de reserva de mesa solicitado.<br />
                <strong>Art. 6.1.a RGPD:</strong> Consentimiento informado en consultas web.<br />
                <strong>Art. 9.2.a RGPD:</strong> Consentimiento explícito para datos de salud (alergias/alérgenos) para adaptación culinaria.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-linen-50/80 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-800 space-y-1.5">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold text-xs uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Derechos ARCO-POL & DPO</span>
              </div>
              <p className="text-charcoal-900 dark:text-white font-medium">
                Acceso, Rectificación, Supresión y Portabilidad
              </p>
              <p className="text-[11px] text-charcoal-600 dark:text-linen-400">
                Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, oposición y portabilidad (Art. 20 RGPD) ante nuestro Delegado de Protección de Datos (DPO) en:
                <br />
                <a
                  href="mailto:dpo@caritasregiondemurcia.org"
                  className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
                >
                  dpo@caritasregiondemurcia.org
                </a>
              </p>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-linen-50/80 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-800 space-y-2 text-[11px] leading-relaxed text-charcoal-600 dark:text-linen-400">
            <p>
              <strong>Conservación de Datos (Art. 13.2.a RGPD):</strong> Los datos de reservas se conservarán durante la prestación del servicio y posteriormente 5 años para responder de posibles responsabilidades legales y tributarias (Código de Comercio). Los datos de consultas generales se cancelarán a los 12 meses de su tramitación.
            </p>
            <p>
              <strong>Transferencias Internacionales & Destinatarios:</strong> No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo (EEE). No se ceden datos a terceros salvo imperativo legal o a encargados de tratamiento tecnológico bajo contrato formal (Art. 28 RGPD).
            </p>
            <p>
              <strong>Régimen de Cookies & LocalStorage (LSSI-CE Art. 22.2):</strong> Este sitio web no utiliza cookies de seguimiento publicitario ni analíticas de terceros. Únicamente se emplea almacenamiento técnico local ('localStorage') para recordar la preferencia visual y la gestión de la sesión, exento de banner de consentimiento previo según la Guía de Cookies de la AEPD. Tienes derecho a reclamar ante la AEPD (www.aepd.es).
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-linen-200 dark:border-charcoal-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            Entendido y Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
