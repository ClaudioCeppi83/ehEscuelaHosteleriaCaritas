import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
  Reservation,
  ContactRequest,
  CreateReservationInput,
  CreateContactInput,
  ReservationStatus,
} from '../types';
import * as mockService from '../services/mockService';

export interface MockStoreContextType {
  reservations: Reservation[];
  contacts: ContactRequest[];
  isLoading: boolean;
  createReservation: (input: CreateReservationInput) => Promise<Reservation>;
  updateReservationStatus: (id: string, status: ReservationStatus, tableNumber?: string) => Promise<Reservation>;
  deleteReservation: (id: string) => Promise<void>;
  resetToSeedData: () => void;
  resetDemoData: () => void;
  loadSeedData: () => void;
  clearAllReservations: () => void;
  createContactRequest: (input: CreateContactInput) => Promise<ContactRequest>;
  generateIcsCalendar: (reservation: Reservation) => void;
  generateIcsCalendarFile: (reservation: Reservation) => void;
  getGoogleCalendarUrl: (reservation: Reservation) => string;
}

export const MockStoreContext = createContext<MockStoreContextType | undefined>(undefined);
export const MockContext = MockStoreContext;

export const MockStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>(() =>
    mockService.getReservations()
  );
  const [contacts, setContacts] = useState<ContactRequest[]>(() =>
    mockService.getContactRequests()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sincroniza el estado de React con la persistencia
  const refreshData = useCallback(() => {
    setReservations(mockService.getReservations());
    setContacts(mockService.getContactRequests());
  }, []);

  // Escuchar suscripciones internas y eventos de almacenamiento entre pestañas
  useEffect(() => {
    // Suscripción al pub/sub de mockService (se dispara en cualquier modificación)
    const unsubscribe = mockService.subscribeToMockStore(() => {
      refreshData();
    });

    // Sincronización reactiva entre pestañas / ventanas del navegador
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === mockService.STORAGE_KEYS.RESERVATIONS ||
        e.key === mockService.STORAGE_KEYS.CONTACTS
      ) {
        refreshData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [refreshData]);

  // Se eliminan las llamadas dobles a refreshData(), ya que notifyListeners() en mockService lo invoca automáticamente
  const handleCreateReservation = useCallback(
    async (input: CreateReservationInput): Promise<Reservation> => {
      setIsLoading(true);
      try {
        return await mockService.createReservation(input);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleUpdateReservationStatus = useCallback(
    async (id: string, status: ReservationStatus, tableNumber?: string): Promise<Reservation> => {
      setIsLoading(true);
      try {
        return await mockService.updateReservationStatus(id, status, tableNumber);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleDeleteReservation = useCallback(
    async (id: string): Promise<void> => {
      setIsLoading(true);
      try {
        await mockService.deleteReservation(id);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleResetToSeedData = useCallback(() => {
    mockService.resetToSeedData();
  }, []);

  const handleClearAllReservations = useCallback(() => {
    mockService.clearAllReservations();
  }, []);

  const handleCreateContactRequest = useCallback(
    async (input: CreateContactInput): Promise<ContactRequest> => {
      setIsLoading(true);
      try {
        return await mockService.createContactRequest(input);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleGenerateIcsCalendar = useCallback((reservation: Reservation) => {
    mockService.generateIcsCalendar(reservation);
  }, []);

  const handleGenerateIcsCalendarFile = useCallback((reservation: Reservation) => {
    mockService.generateIcsCalendarFile(reservation);
  }, []);

  const handleGetGoogleCalendarUrl = useCallback((reservation: Reservation): string => {
    return mockService.getGoogleCalendarUrl(reservation);
  }, []);

  // Memoización estricta del valor del Contexto para prevenir re-renders innecesarios en consumidores
  const value: MockStoreContextType = useMemo(
    () => ({
      reservations,
      contacts,
      isLoading,
      createReservation: handleCreateReservation,
      updateReservationStatus: handleUpdateReservationStatus,
      deleteReservation: handleDeleteReservation,
      resetToSeedData: handleResetToSeedData,
      resetDemoData: handleResetToSeedData,
      loadSeedData: handleResetToSeedData,
      clearAllReservations: handleClearAllReservations,
      createContactRequest: handleCreateContactRequest,
      generateIcsCalendar: handleGenerateIcsCalendar,
      generateIcsCalendarFile: handleGenerateIcsCalendarFile,
      getGoogleCalendarUrl: handleGetGoogleCalendarUrl,
    }),
    [
      reservations,
      contacts,
      isLoading,
      handleCreateReservation,
      handleUpdateReservationStatus,
      handleDeleteReservation,
      handleResetToSeedData,
      handleClearAllReservations,
      handleCreateContactRequest,
      handleGenerateIcsCalendar,
      handleGenerateIcsCalendarFile,
      handleGetGoogleCalendarUrl,
    ]
  );

  return <MockStoreContext.Provider value={value}>{children}</MockStoreContext.Provider>;
};

export const useMockStore = (): MockStoreContextType => {
  const context = useContext(MockStoreContext);
  if (!context) {
    throw new Error('useMockStore must be used within a MockStoreProvider');
  }
  return context;
};
