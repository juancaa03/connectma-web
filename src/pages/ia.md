---
layout: ../layouts/Resultado.astro
resultado: 10
fase: Transversal
titulo: Cómo usamos la IA
entradilla: La IA nos permitió construir en una semana lo que habría llevado un mes. Cada cifra la calculan scripts que se pueden volver a ejecutar, y cada error que cometió lo detectamos comprobando contra la fuente.
autoria: "[nombre de quien lo redacta]"
---

## Herramientas y usos

<div class="table-scroll">

| Herramienta | Para qué la usamos | Cómo lo verificamos |
| --- | --- | --- |
| Claude (Anthropic) | Análisis del reto y preparación de la llamada con Comerç | Las conclusiones salen de la llamada y de los datos, no de la IA |
| Claude (Anthropic) | Scripts en Python para descargar y cruzar datos abiertos (GeoVisor, INE, Catastro, OpenStreetMap) | Totales contra la fuente oficial: la población de las 75 secciones suma lo mismo que Mataró en los 10 años |
| Claude (Anthropic) | Diseño del método del radar y revisión crítica de cada versión | Cada cambio de método se ejecutó con datos reales y se revisaron los resultados zona a zona |
| Claude (Anthropic) | Código de la web (Astro) y del prototipo (React) | Revisión visual en escritorio y móvil, y pruebas de cada acción del prototipo |
| [Generador del logo] | Logotipo de ConnectMA | — |
| [Completar: otras herramientas del equipo] | | |

</div>

## Errores que encontramos al verificar

Lo que hace fiable el radar no es la IA, es haber comprobado cada paso. Estos son errores reales que detectamos y corregimos:

- **Una capa del GeoVisor duplicada entera** (232 registros): se habría contado dos veces la ropa y la mercería.
- **Polígonos de distrito mezclados con las secciones del INE:** la primera versión asignaba todos los negocios a 6 distritos en lugar de a 75 secciones.
- **Una hipótesis falsa:** creíamos que faltaban comercios en el censo por la exención del IAE. La llamada con Comerç nos dijo la causa real: el censo se actualiza a pie de calle una vez al año.
- **Comparar con el total de la ciudad infla el declive:** unas pocas promociones nuevas suben la media y hacían parecer que casi todos los barrios se vaciaban. Pasamos a comparar con el barrio típico (la mediana).
- **Un ejemplo que dependía del radio:** "0 ferreterías" en una zona de Cerdanyola desaparecía al pasar de 400 a 450 m. Por eso cada oportunidad se confirma con tres radios.
- **El centro como falso modelo:** el centro tiene de todo por encima de lo normal porque es destino de toda la ciudad. Lo excluimos como origen de "extender lo que funciona".
- **Servicios privados en barrios humildes:** comparar las clínicas de un barrio con renta baja con la media de la ciudad lo hacía parecer siempre deficitario. Para salud, óptica, floristería y librería comparamos con barrios de renta parecida.

## Nuestras reglas

- **Ninguna cifra sale de la IA.** Todas las calculan los scripts con datos públicos, y se pueden volver a ejecutar.
- **Sin datos personales:** a la IA solo le pasamos datos agregados y abiertos.
- **Las fichas no las redacta una IA en directo:** se generan con plantillas a partir de los números, así que no pueden inventarse nada.
- **Las decisiones son del equipo:** quién es el usuario, qué umbrales usar y qué solución elegir salieron de la llamada con Comerç, de las entrevistas y de discutir los resultados.

## Qué aprendimos

La IA acelera mucho el trabajo técnico, pero no sabe qué pregunta hacer ni cuándo un resultado no tiene sentido. El valor estuvo en preguntar al Ajuntament, mirar los datos zona a zona y desconfiar de cada cifra hasta comprobarla.