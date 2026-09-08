# Clases 5 y 6 — Fundamentos de JavaScript

Dos clases seguidas sobre el lenguaje en sí, sin navegador ni DOM todavía. Todo se corre por consola.

## Contenidos

| Archivo | Tema |
|---------|------|
| [`01-clase5-bases-de-javascript.js`](01-clase5-bases-de-javascript.js) | `console.log`, `const` / `let` / `var`, scope y hoisting, tipos de datos, `NaN`, `==` vs `===`, ternario, `?.`, `??`, funciones, arrow functions, callbacks |
| [`02-clase6-funciones-objetos-arreglos.js`](02-clase6-funciones-objetos-arreglos.js) | Funciones de orden superior, closures, clases, parámetros por defecto, rest / spread, strings, `filter` / `map` / `sort`, `this`, destructuring |

## Cómo correrlo

```bash
node 01-clase5-bases-de-javascript.js
node 02-clase6-funciones-objetos-arreglos.js
```

También podés pegar los bloques de a uno en la consola del navegador (F12).

**No lo corras entero de una.** Andá comentando y descomentando bloques, y predecí qué va a imprimir *antes* de ejecutar. Donde tu predicción falle, ahí está el concepto que todavía no cerró.

## Lo que tenés que llevarte

- **`const` por defecto, `let` cuando vas a reasignar, `var` nunca.** `var` se escapa de los bloques, se puede redeclarar sin aviso y se iza con valor `undefined`.
- `const` **no congela el contenido**: congela la referencia. Un `const arr = []` acepta `arr.push(1)` perfectamente.
- `===` siempre. `==` convierte tipos antes de comparar y produce cosas como `1 == ["1"] // true`.
- `NaN` no es igual a sí mismo. Se detecta con `Number.isNaN()`, nunca con `==`.
- `||` usa la derecha con cualquier valor *falsy* (`0`, `""`, `false`); `??` solo con `null` o `undefined`. Esa diferencia es un bug clásico cuando el valor válido es `0`.
- Las funciones son **valores**: se guardan, se pasan como argumento y se devuelven. Eso es lo que hace posible `map`, `filter` y `addEventListener`.
- Un **closure** es una función que se acuerda del scope donde nació. Es cómo se hace estado privado en JS sin clases.
- Una **arrow function no tiene `this` propio**: hereda el del lugar donde se escribió. Por eso nunca se usa para definir un método de objeto.
- `sort()` **muta** el arreglo original. Si no lo querés tocar, copiá primero: `[...arr].sort(...)`.
- Spread sobre objetos hace copia **superficial**: los objetos anidados se siguen compartiendo.

## Sobre estos archivos

Vienen del archivo único `script_calse5&6.ts` que se escribió en clase. Está partido en dos, se le sacaron los comentarios de bloque que tapaban la parte de la clase 5, y se le agregaron comentarios explicativos. Los cambios de fondo respecto de lo tipeado en clase, todos anotados en el propio código:

- `obj1` / `obj2` estaban sin `const`, lo que creaba globales implícitas. Rompe en modo estricto o dentro de un módulo.
- Se renombraron algunas variables por legibilidad (`sumador` → `Sumador`, `exp` → `potencia`, `suma7` → `sumaVarios`).
- La extensión pasó de `.ts` a `.js`, que es lo que el código realmente es. TypeScript entra en la clase 9.

## Para practicar

1. Escribí una función `contador()` que use un closure y devuelva un objeto con `incrementar()`, `decrementar()` y `valor()`, sin que se pueda tocar el contador desde afuera.
2. Dado el arreglo `alumnos`, sacá el promedio de notas usando `reduce`.
3. Reescribí `filtro` (el de los números) para que use `every` en vez del `for`.
4. Explicá por qué `objeto.metodoF()` devuelve `undefined` y `objeto.metodo()` devuelve `"A"`.
