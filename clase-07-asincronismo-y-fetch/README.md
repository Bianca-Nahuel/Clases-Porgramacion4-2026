# Clase 7 — Asincronismo, promesas y fetch

Cómo hace JavaScript para no quedarse congelado esperando, y cómo se pide información a un servidor.

## Contenidos

| Archivo | Tema |
|---------|------|
| [`01-timers-promesas-async-await.js`](01-timers-promesas-async-await.js) | Closure aplicado (ejecutar una sola vez), `setTimeout` / `setInterval`, event loop, micro vs macrotareas, promesas, `async` / `await`, `fetch` |
| [`02-fetch-crud-json-server.js`](02-fetch-crud-json-server.js) | CRUD completo contra una API REST: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, headers, `JSON.stringify` |
| [`db.json`](db.json) | Los datos que sirve la API falsa |

## Cómo correrlo

El primer archivo corre solo, salvo el bloque final de `fetch`, que necesita el servidor levantado:

```bash
node 01-timers-promesas-async-await.js
```

Para el segundo, levantá primero la API falsa **parado en esta carpeta**:

```bash
npx json-server db.json --port 3001
```

y en **otra terminal**:

```bash
node 02-fetch-crud-json-server.js
```

`json-server` publica `db.json` como una API REST completa y **escribe los cambios en el archivo de verdad**: podés abrir `db.json` después de cada operación y ver qué pasó.

| Método | URL | Qué hace |
|--------|-----|----------|
| `GET` | `/productos` | lista todo |
| `GET` | `/productos/eea6` | trae uno |
| `POST` | `/productos` | crea (el id lo genera solo) |
| `PUT` | `/productos/eea6` | reemplaza el recurso **entero** |
| `PATCH` | `/productos/eea6` | modifica **solo** los campos enviados |
| `DELETE` | `/productos/eea6` | borra |

## Lo que tenés que llevarte

- JavaScript tiene **un solo hilo**. No hace dos cosas a la vez: delega lo lento y sigue. Eso es el **event loop**.
- El orden del ejemplo `1, 4, 3, 2` no es capricho: primero corre todo lo sincrónico, después las **microtareas** (promesas) y recién al final las **macrotareas** (`setTimeout`). Las promesas le ganan siempre a un `setTimeout` de 0 ms.
- El tiempo de un `setTimeout` es un **mínimo garantizado**, no una promesa de exactitud.
- Una promesa tiene tres estados y **cambia una sola vez**: `pending` → `fulfilled` o `pending` → `rejected`.
- Una función `async` **siempre** devuelve una promesa. `await` pausa esa función, no el programa.
- **`fetch` solo rechaza si falla la red.** Un 404 o un 500 resuelven igual, con `res.ok` en `false`. Hay que chequearlo a mano y lanzar el error uno mismo. Es el error número uno de la materia.
- El cuerpo de la respuesta no viene leído: `res.json()` devuelve *otra* promesa.
- `PUT` reemplaza el recurso completo, `PATCH` solo los campos que mandás. Mandar un `PUT` incompleto borra datos.
- El `body` viaja como texto: hay que serializar con `JSON.stringify` y avisar con el header `Content-Type: application/json`.

## Sobre estos archivos

Vienen de `clase7.js`, que tenía casi todo comentado en un bloque `/* */`. Está partido en dos archivos, con el bloque reactivado y comentado. Dos correcciones, anotadas en el código:

- El header decía `"aplication/json"` (con una sola `p`). Escrito así el servidor puede no parsear el body.
- La función se llamaba `getProductos` pero hacía un `PATCH`. Ahora se llama `actualizarProducto`.

## Para practicar

1. Agregá manejo de error al `fetch` del final del archivo 1: cortá el `json-server` y mirá qué mensaje sale.
2. Implementá `crearProducto` (está comentada) y verificá en `db.json` que el producto se agregó con un id nuevo.
3. Hacé un `PUT` mandando solo `{ nombre: "X" }` sobre un producto existente y mirá qué le pasó al precio y al stock.
4. Escribí una función que traiga los productos y devuelva solo los que tienen `stock > 0`, usando `async/await` y `filter`.
