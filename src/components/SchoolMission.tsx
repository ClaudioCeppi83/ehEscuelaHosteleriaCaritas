import React from 'react';
import { SITE_CONFIG } from '../data/siteData';
import { GraduationCap, Quote, BookOpen, UserCheck, ShieldCheck, Mail, Phone } from 'lucide-react';

export const SchoolMission: React.FC = () => {
  return (
    <section id="escuela" className="py-24 bg-white dark:bg-charcoal-900 border-t border-linen-200 dark:border-charcoal-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Formación & Empleo con Propósito</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-charcoal-950 dark:text-white tracking-tight">
            Nuestra Historia & <br />
            <span className="italic text-brand-600 dark:text-brand-400 font-normal">Misión Social</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 dark:text-linen-300">
            Una economía al servicio de la justicia social, los derechos de las personas y el trabajo decente en la Región de Murcia.
          </p>
        </div>

        {/* Narrative & Quote Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left: Cáritas Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="prose dark:prose-invert text-charcoal-700 dark:text-linen-300 leading-relaxed text-base space-y-4">
              <p className="text-lg font-serif font-medium text-charcoal-900 dark:text-white">
                Cáritas entiende la <strong>Economía Solidaria</strong> como la construcción de un modelo económico diferente y alternativo al sistema vigente.
              </p>
              <p>
                Una economía al servicio de la justicia social y del ejercicio de los derechos humanos. Frente a otros intereses, impulsamos una iniciativa que busca el beneficio social y el respeto al planeta: <em>somos Iglesia por el trabajo decente</em>.
              </p>
              <p>
                La empresa de inserción de Cáritas Diócesis de Cartagena, <strong>eh! laboras</strong>, contrata a personas que tienen dificultades para incorporarse al mercado laboral ordinario. Durante su periodo formativo, reciben capacitación técnica y acompañamiento continuo en habilidades y competencias por parte de formadores experimentados.
              </p>
              <p>
                Este proceso culmina con la incorporación al mercado laboral ordinario, al que se enfrentan con una empleabilidad reforzada y máximas garantías de éxito profesional.
              </p>
            </div>

            {/* Training Contact Box */}
            <div className="p-6 rounded-2xl bg-linen-50 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block">
                  Información para Cursos y Formación
                </span>
                <span className="text-sm font-semibold text-charcoal-900 dark:text-white block mt-0.5">
                  ¿Quieres formarte con nosotros?
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${SITE_CONFIG.emailInfo}`}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-charcoal-700 border border-linen-300 dark:border-charcoal-600 text-xs font-semibold text-charcoal-800 dark:text-linen-100 flex items-center gap-1.5 hover:bg-linen-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-600" />
                  <span>{SITE_CONFIG.emailInfo}</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phoneTraining.replace(/\s+/g, '')}`}
                  className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{SITE_CONFIG.phoneTraining}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Bishop Quote & Photo */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Quote Card */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-linen-100/80 dark:bg-charcoal-950 border border-linen-200 dark:border-charcoal-800 shadow-xl">
              <Quote className="w-12 h-12 text-brand-600/30 dark:text-brand-400/20 absolute top-6 right-6" />
              
              <blockquote className="font-serif text-lg sm:text-xl text-charcoal-900 dark:text-white italic leading-relaxed mb-6 relative z-10">
                «Este proyecto va en beneficio de aquellos que están viviendo una experiencia dramática. Ayudemos para que abran los ojos y vean que delante de ellos hay futuro y esperanza. Con esto, a mí me bastaría.»
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-serif font-bold text-lg flex items-center justify-center shadow-md">
                  JML
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-charcoal-950 dark:text-white">
                    D. José Manuel Lorca Planes
                  </h4>
                  <p className="text-xs text-charcoal-500 dark:text-linen-400">
                    Obispo de la Diócesis de Cartagena en Murcia
                  </p>
                </div>
              </div>
            </div>

            {/* Photo Collage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-charcoal-800">
                <img
                  src={SITE_CONFIG.images.teachers}
                  alt="Equipo docente y formadores de eh! Escuela de Hostelería"
                  className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-charcoal-800">
                <img
                  src={SITE_CONFIG.images.studentsCooking}
                  alt="Alumnos de cocina en formación práctica real"
                  className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

        </div>

        {/* 3 Pillars of Training */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-linen-200 dark:border-charcoal-800">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-charcoal-900 dark:text-white mb-1">
                Certificados Oficiales
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-linen-300 leading-relaxed">
                Cualificaciones profesionales homologadas en Operaciones Básicas de Cocina, Restaurante y Bar.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-charcoal-900 dark:text-white mb-1">
                Acompañamiento Integral
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-linen-300 leading-relaxed">
                Técnicos de inserción laboral y trabajadores sociales que apoyan cada proceso individualizado.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-charcoal-900 dark:text-white mb-1">
                Alianzas Empresariales
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-linen-300 leading-relaxed">
                Convenios con las principales cadenas hoteleras y restaurantes de la Región de Murcia para prácticas e inserción.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
