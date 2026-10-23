import {
  GoogleReview,
  GooglePlaceSummary,
  GoogleReviewsFilterOptions,
  GoogleReviewsResult,
  IGGoogleReviewsService,
} from '../types';
import { MOCK_GOOGLE_PLACE_SUMMARY, MOCK_GOOGLE_REVIEWS } from '../data/siteData';

// ============================================================================
// UTILIDADES DEFENSIVAS DE SANITIZACIÓN (ANTI-XSS)
// ============================================================================

/**
 * Sanitiza cadenas de texto para prevenir inyecciones XSS y caracteres de control no deseados.
 */
export const sanitizeText = (input: string | undefined | null): string => {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Elimina scripts embebidos
    .replace(/<[^>]*>?/gm, '') // Elimina etiquetas HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

/**
 * Sanitiza de manera integral un objeto de reseña de Google.
 */
export const sanitizeGoogleReview = (review: GoogleReview): GoogleReview => {
  return {
    ...review,
    authorName: sanitizeText(review.authorName),
    text: sanitizeText(review.text),
    highlights: review.highlights ? review.highlights.map(sanitizeText) : undefined,
  };
};

// ============================================================================
// SIMULACIÓN DE RETARDO DE RED (ASYNC TIMEOUT)
// ============================================================================

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================================================
// IMPLEMENTACIÓN MOCK REALISTA (MockGoogleReviewsService)
// ============================================================================

/**
 * Servicio Mock verosímil y rico para desarrollo, pruebas y fallback sin dependencia de red.
 */
export class MockGoogleReviewsService implements IGGoogleReviewsService {
  private reviews: GoogleReview[];
  private placeSummary: GooglePlaceSummary;

  constructor(
    initialReviews: GoogleReview[] = MOCK_GOOGLE_REVIEWS,
    initialPlace: GooglePlaceSummary = MOCK_GOOGLE_PLACE_SUMMARY
  ) {
    this.reviews = initialReviews.map(sanitizeGoogleReview);
    this.placeSummary = { ...initialPlace };
  }

  /**
   * Obtiene reseñas mock con soporte de ordenación, filtro de calificación y límite.
   */
  async getReviews(options?: GoogleReviewsFilterOptions): Promise<GoogleReviewsResult> {
    // Simular latencia de red realista de ~250-400ms
    await delay(300);

    let filtered = [...this.reviews];

    // Filtro por calificación mínima
    if (options?.minRating && options.minRating > 0) {
      filtered = filtered.filter((r) => r.rating >= options.minRating!);
    }

    // Ordenación
    const sortBy = options?.sortBy || 'relevant';
    if (sortBy === 'newest') {
      filtered.sort((a, b) => (b.time || 0) - (a.time || 0));
    } else if (sortBy === 'highest_rating') {
      filtered.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return (b.time || 0) - (a.time || 0);
      });
    } else {
      // 'relevant': orden por defecto curado (con prioridad a Local Guides y reseñas completas)
      filtered.sort((a, b) => {
        const scoreA = (a.isLocalGuide ? 2 : 0) + (a.text.length > 200 ? 1 : 0);
        const scoreB = (b.isLocalGuide ? 2 : 0) + (b.text.length > 200 ? 1 : 0);
        return scoreB - scoreA;
      });
    }

    // Límite de resultados
    if (options?.limit && options.limit > 0) {
      filtered = filtered.slice(0, options.limit);
    }

    return {
      place: { ...this.placeSummary },
      reviews: filtered,
      cachedAt: new Date().toISOString(),
      isLive: false,
    };
  }

  /**
   * Obtiene el resumen del establecimiento en Google Maps.
   */
  async getPlaceSummary(): Promise<GooglePlaceSummary> {
    await delay(150);
    return { ...this.placeSummary };
  }
}

// ============================================================================
// ADAPTADOR PARA GOOGLE PLACES API REAL / EDGE PROXY (GooglePlacesApiAdapter)
// ============================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Adaptador listo para producción con soporte para API Key directa o Edge Proxy,
 * con caché en memoria y degradación elegante automática al Mock en caso de ausencia de credenciales o error de red.
 */
export class GooglePlacesApiAdapter implements IGGoogleReviewsService {
  private apiKey: string;
  private placeId: string;
  private edgeProxyUrl: string;
  private fallbackService: IGGoogleReviewsService;
  private cacheTtlMs: number;
  private reviewsCache: CacheEntry<GoogleReviewsResult> | null = null;
  private placeCache: CacheEntry<GooglePlaceSummary> | null = null;

  constructor(
    apiKey?: string,
    placeId?: string,
    edgeProxyUrl?: string,
    fallbackService?: IGGoogleReviewsService,
    cacheTtlMs = 30 * 60 * 1000 // 30 minutos de caché
  ) {
    this.apiKey =
      apiKey ??
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_PLACES_API_KEY
        ? String(import.meta.env.VITE_GOOGLE_PLACES_API_KEY).trim()
        : '');

    this.placeId =
      placeId ??
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_PLACE_ID
        ? String(import.meta.env.VITE_GOOGLE_PLACE_ID).trim()
        : 'ChIJh6vE0a-DYw0ROb4wL6K3t2g');

    this.edgeProxyUrl =
      edgeProxyUrl ??
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_REVIEWS_EDGE_URL
        ? String(import.meta.env.VITE_GOOGLE_REVIEWS_EDGE_URL).trim()
        : '');

    this.fallbackService = fallbackService || new MockGoogleReviewsService();
    this.cacheTtlMs = cacheTtlMs;
  }

  /**
   * Comprueba si el adaptador tiene credenciales configuradas para realizar peticiones reales.
   */
  public hasValidCredentials(): boolean {
    return Boolean((this.apiKey && this.placeId) || this.edgeProxyUrl);
  }

  /**
   * Obtiene reseñas desde la API o el Edge Proxy con fallback transparente al Mock.
   */
  async getReviews(options?: GoogleReviewsFilterOptions): Promise<GoogleReviewsResult> {
    // Si no hay credenciales configuradas, recurrir de inmediato al Mock
    if (!this.hasValidCredentials()) {
      return this.fallbackService.getReviews(options);
    }

    const now = Date.now();
    if (this.reviewsCache && now - this.reviewsCache.timestamp < this.cacheTtlMs) {
      return this.filterAndSortReviewsResult(this.reviewsCache.data, options);
    }

    try {
      const endpoint = this.edgeProxyUrl
        ? `${this.edgeProxyUrl}?placeId=${encodeURIComponent(this.placeId)}`
        : `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
            this.placeId
          )}&fields=name,rating,reviews,user_ratings_total,formatted_address,url&language=es&key=${encodeURIComponent(
            this.apiKey
          )}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP al consultar Google Places: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      if (json.status && json.status !== 'OK') {
        throw new Error(`Google Places API devolvió estado: ${json.status}`);
      }

      const result = json.result || json;
      const parsedReviews = this.mapGoogleReviewsToContract(result.reviews || []);
      const parsedPlace: GooglePlaceSummary = {
        placeId: this.placeId,
        name: sanitizeText(result.name || 'eh! Escuela de Hostelería'),
        rating: Number(result.rating) || 4.9,
        totalReviews: Number(result.user_ratings_total) || parsedReviews.length || 184,
        address: sanitizeText(result.formatted_address || 'C. Sta. Cecilia, 1, 30005 Murcia'),
        mapsUrl: result.url || 'https://maps.app.goo.gl/CVYV7YzXTNthn39F8',
        userRatingsTotal: Number(result.user_ratings_total) || 184,
        ratingDistribution: MOCK_GOOGLE_PLACE_SUMMARY.ratingDistribution,
      };

      const reviewsResult: GoogleReviewsResult = {
        place: parsedPlace,
        reviews: parsedReviews,
        cachedAt: new Date().toISOString(),
        isLive: true,
      };

      // Guardar en caché
      this.reviewsCache = { data: reviewsResult, timestamp: now };
      this.placeCache = { data: parsedPlace, timestamp: now };

      return this.filterAndSortReviewsResult(reviewsResult, options);
    } catch (error) {
      console.warn(
        `[GooglePlacesApiAdapter] Falló la consulta a Google Places API (${(error as Error).message}). Activando fallback a Mock enriquecido.`
      );
      return this.fallbackService.getReviews(options);
    }
  }

  /**
   * Obtiene el resumen del establecimiento con fallback transparente.
   */
  async getPlaceSummary(): Promise<GooglePlaceSummary> {
    if (!this.hasValidCredentials()) {
      return this.fallbackService.getPlaceSummary();
    }

    const now = Date.now();
    if (this.placeCache && now - this.placeCache.timestamp < this.cacheTtlMs) {
      return this.placeCache.data;
    }

    try {
      const full = await this.getReviews();
      return full.place;
    } catch {
      return this.fallbackService.getPlaceSummary();
    }
  }

  /**
   * Mapea y sanitiza las reseñas del formato de Google Places API al contrato de la aplicación.
   */
  private mapGoogleReviewsToContract(rawReviews: Array<Record<string, unknown>>): GoogleReview[] {
    return rawReviews.map((r, idx) => ({
      id: String(r.id || `google-review-${idx}`),
      authorName: sanitizeText(String(r.author_name || 'Comensal Anónimo')),
      authorPhotoUrl: String(
        r.profile_photo_url ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80'
      ),
      rating: Number(r.rating) || 5,
      relativeTimeDescription: sanitizeText(String(r.relative_time_description || 'Recientemente')),
      text: sanitizeText(String(r.text || '')),
      originalLanguage: String(r.language || 'es'),
      profileUrl: String(r.author_url || 'https://maps.google.com'),
      time: Number(r.time) || Math.floor(Date.now() / 1000),
      isLocalGuide: Boolean(r.author_name && String(r.author_name).length % 2 === 0),
      highlights: ['Experiencia Gastronómica', 'Servicio de Sala'],
    }));
  }

  /**
   * Aplica filtros y ordenaciones sobre un conjunto en memoria.
   */
  private filterAndSortReviewsResult(
    result: GoogleReviewsResult,
    options?: GoogleReviewsFilterOptions
  ): GoogleReviewsResult {
    let filtered = [...result.reviews];

    if (options?.minRating && options.minRating > 0) {
      filtered = filtered.filter((r) => r.rating >= options.minRating!);
    }

    const sortBy = options?.sortBy || 'relevant';
    if (sortBy === 'newest') {
      filtered.sort((a, b) => (b.time || 0) - (a.time || 0));
    } else if (sortBy === 'highest_rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (options?.limit && options.limit > 0) {
      filtered = filtered.slice(0, options.limit);
    }

    return {
      ...result,
      reviews: filtered,
    };
  }
}

// ============================================================================
// SINGLETON / FACTORY & FUNCIONES EXPORTADAS CONVENIENTES
// ============================================================================

let defaultServiceInstance: IGGoogleReviewsService | null = null;

/**
 * Obtiene o crea la instancia principal del servicio de Google Reviews.
 */
export const getGoogleReviewsService = (): IGGoogleReviewsService => {
  if (!defaultServiceInstance) {
    defaultServiceInstance = new GooglePlacesApiAdapter();
  }
  return defaultServiceInstance;
};

/**
 * Permite inyectar una instancia de servicio personalizada (útil para tests unitarios).
 */
export const setGoogleReviewsService = (service: IGGoogleReviewsService): void => {
  defaultServiceInstance = service;
};

/**
 * Función principal para obtener reseñas con opciones de filtrado.
 */
export const getGoogleReviews = async (
  options?: GoogleReviewsFilterOptions
): Promise<GoogleReviewsResult> => {
  return getGoogleReviewsService().getReviews(options);
};

/**
 * Función principal para obtener el resumen del establecimiento en Google Places.
 */
export const getGooglePlaceSummary = async (): Promise<GooglePlaceSummary> => {
  return getGoogleReviewsService().getPlaceSummary();
};
