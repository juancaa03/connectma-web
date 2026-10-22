---
layout: ../layouts/Resultado.astro
etiqueta: Metodología
titulo: Cómo calculamos el radar
entradilla: Todo sale de datos públicos, agregados por sección censal, y se puede recalcular en minutos. Aquí está cada paso, cada umbral y lo que los datos todavía no permiten saber.
---

## Qué responde

El radar da al Ajuntament datos consistentes para decidir su política sobre la actividad en planta baja: dónde actuar, con qué tipo de actividad y con qué herramienta (ayudas, comunicación, promoción). Responde a lo que pidió el Servei de Promoció de Ciutat i Comerç en la llamada del 20 de octubre:

- **Zonas con potencial:** dónde falta un tipo de actividad para la gente que vive allí, y dónde se puede extender lo que ya funciona al lado.
- **Zonas en declive:** barrios donde la demanda se debilita, para intervenir a tiempo.
- **Afluencia y tipología:** qué atrae gente a cada zona y qué tipo de actividad falta.
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
| Catastro, edificios INSPIRE (abierto) | Año de construcción y viviendas de 11.902 edificios: aviso de obra nueva | Edificio | Actual (hasta 2025) |
| OpenStreetMap | Mercados, grandes superficies, estación, paradas de bus, centros educativos y de salud, equipamientos; 419 negocios para medir cuánto recoge el GeoVisor | Punto | Actual |

</div>

## Limpieza y comprobaciones

- Se descartan los 6 polígonos de distrito que el INE mezcla con las secciones.
- Se elimina una capa del GeoVisor que es copia exacta de otra (232 registros) y un registro duplicado entre capas. Quedan **4.819 actividades**.
- No se eliminan duplicados dentro de una misma capa: pueden ser dos locales en el mismo edificio.
- Las 4.819 actividades caen en alguna sección, y la suma de población de las 75 secciones coincide con el total oficial de Mataró en los 10 años (129.262 habitantes en 2024).
- Cada sección recibe el barrio más frecuente entre sus árboles; solo 1 de 75 queda a caballo entre dos barrios.

## Paso 1 · ¿Llega el comercio cotidiano a todo el mundo?

Para panadería, carnicería y supermercado se coloca una rejilla de puntos cada 50 m dentro de cada sección y se mide la distancia en línea recta al negocio más cercano. El umbral es de 400 m, unos 500 m andando o 6–7 minutos.

**Resultado:** 71 de las 72 secciones urbanas tienen los tres a menos de 400 m. El comercio básico está bien repartido.

Las 3 secciones de la periferia (urbanizaciones del norte, Veïnat de Mata y Can Quirze al este, y polígonos industriales; más de 0,6 km² cada una) quedan fuera de todo el análisis: suman 6.295 habitantes, el 4,9 % de la población, y allí la compra es en coche, no a pie. **El radar cubre al 95,1 % de los vecinos.**

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
7. **Polos de atracción:** si hay un mercado municipal (Plaça de Cuba, Plaça Gran, Palau) a menos de 450 m, no cuentan panadería ni carnicería; si hay una gran superficie (Alcampo, Mataró Parc), no cuenta supermercado. El polo anula el hueco de ese tipo, no el interés de la zona: un local vacío cerca de un mercado sigue siendo una oportunidad de ubicación.
8. **Comparar con barrios de renta parecida:** salud, óptica, floristería y librería dependen sobre todo del poder adquisitivo. Para estos cuatro tipos, lo normal es la mediana de los barrios del mismo tercio de renta, no la de toda la ciudad. En salud la diferencia es enorme: 1,3 negocios por cada 10.000 vecinos en los barrios de renta baja, 4,3 en los de renta media y 11,8 en los de renta alta.

**Resultado:** 32 oportunidades robustas en 18 secciones, 27 con dato fiable, y 67 más a confirmar. La hostelería se marca con confianza baja porque el GeoVisor no la recoge bien.

> "A 450 m a la redonda viven ~12.933 personas y hay 2 bazares, donde un barrio típico de Mataró tendría ~8: el 26 % de lo normal. Se mantiene con radios de 300, 450 y 600 m."

## Paso 3 · ¿Potencial o declive?

Cada sección se clasifica cruzando dos ejes, siempre comparados con el **barrio típico de Mataró** (la mediana de las secciones), no con el total de la ciudad. El total lo inflan unas pocas promociones nuevas.

**Demanda.** Manda la población, porque los vecinos son los clientes:

- **Crece** si la población sube más de 3 puntos por encima del barrio típico (INE 2015–2024).
- **Cae** si pierde al menos un 3 % de vecinos y queda más de 3 puntos por debajo del barrio típico.
- Si la población está estable, decide la renta por persona, pero solo si se aparta más de 10 puntos del barrio típico. La renta es nominal y más ruidosa.
- En las 14 secciones cuyos límites cambió el INE se usa la serie municipal 2008–2020, que no tiene ese problema.

**Actividad.** Suma de negocios de proximidad a 450 m frente a lo esperado (paso 2, sin hostelería). Por debajo del 80 % se considera **poco comercio**.

<div class="table-scroll">

| | Poco comercio | Comercio suficiente |
| --- | --- | --- |
| **Demanda que crece, o huecos claros sin caída** | Potencial | Consolidada |
| **Demanda que cae** | Declive | En riesgo |

</div>

**Resultado actual:** 8 secciones con potencial, 1 en declive, 6 en riesgo, 54 consolidadas y 3 estables, sin señal clara.

**Locales vacíos.** Cuando la técnica marca un local vacío en el prototipo, se lee según el contexto: en una zona que funciona (comercio igual o superior al típico, o un polo cerca) es una **oportunidad de ubicación a revisar**; en una zona en declive o en riesgo, o con 3 o más vacíos, es un **posible síntoma de declive**.

## Paso 4 · Contexto de cada zona

Tres señales más para el criterio de la técnica. **No cambian el estado de ninguna zona**: se enseñan en la ficha para revisarla mejor.

- **Qué atrae gente (afluencia).** Estación de tren más cercana y, a menos de 450 m, paradas de bus, centros educativos, centros de salud, mercados y equipamientos (OpenStreetMap). Es la afluencia que se puede medir con datos abiertos: dónde hay motivos para pasar, no cuánta gente pasa.
- **Obra nueva.** Viviendas en edificios terminados desde 2023 (Catastro): 851 en toda la ciudad. Si son muchas en una sección, la población real es mayor que la del INE 2024. En una zona "en declive" o "en riesgo", la ficha avisa de que puede no estar perdiendo demanda; en una con potencial, de que el potencial real es mayor. Hoy avisa en 4 secciones. Por ejemplo, una zona del Eixample marcada en riesgo por perder vecinos tiene 199 viviendas nuevas desde 2023: la técnica la revisa antes de decidir.
- **Extender lo que funciona ("mancha de aceite").** Un tipo de negocio está muy por encima de lo normal en una zona (200 % o más, y 1,5 veces por encima de la actividad general de esa zona) y muy por debajo en una vecina (60 % o menos, a menos de 900 m). Se excluyen como origen las zonas de destino de toda la ciudad, como el centro, porque allí todo está por encima de lo normal. Mide concentración, no crecimiento: con el histórico del censo se vería qué actividad crece.

## Lo que los datos aún no permiten saber

Cada limitación tiene salida si el Ajuntament conecta datos que ya tiene.

<div class="table-scroll">

| Limitación | Efecto | Cómo se resuelve |
| --- | --- | --- |
| La población es del INE 2024 | Las zonas con obra nueva tienen más vecinos de los que cuenta el radar | Aviso de obra nueva con el Catastro; en el servicio, padrón municipal agregado por sección, actualizado cada mes |
| El censo se actualiza a pie de calle, una vez al año | Las aperturas y los cierres recientes no aparecen | Conectar las comunicaciones de apertura que ya recibe el Ajuntament |
| Sin histórico de altas y bajas ni listado de locales vacíos | El declive se estima desde la demanda, no se mide con cierres; la "mancha de aceite" mide concentración, no crecimiento | En el piloto, la acción "Marcar local vacío"; en el servicio, el histórico de la prospección |
| Sin datos abiertos de locales vacíos | No se pueden estimar: el Catastro abierto no distingue locales y OpenStreetMap recoge menos del 10 % de los negocios | Locales vacíos del Ajuntament en el servicio |
| Afluencia sin recuentos | Se sabe dónde hay motivos para pasar, no cuánta gente pasa | Contadores de peatones y datos de movilidad en el servicio |
| Hostelería mal cubierta (~37 % de restaurantes de OpenStreetMap sin pareja) | Oportunidades de hostelería poco fiables | Marcadas con confianza baja |
| Distancia en línea recta y población repartida por superficie | Aproximación a la distancia real andando | Suficiente a escala de barrio; mejorable con la red de calles |
| Una oportunidad es una hipótesis | Puede explicarla un súper grande, un mercado o calles sin locales | La valida el técnico; las entrevistas a comercios sirven para contrastarla |
| Periferia: urbanizaciones y polígonos (3 secciones, 4,9 % de la población) | No se analizan: allí la compra es en coche y el modelo mide proximidad a pie. Una de ellas incluye un desarrollo residencial nuevo (264 viviendas desde 2023) | Modelo de destino en coche y padrón para incorporar los nuevos barrios (hoja de ruta) |

</div>

## Privacidad

Solo se usan datos abiertos y agregados por sección censal. El radar no trabaja con nombres, NIF ni ningún dato que identifique a una persona.

## Reproducibilidad

Siete scripts en Python, sin dependencias externas: `mataro_descarga.py` (GeoVisor), `secciones_mataro.py` (secciones del INE), `ine_mataro.py` (renta y población), `barrios_mataro.py` (barrios y población municipal), `radar_v2.py` (oportunidades), `radar_v3.py` (potencial y declive) y `contexto.py` (afluencia, obra nueva y extensión). El control de cobertura con OpenStreetMap está en `cobertura_osm.py`.