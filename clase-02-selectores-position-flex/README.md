# Clase 2 — Selectores, position y flexbox

Cómo apuntarle exactamente al elemento que queremos, cómo sacarlo del flujo normal y cómo acomodar cosas en una dirección.

## Contenidos

| Demo | Tema |
|------|------|
| [`01-selectores/`](01-selectores/) | Selectores de etiqueta, clase, id y atributo; especificidad; combinadores; `:nth-child`, `:not`; `::before`, `::marker`, `::selection`; `!important` |
| [`02-position-y-zindex/`](02-position-y-zindex/) | `static`, `relative`, `absolute`, `fixed`, `sticky`; contexto de apilado; `z-index`; `overflow` |
| [`03-flexbox/`](03-flexbox/) | `flex-direction`, `wrap`, `justify-content`, `align-items`, `gap`, `grow` / `shrink` / `basis`; navbar y centrado |
| [`04-borrador-en-vivo/`](04-borrador-en-vivo/) | Lo que se tipeó en el proyector durante la clase, sin editar |

> El borrador está tal cual quedó, con las pruebas a medias y todo. Sirve para reconstruir el hilo de la explicación; las demos numeradas son la versión ordenada del mismo contenido.

## Lo que tenés que llevarte

- **Especificidad**: `id (100) > clase (10) > etiqueta (1)`. Ante empate gana la que está más abajo en el archivo. `!important` gana siempre, y por eso casi nunca es la respuesta correcta.
- Un pseudo-elemento (`::before`) **crea** contenido; una pseudo-clase (`:hover`) selecciona un **estado**.
- `position: absolute` se ubica respecto del ancestro posicionado más cercano, o sea el primero que no sea `static`. Si te quedás sin ancestros, es el `<body>`.
- `z-index` **solo funciona sobre elementos posicionados** (cualquier cosa distinta de `static`). Si no te hace caso, esa suele ser la razón.
- `sticky` es `relative` hasta que llega al umbral (`top`, por ejemplo) y ahí pasa a comportarse como `fixed`. Sin la propiedad de umbral no hace nada.
- En flex hay dos ejes: el **principal** lo maneja `justify-content`, el **transversal** `align-items`. `flex-direction` decide cuál es cuál.

## Para practicar

1. Escribí un selector que pinte todos los `<a>` que apunten a un PDF, sin agregarles clase. (Pista: selector de atributo con `$=`.)
2. En `02-position-y-zindex`, sacale el `position: relative` a la caja azul y explicá por qué su `z-index` deja de importar.
3. Centrá una caja horizontal y verticalmente usando solo flex, en tres líneas de CSS.
