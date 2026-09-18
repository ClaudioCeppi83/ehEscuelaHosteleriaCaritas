import React from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-linen-100/80 dark:bg-charcoal-950 text-charcoal-800 dark:text-linen-200 border-t border-linen-200 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-linen-200 dark:border-charcoal-800">
          
          {/* Brand & Organization Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-lg bg-white dark:bg-white inline-block shadow-sm">
                <img
                  src={SITE_CONFIG.images.logoOriginal}
                  alt="eh! Escuela de Hostelería"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-charcoal-950 dark:text-white block leading-tight">
                  eh! Escuela de Hostelería
                </span>
                <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                  Cáritas Diócesis de Cartagena
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-600 dark:text-linen-300 leading-relaxed max-w-sm">
              Empresa de inserción <strong>eh! laboras</strong> (Iniciativa Social S.L.U.). Alta gastronomía de autor y formación para el empleo digno en la Región de Murcia.
            </p>

            {/* Social Channels */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={SITE_CONFIG.social.instagramRestaurant}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white dark:bg-charcoal-850 text-charcoal-700 dark:text-linen-200 hover:text-brand-600 dark:hover:text-brand-400 hover:shadow-md transition-all"
                aria-label="Instagram del Restaurante"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white dark:bg-charcoal-850 text-charcoal-700 dark:text-linen-200 hover:text-brand-600 dark:hover:text-brand-400 hover:shadow-md transition-all"
                aria-label="Facebook de la Escuela"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Column: Restaurante */}
          <div>
            <h4 className="font-serif text-sm font-bold text-charcoal-950 dark:text-white uppercase tracking-wider mb-4">
              Restaurante
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-600 dark:text-linen-300">
              <li><a href="#menu" className="hover:text-brand-600 transition-colors">Menú Gastronómico 7 Tiempos</a></li>
              <li><a href="#menu" className="hover:text-brand-600 transition-colors">Bono Regala Experiencias</a></li>
              <li><a href="#espacios" className="hover:text-brand-600 transition-colors">Salón Principal</a></li>
              <li><a href="#espacios" className="hover:text-brand-600 transition-colors">Sala Privada con Proyector</a></li>
              <li><a href="#espacios" className="hover:text-brand-600 transition-colors">Nueva Cafetería</a></li>
            </ul>
          </div>

          {/* Quick Column: Servicios */}
          <div>
            <h4 className="font-serif text-sm font-bold text-charcoal-950 dark:text-white uppercase tracking-wider mb-4">
              Catering & Escuela
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-600 dark:text-linen-300">
              <li><a href="#catering" className="hover:text-brand-600 transition-colors">Catering para Empresas</a></li>
              <li><a href="#catering" className="hover:text-brand-600 transition-colors">Eventos & Celebraciones</a></li>
              <li><a href="#escuela" className="hover:text-brand-600 transition-colors">Cursos y Formación</a></li>
              <li><a href="#escuela" className="hover:text-brand-600 transition-colors">Empresa de Inserción eh! laboras</a></li>
              <li><a href="#galeria" className="hover:text-brand-600 transition-colors">Galería Fotográfica</a></li>
            </ul>
          </div>

          {/* Quick Column: Contacto Directo */}
          <div>
            <h4 className="font-serif text-sm font-bold text-charcoal-950 dark:text-white uppercase tracking-wider mb-4">
              Contacto
            </h4>
            <div className="space-y-2.5 text-xs text-charcoal-600 dark:text-linen-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                <span>C. Sta. Cecilia, 1, 30005 Murcia</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`} className="hover:text-brand-600">
                  {SITE_CONFIG.phoneBooking}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.emailReservations}`} className="hover:text-brand-600">
                  {SITE_CONFIG.emailReservations}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500 dark:text-linen-400">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 eh! Escuela de Hostelería. Iniciativa de Cáritas Diócesis de Cartagena.</span>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://ehescueladehosteleria.com/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Política de Privacidad
            </a>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 font-medium"
            >
              <span>Subir al inicio</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
