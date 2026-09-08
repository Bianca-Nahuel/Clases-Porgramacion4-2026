# Programación IV — Código de clase

Material de código de la cursada de **Programación IV**, Universidad Tecnológica Nacional, Facultad Regional Mar del Plata.

Todo lo que se escribió en el proyector, clase por clase, ordenado y comentado. La idea es que puedas volver sobre cualquier ejemplo después de la clase, correrlo, romperlo y arreglarlo.

---

## Índice

| Clase | Tema | Carpeta |
|-------|------|---------|
| 1 | HTML e introducción a CSS | [`clase-01-html-e-intro-css/`](clase-01-html-e-intro-css/) |
| 2 | Selectores, position y flexbox | [`clase-02-selectores-position-flex/`](clase-02-selectores-position-flex/) |
| 3 | Grid, sombras, transiciones y responsive | [`clase-03-grid-transiciones-responsive/`](clase-03-grid-transiciones-responsive/) |
| 5 y 6 | Fundamentos de JavaScript | [`clase-05-06-javascript-fundamentos/`](clase-05-06-javascript-fundamentos/) |
| 7 | Asincronismo, promesas y fetch | [`clase-07-asincronismo-y-fetch/`](clase-07-asincronismo-y-fetch/) |
| 8 | DOM, eventos y formularios | [`clase-08-dom-y-eventos/`](clase-08-dom-y-eventos/) |
| 9 | TypeScript y primera app en Angular | [`clase-09-typescript-y-angular/`](clase-09-typescript-y-angular/) |

Cada carpeta tiene su propio `README.md` con los contenidos de esa clase, cómo correr las demos, los puntos clave y ejercicios para practicar. **Empezá por ahí.**

> La clase 4 no tiene código: fue teórica.

---

## Cómo usar este repositorio

### Bajarlo

```bash
git clone <URL-DEL-REPO>
cd <carpeta>
```

O descargalo como ZIP desde el botón verde **Code → Download ZIP** si todavía no viste Git.

### Correr las demos de HTML y CSS (clases 1, 2, 3)

Necesitás la extensión **Live Server** de VS Code. Clic derecho sobre el `index.html` de la demo → *Open with Live Server*.

Funciona también con doble clic sobre el archivo, pero Live Server recarga el navegador solo cada vez que guardás, que es lo que querés mientras experimentás.

### Correr los archivos de JavaScript (clases 5, 6, 7)

Necesitás [Node.js](https://nodejs.org) instalado.

```bash
node nombre-del-archivo.js
```

La clase 7 además necesita levantar una API falsa; está explicado en su README.

### Correr la app de Angular (clase 9)

```bash
cd clase-09-typescript-y-angular/02-app-angular
npm install
npm start
```

`node_modules/` no está en el repo (son miles de archivos que se regeneran solos). Por eso el `npm install` la primera vez.

---

## Cómo está armado

Dentro de cada clase, las carpetas están numeradas en el orden en que se vieron en el pizarrón:

```
clase-02-selectores-position-flex/
├── README.md
├── 01-selectores/
├── 02-position-y-zindex/
├── 03-flexbox/
└── 04-borrador-en-vivo/
```

Las carpetas `borrador-en-vivo` son **lo que se tipeó en clase, sin editar**: con las pruebas a medias, las cosas comentadas y el desorden propio de escribir en vivo. Están para que puedas reconstruir el hilo de la explicación. Las demos numeradas antes son la versión ordenada y comentada del mismo contenido.

Cada archivo tiene un encabezado que dice de qué clase es y qué se busca mostrar, y comentarios por bloque explicando el **porqué** de cada decisión, no solo el qué.

---

## Sobre los comentarios

El material se comentó pensando en que lo leas **solo, en tu casa, sin nadie al lado para preguntarle**. Por eso los comentarios:

- explican por qué se hace algo, no solo qué hace la línea
- marcan los errores frecuentes con `OJO:`
- señalan las decisiones que en clase se tomaron a las apuradas y cómo se harían bien

Donde el código de clase tenía un error real (un typo en un header, un `for` de un `<label>` mal cerrado, variables sin declarar), se corrigió **y se dejó anotado qué se corrigió y por qué**. La idea no es esconder el error: es que se vea.

---

## Cómo estudiar con esto

1. Leé el README de la clase antes de mirar el código.
2. Abrí la demo y **predecí qué va a pasar** antes de ejecutarla.
3. Rompela: cambiá un valor, sacá una propiedad, invertí una condición. Lo que no entendés se vuelve obvio cuando lo rompés.
4. Hacé los ejercicios del final de cada README.
5. Recién ahí, volvé al borrador en vivo y seguí el hilo de cómo se llegó a eso en clase.

---

## Errores y sugerencias

Si encontrás un error, algo que no se entiende o querés proponer un ejemplo mejor, abrí un **issue** en este repositorio. Es la forma más rápida de que se arregle para todos.

---

## Licencia

[MIT](LICENSE) — usalo, copialo y modificalo libremente, también fuera de la cursada.
