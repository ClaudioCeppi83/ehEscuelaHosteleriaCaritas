import {
  MenuItem,
  SpaceItem,
  CateringEvent,
  GalleryImage,
  ReviewItem,
  ImpactStat,
  SiteConfig,
  ClientLogo,
  GastronomicCourse,
  DiningRoomProtocolPillar,
  HouseCredential,
  GoogleReview,
  GooglePlaceSummary,
} from '../types';

export const SITE_CONFIG: SiteConfig = {
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
    logoOriginal: '/assets/photos/cropped-cropped-cropped-cropped-2021-LOGO-eh-escuela-completo-original-1-scaled-1-3-1.webp',
    logoWhite: '/assets/photos/cropped-cropped-logo_blanco_h.webp',
    heroInterior: '/assets/photos/34.webp',
    heroDish: '/assets/photos/cropped-DSC07289-scaled-1.webp',
    experienceGift: '/assets/photos/cropped-regala_experiencias_pagina_1.webp',
    cafeteria: '/assets/photos/cropped-WhatsApp-Image-2023-10-04-at-14.16.34.webp',
    gastronomicService: '/assets/photos/cropped-WhatsApp-Image-2023-10-03-at-19.18.04-1-1.webp',
    cateringBuffet: '/assets/photos/cropped-photo_2023-10-04-09.15.16-e1696403749844-1.webp',
    teachers: '/assets/photos/Diseno-sin-titulo-25.webp',
    studentsCooking: '/assets/photos/photo_2023-10-04-11.57.18-1.webp',
    menuCard1: '/assets/photos/cropped-menu_julio_pagina_1-1.webp',
    menuCard2: '/assets/photos/cropped-menu_julio_pagina_2.webp',
  }
};

// ============================================================================
// CREDENCIALES DE LA CASA & OFICIO (EVOLUCIÓN EDITORIAL DE ESTADÍSTICAS)
// ============================================================================

export const HOUSE_CREDENTIALS: HouseCredential[] = [
  {
    id: 'cred-years',
    order: '01',
    value: '12',
    suffix: '+ Años',
    title: 'Oficio y Pedagogía Hostelera',
    subtitle: 'Trayectoria ininterrumpida desde 2012',
    narrative: 'Más de una década formando a jóvenes y personas en situación de vulnerabilidad en las disciplinas más rigurosas de la alta cocina y el protocolo de sala.',
    badge: 'Cáritas Diócesis de Cartagena',
  },
  {
    id: 'cred-insertion',
    order: '02',
    value: '85',
    suffix: '%',
    title: 'Inserción Laboral Efectiva',
    subtitle: 'En restaurantes gastronómicos y hoteles de primer nivel',
    narrative: 'Ocho de cada diez alumnos acceden a contratos laborales estables en el mercado ordinario tras completar su itinerario técnico de cualificación y prácticas en sala viva.',
    badge: 'Impacto Social Acreditado',
  },
  {
    id: 'cred-courses',
    order: '03',
    value: '7',
    suffix: ' Tiempos',
    title: 'Minuta Degustación Estacional',
    subtitle: 'Vanguardia culinaria con alma tradicional de la huerta',
    narrative: 'Un menú degustación completo donde cada pase fusiona técnicas de vanguardia culinaria con la pureza organoléptica de los productos de cercanía del sureste ibérico.',
    badge: 'Restaurante Escuela Vivo',
  },
  {
    id: 'cred-ethics',
    order: '04',
    value: '100',
    suffix: '%',
    title: 'Compromiso Ético y de Proximidad',
    subtitle: 'Kilómetro cero, comercio justo y economía circular',
    narrative: 'Alimentos procedentes de huertos ecológicos de la Vega Media, pesca sostenible de lonja y una gestión de residuo cero con respeto integral por la dignidad de las personas.',
    badge: 'Economía Solidaria',
  },
];

// Compatibilidad retroactiva con componentes que consuman IMPACT_STATS
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

// ============================================================================
// MINUTA GASTRONÓMICA DE 7 TIEMPOS (ALTA GASTRONOMÍA & MARIDAJE SELECTO D.O.P.)
// ============================================================================

export const GASTRONOMIC_COURSES: GastronomicCourse[] = [
  {
    id: 'course-1',
    courseNumber: '01',
    title: 'La Bienvenida de la Vega & Tierra Salina',
    subtitle: 'Trilogía de bocados de apertura',
    description: 'Tartaleta crujiente de harina de algarroba de secano con pisto tradicional de la huerta confitado a fuego pausado, bombón templado de queso curado al vino DOP y aire de hierbas silvestres de Sierra Espuña.',
    ingredients: [
      'Harina de algarroba de secano',
      'Pisto tradicional de la Vega Media del Segura',
      'Queso de cabra murciano-granadina curado en vino tinto',
      'Aceite virgen extra de oliva Cuquillo',
      'Brotes silvestres de tomillo y romero'
    ],
    pairing: {
      wine: 'Espumoso Ancestral de Monastrell Brut Nature 2023',
      denomination: 'D.O.P. Bullas',
      notes: 'Burbuja fina de método ancestral, acidez vertical y frescura silvestre que despierta las papilas gustativas.'
    },
    dietaryNotes: ['Vegetariano adaptable', 'Sin gluten disponible bajo petición'],
    provenance: 'Huerta tradicional de Beniaján & Altiplano Murciano'
  },
  {
    id: 'course-2',
    courseNumber: '02',
    title: 'Transparencia del Litoral & Tomate de Guarda',
    subtitle: 'Entrante frío de salazón artesanal y huerta',
    description: 'Láminas translúcidas de mújol de estero curado artesanalmente en sal marina virgen de San Pedro del Pinatar, consomé clarificado de tomate negro de herencia infusionado con higuera y perlas de aceite virgen extra.',
    ingredients: [
      'Mújol de estero de pesca artesanal',
      'Sal marina virgen de Las Salinas de San Pedro',
      'Tomate negro de la huerta tradicional del Segura',
      'Infusión de hoja de higuera silvestre',
      'Flor de sal y perlas de aceite de oliva virgen extra'
    ],
    pairing: {
      wine: 'Malvasía y Moscatel de Grano Menudo Seco 2024',
      denomination: 'D.O.P. Bullas',
      notes: 'Expresión floral seca en nariz con final yodado y sápido que armoniza con la curación noble del salazón.'
    },
    dietaryNotes: ['Sin gluten', 'Rico en ácidos grasos Omega-3'],
    provenance: 'Salinas de San Pedro del Pinatar & Valle de Ricote'
  },
  {
    id: 'course-3',
    courseNumber: '03',
    title: 'La Memoria del Michirón & Papada de Chato',
    subtitle: 'Legumbre ancestral reinventada en textura contemporánea',
    description: 'Fondo concentrado de habas secas reducido durante dieciocho horas con laurel de ribera y pimentón ahumado DOP, ravioli fluido de su guiso tradicional y velo crujiente de papada confitada de cerdo Chato Murciano.',
    ingredients: [
      'Habas secas seleccionadas de la huerta',
      'Pimentón de Murcia D.O.P. con denominación de origen',
      'Papada confitada de cerdo autóctono Chato Murciano',
      'Hierbabuena fresca de ribera',
      'Laurel y reducción de fondo blanco'
    ],
    pairing: {
      wine: 'Monastrell Rosado de Sangrado Tradicional 2024',
      denomination: 'D.O.P. Jumilla',
      notes: 'Fruta roja crujiente, volumen untuoso y frescura tánica que equilibra la grasa noble del Chato Murciano.'
    },
    dietaryNotes: ['Sin gluten', 'Elaboración con cerdo de raza autóctona protegida'],
    provenance: 'Pedanías de Murcia & Campo de Cartagena'
  },
  {
    id: 'course-4',
    courseNumber: '04',
    title: 'Corvina Salvaje al Horno de Ceniza & Emulsión de Hinojo',
    subtitle: 'Pase del mar y roquedales mediterráneos',
    description: 'Lomo de corvina salvaje asado en su punto milimétrico sobre jugo tostado de sus espinas colágenas y azafrán en hebra, puré sedoso de hinojo marino silvestre y cebolletas tiernas glaseadas a la brasa.',
    ingredients: [
      'Lomo de corvina fresca salvaje',
      'Hinojo marino de los acantilados de Calblanque',
      'Azafrán en hebra de la comarca',
      'Cebolletas tiernas de la ribera del Segura',
      'Fondo reducido de espinas y vino blanco seco'
    ],
    pairing: {
      wine: 'Airén y Macabeo criado en Tinajas de Barro 2023',
      denomination: 'D.O.P. Yecla',
      notes: 'Microoxigenación mineral aportada por el barro cocido, notas terrosas elegantes y amplitud glicérica.'
    },
    dietaryNotes: ['Sin gluten', 'Pescado fresco del día capturado con artes selectivas'],
    provenance: 'Lonja de Cabo de Palos & Huerta del Segura'
  },
  {
    id: 'course-5',
    courseNumber: '05',
    title: 'Melosidad de Cordero Segureño al Glaseado de Monastrell',
    subtitle: 'Corte noble y cocción lenta de 24 horas',
    description: 'Corte tierno de cordero segureño confitado a 68°C durante 24 horas, lacado con reducción intensa de vino viejo de Jumilla y ciruela morada de secano, sobre parmentier aterciopelado de tubérculos asados.',
    ingredients: [
      'Cordero Segureño I.G.P. criado en pastos del noroeste',
      'Vino tinto Monastrell de cepas viejas de pie franco',
      'Ciruela claudia de secano murciano',
      'Chirivía y boniato de la huerta del Segura',
      'Jugo glaseado de asado aromatizado con romero'
    ],
    pairing: {
      wine: 'Monastrell Pie Franco Crianza 14 Meses en Roble Francés',
      denomination: 'D.O.P. Jumilla',
      notes: 'Estructura imponente, tanino sedoso pulido, notas de mora silvestre, cacao y monte bajo mediterráneo.'
    },
    dietaryNotes: ['Sin gluten', 'Indicación Geográfica Protegida Cordero Segureño'],
    provenance: 'Comarca del Noroeste Murciano & Altiplano de Jumilla'
  },
  {
    id: 'course-6',
    courseNumber: '06',
    title: 'El Rocío del Limonar & Azahar de Santomera',
    subtitle: 'Prepostre de limpieza cítrica y aromática',
    description: 'Nieve helada de limón fino de la Vega con destilado artesano de flor de azahar de limonero, gelée translúcida de hierbaluisa silvestre y crujiente de miel cruda de romero de montaña.',
    ingredients: [
      'Limón fino ecológico de los limoneros de Santomera',
      'Flor de azahar destilada en infusión fría',
      'Hierbaluisa silvestre fresca',
      'Miel cruda de romero de floración de primavera',
      'Perlas de lima cítrica'
    ],
    pairing: {
      wine: 'Elixir Botánico de Cítricos y Menta Limonera',
      denomination: 'Destilación Botánica Artesana de la Escuela',
      notes: 'Bebida sin alcohol elaborada artesanalmente por los alumnos para refrescar y acondicionar el paladar.'
    },
    dietaryNotes: ['Vegano', 'Sin gluten', 'Sin lactosa'],
    provenance: 'Huerta de Santomera & Parque Regional de Sierra Espuña'
  },
  {
    id: 'course-7',
    courseNumber: '07',
    title: 'Texturas de Algarroba, Higo de Pala Seco & Café de Comercio Justo',
    subtitle: 'Final de alta repostería y petit fours de sobremesa',
    description: 'Ganache fluida de algarroba noble y cacao de comercio justo, toffee salado de higos secos asados, quenelle de helado artesano de almendra marcona tostada y petit four de pimentón dulce con chocolate negro.',
    ingredients: [
      'Algarroba del campo de Murcia recolectada a mano',
      'Higos secos de pala tradicionales confitados',
      'Almendra Marcona de secano tostada en horno de leña',
      'Cacao ético al 70% de cultivo cooperativo',
      'Café arábica de especialidad de comercio justo'
    ],
    pairing: {
      wine: 'Dulce Tinto de Monastrell de Cosecha Tardía',
      denomination: 'D.O.P. Jumilla',
      notes: 'Pasificación natural al sol, notas cálidas de dátil, algarroba y café tostado que funden con el postre.'
    },
    dietaryNotes: ['Vegetariano', 'Ingredientes de comercio justo y cooperativas sociales'],
    provenance: 'Secanos del Altiplano & Obrador Central de la Escuela'
  }
];

export const GASTRONOMIC_MENU_V2: GastronomicCourse[] = GASTRONOMIC_COURSES;

// Menú gastronómico con tipado MenuItem para retrocompatibilidad total con la UI existente
export const GASTRONOMIC_MENU: MenuItem[] = GASTRONOMIC_COURSES.map((course, index) => ({
  id: index + 1,
  course: `Pase 0${index + 1} · ${course.courseNumber}`,
  name: course.title,
  description: course.description,
  highlights: [
    course.pairing.denomination,
    course.provenance || 'Producto Regional',
    course.pairing.wine.split(' ')[0] + ' ' + (course.pairing.wine.split(' ')[1] || ''),
  ],
  dietary: course.dietaryNotes,
}));

// ============================================================================
// PILARES DE LITURGIA DE SALA & PROTOCOLO GASTRONÓMICO
// ============================================================================

export const ROOM_PROTOCOL_PILLARS: DiningRoomProtocolPillar[] = [
  {
    id: 'pillar-ceremonial',
    pillarNumber: '01',
    title: 'El Ceremonial de la Mesa',
    subtitle: 'Lino puro, sincronía en el servicio y vajilla artesanal de la Región',
    description: 'La coreografía de la sala comienza con la pureza del mantel de hilo y el montaje milimétrico. Cada servicio es realizado en sincronía por parejas de sala, respetando los tiempos de descanso entre pases y cuidando la acústica serena del espacio.',
    details: [
      'Mantelería de lino natural planchada a mano en obrador propio con caída perfecta.',
      'Cristalería Riedel específica seleccionada para cada perfil organoléptico de caldo.',
      'Vajilla esmaltada artesanal creada por maestros ceramistas tradicionales de Totana.',
      'Servicio a la inglesa y francesa ejecutado en cadencia acompasada y silenciosa.'
    ],
    quote: 'En sala, el silencio y el tempo son tan determinantes como el punto de sal en cocina.',
    author: 'Maitre Instructor de Sala',
    iconName: 'Sparkles',
    image: '/assets/photos/cropped-WhatsApp-Image-2023-10-03-at-19.18.04-1-1.webp'
  },
  {
    id: 'pillar-sumilleria',
    pillarNumber: '02',
    title: 'Sumillería y Maridaje de la Tierra',
    subtitle: 'Servicio de las 3 D.O. murcianas (Jumilla, Bullas, Yecla), atemperado y decantación en sala',
    description: 'Un tributo líquido al terruño del sureste ibérico. Los alumnos de sala aprenden la liturgia de la cata organoléptica, el control térmico de añadas viejas de Monastrell y la decantación pausada con vela frente a la mirada del comensal.',
    details: [
      'Selección monovarietal de Monastrell en pie franco y variedades autóctonas recuperadas.',
      'Control estricto de temperatura de servicio (14-16°C tintos de guarda, 8-10°C blancos y espumosos).',
      'Protocolo de decantación y oxigenación para reservas históricas de Jumilla y Yecla.',
      'Explicación etnográfica y enológica de cada bodega familiar y cooperativa colaboradora.'
    ],
    quote: 'Nuestros vinos encierran el sol, la piedra caliza y el alma del agricultor del Altiplano.',
    author: 'Sumiller Formador de eh!',
    iconName: 'Wine',
    image: '/assets/photos/cropped-cropped-DSC07195-scaled-1.webp'
  },
  {
    id: 'pillar-trinchado',
    pillarNumber: '03',
    title: 'El Arte del Trinchado y Servicio a la Vista',
    subtitle: 'Corte de jamón ibérico al momento, gueridón y desespinado artesanal frente al comensal',
    description: 'La nobleza de la hostelería clásica revive en el restaurante gastronómico. El carro de gueridón se acerca a la mesa para ejecutar técnicas de acabado, desespinado de pescados de roca y emplatado con campana de plata.',
    details: [
      'Corte a cuchillo de jamón ibérico con inclinación milimétrica y grosor casi translúcido.',
      'Desespinado en gueridón de corvina y pescados nobles a la sal ante los ojos del comensal.',
      'Flameado y acabado aromático con hierbas silvestres recolectadas en Sierra Espuña.',
      'Presentación sincronizada con campana para preservar los aromas y la temperatura perfecta.'
    ],
    quote: 'El servicio a la vista dignifica el oficio de camarero y conecta emocionalmente al comensal con la técnica.',
    author: 'Jefe de Rango & Alumnos en Prácticas',
    iconName: 'Utensils',
    image: '/assets/photos/cropped-photo_2023-10-04-11.57.18-1.webp'
  },
  {
    id: 'pillar-hospitalidad',
    pillarNumber: '04',
    title: 'Hospitalidad Serena y Acogida Cáritas',
    subtitle: 'La liturgia del respeto mutuo, dignidad humana y sonrisa auténtica del alumno anfitrión',
    description: 'La verdadera alta gastronomía no es distante ni arrogante. En eh! la acogida es un acto de generosidad y reconstrucción personal. Los comensales no solo disfrutan de una minuta excepcional, sino que son cómplices del renacer profesional de personas admirables.',
    details: [
      'Acogida personalizada desde la puerta principal sin prisa ni formalismos impostados.',
      'Dignidad laboral: alumnos contratados con convenios y salarios homologados en formación.',
      'Atención empática a necesidades dietéticas, accesibilidad y confort emocional.',
      'El valor pedagógico del aplauso y el agradecimiento sincero al final de cada pase.'
    ],
    quote: 'No solo servimos una mesa: restauramos la esperanza y la confianza en uno mismo.',
    author: 'Equipo Cáritas Diócesis de Cartagena',
    iconName: 'HeartHandshake',
    image: '/assets/photos/Diseno-sin-titulo-25.webp'
  }
];

// ============================================================================
// DATOS REALISTAS DE GOOGLE PLACES & GOOGLE REVIEWS (4.9 / 5 ESTRELLAS)
// ============================================================================

export const MOCK_GOOGLE_PLACE_SUMMARY: GooglePlaceSummary = {
  placeId: 'ChIJh6vE0a-DYw0ROb4wL6K3t2g',
  name: 'eh! Escuela de Hostelería & Restaurante Gastronómico',
  rating: 4.9,
  totalReviews: 184,
  userRatingsTotal: 184,
  address: 'C. Sta. Cecilia, 1, 30005 Murcia, España',
  mapsUrl: 'https://maps.app.goo.gl/CVYV7YzXTNthn39F8',
  ratingDistribution: {
    5: 168,
    4: 14,
    3: 2,
    2: 0,
    1: 0,
  },
};

export const MOCK_GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-google-01',
    authorName: 'Alejandro Vidal Peña',
    authorPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    relativeTimeDescription: 'Hace 1 semana',
    text: 'He visitado restaurantes con estrella Michelin y puedo afirmar sin exagerar que la experiencia en eh! Escuela de Hostelería está a la altura de los mejores templos gastronómicos de la Región de Murcia. El pase de la corvina salvaje con emulsión de hinojo es soberbio, pero lo que realmente conmueve es la liturgia de sala: los alumnos te explican el origen del producto en la Vega Media y la historia del vino D.O. Bullas con un orgullo que te llena los ojos de lágrimas. Maravilla absoluta por 32€.',
    originalLanguage: 'es',
    profileUrl: 'https://maps.google.com/?cid=12345678901',
    isLocalGuide: true,
    reviewCount: 142,
    time: 1729100000,
    highlights: ['Menú Gastronómico 7 Tiempos', 'Servicio de sala sincronizado', 'Corvina con hinojo', 'Vinos D.O.P. Bullas'],
  },
  {
    id: 'rev-google-02',
    authorName: 'Carmen Navarro Belmonte',
    authorPhotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    relativeTimeDescription: 'Hace 2 semanas',
    text: 'Celebramos el almuerzo de aniversario de mis padres y reservamos el menú de 7 tiempos. La puesta en escena en sala con manteles de lino planchados a mano y la vajilla artesanal de Totana te transportan a otro nivel de elegancia. El ravioli de michirón con velo de papada de Chato Murciano es pura memoria gustativa. Todo el equipo de Cáritas y los formadores merecen el mayor de los reconocimientos.',
    originalLanguage: 'es',
    profileUrl: 'https://maps.google.com/?cid=12345678902',
    isLocalGuide: false,
    reviewCount: 18,
    time: 1728500000,
    highlights: ['Michirón reinventado', 'Chato Murciano', 'Vajilla artesanal de Totana', 'Atención familiar y exquisita'],
  },
  {
    id: 'rev-google-03',
    authorName: 'Francisco Soler Mula (BNI Murcia)',
    authorPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    relativeTimeDescription: 'Hace 3 semanas',
    text: 'Utilizamos la Sala Privada para una reunión de consejo empresarial y un almuerzo posterior. La acústica y el equipamiento audiovisual son óptimos, pero el servicio de los alumnos en sala superó con creces lo esperado: discreción impecable, cambio de cubiertos milimétrico y un cordero segureño que se deshacía con el tenedor. Generar impacto social apoyando la inserción de Cáritas mientras deleitas a tus clientes corporativos es la mejor decisión que una empresa puede tomar.',
    originalLanguage: 'es',
    profileUrl: 'https://maps.google.com/?cid=12345678903',
    isLocalGuide: true,
    reviewCount: 64,
    time: 1727900000,
    highlights: ['Sala Privada Exclusiva', 'Cordero Segureño I.G.P.', 'Discreción empresarial', 'Responsabilidad Social Corporativa'],
  },
  {
    id: 'rev-google-04',
    authorName: 'Marta Rocamora Iniesta',
    authorPhotoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    relativeTimeDescription: 'Hace 1 mes',
    text: 'El servicio a la vista con el carro de gueridón y el corte de jamón ibérico al instante en la mesa nos dejó boquiabiertos. Se nota la disciplina que les inculcan los profesores. La sumiller nos presentó un Monastrell de pie franco de Jumilla con una decantación impecable y una copa técnica perfecta. Y el prepostre de limón de Santomera con azahar limpió el paladar como pocas veces he probado.',
    originalLanguage: 'es',
    profileUrl: 'https://maps.google.com/?cid=12345678904',
    isLocalGuide: true,
    reviewCount: 97,
    time: 1726700000,
    highlights: ['Servicio de gueridón', 'Corte de jamón a cuchillo', 'Decantación de Monastrell', 'Limón de Santomera'],
  },
  {
    id: 'rev-google-05',
    authorName: 'Javier Guillén Soto',
    authorPhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    relativeTimeDescription: 'Hace 1 mes',
    text: 'Iba con una persona celíaca e intolerante a la lactosa y el protocolo que siguieron fue de un rigor hospitalario sin perder un ápice de la estética gastronómica. Adaptaron los 7 pases con panes caseros sin gluten elaborados esa misma mañana. Mi felicitación más sincera al equipo de cocina y a los camareros por su calidez.',
    originalLanguage: 'es',
    profileUrl: 'https://maps.google.com/?cid=12345678905',
    isLocalGuide: false,
    reviewCount: 9,
    time: 1726100000,
    highlights: ['Menú sin gluten y sin lactosa', 'Protocolo riguroso de alérgenos', 'Pan artesanal sin gluten'],
  },
  {
    id: 'rev-google-06',
    authorName: 'Santiago Bernal Campillo',
    authorPhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    relativeTimeDescription: 'Hace 2 meses',
    text: 'Como profesional del sector con más de 20 años de experiencia en sala, valoro inmensamente que se enseñe el servicio por la derecha, la inclinación de la botella con lito impoluto y el respeto al comensal. Estos chicos salen preparados para trabajar en cualquier estrella Michelin o gran hotel de España.',
    originalLanguage: 'es',
    profileUrl: 'https://maps.google.com/?cid=12345678906',
    isLocalGuide: true,
    reviewCount: 215,
    time: 1724000000,
    highlights: ['Profesionalidad en sala', 'Técnica de lito y botella', 'Inserción laboral real'],
  },
  {
    id: 'rev-google-07',
    authorName: 'Lucía Espinosa Pagan',
    authorPhotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    relativeTimeDescription: 'Hace 2 meses',
    text: 'Empecé probando los desayunos de su nueva cafetería (el café de especialidad de comercio justo y las tostadas con tomate de la huerta son imbatibles) y el viernes me animé al menú degustación del restaurante. Es el secreto mejor guardado de Murcia. Sabor, elegancia, generosidad y una causa social que te encoge el corazón.',
    originalLanguage: 'es',
    profileUrl: 'https://maps.google.com/?cid=12345678907',
    isLocalGuide: false,
    reviewCount: 31,
    time: 1723200000,
    highlights: ['Cafetería de especialidad', 'Relación calidad-precio única', 'Comercio justo'],
  },
  {
    id: 'rev-google-08',
    authorName: 'Patricia Mengual Ros',
    authorPhotoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    relativeTimeDescription: 'Hace 3 meses',
    text: 'Contratamos el catering de eh! para la gala anual de nuestra asociación médica y después reservamos dos mesas en el restaurante para los ponentes internacionales. La respuesta unánime fue de asombro absoluto. Ver cómo un proyecto de Cáritas logra semejante grado de sofisticación técnica y calidad humana devuelve la fe en el poder transformador de la formación.',
    originalLanguage: 'es',
    profileUrl: 'https://maps.google.com/?cid=12345678908',
    isLocalGuide: true,
    reviewCount: 53,
    time: 1721000000,
    highlights: ['Catering corporativo', 'Ponentes internacionales', 'Impacto humano transformador'],
  },
];

// ============================================================================
// ESPACIOS, CATERING, GALERÍA Y LOGOTIPOS
// ============================================================================

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
    image: '/assets/photos/34.webp',
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
    image: '/assets/photos/cropped-8.webp',
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
    image: '/assets/photos/cropped-WhatsApp-Image-2023-10-04-at-14.16.34.webp',
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
    image: '/assets/photos/cropped-photo_2023-10-04-11.26.37.webp'
  },
  {
    id: 'hidrogea',
    title: 'Jornada Sostenibilidad Hidrogea',
    client: 'Hidrogea',
    category: 'Empresa / Sostenibilidad',
    description: 'Coffee break saludable y almuerzo tipo finger-food con vajilla ecológica y residuo cero.',
    image: '/assets/photos/cropped-IMG_20211028_122746-1-scaled-1.webp'
  },
  {
    id: 'bni',
    title: 'Encuentros de Negocio BNI',
    client: 'BNI Murcia',
    category: 'Networking Empresarial',
    description: 'Desayunos de trabajo ejecutivos dinámicos de alta calidad para más de 70 empresarios.',
    image: '/assets/photos/cropped-cropped-IMG_20211028_131733-scaled-1.webp'
  },
  {
    id: 'umu',
    title: 'Facultad de Economía y Empresa UMU',
    client: 'Universidad de Murcia',
    category: 'Académico / Universitario',
    description: 'Atención de congresos internacionales, pausas de café y vino de honor en campus universitario.',
    image: '/assets/photos/cropped-IMG-20210630-WA0003-1.webp'
  },
  {
    id: 'palacio-episcopal',
    title: 'Recepción Oficial Palacio Episcopal',
    client: 'Diócesis de Cartagena',
    category: 'Protocolario / Institucional',
    description: 'Catering de gala de etiqueta en entornos patrimoniales e históricos con montaje integral.',
    image: '/assets/photos/cropped-IMG-20210630-WA0009-1.webp'
  },
  {
    id: 'colegio-jesus-maria',
    title: 'Celebración Anual Colegio Jesús y María',
    client: 'Colegio Jesús y María',
    category: 'Educativo / Social',
    description: 'Servicio para claustro docente y familias con menús adaptados y alternativas para alérgenos.',
    image: '/assets/photos/cropped-IMG-20210630-WA0012-1-300x300.webp'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    src: '/assets/photos/cropped-DSC07148-scaled-1.webp',
    alt: 'Plato gastronómico de alta cocina elaborado en la escuela',
    title: 'Degustación de Temporada',
    category: 'gastronomia',
    tag: 'Menú Gastronómico'
  },
  {
    id: 'g2',
    src: '/assets/photos/cropped-DSC07155-scaled-1.webp',
    alt: 'Emplatado de precisión culinaria',
    title: 'Emplatado de Precisión',
    category: 'gastronomia',
    tag: 'Técnica Culinaria'
  },
  {
    id: 'g3',
    src: '/assets/photos/cropped-DSC07160-scaled-1.webp',
    alt: 'Texturas de autor con producto de la huerta',
    title: 'Texturas de la Huerta',
    category: 'gastronomia',
    tag: 'Producto Local'
  },
  {
    id: 'g4',
    src: '/assets/photos/cropped-DSC07299-scaled-1.webp',
    alt: 'Pase dulce y repostería de vanguardia',
    title: 'Obrador y Repostería',
    category: 'gastronomia',
    tag: 'Postres de Autor'
  },
  {
    id: 'g5',
    src: '/assets/photos/cropped-cropped-DSC07195-scaled-1.webp',
    alt: 'Presentación gastronómica para comensales',
    title: 'Maridaje y Equilibrio',
    category: 'gastronomia',
    tag: 'Servicio en Sala'
  },
  {
    id: 'g6',
    src: '/assets/photos/cropped-DSC07248-scaled-1.webp',
    alt: 'Detalle de cocina de vanguardia',
    title: 'Creatividad en el Plato',
    category: 'gastronomia',
    tag: 'Vanguardia'
  },
  {
    id: 'g7',
    src: '/assets/photos/cropped-WhatsApp-Image-2023-10-04-at-14.16.34.webp',
    alt: 'Nueva Cafetería de la escuela de hostelería',
    title: 'Desayunos en Cafetería',
    category: 'cafeteria',
    tag: 'Cafetería Diaria'
  },
  {
    id: 'g8',
    src: '/assets/photos/cropped-photo_2023-10-04-09.15.16-e1696403749844-1.webp',
    alt: 'Buffet y mesa de catering para empresas',
    title: 'Mesa de Catering Corporativo',
    category: 'catering',
    tag: 'Eventos'
  },
  {
    id: 'g9',
    src: '/assets/photos/Diseno-sin-titulo-25.webp',
    alt: 'Equipo docente y formadores de la Escuela de Hostelería',
    title: 'Equipo Docente y Formadores',
    category: 'escuela',
    tag: 'Profesorado'
  },
  {
    id: 'g10',
    src: '/assets/photos/photo_2023-10-04-11.57.18-1.webp',
    alt: 'Alumnos en cocina profesional aprendiendo técnicas culinarias',
    title: 'Futuros Profesionales en Cocina',
    category: 'escuela',
    tag: 'Formación para el Empleo'
  }
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'EMUASA', logo: '/assets/photos/cropped-1.webp' },
  { name: 'Hidrogea', logo: '/assets/photos/cropped-2.webp' },
  { name: 'BNI', logo: '/assets/photos/cropped-3.webp' },
  { name: 'Universidad de Murcia', logo: '/assets/photos/cropped-4.webp' },
  { name: 'Fondo Social Europeo', logo: '/assets/photos/cropped-5.webp' },
  { name: 'Región de Murcia', logo: '/assets/photos/cropped-6.webp' },
  { name: 'Cáritas', logo: '/assets/photos/cropped-7.webp' },
  { name: 'eh! laboras', logo: '/assets/photos/cropped-8-logo-ehlaboras.webp' },
  { name: 'SEF', logo: '/assets/photos/cropped-9.webp' },
  { name: 'Ayuntamiento de Murcia', logo: '/assets/photos/cropped-10.webp' },
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
