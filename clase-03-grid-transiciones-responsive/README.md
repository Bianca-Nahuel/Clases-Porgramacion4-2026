# Clase 3 — Grid, sombras, transiciones y responsive

Layout en dos dimensiones, movimiento y adaptación a distintas pantallas.

## Contenidos

| Demo | Tema |
|------|------|
| [`01-grid/`](01-grid/) | `fr`, `grid-template-columns` / `rows`, `grid-template-areas`, líneas y `span`, `repeat()`, grid anidado |
| [`02-sombras-y-transiciones/`](02-sombras-y-transiciones/) | `box-shadow` y sombras apiladas, `text-shadow`, `transition`, curvas de tiempo, `:hover` / `:active`, `prefers-reduced-motion` |
| [`03-responsive/`](03-responsive/) | Variables CSS, unidades relativas, `clamp()` / `min()` / `max()`, `@media`, `auto-fit` + `minmax()`, container queries |
| [`04-borrador-en-vivo/`](04-borrador-en-vivo/) | Borrador de clase: arranca con flex (repaso de la clase 2) y sigue con grid, media queries, `clamp()` y container queries |
| [`05-borrador-sombras/`](05-borrador-sombras/) | Borrador de sombras y transiciones, incluida la sombra en `::after` que se anima con `opacity` |

## Lo que tenés que llevarte

- **Flex vs Grid**: flex acomoda en *una* dirección y deja que el contenido mande; grid define una *grilla* de dos dimensiones y ubica el contenido adentro. No compiten, se combinan.
- `1fr` es "una parte del espacio **sobrante**", no un porcentaje.
- `grid-template-areas` deja el layout dibujado en el CSS: se lee de un vistazo y se reordena en un `@media` cambiando solo el dibujo.
- `repeat(auto-fit, minmax(300px, 1fr))` da una grilla responsive **sin una sola media query**. Es la línea más útil de toda la clase.
- La `transition` se declara en el **estado base**, no en el `:hover`. Si la ponés en el hover, la animación va de ida pero no de vuelta.
- Animá `transform` y `opacity` siempre que puedas: son las dos propiedades que el navegador resuelve sin recalcular el layout.
- Varias sombras apiladas con distinto desenfoque se ven mucho más reales que una sola sombra grande.
- `@media (prefers-reduced-motion: reduce)` no es un detalle: hay gente a la que el movimiento le provoca mareo. Es accesibilidad, igual que el `alt`.
- Una **container query** reacciona al ancho de su contenedor, no al de la ventana. Es lo que hace que un componente sea de verdad reutilizable.

## Para practicar

1. Rehacé el layout de `01-grid` sin `grid-template-areas`, usando `grid-column` / `grid-row`. ¿Cuál se lee mejor?
2. En `03-responsive`, cambiá el `minmax(300px, 1fr)` por `minmax(200px, 1fr)` y contá cuántas columnas entran en tu pantalla.
3. Convertí una tarjeta de `04-borrador-en-vivo` para que cambie de layout por container query en vez de por media query, y probala metiéndola en un contenedor angosto.
