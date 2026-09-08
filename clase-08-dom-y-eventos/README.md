# Clase 8 — DOM, eventos y formularios

Acá la página deja de ser estática. Es donde se juntan HTML, CSS y JavaScript por primera vez.

## Contenidos

| Demo | Tema |
|------|------|
| [`01-dom-eventos-formularios/`](01-dom-eventos-formularios/) | `getElementById`, `innerHTML`, `classList.toggle`, `addEventListener`, evento `submit`, `preventDefault`, `FormData`, `Object.fromEntries` |
| [`02-pokedex/`](02-pokedex/) | Integrador: `fetch` a una API pública, `async/await`, `createElement` / `appendChild`, template strings, destructuring anidado, menú hamburguesa animado |

## Cómo correrlo

Con **Live Server**. El pokedex necesita conexión a internet: consume [pokeapi.co](https://pokeapi.co), que es pública y no pide clave.

## Lo que tenés que llevarte

- El **DOM** es el árbol de objetos que arma el navegador a partir del HTML. Se modifica el árbol y la pantalla se actualiza sola.
- `defer` en el `<script>` hace que el JS se ejecute después de parsear el HTML. Sin eso, `getElementById` devuelve `null`. (La alternativa vieja era poner el script al final del `<body>`.)
- **El JavaScript no escribe estilos.** Prende y apaga clases con `classList.toggle`; el CSS decide qué significa cada clase. Así la animación queda declarada en un solo lugar.
- El callback se pasa **por nombre, sin paréntesis**: `addEventListener("click", click)`. Con paréntesis la ejecutás en ese instante y guardás su resultado.
- `preventDefault()` en el `submit` es obligatorio si querés manejar el formulario con JS: sin eso la página se recarga y perdés todo.
- `FormData` junta solos todos los campos que tengan atributo `name`. `Object.fromEntries` lo convierte en un objeto común.
- **Todos los valores de un formulario son strings**, incluso los de un `input type="number"`. Convertí a propósito con `Number()`.
- `innerHTML` interpreta el string como HTML: nunca le metas texto que venga de un usuario (XSS). Para texto plano, `textContent`.
- `for` del `<label>` apunta al **`id`** del input, no al `name`.
- En el pokedex, los 151 pedidos se hacen **en serie** con un `await` dentro del `for`. En el código está comentada la versión con `Promise.all`: es el ejercicio más interesante de la clase.

## Sobre estos archivos

Vienen de `Clase JS/clase 8/`. Además de los comentarios, se corrigieron dos cosas del HTML, anotadas en el propio archivo:

- Había un `for=Nombre"` mal cerrado y los inputs no tenían `id`, así que ningún label estaba realmente asociado a su campo.
- El `throw` dentro del listener de `submit` no lo atrapa nadie: se comentó por qué, y qué habría que hacer en su lugar.

## Para practicar

1. Reemplazá el `throw new Error("ES MENOR DE EDAD")` por un mensaje visible al lado del campo de edad, con una clase de error en el CSS.
2. En el pokedex, cambiá el `for` con `await` por `Promise.all` y comparalo en la solapa *Network* del DevTools. ¿Qué se rompió del orden de la lista?
3. Agregá un estado de "Cargando..." mientras se resuelven los pedidos.
4. Hacé que al hacer clic en una tarjeta se muestren los tipos del pokemon (ya vienen en `data.types`).
