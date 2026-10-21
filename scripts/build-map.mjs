// Genera src/data/mapa.json (trazados SVG de las secciones + estado) a partir de:
//   data/radar_v3.geojson  (si existe: estados y fichas reales del radar)
//   data/secciones_mataro.geojson (geometría INE, siempre)
// Uso: npm run mapa
import fs from "node:fs";

const W = 1000;
const secc = JSON.parse(fs.readFileSync("data/secciones_mataro.geojson", "utf8")).features
  .filter((f) => f.properties.CSEC !== "000" && f.properties.TIPO !== "DISTRITO");

let radar = {};
if (fs.existsSync("data/radar_v3.geojson")) {
  for (const f of JSON.parse(fs.readFileSync("data/radar_v3.geojson", "utf8")).features) {
    radar[f.properties.cusec] = f.properties;
  }
  console.log(`radar_v3.geojson: ${Object.keys(radar).length} secciones con estado`);
} else {
  // Estados provisionales (salida de radar_v3.py del 21/10). Sustituir con data/radar_v3.geojson.
  const prov = {
    POTENCIAL: ["0812105003", "0812105004", "0812104004", "0812102002", "0812102007", "0812102011", "0812102003", "0812102004"],
    DECLIVE: ["0812105021"],
    "EN RIESGO": ["0812102008", "0812106001", "0812103009", "0812106007", "0812106008", "0812106013"],
  };
  for (const [estado, cs] of Object.entries(prov)) for (const c of cs) radar[c] = { estado };
  console.log("AVISO: sin data/radar_v3.geojson, se usan estados provisionales");
}

const polys = (g) => (g.type === "Polygon" ? [g.coordinates] : g.coordinates);
const lat0 = 41.54 * Math.PI / 180;
const P = ([lon, lat]) => [lon * Math.cos(lat0), -lat];
const area = (ring) => {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  return Math.abs(a / 2);
};
// km² aproximados por sección: el radar excluye las rurales (>0,6 km²)
const km2 = new Map(secc.map((s) => [s.properties.CUSEC,
  polys(s.geometry).reduce((t, p) => t + area(p[0].map(P)), 0) * (111.32 ** 2)]));
// Encuadre: solo la ciudad (secciones urbanas) con un margen; las rurales quedan recortadas
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (const s of secc) if (km2.get(s.properties.CUSEC) <= 0.6) for (const p of polys(s.geometry)) for (const [x, y] of p[0].map(P)) {
  minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
}
const m = (maxX - minX) * 0.04;
minX -= m; maxX += m; minY -= m; maxY += m;
const k = W / (maxX - minX);
const H = Math.round((maxY - minY) * k);
const out = secc.map((s) => {
  const c = s.properties.CUSEC;
  let d = "", cx = 0, cy = 0, n = 0;
  for (const p of polys(s.geometry)) {
    for (const ring of p) {
      const pts = ring.map(P).map(([x, y]) => [(x - minX) * k, (y - minY) * k]);
      d += "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L") + "Z";
      if (ring === p[0]) for (const [x, y] of pts) { cx += x; cy += y; n++; }
    }
  }
  const r = radar[c] || {};
  const estado = r.estado || (km2.get(c) > 0.6 ? "FUERA" : "CONSOLIDADA");
  return { c, d, cx: +(cx / n).toFixed(1), estado, barrio: r.barrio || "", ficha: r.ficha || "", huecos: r.huecos_v2 || "" };
});

fs.writeFileSync("src/data/mapa.json", JSON.stringify({ w: W, h: H, secciones: out }));
const cuenta = out.reduce((m, s) => ((m[s.estado] = (m[s.estado] || 0) + 1), m), {});
console.log("mapa.json:", out.length, "secciones", cuenta, `${W}x${H}`);
