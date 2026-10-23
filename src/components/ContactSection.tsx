import React, { useState, useId } from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import { useMockStore } from '../context/MockStoreContext';
import { useToast } from '../context/ToastContext';
import { RgpdModal } from './RgpdModal';

export const ContactSection: React.FC = () => {
  const { createContactRequest } = useMockStore();
  const toast = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
    _hp: '', // Honeypot anti-spam
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isRgpdOpen, setIsRgpdOpen] = useState(false);

  const formId = useId();

  // Validaciones
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  
  const isValidPhone = (phone: string) => {
    if (!phone.trim()) return true; // Teléfono opcional en contacto
    const cleanPhone = phone.replace(/[\s-]/g, '');
    return /^(\+34)?[6789]\d{8}$/.test(cleanPhone);
  };

  const isNameValid = form.name.trim().length >= 2;
  const isEmailValid = isValidEmail(form.email);
  const isPhoneValid = isValidPhone(form.phone);
  const isMessageValid = form.message.trim().length >= 10;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos como tocados
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
      consent: true,
    });

    if (!isNameValid) {
      toast.error('Por favor, indica tu nombre completo.', 'Nombre requerido');
      return;
    }

    if (!isEmailValid) {
      toast.error('Introduce una dirección de correo electrónico válida.', 'Email no válido');
      return;
    }

    if (!isPhoneValid) {
      toast.error('El teléfono debe tener 9 dígitos válidos (ej: 685 07 79 86).', 'Teléfono incorrecto');
      return;
    }

    if (!isMessageValid) {
      toast.error('El mensaje debe tener al menos 10 caracteres explicativos.', 'Mensaje breve');
      return;
    }

    if (!form.consent) {
      toast.error('Es imprescindible aceptar la política de privacidad para tramitar tu solicitud.', 'Consentimiento requerido');
      return;
    }

    setIsSubmitting(true);
    try {
      await createContactRequest({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        _hp: form._hp,
      });

      setSubmitted(true);
      toast.success(
        'Hemos recibido tu mensaje correctamente. Nuestro equipo te contactará con prontitud.',
        '¡Mensaje Enviado!'
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'No se pudo enviar el mensaje';
      toast.error(errorMsg, 'Error al enviar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      consent: false,
      _hp: '',
    });
    setTouched({});
    setSubmitted(false);
  };

  return (
    <section id="contacto" className="py-24 bg-linen-50 dark:bg-charcoal-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">
            <MapPin className="w-4 h-4" />
            <span>Estamos en Murcia</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal-950 dark:text-white tracking-tight">
            Encuéntranos y <br />
            <span className="italic text-brand-600 dark:text-brand-400 font-normal">escríbenos tus dudas</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 dark:text-linen-300">
            Estamos a tu disposición para reservas de restaurante, consultas sobre cursos de formación o cotización de catering.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Interactive Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 shadow-sm space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm text-charcoal-900 dark:text-white mb-1">
                    Ubicación y Dirección
                  </strong>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300">
                    {SITE_CONFIG.address}
                  </p>
                  <a
                    href={SITE_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 font-semibold mt-2 hover:underline"
                  >
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-linen-100 dark:border-charcoal-800">
                <div className="w-11 h-11 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm text-charcoal-900 dark:text-white mb-1">
                    Teléfonos de Atención
                  </strong>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300">
                    <strong>Reservas:</strong>{' '}
                    <a href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`} className="hover:text-brand-600 transition-colors">
                      {SITE_CONFIG.phoneBooking}
                    </a>
                  </p>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300 mt-0.5">
                    <strong>Formación:</strong>{' '}
                    <a href={`tel:${SITE_CONFIG.phoneTraining.replace(/\s+/g, '')}`} className="hover:text-brand-600 transition-colors">
                      {SITE_CONFIG.phoneTraining}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-linen-100 dark:border-charcoal-800">
                <div className="w-11 h-11 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm text-charcoal-900 dark:text-white mb-1">
                    Correos Electrónicos
                  </strong>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300">
                    <a href={`mailto:${SITE_CONFIG.emailReservations}`} className="hover:text-brand-600 transition-colors">
                      {SITE_CONFIG.emailReservations}
                    </a>
                  </p>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300 mt-0.5">
                    <a href={`mailto:${SITE_CONFIG.emailInfo}`} className="hover:text-brand-600 transition-colors">
                      {SITE_CONFIG.emailInfo}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-linen-100 dark:border-charcoal-800">
                <div className="w-11 h-11 rounded-2xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm text-charcoal-900 dark:text-white mb-1">
                    Horarios de Apertura
                  </strong>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300">
                    <strong>Restaurante:</strong> Lunes a viernes de 13:30h a 17:30h
                  </p>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300 mt-0.5">
                    <strong>Cafetería:</strong> Lunes a sábado de 08:00h a 14:00h
                  </p>
                </div>
              </div>

            </div>

            {/* Visual Location Card */}
            <div className="rounded-3xl overflow-hidden shadow-md border border-linen-200 dark:border-charcoal-800 relative group">
              <img
                src="/assets/photos/cropped-Captura.webp"
                alt="Mapa de localización eh! Escuela de Hostelería Murcia"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white text-charcoal-950 text-xs font-bold shadow-lg hover:bg-brand-50 transition-all flex items-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span>Cómo Llegar en Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Modern Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-charcoal-900 border border-linen-200 dark:border-charcoal-800 shadow-premium dark:shadow-premium-dark">
              
              {submitted ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-950 dark:text-white mb-2">
                    Mensaje enviado correctamente
                  </h3>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300 max-w-md mx-auto mb-6">
                    Gracias por ponerte en contacto. Nuestro equipo de recepción y sala revisará tu solicitud y se comunicará contigo con prontitud.
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-full border border-charcoal-300 dark:border-charcoal-700 text-xs font-semibold hover:bg-linen-100 dark:hover:bg-charcoal-800 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400 block mb-2">
                    Formulario de Contacto Directo
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-white mb-6">
                    ¿En qué podemos ayudarte?
                  </h3>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Honeypot field (hidden from genuine users) */}
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
                      <label htmlFor={`${formId}-hp`}>No rellenar este campo</label>
                      <input
                        type="text"
                        id={`${formId}-hp`}
                        name="_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form._hp}
                        onChange={(e) => setForm({ ...form, _hp: e.target.value })}
                      />
                    </div>

                    {/* Nombre */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label
                          htmlFor={`${formId}-name`}
                          className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300"
                        >
                          Nombre Completo *
                        </label>
                        {touched.name && !isNameValid && (
                          <span className="text-[11px] text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Mínimo 2 caracteres
                          </span>
                        )}
                      </div>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        placeholder="Ejemplo: Juan González"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onBlur={() => handleBlur('name')}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          touched.name && !isNameValid
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-linen-300 dark:border-charcoal-700 focus:ring-brand-500'
                        } bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:outline-none transition-all`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Correo Electrónico */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label
                            htmlFor={`${formId}-email`}
                            className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300"
                          >
                            Correo Electrónico *
                          </label>
                          {touched.email && !isEmailValid && (
                            <span className="text-[11px] text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> Email inválido
                            </span>
                          )}
                        </div>
                        <input
                          id={`${formId}-email`}
                          type="email"
                          required
                          placeholder="juan@ejemplo.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          onBlur={() => handleBlur('email')}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            touched.email && !isEmailValid
                              ? 'border-red-400 focus:ring-red-400'
                              : 'border-linen-300 dark:border-charcoal-700 focus:ring-brand-500'
                          } bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:outline-none transition-all`}
                        />
                      </div>

                      {/* Teléfono */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label
                            htmlFor={`${formId}-phone`}
                            className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300"
                          >
                            Teléfono
                          </label>
                          {touched.phone && !isPhoneValid && (
                            <span className="text-[11px] text-red-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> Formato: 9 dígitos
                            </span>
                          )}
                        </div>
                        <input
                          id={`${formId}-phone`}
                          type="tel"
                          placeholder="685 07 79 86"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          onBlur={() => handleBlur('phone')}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            touched.phone && !isPhoneValid
                              ? 'border-red-400 focus:ring-red-400'
                              : 'border-linen-300 dark:border-charcoal-700 focus:ring-brand-500'
                          } bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:outline-none transition-all`}
                        />
                      </div>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label
                          htmlFor={`${formId}-message`}
                          className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300"
                        >
                          Mensaje o Consulta *
                        </label>
                        {touched.message && !isMessageValid && (
                          <span className="text-[11px] text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Mínimo 10 letras
                          </span>
                        )}
                      </div>
                      <textarea
                        id={`${formId}-message`}
                        required
                        rows={4}
                        placeholder="Escribe tu consulta sobre reservas, eventos corporativos, catering de inserción o cursos..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        onBlur={() => handleBlur('message')}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          touched.message && !isMessageValid
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-linen-300 dark:border-charcoal-700 focus:ring-brand-500'
                        } bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:outline-none transition-all`}
                      />
                    </div>

                    {/* RGPD Consent Checkbox */}
                    <div className="pt-2">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id={`${formId}-consent`}
                          checked={form.consent}
                          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                          onBlur={() => handleBlur('consent')}
                          className="mt-1 h-4 w-4 rounded border-linen-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
                        />
                        <label
                          htmlFor={`${formId}-consent`}
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
                          para la tramitación y respuesta a esta solicitud.
                        </label>
                      </div>
                      {touched.consent && !form.consent && (
                        <p className="text-[11px] text-red-500 mt-1 pl-6 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Debes aceptar la política de privacidad.
                        </p>
                      )}
                    </div>

                    {/* Botón de Envío */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitiendo consulta...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Mensaje</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Modal de Primera Capa RGPD */}
      <RgpdModal isOpen={isRgpdOpen} onClose={() => setIsRgpdOpen(false)} />
    </section>
  );
};
