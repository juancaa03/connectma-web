// Datos globales del sitio. Edita aquí enlaces y textos cortos.
export const sitio = {
  nombre: "ConnectMA",
  equipo: "Equipo 2",
  reto: "¿Cómo podemos utilizar datos urbanos abiertos para que el Ayuntamiento y el comercio de proximidad identifiquen oportunidades para promover la actividad comercial en Mataró?",
  retador: "Ajuntament de Mataró · EDINT",
  appUrl: "https://connectma-app.vercel.app/",
  metodologiaUrl: "/metodologia",
};

// Páginas de la web, en el orden de la hoja de ruta del TecnoChallenge
export const paginas = [
  { href: "/equipo", titulo: "Equipo", resultado: 1 },
  { href: "/reto", titulo: "Reto", resultado: 2 },
  { href: "/publico", titulo: "Público", resultado: 3 },
  { href: "/ideas", titulo: "Ideas", resultado: 4 },
  { href: "/solucion", titulo: "Solución", resultado: "5–7" },
  { href: "/diseño", titulo: "Diseño", resultado: 6 },
  { href: "/futuro", titulo: "Futuro", resultado: 7 },
  { href: "/video", titulo: "Vídeo", resultado: 8 },
  { href: "/ia", titulo: "IA", resultado: 10 },
  
];

// Los 10 resultados (PDF del día 1). estado: "hecho" | "en curso" | "pendiente"
export const resultados = [
  { n: 1, titulo: "Web del equipo", href: "/equipo", estado: "en curso" },
  { n: 2, titulo: "Redefinición del reto", href: "/reto", estado: "en curso" },
  { n: 3, titulo: "Mapa de empatía", href: "/publico", estado: "en curso" },
  { n: 4, titulo: "Diez soluciones", href: "/ideas", estado: "pendiente" },
  { n: 5, titulo: "Solución elegida", href: "/solucion", estado: "en curso" },
  { n: 6, titulo: "EcoCanvas", href: "/solucion#ecocanvas", estado: "pendiente" },
  { n: 7, titulo: "Prototipo", href: "/solucion#prototipo", estado: "en curso" },
  { n: 8, titulo: "Vídeo de 2 minutos", href: "/#video", estado: "pendiente" },
  { n: 9, titulo: "Co-pitch", href: "/solucion#pitch", estado: "pendiente" },
  { n: 10, titulo: "Uso de la IA", href: "/ia", estado: "en curso" },
];
