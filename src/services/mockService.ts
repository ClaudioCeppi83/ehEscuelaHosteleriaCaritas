import {
  Reservation,
  ContactRequest,
  CreateReservationInput,
  CreateContactInput,
  ReservationStatus,
  ReservationServiceType,
} from '../types';

export const STORAGE_KEYS = {
  RESERVATIONS: 'eh_mock_reservations_v1',
  CONTACTS: 'eh_mock_contacts_v1',
} as const;

export const SERVICE_NAMES: Record<ReservationServiceType, string> = {
  'menu-7-tiempos': 'Menú Degustación 7 Tiempos',
  'sala-privada': 'Sala Privada Exclusiva',
  'catering-empresa': 'Catering Corporativo & Eventos',
  'bono-experiencia': 'Bono Experiencia Gastronómica',
};

export const SEED_RESERVATIONS: Reservation[] = [
  {
    id: 'res-2026-001',
    code: 'EH-2026-A8K2',
    customerName: 'Elena Morales Vidal',
    email: 'elena.morales@example.com',
    phone: '+34 611 234 567',
    serviceType: 'menu-7-tiempos',
    serviceName: 'Menú Degustación 7 Tiempos',
    date: '2026-10-23',
    time: '14:00',
    guests: 4,
    dietaryNotes: '1 comensal celíaco (sin gluten) y 1 intolerante a la lactosa',
    notes: 'Mesa preferiblemente próxima al ventanal principal.',
    status: 'confirmed',
    createdAt: '2026-10-19T11:20:00.000Z',
  },
  {
    id: 'res-2026-002',
    code: 'EH-2026-38H9',
    customerName: 'Javier Conesa Romero (Bufete Conesa)',
    email: 'jconesa@bufeteconesa.example.es',
    phone: '+34 622 345 678',
    serviceType: 'sala-privada',
    serviceName: 'Sala Privada Exclusiva',
    date: '2026-10-24',
    time: '14:30',
    guests: 8,
    dietaryNotes: 'Sin restricciones alimentarias comunicadas',
    notes: 'Almuerzo directivo institucional. Se requiere apoyo audiovisual para breve presentación.',
    status: 'table_assigned',
    tableNumber: 'Sala Privada A',
    createdAt: '2026-10-18T16:45:00.000Z',
  },
  {
    id: 'res-2026-003',
    code: 'EH-2026-59X2',
    customerName: 'Beatriz Alarcón Peñalver',
    email: 'beatriz.alarcon@example.com',
    phone: '+34 633 456 789',
    serviceType: 'bono-experiencia',
    serviceName: 'Bono Experiencia Gastronómica',
    date: '2026-10-25',
    time: '21:00',
    guests: 2,
    dietaryNotes: '1 comensal vegetariano',
    notes: 'Celebración de 10º aniversario de bodas. Agradeceríamos detalle dulce al final.',
    status: 'in_preparation',
    createdAt: '2026-10-20T09:10:00.000Z',
  },
  {
    id: 'res-2026-004',
    code: 'EH-2026-84M2',
    customerName: 'Carlos Martínez Cano',
    email: 'carlos.m@example.com',
    phone: '+34 644 567 890',
    serviceType: 'menu-7-tiempos',
    serviceName: 'Menú Degustación 7 Tiempos',
    date: '2026-10-22',
    time: '14:00',
    guests: 2,
    dietaryNotes: '',
    notes: 'Cancelación solicitada con 48h de antelación por imprevisto laboral.',
    status: 'cancelled',
    createdAt: '2026-10-17T18:30:00.000Z',
  },
];

export const SEED_CONTACTS: ContactRequest[] = [
  {
    id: 'cnt-2026-001',
    name: 'Laura Gómez Ruiz (Fundación Mediterráneo)',
    email: 'laura.gomez@fundacionmed.example.es',
    phone: '+34 655 678 901',
    message:
      'Solicitud de propuesta de catering social y presupuesto para cóctel de clausura anual (estimado 65-70 asistentes) con vinos D.O. de la Región de Murcia durante la primera semana de diciembre.',
    createdAt: '2026-10-19T10:15:00.000Z',
  },
  {
    id: 'cnt-2026-002',
    name: 'Pedro Saura Beltrán (Tech Hub Murcia)',
    email: 'pedro.saura@techmurcia.example.es',
    phone: '+34 666 789 012',
    message:
      'Nos gustaría contar con el servicio de catering de inserción social para nuestra jornada de innovación empresarial (35 personas, café de bienvenida + almuerzo finger food saludable).',
    createdAt: '2026-10-20T15:40:00.000Z',
  },
];

// --- FALLBACK EN MEMORIA & ENVOLTORIO SAFE STORAGE ---

class MemoryStorageFallback {
  private memory = new Map<string, string>();

  getItem(key: string): string | null {
    return this.memory.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.memory.set(key, value);
  }

  removeItem(key: string): void {
    this.memory.delete(key);
  }

  clear(): void {
    this.memory.clear();
  }
}

const memoryStore = new MemoryStorageFallback();

const isLocalStorageAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__eh_storage_probe__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (isLocalStorageAvailable()) {
        const item = window.localStorage.getItem(key);
        if (item !== null) {
          // Mantener copia de lectura en memoria sincronizada
          memoryStore.setItem(key, item);
          return item;
        }
      }
    } catch {
      // Fallback a memoria ante SecurityError o bloqueo de cookies
    }
    return memoryStore.getItem(key);
  },

  setItem: (key: string, value: string): void => {
    let savedInLocalStorage = false;
    try {
      if (isLocalStorageAvailable()) {
        window.localStorage.setItem(key, value);
        savedInLocalStorage = true;
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage falló (${(e as Error).name}). Persistiendo en memoria volátil.`);
    }
    // Siempre asegurar el guardado en memoryStore para resiliencia total
    memoryStore.setItem(key, value);
    if (!savedInLocalStorage && typeof window !== 'undefined') {
      console.info(`[SafeStorage] Datos guardados en fallback de memoria para "${key}".`);
    }
  },

  removeItem: (key: string): void => {
    try {
      if (isLocalStorageAvailable()) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignorar fallo en localStorage
    }
    memoryStore.removeItem(key);
  },
};

// Clonación profunda defensiva
const cloneData = <T>(data: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(data);
  }
  return JSON.parse(JSON.stringify(data));
};

// --- TYPE GUARDS PARA SEGURIDAD EN TIEMPO DE EJECUCIÓN ---

export const isReservation = (obj: unknown): obj is Reservation => {
  if (!obj || typeof obj !== 'object') return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.id === 'string' &&
    typeof r.code === 'string' &&
    typeof r.customerName === 'string' &&
    typeof r.email === 'string' &&
    typeof r.phone === 'string' &&
    typeof r.serviceType === 'string' &&
    typeof r.date === 'string' &&
    typeof r.time === 'string' &&
    typeof r.guests === 'number' &&
    typeof r.status === 'string'
  );
};

export const isContactRequest = (obj: unknown): obj is ContactRequest => {
  if (!obj || typeof obj !== 'object') return false;
  const c = obj as Record<string, unknown>;
  return (
    typeof c.id === 'string' &&
    typeof c.name === 'string' &&
    typeof c.email === 'string' &&
    typeof c.message === 'string'
  );
};

// --- REACTIVIDAD INTERNA (PUB/SUB) ---

type StoreListener = () => void;
const listeners = new Set<StoreListener>();

export const subscribeToMockStore = (listener: StoreListener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyListeners = (): void => {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (err) {
      console.error('Error en listener de MockStore:', err);
    }
  });

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('eh_mock_store_updated'));
  }
};

// --- SANEAMIENTO DEFENSIVO DE DATOS ---

/**
 * Sanitiza cadenas de texto defensivamente contra inyecciones XSS y caracteres de control.
 */
export const sanitizeString = (str: string | undefined | null): string => {
  if (!str) return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Elimina etiquetas HTML completas
    .replace(/[<>]/g, '')      // Elimina cualquier corchete angular residual
    .trim();
};

/**
 * Sanitiza números de teléfono para enlaces tel: asegurando solo dígitos y el prefijo '+'.
 */
export const sanitizePhoneForHref = (phone: string | undefined | null): string => {
  if (!phone) return '';
  return phone.replace(/[^\d+]/g, '');
};

/**
 * Sanitiza correos electrónicos para enlaces mailto: neutralizando CRLF y espacios.
 */
export const sanitizeEmailForHref = (email: string | undefined | null): string => {
  if (!email) return '';
  return email.replace(/[\r\n\s]/g, '').trim();
};

// --- SIMULACIÓN ASÍNCRONA DE RED ---

export interface NetworkDelayOptions {
  signal?: AbortSignal;
  jitter?: boolean;
  failProbability?: number;
}

/**
 * Simula retardo de red asíncrono con soporte de cancelación (AbortSignal) y jitter realista.
 */
export const simulateNetworkDelay = (
  ms = 700,
  options?: NetworkDelayOptions
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (options?.signal?.aborted) {
      return reject(new DOMException('Operación abortada por el usuario', 'AbortError'));
    }

    if (options?.failProbability && Math.random() < options.failProbability) {
      return reject(new Error('Fallo de conexión simulado con el servidor de la Escuela.'));
    }

    const calculatedDelay = options?.jitter
      ? Math.max(100, ms + Math.floor((Math.random() - 0.5) * 200))
      : ms;

    const timer = setTimeout(() => {
      resolve();
    }, calculatedDelay);

    options?.signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Operación abortada por el usuario', 'AbortError'));
    });
  });
};

// --- GENERADOR CRIPTOGRÁFICO SEGURO DE LOCALIZADORES ---

/**
 * Genera código único de reserva en formato 'EH-2026-XXXX' con entropía criptográfica
 * sobre un alfabeto seguro de 32 caracteres (alfanumérico sin 0, O, 1, I).
 */
export const generateReservationCode = (): string => {
  const currentReservations = getReservationsFromStorage();
  const existingCodes = new Set(currentReservations.map((r) => r.code));
  const year = new Date().getFullYear();
  const CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

  let code = '';
  let attempts = 0;
  do {
    let suffix = '';
    if (typeof window !== 'undefined' && window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const buffer = new Uint8Array(4);
      window.crypto.getRandomValues(buffer);
      for (let i = 0; i < 4; i++) {
        suffix += CHARS[buffer[i] % CHARS.length];
      }
    } else {
      for (let i = 0; i < 4; i++) {
        suffix += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    code = `EH-${year}-${suffix}`;
    attempts++;
  } while (existingCodes.has(code) && attempts < 100);

  // Fallback con sufijo timestamp en el caso hipotético de saturación extrema
  if (existingCodes.has(code)) {
    const timestampSuffix = Date.now().toString(36).slice(-4).toUpperCase();
    code = `EH-${year}-${timestampSuffix}`;
  }

  return code;
};

// --- REGLAS Y FUNCIONES DE VALIDACIÓN ---

export const VALIDATION_RULES = {
  // Regex compatible RFC 5322 simplificado
  EMAIL_REGEX: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
  SPANISH_PHONE_REGEX: /^(\+34|0034)?[6789]\d{8}$/,
};

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email.trim());
};

export const validateSpanishPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s-.]/g, '');
  return VALIDATION_RULES.SPANISH_PHONE_REGEX.test(cleaned);
};

export const validateReservationDateAndSchedule = (
  dateStr: string,
  timeStr: string,
  serviceType: ReservationServiceType
): { valid: boolean; reason?: string } => {
  if (!dateStr) {
    return { valid: false, reason: 'Debes indicar una fecha válida para la reserva.' };
  }
  if (!timeStr || !timeStr.trim()) {
    return { valid: false, reason: 'Debes seleccionar una hora válida para el pase.' };
  }
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return { valid: false, reason: 'Formato de fecha inválido. Utiliza el selector de fecha.' };
  }
  const [year, month, day] = parts;
  const targetDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (targetDate < today) {
    return { valid: false, reason: 'La fecha de la reserva no puede ser anterior al día de hoy.' };
  }

  const dayOfWeek = targetDate.getDay(); // 0: Domingo, 6: Sábado

  // El restaurante gastronómico opera de lunes a viernes en servicio de mediodía
  if (serviceType === 'menu-7-tiempos') {
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        valid: false,
        reason: 'El Restaurante Gastronómico ofrece servicio de lunes a viernes a mediodía (cerrado sábados y domingos).',
      };
    }
  }

  return { valid: true };
};

// --- GESTIÓN INTERNA DE ALMACENAMIENTO ---

const getReservationsFromStorage = (): Reservation[] => {
  try {
    const item = safeStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (!item) {
      const initial = cloneData(SEED_RESERVATIONS);
      safeStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed) && parsed.every(isReservation)) {
      return parsed;
    }
    // Si los datos están corruptos o incompatibles, restaurar copia limpia de semillas
    const fallback = cloneData(SEED_RESERVATIONS);
    safeStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(fallback));
    return fallback;
  } catch (error) {
    console.warn('[MockStore] Error leyendo reservas, usando fallback:', error);
    return cloneData(SEED_RESERVATIONS);
  }
};

const saveReservationsToStorage = (reservations: Reservation[]): void => {
  safeStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
};

const getContactsFromStorage = (): ContactRequest[] => {
  try {
    const item = safeStorage.getItem(STORAGE_KEYS.CONTACTS);
    if (!item) {
      const initial = cloneData(SEED_CONTACTS);
      safeStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(item);
    if (Array.isArray(parsed) && parsed.every(isContactRequest)) {
      return parsed;
    }
    const fallback = cloneData(SEED_CONTACTS);
    safeStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(fallback));
    return fallback;
  } catch (error) {
    console.warn('[MockStore] Error leyendo contactos, usando fallback:', error);
    return cloneData(SEED_CONTACTS);
  }
};

const saveContactsToStorage = (contacts: ContactRequest[]): void => {
  safeStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
};

// --- API PÚBLICA DEL SERVICIO MOCK ---

/**
 * Obtiene todas las reservas registradas.
 */
export const getReservations = (): Reservation[] => {
  return getReservationsFromStorage();
};

/**
 * Crea una nueva reserva con validaciones de negocio, honeypot y retardo de red simulado.
 */
export const createReservation = async (input: CreateReservationInput): Promise<Reservation> => {
  // Verificación de Honeypot anti-spam
  if (input._hp && input._hp.trim() !== '') {
    await simulateNetworkDelay(400);
    throw new Error('Detección de envío automatizado no permitido (Honeypot).');
  }

  // Sanitización de entradas
  const customerName = sanitizeString(input.customerName);
  const email = sanitizeString(input.email);
  const phone = sanitizeString(input.phone);
  const dietaryNotes = input.dietaryNotes ? sanitizeString(input.dietaryNotes) : undefined;
  const notes = input.notes ? sanitizeString(input.notes) : undefined;
  const serviceName = input.serviceName || SERVICE_NAMES[input.serviceType] || 'Experiencia Gastronómica';

  if (!customerName || !email || !phone || !input.date || !input.time) {
    throw new Error('Por favor, completa todos los campos obligatorios para confirmar tu reserva.');
  }

  if (!validateEmail(email)) {
    throw new Error('Introduce una dirección de correo electrónico válida (formato: usuario@ejemplo.com).');
  }

  if (!validateSpanishPhone(phone)) {
    throw new Error('Introduce un número de teléfono de 9 dígitos válido (ej. +34 685 07 79 86).');
  }

  const dateCheck = validateReservationDateAndSchedule(input.date, input.time, input.serviceType);
  if (!dateCheck.valid) {
    throw new Error(dateCheck.reason || 'Fecha u horario no disponible.');
  }

  // Simular latencia de red realista
  await simulateNetworkDelay(700, { jitter: true });

  const guestsCount = Math.max(1, Math.min(80, Number(input.guests) || 1));

  const newReservation: Reservation = {
    id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    code: generateReservationCode(),
    customerName,
    email,
    phone,
    serviceType: input.serviceType,
    serviceName,
    date: input.date,
    time: input.time,
    guests: guestsCount,
    dietaryNotes,
    notes,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  const current = getReservationsFromStorage();
  const updated = [newReservation, ...current];
  saveReservationsToStorage(updated);
  notifyListeners();

  return newReservation;
};

/**
 * Actualiza el estado operativo de una reserva (confirmada, en preparación, mesa asignada, cancelada).
 */
export const updateReservationStatus = async (
  id: string,
  status: ReservationStatus,
  tableNumber?: string
): Promise<Reservation> => {
  await simulateNetworkDelay(400);

  const current = getReservationsFromStorage();
  const index = current.findIndex((r) => r.id === id);

  if (index === -1) {
    throw new Error(`Reserva con id "${id}" no encontrada.`);
  }

  const updatedReservation: Reservation = {
    ...current[index],
    status,
    tableNumber: tableNumber !== undefined ? tableNumber : current[index].tableNumber,
    updatedAt: new Date().toISOString(),
  };

  current[index] = updatedReservation;
  saveReservationsToStorage([...current]);
  notifyListeners();

  return updatedReservation;
};

/**
 * Elimina una reserva del sistema.
 */
export const deleteReservation = async (id: string): Promise<void> => {
  await simulateNetworkDelay(400);

  const current = getReservationsFromStorage();
  const filtered = current.filter((r) => r.id !== id);
  saveReservationsToStorage(filtered);
  notifyListeners();
};

/**
 * Restablece todas las reservas y contactos a sus datos de semilla iniciales.
 */
export const resetToSeedData = (): void => {
  saveReservationsToStorage(cloneData(SEED_RESERVATIONS));
  saveContactsToStorage(cloneData(SEED_CONTACTS));
  notifyListeners();
};

/** Alias de recarga/reset de datos demo */
export const resetDemoData = resetToSeedData;
export const loadSeedData = resetToSeedData;

/**
 * Borra todas las reservas almacenadas (útil para pruebas de interfaz vacía).
 */
export const clearAllReservations = (): void => {
  saveReservationsToStorage([]);
  notifyListeners();
};

/**
 * Crea una consulta o solicitud de contacto con validación honeypot y latencia simulada.
 */
export const createContactRequest = async (input: CreateContactInput): Promise<ContactRequest> => {
  // Verificación de Honeypot anti-spam
  if (input._hp && input._hp.trim() !== '') {
    await simulateNetworkDelay(300);
    throw new Error('Detección de envío automatizado no permitido (Honeypot).');
  }

  const name = sanitizeString(input.name);
  const email = sanitizeString(input.email);
  const phone = input.phone ? sanitizeString(input.phone) : '';
  const message = sanitizeString(input.message);

  if (!name || !email || !message) {
    throw new Error('Por favor, completa los campos obligatorios del formulario de contacto.');
  }

  if (!validateEmail(email)) {
    throw new Error('Introduce una dirección de correo electrónico válida.');
  }

  if (phone && !validateSpanishPhone(phone)) {
    throw new Error('El teléfono proporcionado no tiene un formato válido (ej. 685 07 79 86).');
  }

  await simulateNetworkDelay(600, { jitter: true });

  const newContact: ContactRequest = {
    id: `cnt-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    name,
    email,
    phone,
    message,
    createdAt: new Date().toISOString(),
  };

  const current = getContactsFromStorage();
  const updated = [newContact, ...current];
  saveContactsToStorage(updated);
  notifyListeners();

  return newContact;
};

/**
 * Obtiene todas las solicitudes de contacto registradas.
 */
export const getContactRequests = (): ContactRequest[] => {
  return getContactsFromStorage();
};

// --- EXPORTACIÓN iCALENDAR RFC 5545 TOTALMENTE ESTÁNDAR ---

/**
 * Escapa texto conforme a RFC 5545 sección 3.3.11 y neutraliza saltos de línea contra inyecciones CRLF.
 */
export const escapeIcsText = (text: string | undefined | null): string => {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
};

/**
 * Pliega líneas a un máximo de 75 octetos conforme a RFC 5545 sección 3.1.
 */
export const foldIcsLine = (line: string): string => {
  if (line.length <= 75) return line;
  const chunks: string[] = [];
  chunks.push(line.slice(0, 75));
  let remaining = line.slice(75);
  while (remaining.length > 74) {
    chunks.push(' ' + remaining.slice(0, 74));
    remaining = remaining.slice(74);
  }
  if (remaining.length > 0) {
    chunks.push(' ' + remaining);
  }
  return chunks.join('\r\n');
};

/**
 * Genera la cadena de texto iCalendar (.ics) en estricto cumplimiento de RFC 5545.
 */
export const generateIcsCalendarContent = (reservation: Reservation): string => {
  const [yearStr, monthStr, dayStr] = reservation.date.split('-');
  const [hourStr, minuteStr] = (reservation.time || '14:00').split(':');

  const startYear = parseInt(yearStr, 10);
  const startMonth = parseInt(monthStr, 10) - 1;
  const startDay = parseInt(dayStr, 10);
  const startHour = parseInt(hourStr, 10);
  const startMinute = parseInt(minuteStr, 10);

  const startDate = new Date(startYear, startMonth, startDay, startHour, startMinute);
  // Estimación de servicio gastronómico: 2 horas y media de duración
  const endDate = new Date(startDate.getTime() + 2.5 * 60 * 60 * 1000);

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const formatUtcDate = (d: Date): string =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

  const dtStamp = formatUtcDate(new Date());
  const dtStart = formatUtcDate(startDate);
  const dtEnd = formatUtcDate(endDate);

  const summary = escapeIcsText(`Reserva: ${reservation.serviceName} - eh! Escuela de Hostelería`);
  const location = escapeIcsText('eh! Escuela de Hostelería Cáritas, C. Sta. Cecilia, 1, 30005 Murcia, España');

  const descriptionParts = [
    `Reserva confirmada en eh! Escuela de Hostelería (Cáritas Murcia)`,
    `Código de reserva: ${reservation.code}`,
    `Titular: ${reservation.customerName}`,
    `Comensales: ${reservation.guests} personas`,
    `Fecha y hora: ${reservation.date} a las ${reservation.time}`,
    reservation.dietaryNotes ? `Notas dietéticas: ${reservation.dietaryNotes}` : null,
    reservation.notes ? `Observaciones: ${reservation.notes}` : null,
    `Teléfono de reservas: +34 685 07 79 86`,
    `Email: reservas@eh-restaurante.es`,
    `Ubicación: Calle Sta. Cecilia, 1, 30005 Murcia (junto a Cáritas)`,
  ].filter(Boolean) as string[];

  const description = escapeIcsText(descriptionParts.join('\n'));

  const rawLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//eh! Escuela de Hosteleria Caritas//Reservas//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:res-${reservation.code}-${reservation.id}@eh-restaurante.es`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'ORGANIZER;CN="eh! Escuela de Hosteleria":mailto:reservas@eh-restaurante.es',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio de reserva en eh! Escuela de Hostelería',
    'TRIGGER:-PT2H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return rawLines.map(foldIcsLine).join('\r\n');
};

/**
 * Genera y descarga un archivo .ics (iCalendar RFC 5545) compatible con Apple Calendar,
 * Google Calendar, Microsoft Outlook y aplicaciones móviles de calendario.
 */
export const generateIcsCalendarFile = (reservation: Reservation): void => {
  if (typeof window === 'undefined') return;

  const icsContent = generateIcsCalendarContent(reservation);
  const icsBlob = new Blob([icsContent], {
    type: 'text/calendar;charset=utf-8',
  });

  const downloadUrl = window.URL.createObjectURL(icsBlob);
  const link = window.document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', `reserva-${reservation.code}.ics`);
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

// Alias de retrocompatibilidad
export const generateIcsCalendar = generateIcsCalendarFile;

/**
 * Construye la URL directa para agregar la cita a Google Calendar web.
 */
export const getGoogleCalendarUrl = (reservation: Reservation): string => {
  const [yearStr, monthStr, dayStr] = reservation.date.split('-');
  const [hourStr, minuteStr] = (reservation.time || '14:00').split(':');

  const startYear = parseInt(yearStr, 10);
  const startMonth = parseInt(monthStr, 10) - 1;
  const startDay = parseInt(dayStr, 10);
  const startHour = parseInt(hourStr, 10);
  const startMinute = parseInt(minuteStr, 10);

  const startDate = new Date(startYear, startMonth, startDay, startHour, startMinute);
  const endDate = new Date(startDate.getTime() + 2.5 * 60 * 60 * 1000);

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const formatUtcDate = (d: Date): string => {
    return (
      d.getUTCFullYear().toString() +
      pad(d.getUTCMonth() + 1) +
      pad(d.getUTCDate()) +
      'T' +
      pad(d.getUTCHours()) +
      pad(d.getUTCMinutes()) +
      '00Z'
    );
  };

  const datesParam = `${formatUtcDate(startDate)}/${formatUtcDate(endDate)}`;
  const titleParam = encodeURIComponent(
    `Reserva: ${reservation.serviceName} - eh! Escuela de Hostelería`
  );
  const locationParam = encodeURIComponent(
    'eh! Escuela de Hostelería Cáritas, C. Sta. Cecilia, 1, 30005 Murcia, España'
  );

  const detailsText = [
    `Reserva en eh! Escuela de Hostelería (Cáritas Murcia)`,
    `Código: ${reservation.code}`,
    `Titular: ${reservation.customerName}`,
    `Comensales: ${reservation.guests} personas`,
    reservation.dietaryNotes ? `Alergias/Dietas: ${reservation.dietaryNotes}` : null,
    reservation.notes ? `Peticiones: ${reservation.notes}` : null,
    `Teléfono: +34 685 07 79 86`,
  ]
    .filter(Boolean)
    .join('\n');

  const detailsParam = encodeURIComponent(detailsText);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleParam}&dates=${datesParam}&details=${detailsParam}&location=${locationParam}`;
};
