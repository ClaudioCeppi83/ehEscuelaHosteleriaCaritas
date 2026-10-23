export interface MenuItem {
  id: number;
  course: string;
  name: string;
  description: string;
  highlights?: string[];
  dietary?: string[];
}

export interface SpaceItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  schedule: string;
  features: string[];
  image: string;
  ctaText: string;
  ctaAction: string;
}

export interface CateringEvent {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: 'gastronomia' | 'cafeteria' | 'catering' | 'escuela';
  tag: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}

export interface ImpactStat {
  id: string;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
}

export type ReservationServiceType =
  | 'menu-7-tiempos'
  | 'sala-privada'
  | 'catering-empresa'
  | 'bono-experiencia';

export type ReservationStatus =
  | 'confirmed'
  | 'in_preparation'
  | 'table_assigned'
  | 'cancelled';

export interface Reservation {
  id: string;
  code: string;
  customerName: string;
  email: string;
  phone: string;
  serviceType: ReservationServiceType;
  serviceName: string;
  date: string;
  time: string;
  guests: number;
  dietaryNotes?: string;
  notes?: string;
  status: ReservationStatus;
  tableNumber?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClientLogo {
  name: string;
  logo: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  organization: string;
  city: string;
  address: string;
  phoneBooking: string;
  phoneTraining: string;
  emailReservations: string;
  emailInfo: string;
  dishBookingUrl: string;
  whatsappUrl: string;
  mapsUrl: string;
  social: {
    instagramRestaurant: string;
    instagramSchool: string;
    facebook: string;
  };
  images: Record<string, string>;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface CreateReservationInput {
  customerName: string;
  email: string;
  phone: string;
  serviceType: ReservationServiceType;
  serviceName?: string;
  date: string;
  time: string;
  guests: number;
  dietaryNotes?: string;
  notes?: string;
  _hp?: string;
}

export interface CreateContactInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  _hp?: string;
}

// ============================================================================
// CONTRATOS PARA LA EXPERIENCIA EDITORIAL DE ALTA GASTRONOMÍA & PROTOCOLO
// ============================================================================

/**
 * Representa un pase culinario de la Minuta Degustación de 7 Tiempos.
 */
export interface GastronomicCourse {
  id: string;
  courseNumber: string;
  title: string;
  subtitle?: string;
  description: string;
  ingredients: string[];
  pairing: {
    wine: string;
    denomination: string;
    notes?: string;
  };
  dietaryNotes?: string[];
  provenance?: string;
}

/**
 * Representa un pilar del ceremonial de sala, servicio y protocolo gastronómico.
 */
export interface DiningRoomProtocolPillar {
  id: string;
  pillarNumber: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  quote?: string;
  author?: string;
  iconName: string;
  image?: string;
}

/**
 * Representa las credenciales de oficio, trayectoria e impacto de la Escuela de Hostelería.
 */
export interface HouseCredential {
  id: string;
  order: string;
  value: string;
  suffix?: string;
  title: string;
  subtitle: string;
  narrative: string;
  badge?: string;
}

// ============================================================================
// CONTRATOS DESACOPLADOS PARA GOOGLE REVIEWS & PLACES API
// ============================================================================

/**
 * Modelo desacoplado de reseña verificada de Google Maps / Places.
 */
export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhotoUrl: string;
  rating: number;
  relativeTimeDescription: string;
  text: string;
  originalLanguage: string;
  profileUrl: string;
  isLocalGuide?: boolean;
  reviewCount?: number;
  time?: number;
  highlights?: string[];
}

/**
 * Resumen consolidado del establecimiento en Google Places.
 */
export interface GooglePlaceSummary {
  placeId: string;
  name: string;
  rating: number;
  totalReviews: number;
  address: string;
  mapsUrl: string;
  userRatingsTotal: number;
  ratingDistribution?: Record<number, number>;
}

/**
 * Opciones de filtrado, ordenación y paginación para reseñas de Google.
 */
export interface GoogleReviewsFilterOptions {
  sortBy?: 'newest' | 'highest_rating' | 'relevant';
  minRating?: number;
  limit?: number;
}

/**
 * Resultado completo devuelto por el servicio de reseñas.
 */
export interface GoogleReviewsResult {
  place: GooglePlaceSummary;
  reviews: GoogleReview[];
  cachedAt: string;
  isLive: boolean;
}

/**
 * Interfaz de contrato para el servicio de Google Reviews (patrón Adapter / Service).
 */
export interface IGGoogleReviewsService {
  getReviews(options?: GoogleReviewsFilterOptions): Promise<GoogleReviewsResult>;
  getPlaceSummary(): Promise<GooglePlaceSummary>;
}
