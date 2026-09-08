/* ============================================================
   CLASE 8 - DEMO 1: DOM, EVENTOS Y FORMULARIOS
   ============================================================
   El DOM es el arbol de objetos que el navegador arma a partir
   del HTML. Desde JS podemos recorrerlo y modificarlo, y la
   pantalla se actualiza sola.
   ============================================================ */


/* ------------------------------------------------------------
   1. BUSCAR ELEMENTOS
   ------------------------------------------------------------
   getElementById(id) ............ devuelve UN elemento o null
   querySelector("css") .......... el PRIMERO que matchea un selector CSS
   querySelectorAll("css") ....... todos, en una NodeList
   ------------------------------------------------------------ */

const button = document.getElementById("button");
const caja   = document.getElementById("caja");
const form   = document.getElementById("formulario");


/* ------------------------------------------------------------
   2. MODIFICAR EL CONTENIDO
   ------------------------------------------------------------
   innerHTML interpreta el string como HTML. Es comodo, pero
   NUNCA le metas texto que venga de un usuario: es la puerta
   de entrada a un ataque XSS. Para texto plano usa textContent.
   ------------------------------------------------------------ */

caja.innerHTML = "<b>HOLA</b>";


/* ------------------------------------------------------------
   3. ESCUCHAR EVENTOS
   ------------------------------------------------------------
   addEventListener("evento", callback):
   "cuando pase esto en este elemento, ejecuta esta funcion".
   Se le pueden colgar varios listeners al mismo evento.
   ------------------------------------------------------------ */

// La funcion se define aparte y se pasa POR NOMBRE, sin parentesis.
// Si escribieras addEventListener("click", click()) la estarias
// ejecutando ya mismo y guardando su resultado. Error clasico.
let click = function () {
    // classList: add / remove / toggle / contains
    // toggle la pone si no esta y la saca si esta.
    // El CSS define que significa "rojo": el JS solo prende el interruptor.
    caja.classList.toggle("rojo");
};

button.addEventListener("click", click);


/* ------------------------------------------------------------
   4. FORMULARIOS: el evento submit
   ------------------------------------------------------------ */

form.addEventListener("submit", (e) => {
    // El callback recibe el objeto Event.
    // preventDefault() frena el comportamiento por defecto del
    // navegador (mandar el form y recargar la pagina). Sin esta
    // linea la pagina se refresca y perdes todo.
    e.preventDefault();

    // FormData junta automaticamente todos los campos que
    // tengan atributo name. No hay que buscarlos uno por uno.
    const datos = new FormData(form);

    // FormData no es un objeto comun; fromEntries lo convierte
    // en { Nombre: "...", Pass: "...", Edad: "18", ... }
    const entrada = Object.fromEntries(datos);

    // OJO: todos los valores del form son STRINGS, incluso los
    // de un input number. "18" < 18 funciona por coercion, pero
    // conviene convertir a proposito:
    if (Number(entrada.Edad) < 18) {
        // Este throw dentro de un listener NO lo puede atrapar
        // nadie: sale por la consola como error no manejado y
        // corta el resto del callback (el form no se resetea).
        // En una app real esto seria mostrar un mensaje al lado
        // del campo, no lanzar una excepcion.
        throw new Error("ES MENOR DE EDAD");
    }

    console.log(entrada);

    // reset() limpia todos los campos del formulario
    form.reset();
});
