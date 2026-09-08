# Clase 1 — HTML e introducción a CSS

Primera clase práctica. Arrancamos desde cero: qué es un documento HTML, cómo lo lee el navegador y cómo se le empieza a dar estilo.

## Contenidos

| Demo | Tema |
|------|------|
| [`01-estructura-html/`](01-estructura-html/) | Esqueleto de un documento, `head` vs `body`, metas, encabezados, párrafos, imágenes, enlaces, listas, tablas, `div` y `span` |
| [`02-box-model/`](02-box-model/) | Las 3 formas de aplicar CSS, anatomía de una regla, modelo de caja, `box-sizing`, colapso de márgenes |

## Cómo correrlo

Abrilo con la extensión **Live Server** de VS Code (clic derecho sobre el `index.html` → *Open with Live Server*). También funciona con doble clic, pero Live Server recarga solo al guardar.

## Lo que tenés que llevarte

- El HTML dice **qué es** cada cosa; el CSS dice **cómo se ve**. Cuando estés eligiendo una etiqueta por su aspecto (`<h4>` porque es más chico), estás usando mal el HTML.
- La demo 1 no tiene una sola línea de CSS a propósito: eso que ves son los estilos por defecto del navegador.
- Todo elemento es una caja de cuatro capas: **contenido → padding → border → margin**. `padding` es aire adentro, `margin` es aire afuera.
- Los márgenes verticales entre cajas apiladas **no se suman**: gana el más grande. Se llama *colapso de márgenes* y es fuente inagotable de confusión.
- `box-sizing: border-box` hace que `width` incluya padding y borde. Por eso casi todo proyecto arranca con:

  ```css
  *, *::before, *::after { box-sizing: border-box; }
  ```

- `alt` en las imágenes no es opcional: es accesibilidad.

## Para practicar

1. Agregá una lista ordenada anidada dentro de un `<li>` y fijate cómo cambia la numeración.
2. En `02-box-model`, sacá el `box-sizing: border-box` de `.explicada` y medí la caja en el DevTools. ¿Cuánto mide ahora?
3. Poné `margin-bottom: 100px` en la primera caja y `margin-top: 20px` en la segunda. ¿Cuánto queda de separación real?
