import { MenuItem, SpaceItem, CateringEvent, GalleryImage, ReviewItem, ImpactStat } from '../types';

export const SITE_CONFIG = {
  name: 'eh! Escuela de Hostelería',
  tagline: 'Alta Gastronomía con Impacto Social',
  organization: 'Cáritas Diócesis de Cartagena & eh! laboras',
  city: 'Murcia, España',
  address: 'C. Sta. Cecilia, 1, 30005 Murcia',
  phoneBooking: '+34 685 07 79 86',
  phoneTraining: '+34 685 07 79 82',
  emailReservations: 'reservas@eh-restaurante.es',
  emailInfo: 'info@ehlaboras.es',
  dishBookingUrl: 'https://reserve.dish.co/338672',
  whatsappUrl: 'https://wa.me/34685077986?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20reservas%20en%20eh!%20Escuela%20de%20Hosteler%C3%ADa',
  mapsUrl: 'https://maps.app.goo.gl/CVYV7YzXTNthn39F8',
  social: {
    instagramRestaurant: 'https://www.instagram.com/restaurante_eh/',
    instagramSchool: 'https://www.instagram.com/escuela_hosteleria_eh/',
    facebook: 'https://www.facebook.com/ehescueladehosteleria/',
  },
  images: {
    logoOriginal: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/01/cropped-cropped-cropped-cropped-2021-LOGO-eh-escuela-completo-original-1-scaled-1-3-1.jpg',
    logoWhite: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/01/cropped-cropped-logo_blanco_h.jpg',
    heroInterior: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/01/34.jpg',
    heroDish: 'https://ehescueladehosteleria.com/wp-content/uploads/2024/09/cropped-DSC07289-scaled-1.jpg',
    experienceGift: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/05/cropped-regala_experiencias_pagina_1.jpg',
    cafeteria: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/cropped-WhatsApp-Image-2023-10-04-at-14.16.34.jpeg',
    gastronomicService: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/cropped-WhatsApp-Image-2023-10-03-at-19.18.04-1-1.jpeg',
    cateringBuffet: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/cropped-photo_2023-10-04-09.15.16-e1696403749844-1.jpeg',
    teachers: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/Diseno-sin-titulo-25.jpg',
    studentsCooking: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/photo_2023-10-04-11.57.18-1.jpeg',
    menuCard1: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/07/cropped-menu_julio_pagina_1-1.jpg',
    menuCard2: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/07/cropped-menu_julio_pagina_2.jpg',
  }
};

export const IMPACT_STATS: ImpactStat[] = [
  {
    id: 'years',
    target: 12,
    suffix: '+ Años',
    label: 'Transformando vidas',
    description: 'Formando y cualificando a personas con talento en el sector de la hostelería.'
  },
  {
    id: 'courses',
    target: 7,
    suffix: ' Tiempos',
    label: 'Menú Gastronómico',
    description: 'Experiencia gastronómica integral diseñada y servida con técnica de vanguardia.'
  },
  {
    id: 'insertion',
    target: 85,
    suffix: '%',
    label: 'Inserción sociolaboral',
    description: 'Nuestros alumnos acceden con éxito garantizado al mercado laboral ordinario.'
  },
  {
    id: 'quality',
    target: 100,
    suffix: '%',
    label: 'Cocina y servicio real',
    description: 'Prácticas reales con público, productos de la huerta murciana y economía circular.'
  }
];

export const GASTRONOMIC_MENU: MenuItem[] = [
  {
    id: 1,
    course: 'Primer Pase',
    name: 'Aperitivos de Bienvenida & Huerta Murciana',
    description: 'Bocados crujientes con verduras ecológicas de la vega, texturas de queso curado regional y emulsión de hierbas silvestres.',
    highlights: ['Producto de cercanía', 'Huerta tradicional'],
    dietary: ['Vegetariano adaptable']
  },
  {
    id: 2,
    course: 'Segundo Pase',
    name: 'Entrante Frío de Mar y Sal',
    description: 'Tartar fino de pescado de lonja local, gazpacho clarificado de tomate murciano, algas y brotes tiernos.',
    highlights: ['Pesca sostenible', 'Aceite virgen extra ecológico'],
    dietary: ['Sin gluten']
  },
  {
    id: 3,
    course: 'Tercer Pase',
    name: 'La Tradición Reinventada',
    description: 'Croqueta melosa de jamón ibérico de bellota y crujiente de pimentón de Murcia con DOP.',
    highlights: ['Receta insignia', 'Elaboración artesanal de los alumnos']
  },
  {
    id: 4,
    course: 'Cuarto Pase',
    name: 'Pase del Litoral Mediterráneo',
    description: 'Lomo de corvina asada a baja temperatura sobre jugo reducido de sus espinas, hinojo marino y cebollitas confitadas.',
    highlights: ['Cocción a baja temperatura', 'Pescado fresco del día'],
    dietary: ['Rico en Omega-3']
  },
  {
    id: 5,
    course: 'Quinto Pase',
    name: 'Corte de Carne Selecto & Reducción de Jumilla',
    description: 'Carrillera tierna glaseada con vino tinto de la tierra, puré sedoso de tubérculos y crujiente de puerro.',
    highlights: ['Vino D.O.P. Jumilla', '48 horas de cocción lenta']
  },
  {
    id: 6,
    course: 'Sexto Pase',
    name: 'Prepostre Refrescante de Cítricos Murcianos',
    description: 'Sorbete puro de limón de la huerta de Murcia con infusión de albahaca fresca y perlas de lima.',
    highlights: ['Limpia paladar', 'Cítricos ecológicos locales'],
    dietary: ['Vegano', 'Sin gluten']
  },
  {
    id: 7,
    course: 'Séptimo Pase',
    name: 'Postre de Alta Pastelería & Petit Fours',
    description: 'Cremoso de cacao puro con avellana tostada, quenelle de helado artesano y café de especialidad de comercio justo.',
    highlights: ['Pastelería de autor', 'Comercio justo']
  }
];

export const SPACES: SpaceItem[] = [
  {
    id: 'restaurante',
    name: 'Salón Principal del Restaurante',
    subtitle: 'El escenario vivo donde la alta cocina y el aprendizaje se fusionan',
    description: 'Un espacio amplio, diáfano y sereno con iluminación natural. Diseñado para que cada comensal disfrute con calma del menú de siete tiempos elaborado y servido por nuestros alumnos.',
    schedule: 'Lunes a viernes de 13:30h a 17:30h',
    features: [
      'Capacidad para hasta 80 comensales',
      'Servicio de sala protocolario y atento',
      'Posibilidad de cierre en exclusiva para eventos privados',
      'Climatización y accesibilidad universal'
    ],
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/01/34.jpg',
    ctaText: 'Reservar Mesa en Restaurante',
    ctaAction: 'booking-restaurant'
  },
  {
    id: 'sala-privada',
    name: 'Sala Privada para Reuniones de Trabajo',
    subtitle: 'Privacidad, tecnología y gastronomía para tu empresa',
    description: 'Espacio exclusivo reservado para comidas de empresa, presentaciones corporativas, consejos de administración o jornadas de trabajo acompañadas de una propuesta gastronómica a medida.',
    schedule: 'Bajo reserva previa (almuerzos y jornadas de trabajo)',
    features: [
      'Proyector de alta definición y pantalla integrada',
      'Conexión Wi-Fi de alta velocidad para presentaciones',
      'Aislamiento acústico para máxima privacidad',
      'Menú degustación o servicio de café y almuerzo de trabajo'
    ],
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/01/cropped-8.jpg',
    ctaText: 'Solicitar Sala Privada',
    ctaAction: 'booking-room'
  },
  {
    id: 'cafeteria',
    name: 'Nueva Cafetería de Especialidad',
    subtitle: 'El punto de encuentro diario con desayunos y cafés cuidados',
    description: 'Nuestra moderna cafetería abre sus puertas desde primera hora de la mañana para ofrecerte desayunos completos, tostadas con pan artesanal, zumos naturales y café de tueste selecto.',
    schedule: 'Lunes a sábado de 08:00h a 14:00h',
    features: [
      'Café de tueste natural y comercio justo',
      'Variedad de panes artesanos y tostadas murcianas',
      'Ambiente distendido y terraza acogedora',
      'Servicio rápido y precios justos y solidarios'
    ],
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/cropped-WhatsApp-Image-2023-10-04-at-14.16.34.jpeg',
    ctaText: 'Descubrir Cafetería',
    ctaAction: 'contact'
  }
];

export const CATERING_EVENTS: CateringEvent[] = [
  {
    id: 'emuasa',
    title: 'Evento Corporativo EMUASA',
    client: 'EMUASA - Aguas de Murcia',
    category: 'Institucional / Corporativo',
    description: 'Servicio de cóctel de bienvenida y estaciones temáticas para directivos y empleados con productos de temporada.',
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/cropped-photo_2023-10-04-11.26.37.jpeg'
  },
  {
    id: 'hidrogea',
    title: 'Jornada Sostenibilidad Hidrogea',
    client: 'Hidrogea',
    category: 'Empresa / Sostenibilidad',
    description: 'Coffee break saludable y almuerzo tipo finger-food con vajilla ecológica y residuo cero.',
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/02/cropped-IMG_20211028_122746-1-scaled-1.jpg'
  },
  {
    id: 'bni',
    title: 'Encuentros de Negocio BNI',
    client: 'BNI Murcia',
    category: 'Networking Empresarial',
    description: 'Desayunos de trabajo ejecutivos dinámicos de alta calidad para más de 70 empresarios.',
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/02/cropped-cropped-IMG_20211028_131733-scaled-1.jpg'
  },
  {
    id: 'umu',
    title: 'Facultad de Economía y Empresa UMU',
    client: 'Universidad de Murcia',
    category: 'Académico / Universitario',
    description: 'Atención de congresos internacionales, pausas de café y vino de honor en campus universitario.',
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/02/cropped-IMG-20210630-WA0003-1.jpg'
  },
  {
    id: 'palacio-episcopal',
    title: 'Recepción Oficial Palacio Episcopal',
    client: 'Diócesis de Cartagena',
    category: 'Protocolario / Institucional',
    description: 'Catering de gala de etiqueta en entornos patrimoniales e históricos con montaje integral.',
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/02/cropped-IMG-20210630-WA0009-1.jpg'
  },
  {
    id: 'colegio-jesus-maria',
    title: 'Celebración Anual Colegio Jesús y María',
    client: 'Colegio Jesús y María',
    category: 'Educativo / Social',
    description: 'Servicio para claustro docente y familias con menús adaptados y alternativas para alérgenos.',
    image: 'https://ehescueladehosteleria.com/wp-content/uploads/2022/02/cropped-IMG-20210630-WA0012-1-300x300.jpg'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2024/09/cropped-DSC07148-scaled-1.jpg',
    alt: 'Plato gastronómico de alta cocina elaborado en la escuela',
    title: 'Degustación de Temporada',
    category: 'gastronomia',
    tag: 'Menú Gastronómico'
  },
  {
    id: 'g2',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2024/09/cropped-DSC07155-scaled-1.jpg',
    alt: 'Emplatado de precisión culinaria',
    title: 'Emplatado de Precisión',
    category: 'gastronomia',
    tag: 'Técnica Culinaria'
  },
  {
    id: 'g3',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2024/09/cropped-DSC07160-scaled-1.jpg',
    alt: 'Texturas de autor con producto de la huerta',
    title: 'Texturas de la Huerta',
    category: 'gastronomia',
    tag: 'Producto Local'
  },
  {
    id: 'g4',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2024/09/cropped-DSC07299-scaled-1.jpg',
    alt: 'Pase dulce y repostería de vanguardia',
    title: 'Obrador y Repostería',
    category: 'gastronomia',
    tag: 'Postres de Autor'
  },
  {
    id: 'g5',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2024/09/cropped-cropped-DSC07195-scaled-1.jpg',
    alt: 'Presentación gastronómica para comensales',
    title: 'Maridaje y Equilibrio',
    category: 'gastronomia',
    tag: 'Servicio en Sala'
  },
  {
    id: 'g6',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2024/09/cropped-DSC07248-scaled-1.jpg',
    alt: 'Detalle de cocina de vanguardia',
    title: 'Creatividad en el Plato',
    category: 'gastronomia',
    tag: 'Vanguardia'
  },
  {
    id: 'g7',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/cropped-WhatsApp-Image-2023-10-04-at-14.16.34.jpeg',
    alt: 'Nueva Cafetería de la escuela de hostelería',
    title: 'Desayunos en Cafetería',
    category: 'cafeteria',
    tag: 'Cafetería Diaria'
  },
  {
    id: 'g8',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/cropped-photo_2023-10-04-09.15.16-e1696403749844-1.jpeg',
    alt: 'Buffet y mesa de catering para empresas',
    title: 'Mesa de Catering Corporativo',
    category: 'catering',
    tag: 'Eventos'
  },
  {
    id: 'g9',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/Diseno-sin-titulo-25.jpg',
    alt: 'Equipo docente y formadores de la Escuela de Hostelería',
    title: 'Equipo Docente y Formadores',
    category: 'escuela',
    tag: 'Profesorado'
  },
  {
    id: 'g10',
    src: 'https://ehescueladehosteleria.com/wp-content/uploads/2023/10/photo_2023-10-04-11.57.18-1.jpeg',
    alt: 'Alumnos en cocina profesional aprendiendo técnicas culinarias',
    title: 'Futuros Profesionales en Cocina',
    category: 'escuela',
    tag: 'Formación para el Empleo'
  }
];

export const CLIENT_LOGOS = [
  { name: 'EMUASA', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-1.jpg' },
  { name: 'Hidrogea', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-2.jpg' },
  { name: 'BNI', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-3.jpg' },
  { name: 'Universidad de Murcia', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-4.jpg' },
  { name: 'Fondo Social Europeo', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-5.jpg' },
  { name: 'Región de Murcia', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-6.jpg' },
  { name: 'Cáritas', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-7.jpg' },
  { name: 'eh! laboras', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-8.jpg' },
  { name: 'SEF', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-9.jpg' },
  { name: 'Ayuntamiento de Murcia', logo: 'https://ehescueladehosteleria.com/wp-content/uploads/2026/09/cropped-10.jpg' },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Antonio Morales G.',
    role: 'Comensal Restaurante Gastronómico',
    content: 'Una experiencia que supera a la mayoría de restaurantes de autor de Murcia. El menú de 7 tiempos es una maravilla de técnica y sabor, y la pasión con la que los chicos explican cada plato emociona.',
    rating: 5,
    date: 'Hace 2 semanas'
  },
  {
    id: 'r2',
    author: 'Elena Campoy',
    role: 'Responsable de Eventos de Empresa',
    content: 'Contratamos el catering de eh! para una convención de 150 asistentes y el resultado fue sobresaliente: puntualidad milimétrica, presentación impecable y un impacto social que todos nuestros clientes aplaudieron.',
    rating: 5,
    date: 'Hace 1 mes'
  },
  {
    id: 'r3',
    author: 'D. José Manuel Lorca Planes',
    role: 'Obispo Diócesis de Cartagena',
    content: '«Este proyecto va en beneficio de aquellos que están viviendo una experiencia dramática. Ayudemos para que abran los ojos y vean que delante de ellos hay futuro y esperanza. Con esto, a mí me bastaría.»',
    rating: 5,
    date: 'Impulsor Institucional'
  }
];
