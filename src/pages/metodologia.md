---
layout: ../layouts/Resultado.astro
etiqueta: Metodología
titulo: Cómo calculamos el radar
entradilla: Todo sale de datos públicos, agregados por sección censal, y se puede recalcular en menos de un minuto. Aquí está cada paso, cada umbral y lo que los datos todavía no permiten saber.
---

## Qué responde

El radar da al Ajuntament datos consistentes para decidir su política sobre la actividad en planta baja: dónde actuar, con qué tipo de actividad y con qué herramienta (ayudas, comunicación, promoción). Responde a lo que pidió el Servei de Promoció de Ciutat i Comerç en la llamada del 20 de octubre:

- **Zonas con potencial:** dónde falta un tipo de actividad para la gente que vive allí.
- **Zonas en declive:** barrios donde la demanda se debilita, para intervenir a tiempo.
- **Alcance:** toda la actividad en planta baja (comercio, restauración y servicios).
- **Usuario principal:** el personal técnico municipal. Quien emprende lo usa acompañado por el técnico.

## Fuentes

<div class="table-scroll">

| Fuente | Qué aporta | Nivel | Periodo |
| --- | --- | --- | --- |
| GeoVisor de Activitat Comercial del Ajuntament (servicio público ORDS) | 5.052 actividades en planta baja con coordenadas y epígrafe IAE, en 58 capas | Punto | Foto actual (prospección anual a pie de calle) |
| INE, cartografía de secciones censales | 75 secciones de Mataró | Polígono | 2026 |
| INE, Atlas de Distribución de Renta de los Hogares (tablas 30896 y 30904) | Renta por persona y hogar, población, edad media, % de mayores de 65 | Sección censal | 2015–2024 |
| Ajuntament, capa de evolución de población | Población 2008, 2014 y 2020 con límites municipales estables | Sección (agregada) | 2008–2020 |
| Ajuntament, arbolado municipal | Campo de barrio de 25.062 árboles: da nombre de barrio a cada sección | Punto | Actual |
| OpenStreetMap (solo control de calidad) | 419 negocios para medir cuánto recoge el GeoVisor | Punto | Actual |

</div>

## Limpieza y comprobaciones

- Se descartan los 6 polígonos de distrito que el INE mezcla con las secciones.
- Se elimina una capa del GeoVisor que es copia exacta de otra (232 registros) y un registro duplicado entre capas. Quedan **4.819 actividades**.
- No se eliminan duplicados dentro de una misma capa: pueden ser dos locales en el mismo edificio.
- Las 4.819 actividades caen en alguna sección, y la suma de población de las 75 secciones coincide con el total oficial de Mataró en los 10 años (129.262 habitantes en 2024).
- Cada sección recibe el barrio más frecuente entre sus árboles; solo 1 de 75 queda a caballo entre dos barrios.

## Paso 1 · ¿Llega el comercio cotidiano a todo el mundo?

Para panadería, carnicería y supermercado se coloca una rejilla de puntos cada 50 m dentro de cada sección y se mide la distancia en línea recta al negocio más cercano. El umbral es de 400 m, unos 500 m andando o 6–7 minutos.

**Resultado:** 71 de las 72 secciones urbanas tienen los tres a menos de 400 m. El comercio básico está bien repartido. Las 3 secciones rurales (más de 0,6 km²) quedan fuera del análisis.

## Paso 2 · ¿Qué tipo de negocio está muy por debajo de lo normal?

Para 12 tipos de proximidad (panadería, carnicería, supermercado, peluquería y estética, salud, hostelería, ferretería, floristería, librería, bazar, electrónica y reparación, óptica) se compara cada zona con lo normal en un barrio de Mataró. Quedan fuera los tipos de destino, como la ropa o la joyería, que se concentran en el centro a propósito, y las farmacias, que están reguladas.

1. **Entorno a pie, con tres radios:** círculos de 300, 450 y 600 m alrededor del centro de la sección, unos 4, 6 y 8 minutos andando.
2. **Vecinos:** la población de cada sección (INE 2024) se reparte en una rejilla de 50 m y se suman los puntos dentro de cada círculo.
3. **Oferta:** negocios de ese tipo dentro del círculo.
4. **Lo normal:** la mediana, entre todas las secciones, de negocios por vecino. Se usa la mediana y no la media de la ciudad porque el centro concentra negocios y haría parecer deficitario a cualquier barrio. Apenas cambia entre radios (panadería: 11,6, 12,0 y 11,6 por cada 10.000 vecinos).

<div class="formula">
<p><span>esperado</span> = vecinos del entorno × mediana de barrios (negocios ÷ vecinos)</p>
<p><span>% de lo normal</span> = oferta ÷ esperado</p>
</div>

5. **Filtro contra el azar:** en cada radio, el tipo cuenta si hay menos de la mitad de lo esperado, la diferencia es de al menos 2 negocios y la probabilidad de que sea casualidad (distribución de Poisson) es menor del 5 %.
6. **Robusto:** se cumple con el radio de 450 m y con al menos uno de los otros dos. Solo los robustos son oportunidad; así no dependen de dónde cae una tienda concreta. Los que salen con menos radios se enseñan como "a confirmar".
7. **Polos de atracción:** si hay un mercado municipal (Plaça de Cuba, Plaça Gran, Palau) a menos de 450 m, no cuentan panadería ni carnicería; si hay una gran superficie (Alcampo, Mataró Parc), no cuenta supermercado.

**Resultado:** 38 oportunidades robustas en 25 secciones, 33 con dato fiable, y 70 más a confirmar. La hostelería se marca con confianza baja porque el GeoVisor no la recoge bien.

> "A 450 m a la redonda viven ~12.933 personas y hay 2 bazares, donde un barrio típico de Mataró tendría ~8: el 26 % de lo normal. Se mantiene con radios de 300, 450 y 600 m."

> "En 400 m a la redonda viven ~13.275 personas y hay 0 ferreterías. En un barrio típico de Mataró habría ~6: faltan ~6."

## Paso 3 · ¿Potencial o declive?

Cada sección se clasifica cruzando dos ejes, siempre comparados con el **barrio típico de Mataró** (la mediana de las secciones), no con el total de la ciudad. El total lo inflan unas pocas promociones nuevas.

**Demanda.** Manda la población, porque los vecinos son los clientes:

- **Crece** si la población sube más de 3 puntos por encima del barrio típico (INE 2015–2024).
- **Cae** si pierde al menos un 3 % de vecinos y queda más de 3 puntos por debajo del barrio típico.
- Si la población está estable, decide la renta por persona, pero solo si se aparta más de 10 puntos del barrio típico. La renta es nominal y más ruidosa.
- En las 14 secciones cuyos límites cambió el INE se usa la serie municipal 2008–2020, que no tiene ese problema.

**Actividad.** Suma de negocios de proximidad del entorno frente a lo esperado (paso 2, sin hostelería). Por debajo del 80 % se considera **poco comercio**.

<div class="table-scroll">

| | Poco comercio | Comercio suficiente |
| --- | --- | --- |
| **Demanda que crece, o huecos claros sin caída** | Potencial | Consolidada |
| **Demanda que cae** | Declive | En riesgo |

</div>

**Resultado actual:** 8 secciones con potencial, 1 en declive, 6 en riesgo, 54 consolidadas y 3 estables, sin señal clara.

## Lo que los datos aún no permiten saber

Cada limitación tiene salida si el Ajuntament conecta datos que ya tiene.

<div class="table-scroll">

| Limitación | Efecto | Cómo se resuelve |
| --- | --- | --- |
| El censo se actualiza a pie de calle, una vez al año | Las aperturas y los cierres recientes no aparecen | Conectar las comunicaciones de apertura que ya recibe el Ajuntament |
| Sin histórico de altas y bajas ni listado de locales vacíos | El declive se estima desde la demanda, no se mide con cierres | Solicitados al Ajuntament; la acción "Marcar local vacío" los genera desde la prospección |
| Hostelería mal cubierta (~37 % de restaurantes de OpenStreetMap sin pareja) | Oportunidades de hostelería poco fiables | Marcadas con confianza baja |
| Distancia en línea recta y población repartida por superficie | Aproximación a la distancia real andando | Suficiente a escala de barrio; mejorable con la red de calles |
| Una oportunidad es una hipótesis | Puede explicarla un súper grande, un mercado o calles sin locales | La valida el técnico; las entrevistas a comercios sirven para contrastarla |

</div>

## Privacidad

Solo se usan datos abiertos y agregados por sección censal. El radar no trabaja con nombres, NIF ni ningún dato que identifique a una persona.

## Reproducibilidad

Seis scripts en Python, sin dependencias externas: `mataro_descarga.py` (GeoVisor), `secciones_mataro.py` (secciones del INE), `ine_mataro.py` (renta y población), `barrios_mataro.py` (barrios y población municipal), `radar_v2.py` (oportunidades) y `radar_v3.py` (potencial y declive). El control de cobertura con OpenStreetMap está en `cobertura_osm.py`.
