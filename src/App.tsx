import React, { useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MockStoreProvider } from './context/MockStoreContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactStats } from './components/ImpactStats';
import { GastronomicMenu } from './components/GastronomicMenu';
import { DiningRoomProtocol } from './components/DiningRoomProtocol';
import { SpacesSection } from './components/SpacesSection';
import { CateringSection } from './components/CateringSection';
import { SchoolMission } from './components/SchoolMission';
import { GallerySection } from './components/GallerySection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { StickyMobileBar } from './components/StickyMobileBar';

// Lazy loading de modales grandes para optimizar bundle inicial y Core Web Vitals
const BookingModal = lazy(() =>
  import('./components/BookingModal').then((m) => ({ default: m.BookingModal }))
);
const DemoDrawer = lazy(() =>
  import('./components/DemoDrawer').then((m) => ({ default: m.DemoDrawer }))
);

import { ReservationServiceType } from './types';

export const AppContent: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ReservationServiceType>('menu-7-tiempos');
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const openBooking = (service?: ReservationServiceType | unknown) => {
    if (typeof service === 'string') {
      setSelectedService(service as ReservationServiceType);
    } else {
      setSelectedService('menu-7-tiempos');
    }
    setIsBookingOpen(true);
  };
  const closeBooking = () => setIsBookingOpen(false);

  const openDemo = () => setIsDemoOpen(true);
  const closeDemo = () => setIsDemoOpen(false);

  return (
    <div className="min-h-screen bg-linen-50 dark:bg-charcoal-950 text-charcoal-900 dark:text-linen-100 transition-colors duration-300 font-sans antialiased selection:bg-brand-500 selection:text-white pb-16 md:pb-0">
      {/* Navigation */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenBooking={openBooking} />
        <ImpactStats />
        <GastronomicMenu onOpenBooking={openBooking} />
        <DiningRoomProtocol />
        <SpacesSection onOpenBooking={openBooking} />
        <CateringSection onOpenBooking={openBooking} />
        <SchoolMission />
        <GallerySection />
        <GoogleReviewsSection />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Utilities */}
      <WhatsAppButton />
      <StickyMobileBar onOpenBooking={openBooking} />
      <Suspense fallback={null}>
        <DemoDrawer isOpen={isDemoOpen} onClose={closeDemo} onOpen={openDemo} />
        <BookingModal
          isOpen={isBookingOpen}
          onClose={closeBooking}
          defaultService={selectedService}
        />
      </Suspense>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MockStoreProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </MockStoreProvider>
    </ThemeProvider>
  );
};

export default App;
