---
layout: ../layouts/Resultado.astro
etiqueta: Metodología
titulo: Cómo calculamos el radar
entradilla: Todo sale de datos públicos y del registro de prospección que nos cedió el Ajuntament, agregado por sección censal, y se puede recalcular en menos de un minuto. Aquí está cada paso, cada umbral, los errores del dato que encontramos y lo que los datos todavía no permiten saber.
---

## Qué responde

El radar da al Ajuntament datos consistentes para decidir su política sobre la actividad en planta baja: dónde actuar, con qué tipo de actividad y con qué herramienta (ayudas, comunicación, promoción). Responde a lo que pidió el Servei de Promoció de Ciutat i Comerç en la llamada del 20 de octubre:

- **Zonas con potencial:** dónde falta un tipo de actividad para la gente que vive allí.
- **Zonas en declive:** barrios donde la demanda se debilita, para intervenir a tiempo.
- **Alcance:** toda la actividad en planta baja (comercio, restauración y servicios).
- **Usuario principal:** el personal técnico municipal. Quien emprende lo usa acompañado por el técnico o por la Oficina Mataró Empresa.

El Ajuntament nos confirmó que no existe una serie histórica larga y homogénea de actividad comercial. El registro de prospección permite medir cierres desde 2023, pero no basta para predecir. Por eso el radar no predice: compara cada zona con la zona típica de Mataró y mide los cierres que ya han ocurrido.

## Fuentes

<div class="table-scroll">

| Fuente | Qué aporta | Nivel | Periodo |
| --- | --- | --- | --- |
| Censo de actividades en planta baja del Ajuntament (GeoVisor de Activitat Comercial, servicio público ORDS) | 4.819 actividades con coordenadas, descripción y epígrafe IAE | Punto | Foto actual (prospección anual a pie de calle) |
| Registro de prospección del Ajuntament (cedido por el Servei de Comerç) | 4.315 establecimientos con categoría, dirección, estado y fechas de apertura y cierre | Punto | 2023–2026 |
| INE, cartografía de secciones censales | 75 secciones de Mataró | Polígono | 2026 |
| INE, Atlas de Distribución de Renta de los Hogares (tablas 30896 y 30904) | Renta por persona, población, edad, % de mayores de 65 | Sección censal | 2015–2024 |
| Ajuntament, capa de evolución de población | Población 2008, 2014 y 2020 con límites estables | Sección | 2008–2020 |
| Ajuntament, arbolado municipal | Nombre de barrio de cada sección | Punto | Actual |
| Catastro, edificios INSPIRE (descarga abierta) | 11.902 edificios con año de construcción y número de viviendas | Edificio | Hasta 2025 |
| OpenStreetMap | Mercados, grandes superficies, estación, paradas y equipamientos | Punto | Actual |

</div>

## Limpieza y comprobaciones

- Se descartan los 6 polígonos de distrito que el INE mezcla con las secciones.
- Se elimina la capa de ropa y mercería, que el GeoVisor publica dos veces (232 registros). Quedan **4.819 actividades**.
- La suma de población de las 75 secciones coincide con el total oficial de Mataró en los 10 años (129.262 habitantes en 2024).
- **La capa "serveis personals" del GeoVisor mezcla de todo.** De sus 739 actividades, solo 293 son peluquería o estética. Las demás son autoescuelas, colegios, gimnasios, agencias de viajes o una iglesia. Se clasifican por su descripción: 82 consultas médicas y dentales pasan a salud, 14 talleres de reparación a electrónica, 6 ópticas a óptica y 344 quedan fuera.
- **El registro de prospección** se convirtió de Excel a CSV y se comprobó celda a celda (0 diferencias). Los tipos se asignan por su subcategoría, nunca por el nombre del negocio.
- Quedan fuera las **farmacias**, porque su apertura la regula la Generalitat, y las **3 secciones de la periferia** (urbanizaciones y polígonos, 6.295 vecinos, el 4,9 %).

## Paso 1 · ¿Llega el comercio cotidiano a todo el mundo?

Para panadería, carnicería y supermercado se coloca una rejilla de puntos cada 50 m dentro de cada sección y se mide la distancia en línea recta al negocio más cercano. El umbral es de 400 m, unos 500 m andando o 6–7 minutos.

**Resultado:** 71 de las 72 secciones analizadas tienen los tres a menos de 400 m. El comercio básico está bien repartido; las diferencias están en qué tipos hay y cuántos.

## Paso 2 · ¿Qué tipo de negocio falta en cada zona?

Para 11 tipos de proximidad (panadería, carnicería, supermercado, peluquería y estética, salud, ferretería, floristería, librería, bazar, electrónica y reparación, óptica) se compara cada zona con lo normal en la zona típica de Mataró.

1. **Entorno a pie:** círculos de 300, 450 y 600 m alrededor del centro de la sección. El que se enseña es el de 450 m, unos 6 minutos andando.
2. **Vecinos:** la población de cada sección (INE 2024) se reparte en una rejilla de 50 m y se suman los puntos dentro del círculo.
3. **Oferta:** negocios de ese tipo dentro del círculo.
4. **Lo normal:** la mediana, entre secciones, de negocios por vecino. Dos ajustes:
    - **Sin el centro.** Las 16 secciones a menos de 700 m de la Pl. Santa Anna sirven a toda la ciudad, así que no cuentan para calcular lo normal (sí se evalúan). Sin este ajuste, el radar decía que faltaban 81 peluquerías donde había 70.
    - **Renta parecida, solo donde importa.** Salud, óptica, peluquería, electrónica, floristería y librería dependen del poder adquisitivo. Se comparan con zonas del mismo tercio de renta por persona: menos de 13.301 €, de 13.301 a 17.168 € y más de 17.168 €. En salud la diferencia es enorme: 2,9 consultas por cada 10.000 vecinos en las zonas de renta baja y 12,5 en las de renta alta. El resto de tipos se compara con toda la ciudad: así se ve si un barrio tiene menos que los demás.

<div class="formula">
<p><span>esperado</span> = vecinos del entorno × mediana de las zonas de referencia (negocios ÷ vecinos)</p>
<p><span>faltan</span> = esperado − oferta</p>
</div>

5. **Muy por debajo de lo normal** si se cumplen las tres condiciones: faltan al menos 2 negocios, la oferta es menos de la mitad de lo esperado y la probabilidad de ver esa oferta por azar (Poisson) es menor del 5 %.
6. **Es oportunidad** si se cumple con 450 m y al menos con otro radio, para que no dependa de dónde cae una tienda concreta. Salud, óptica y peluquería no son compras de cada día: además tienen que faltar a 800 m (10 minutos a pie).
7. **Segunda fuente.** El registro de prospección también cuenta los negocios abiertos de ese tipo. Si cuenta al menos la mitad de lo esperado, el hueco pasa a "a confirmar". El registro solo puede quitar oportunidades, nunca añadirlas.
8. **No es oportunidad**, y la ficha explica por qué:
    - **Cubierto:** un mercado municipal a menos de 450 m cubre panadería y carnicería; una gran superficie cubre supermercado.
    - **A confirmar:** solo se cumple con un radio; el negocio más cercano está justo en el límite (de 400 a 550 m); el registro de prospección no lo confirma; o el dato del tipo no es fiable.
    - **La hostelería nunca cuenta:** el GeoVisor recoge unos 56 bares y cafeterías, OpenStreetMap 51 y el registro de prospección 188. Con fuentes tan distintas, ningún hueco sería fiable.

**Resultado:** 10 oportunidades en 4 zonas. Empezamos con 38: cada error que encontramos se corrigió en el método, no a mano en el resultado.

> "A 450 m a la redonda viven ~8.234 personas y la oferta de panadería es el 21 % de lo normal en una zona típica de Mataró. Se mantiene con más de un radio y el registro de prospección lo confirma."

## Paso 3 · ¿Potencial o declive?

Cada sección se clasifica cruzando dos ejes, siempre comparados con la **zona típica de Mataró** (la mediana de las secciones), no con el total de la ciudad, que inflan unas pocas promociones nuevas.

**Demanda.** Manda la población, porque los vecinos son los clientes:

- **Crece** si la población sube más de 3 puntos por encima de la zona típica (INE 2015–2024).
- **Cae** si pierde al menos un 3 % de vecinos y queda más de 3 puntos por debajo de la zona típica.
- Si la población está estable, decide la renta por persona, pero solo si se aparta más de 10 puntos de la zona típica. La ficha dice cuál de las dos decidió.
- En las 14 secciones cuyos límites cambió el INE se usa la serie municipal 2008–2020.

**Actividad.** Negocios de proximidad del entorno frente a lo esperado (paso 2, sin hostelería). Por debajo del 80 % se considera **poco comercio**.

<div class="table-scroll">

| | Poco comercio | Comercio suficiente |
| --- | --- | --- |
| **Demanda que crece, o huecos claros sin caída** | Potencial | Bien servida |
| **Demanda que cae** | Declive | En riesgo |

</div>

Las zonas con poco comercio, sin huecos claros y con la demanda estable salen como **sin señal clara**.

**Resultado actual:** 7 zonas con potencial, 1 en declive, 6 en riesgo, 56 bien servidas y 2 sin señal clara.

El 80 % y los 3 puntos son criterios elegidos por el equipo, no calibrados con datos. Son públicos y el Ajuntament puede ajustarlos.

## Paso 4 · Cierres y locales vacíos

Con el registro de prospección se mide lo que ya ha pasado, no una estimación.

- **Cierres desde 2023** en cada zona, frente a la zona típica (29 %). Solo se enseña en zonas con 10 o más negocios registrados.
- **Rotación alta** si una zona con 20 o más registros cierra al menos 1,25 veces más que la zona típica.
- **Locales cerrados sin actividad nueva:** 465 direcciones con un cierre desde 2023 y ningún negocio abierto después en la misma dirección. Se enseña qué había antes (categoría) y cuándo cerró, nunca el nombre del negocio. Son posibles locales vacíos: se comprueban a pie de calle.
- **Renta y cierres.** Ordenando las zonas por renta en tres grupos iguales, desde 2023 ha cerrado el 32 % de los negocios registrados en las de renta más baja, el 27 % en las intermedias y el 23 % en las de renta más alta. Es una relación, no una causa.
- **Cierres al año:** unos 325 negocios de calle (2023–2025), de los que unos 260 son de proximidad: 150 tiendas, 60 servicios personales y 50 bares y restaurantes. El resto son oficinas, bancos y asociaciones.

## Paso 5 · Contexto de cada zona

Tres señales más para el criterio de la técnica. **No cambian el estado de ninguna zona**: se enseñan en la ficha para revisarla mejor.

- **Qué atrae gente (afluencia).** Estación de tren más cercana y, a menos de 450 m, paradas de bus, centros educativos, centros de salud, mercados y equipamientos (OpenStreetMap). Dónde hay motivos para pasar, no cuánta gente pasa.
- **Obra nueva.** Viviendas en edificios terminados desde 2023 (Catastro): 851 en Mataró, con aviso en 4 secciones. Si son muchas, la población real es mayor que la del INE 2024: en una zona "en riesgo" la ficha avisa de que puede no estar perdiendo demanda.
- **Extender lo que funciona.** Un tipo de negocio va muy bien en una zona (200 % o más de lo normal, y 1,5 veces por encima de la actividad general de esa zona) y casi no existe en una vecina (60 % o menos, a menos de 900 m).

## Cómo lo comprobamos

- **Auditoría automática** en cada ejecución: qué capas del GeoVisor entran en cada tipo, qué tipos dependen de la renta o de la edad, cuáles se concentran en el centro y a qué distancia está el negocio más cercano de cada oportunidad.
- **A pie de calle:** recorrimos Rocafonda, Cerdanyola y el Eixample comprobando 46 actividades del censo, contando locales vacíos y entrevistando a comercios y vecinos. Varios locales vacíos que vimos coinciden con cierres del registro de prospección (por ejemplo, Burriac 66 y Ronda Roca Blanca 83).
- **Con el registro de prospección:** el estado de una zona no predice cuántos negocios cierran (la relación es prácticamente nula). Por eso se presenta como lectura de la demanda, y los cierres se enseñan aparte, medidos.
- **Con el Ajuntament:** llamada con el Servei de Promoció de Ciutat i Comerç, reunión durante el TecnoChallenge y contraste por correo con la Cap de Secció. Visita a la Oficina Mataró Empresa.

## Lo que los datos aún no permiten saber

Cada limitación tiene salida si el Ajuntament conecta datos que ya tiene.

<div class="table-scroll">

| Limitación | Efecto | Cómo se resuelve |
| --- | --- | --- |
| El censo y el registro se actualizan a pie de calle | Las aperturas recientes llegan tarde; los cierres se recogen mejor | Conectar las comunicaciones de apertura que ya recibe el Ajuntament |
| Un local cerrado sin actividad nueva no siempre está disponible | Puede estar en obras, alquilado o fuera del mercado | Comprobarlo a pie de calle; "Marcar local vacío" en la prospección |
| La población del INE es de 2024 | La obra nueva reciente no se cuenta | Aviso de obra nueva del Catastro; en el servicio, el padrón municipal |
| Hostelería con fuentes que no coinciden | Sus huecos no son fiables | Fuera del cálculo de huecos |
| El censo cuenta consultas privadas, no centros públicos | Un barrio con CAP puede salir con poca salud | La ficha lo dice; la técnica lo valida |
| El estado de una zona no predice cierres | Es una lectura de la demanda, no una previsión | Medir cada año con el registro si las zonas señaladas evolucionan peor |
| Umbrales elegidos por el equipo (80 %, 3 puntos) | Otro umbral cambia algunas zonas de estado | Reglas públicas que el Ajuntament puede ajustar |
| Distancia en línea recta y población repartida por superficie | Aproximación a la distancia real andando | Suficiente a escala de barrio; mejorable con la red de calles |
| Una oportunidad es una hipótesis | Puede explicarla un local que no se ve en los datos | La valida el técnico a pie de calle |

</div>

## Privacidad

Solo se usan datos abiertos y agregados por sección censal, y el registro de prospección del Ajuntament. Del registro nunca se muestra el nombre de ningún negocio: solo categoría, dirección y fechas. El radar no trabaja con nombres de personas, NIF ni ningún dato que identifique a una persona. Durante la investigación encontramos una capa municipal con datos personales accesibles: no la usamos y lo comunicamos al Ajuntament, que lo trasladó al servicio responsable.

## Reproducibilidad

Scripts en Python, sin dependencias externas: `mataro_descarga.py` (GeoVisor), `secciones_mataro.py` (secciones del INE), `ine_mataro.py` (renta y población), `barrios_mataro.py` (barrios y población municipal), `radar_v2.py` (oportunidades), `radar_v3.py` (potencial y declive), `contexto.py` (afluencia, obra nueva y extensión), `prospeccion.py` (registro de prospección: cierres y locales) y `auditoria.py` (comprobaciones).
