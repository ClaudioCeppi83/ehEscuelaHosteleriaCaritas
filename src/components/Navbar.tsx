import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../data/siteData';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Clock, 
  UtensilsCrossed
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'El Restaurante', href: '#restaurante' },
    { name: 'Menú 7 Tiempos', href: '#menu' },
    { name: 'Salones & Cafetería', href: '#espacios' },
    { name: 'Catering', href: '#catering' },
    { name: 'La Escuela', href: '#escuela' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar for contact info & social */}
      <div className={`hidden md:block py-1.5 px-6 text-xs transition-colors duration-300 ${
        isScrolled 
          ? 'opacity-0 h-0 p-0 overflow-hidden' 
          : 'bg-linen-100/90 dark:bg-charcoal-900/90 text-charcoal-700 dark:text-linen-300 border-b border-linen-200 dark:border-charcoal-800'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>{SITE_CONFIG.address}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>L-V 13:30 a 17:30 · Cafetería L-S 08:00 a 14:00</span>
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a 
              href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 font-medium hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Reservas: {SITE_CONFIG.phoneBooking}</span>
            </a>
            <span className="text-linen-300 dark:text-charcoal-700">|</span>
            <span className="text-[11px] uppercase tracking-wider text-brand-700 dark:text-brand-400 font-semibold">
              Cáritas Diócesis de Cartagena
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className={`px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled 
          ? 'py-3.5 glass-nav shadow-premium dark:shadow-premium-dark border-b border-linen-200/80 dark:border-charcoal-800/80' 
          : 'py-5 bg-linen-50/70 dark:bg-charcoal-950/70 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group focus:outline-none" aria-label="eh! Escuela de Hostelería">
            <div className="relative overflow-hidden rounded-xl p-1.5 bg-white shadow-sm border border-linen-200/60 dark:border-charcoal-700/50 transition-transform group-hover:scale-102">
              <img 
                src={SITE_CONFIG.images.logoOriginal} 
                alt="eh! Escuela de Hostelería" 
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-charcoal-700 hover:text-brand-600 dark:text-linen-200 dark:hover:text-brand-400 transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 dark:bg-brand-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Actions: Theme Toggle & Booking Button */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-charcoal-600 dark:text-linen-300 hover:bg-linen-200 dark:hover:bg-charcoal-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Cambiar modo claro / oscuro"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-charcoal-700 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-glow-orange transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Reservar Mesa</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-charcoal-700 dark:text-linen-200 hover:bg-linen-200 dark:hover:bg-charcoal-800 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-linen-200 dark:border-charcoal-800 animate-fade-down px-6 py-6 shadow-xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-charcoal-800 dark:text-linen-100 hover:text-brand-600 dark:hover:text-brand-400 py-1.5 transition-colors border-b border-linen-100 dark:border-charcoal-850"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-600 text-white font-medium text-sm shadow-md"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Reservar Mesa Online</span>
              </button>
              <a
                href={`tel:${SITE_CONFIG.phoneBooking.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 text-charcoal-700 dark:text-linen-200 text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-brand-600" />
                <span>Llamar {SITE_CONFIG.phoneBooking}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
