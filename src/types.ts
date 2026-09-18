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
