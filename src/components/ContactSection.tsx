import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      alert('Por favor, acepta la política de privacidad para continuar.');
      return;
    }
    setSubmitted(true);
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
                    <strong>Reservas:</strong> <a href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`} className="hover:text-brand-600">{SITE_CONFIG.phoneBooking}</a>
                  </p>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300 mt-0.5">
                    <strong>Formación:</strong> <a href={`tel:${SITE_CONFIG.phoneTraining.replace(/\s+/g, '')}`} className="hover:text-brand-600">{SITE_CONFIG.phoneTraining}</a>
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
                    <a href={`mailto:${SITE_CONFIG.emailReservations}`} className="hover:text-brand-600">{SITE_CONFIG.emailReservations}</a>
                  </p>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300 mt-0.5">
                    <a href={`mailto:${SITE_CONFIG.emailInfo}`} className="hover:text-brand-600">{SITE_CONFIG.emailInfo}</a>
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
                src="https://ehescueladehosteleria.com/wp-content/uploads/2022/01/cropped-Captura.png"
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
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-950 dark:text-white mb-2">
                    Mensaje enviado correctamente
                  </h3>
                  <p className="text-sm text-charcoal-600 dark:text-linen-300 max-w-md mx-auto mb-6">
                    Gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo a la mayor brevedad posible.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', phone: '', message: '', consent: false });
                    }}
                    className="px-6 py-2.5 rounded-full border border-charcoal-300 dark:border-charcoal-700 text-xs font-semibold"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400 block mb-2">
                    Formulario de Contacto
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-white mb-6">
                    ¿En qué podemos ayudarte?
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ejemplo: Juan González"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="juan@ejemplo.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                          Número de Teléfono
                        </label>
                        <input
                          type="tel"
                          placeholder="+34 685 000 000"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-linen-300 mb-1">
                        Mensaje o Consulta *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Escribe tu consulta sobre reservas, eventos, catering o cursos..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-charcoal-900 dark:text-white text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-1 h-4 w-4 rounded border-linen-300 text-brand-600 focus:ring-brand-500"
                      />
                      <label htmlFor="consent" className="text-xs text-charcoal-600 dark:text-linen-400">
                        Sí, he leído, entiendo y acepto la política de privacidad y el tratamiento de mis datos de contacto para la resolución de la consulta.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md hover:shadow-glow-orange transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensaje</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
