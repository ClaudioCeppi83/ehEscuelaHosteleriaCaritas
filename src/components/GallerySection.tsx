import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/siteData';
import { GalleryImage } from '../types';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'gastronomia' | 'cafeteria' | 'catering' | 'escuela'>('todos');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = activeFilter === 'todos'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  const filters = [
    { id: 'todos', label: 'Todo el Archivo' },
    { id: 'gastronomia', label: 'Alta Cocina & Platos' },
    { id: 'cafeteria', label: 'Cafetería' },
    { id: 'catering', label: 'Catering & Eventos' },
    { id: 'escuela', label: 'La Escuela & Alumnos' },
  ];

  return (
    <section id="galeria" className="py-24 bg-linen-50 dark:bg-charcoal-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">
              <ImageIcon className="w-4 h-4" />
              <span>Galería Visual</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal-950 dark:text-white tracking-tight">
              Nuestra mesa y nuestra gente <br />
              <span className="italic text-brand-600 dark:text-brand-400 font-normal">en imágenes</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === f.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white dark:bg-charcoal-850 text-charcoal-700 dark:text-linen-300 border border-linen-200 dark:border-charcoal-750 hover:border-brand-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-linen-200 dark:border-charcoal-800 bg-white dark:bg-charcoal-900 cursor-pointer group transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/85 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-widest text-brand-300 font-bold mb-1">
                  {img.tag}
                </span>
                <h4 className="font-serif text-lg font-bold leading-snug">
                  {img.title}
                </h4>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-linen-300">
                  <ZoomIn className="w-3.5 h-3.5 text-brand-400" />
                  <span>Ampliar fotografía</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-charcoal-900 rounded-3xl overflow-hidden border border-charcoal-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-charcoal-950/80 text-white hover:bg-brand-600 transition-colors"
              aria-label="Cerrar vista ampliada"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[70vh] object-contain bg-black"
            />

            <div className="p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-400 font-semibold block mb-1">
                  {selectedImage.tag}
                </span>
                <h3 className="font-serif text-xl font-bold">
                  {selectedImage.title}
                </h3>
              </div>
              <span className="text-xs text-charcoal-400">
                eh! Escuela de Hostelería · Murcia
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
