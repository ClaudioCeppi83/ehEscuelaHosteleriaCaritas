import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactStats } from './components/ImpactStats';
import { GastronomicMenu } from './components/GastronomicMenu';
import { SpacesSection } from './components/SpacesSection';
import { CateringSection } from './components/CateringSection';
import { SchoolMission } from './components/SchoolMission';
import { GallerySection } from './components/GallerySection';
import { PressReviews } from './components/PressReviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppButton } from './components/WhatsAppButton';

export const AppContent: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-linen-50 dark:bg-charcoal-950 text-charcoal-900 dark:text-linen-100 transition-colors duration-300 font-sans antialiased selection:bg-brand-500 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenBooking={openBooking} />
        <ImpactStats />
        <GastronomicMenu onOpenBooking={openBooking} />
        <SpacesSection onOpenBooking={openBooking} />
        <CateringSection onOpenBooking={openBooking} />
        <SchoolMission />
        <GallerySection />
        <PressReviews />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Utilities */}
      <WhatsAppButton />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
