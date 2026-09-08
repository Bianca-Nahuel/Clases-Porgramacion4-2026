# Clase 9 — TypeScript y primera app en Angular

Le agregamos tipos a JavaScript y armamos la primera aplicación con framework.

## Contenidos

| Carpeta | Tema |
|---------|------|
| [`01-typescript/demo.ts`](01-typescript/demo.ts) | Inferencia vs anotación, `unknown` y narrowing, `never`, interfaces, `readonly`, propiedades opcionales, unions de literales, `Partial<T>`, `type`, uniones discriminadas, chequeo exhaustivo |
| [`02-app-angular/`](02-app-angular/) | Componentes standalone, `@Component`, interpolación, property binding, event binding, `[(ngModel)]`, `@if` / `@for` / `@empty`, bootstrap de la app, rutas |

## Cómo correrlo

**TypeScript suelto:**

```bash
npx tsc --noEmit 01-typescript/demo.ts
```

`--noEmit` hace que solo chequee tipos sin generar el `.js`, que es lo único que interesa acá. Las líneas comentadas con `// No compila` están así a propósito: descomentalas para ver el error del compilador.

**La app Angular:**

```bash
cd 02-app-angular
npm install      # la primera vez, baja las dependencias (no están en el repo)
npm start        # levanta el server de desarrollo en http://localhost:4200
npm test         # corre los tests con Vitest
```

## Lo que tenés que llevarte

### TypeScript

- **Los tipos se borran al compilar.** No existen en tiempo de ejecución: son un chequeo del compilador, no una validación. Un JSON que llega de una API puede no cumplir la interface y TypeScript no se entera.
- No anotes lo que se infiere solo. `let b = "hola"` ya es `string`; escribir `let b: string = "hola"` es ruido. Anotá cuando **no hay de dónde inferir**: declaraciones sin valor, parámetros, retornos que querés fijar.
- `unknown` es el `any` seguro: acepta cualquier cosa pero no te deja operarla hasta averiguar qué es. **Usá `unknown`, no `any`.**
- **Narrowing**: dentro de un `if (typeof x === "string")`, TypeScript ya sabe que es un string. El compilador sigue el flujo del código.
- `?.` chequea de verdad en tiempo de ejecución; `!` (non-null assertion) **no chequea nada**, es una promesa que le hacés al compilador. Si mentís, explota igual.
- Una **unión discriminada** más un `switch` da chequeo exhaustivo: si agregás un estado nuevo y te olvidás del `case`, el `let _error: never = s` deja de compilar y te avisa.
- `interface` para formas de objeto, `type` para uniones y alias. Una interface no puede expresar `0 | 1`.

### Angular

- Un componente son tres cosas unidas por `@Component`: **clase** (datos y lógica), **template** (vista) y **CSS** (encapsulado, no se escapa a otros componentes).
- **Standalone por defecto** desde la v19: no hace falta escribir `standalone: true` y los `NgModule` ya no se usan. Cada componente declara sus dependencias en su propio `imports`.
- `{{ }}` interpola, `[prop]` baja datos de la clase al DOM, `(evento)` sube eventos del DOM a la clase, `[(ngModel)]` hace las dos (y necesita `FormsModule` en los `imports`).
- El control de flujo `@if` / `@for` / `@empty` es sintaxis nativa del template: no requiere ningún import.
- **`track` en `@for` es obligatorio**: le dice a Angular cómo identificar cada item para no rehacer el DOM entero en cada cambio. Si los datos tienen `id`, usá ese y no `$index`.
- La lógica va en la clase, no en el HTML. El template llama métodos; no calcula.

## Sobre estos archivos

`demo.ts` es el material tal cual se escribió en clase, ya comentado. El proyecto Angular es el generado por el CLI con el componente de la clase agregado. Se comentaron `main.ts`, `app.config.ts`, `app.routes.ts` y `app.ts`, y se corrigió `app.spec.ts`: el test que traía el CLI buscaba el texto `"Hello, app-clase9"` de la página de bienvenida, que reemplazamos, así que fallaba.

`node_modules/`, `.angular/cache/` y `dist/` **no están en el repo** a propósito: se regeneran con `npm install`.

## Para practicar

1. Agregá un estado `'vacio'` a `EstadoCarga` sin tocar la función `render` y mirá el error que aparece en el `default`. Eso es el chequeo exhaustivo funcionando.
2. En el componente, agregá un botón que saque el último elemento de `arr` y comprobá que aparece el bloque `@empty` cuando queda vacío.
3. Cambiá el `track $index` por `track letra` y explicá en qué caso cada uno da problemas.
4. Definí una `interface Producto` y armá un `@for` que liste un arreglo de productos con nombre y precio.
