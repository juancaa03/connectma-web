---
layout: ../layouts/Resultado.astro
resultado: 2
fase: Comprensión
titulo: Redefinimos el reto
entradilla: Después de hablar con el área de Comerç y de analizar sus datos, el problema no era la falta de datos, sino cómo se decide con ellos.
autoria: "[nombre de quien lo redacta]"
---

## El reto en una frase

> Queremos ayudar al **equipo de Comerç del Ajuntament de Mataró** a **decidir con datos en qué zonas y qué tipo de comercio impulsar** porque actualmente **dependen de un censo de locales actualizado a mano una vez al año, y al emprendedor solo pueden darle el GeoVisor para que decida solo**. Así, ayudas como Aixequem Persianes llegarán donde hay potencial o riesgo real, no solo al centro.

## Qué hicimos

- Llamada con el área de Comerç del Ajuntament (20 de octubre).
- Descarga y limpieza del censo de actividades del GeoVisor: 5.052 registros, 4.819 tras quitar duplicados.
- Prueba de cobertura contra OpenStreetMap para saber cuánto comercio falta en el censo.
- Cruce con la población y la renta del INE por sección censal (2015–2024).

## Qué aprendimos

- **El usuario principal es el Ajuntament**, para decidir su política comercial, no el emprendedor.
- **El censo se actualiza recorriendo la ciudad una vez al año.** Nuestra primera hipótesis, que el comercio quedaba fuera del censo por la exención del IAE, era falsa.
- **El comercio básico está cubierto en casi toda la ciudad.** Las oportunidades están en los servicios de proximidad: electrónica y reparación, salud, bazar…

## Qué cambió en la solución

Pasamos de "un mapa de comercios más bonito" a **un radar que marca zonas con potencial y en declive, y propone una acción para cada una**.

<div class="pendiente">Pendiente del equipo: añadir fuentes de la mini-investigación y frases literales de las entrevistas.</div>
