# ConnectMA · web del equipo (TecnoChallenge 2026)

Web estática con Astro. Sin backend ni datos personales.

## Arrancar
    npm install
    npm run dev        # http://localhost:4321

## Actualizar el mapa con los datos reales
Copia `radar_v3.geojson` (lo genera radar_v3.py) en `data/` y ejecuta `npm run mapa`.
Sin ese fichero, el mapa usa los estados provisionales del 21/10.

## Dónde se edita cada cosa
- Textos de cada resultado: `src/pages/reto.md`, `publico.md`, `ideas.md`, `ia.md` (Markdown).
- Portada: `src/pages/index.astro` · Solución: `src/pages/solucion.astro`.
- Equipo (nombres, roles, fotos, LinkedIn): `src/data/equipo.js`; fotos en `public/equipo/`.
- Enlace al prototipo, estado de los 10 resultados: `src/data/sitio.js`.

## Publicar en Vercel
Sube el repo a GitHub e impórtalo en Vercel: detecta Astro solo (build `npm run build`, salida `dist`).
