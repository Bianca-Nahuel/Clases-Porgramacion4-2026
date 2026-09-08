/* ============================================================
   CLASE 8 - DEMO 2: BUSCADOR DE POKEMON
   ============================================================
   Flujo completo:
     1. pedir la lista de los 151 pokemon originales
     2. filtrar por lo que escribio el usuario
     3. por cada resultado, pedir su detalle (nombre, id, imagen)
     4. crear un <li> y colgarlo de la lista del DOM
   ============================================================ */

const BASEURL = "https://pokeapi.co/api/v2";

// Referencias al DOM, una sola vez y arriba de todo.
// Buscar el mismo elemento adentro de una funcion que se
// ejecuta seguido es trabajo repetido al pedo.
const buscador     = document.getElementById("buscador");
const listaPokemes = document.getElementById("pokemones");


/* ------------------------------------------------------------
   EVENTOS DE ENTRADA
   ------------------------------------------------------------ */

buscador.addEventListener("submit", (e) => {
    e.preventDefault();                     // que no recargue la pagina

    const data = new FormData(buscador);
    // Destructuring con renombre: agarramos la propiedad
    // "Entrada" (el name del input) y la llamamos nombre.
    const { Entrada: nombre } = Object.fromEntries(data);

    listaPokemes.innerHTML = "";            // limpiamos la busqueda anterior
    buscar(nombre);
});

// DOMContentLoaded se dispara cuando el HTML termino de
// parsearse. Como el <script> tiene defer, este codigo corre
// justo antes de ese evento, asi que el listener llega a tiempo.
// Con "" el filtro no descarta nada: se listan los 151.
document.addEventListener("DOMContentLoaded", () => {
    buscar("");
});


/* ------------------------------------------------------------
   1er PEDIDO: la lista y el filtro
   ------------------------------------------------------------ */

async function buscar(nombre) {
    // Pasamos todo a minusculas de los dos lados para que la
    // busqueda no distinga mayusculas.
    nombre = nombre.toLowerCase();
    let pokemons = [];

    try {
        // ?limit=151 -> los de la primera generacion.
        // Este endpoint devuelve solo { name, url }: el detalle
        // (imagen, tipos, stats) hay que pedirlo aparte.
        const result = await fetch(BASEURL + "/pokemon?limit=151");

        // fetch no falla con 404 / 500: hay que chequear res.ok
        if (!result.ok) throw new Error(`HTTP ERROR ${result.status}`);

        const json = await result.json();

        // includes() da true si el texto aparece en cualquier
        // parte del nombre, no solo al principio.
        pokemons = json.results.filter(
            (p) => p.name.toLowerCase().includes(nombre)
        );

        // Un pedido por pokemon, EN SERIE: cada await espera a
        // que termine el anterior. Con 151 resultados se nota.
        for (const pokemon of pokemons) {
            await cargarPokemon(pokemon, listaPokemes);
        }

        // MEJORA PROPUESTA (ejercicio): lanzarlos en paralelo.
        // Como los pedidos son independientes, se pueden disparar
        // todos juntos y esperar a que terminen:
        //
        //   await Promise.all(
        //       pokemons.map(p => cargarPokemon(p, listaPokemes))
        //   );
        //
        // Es muchisimo mas rapido, pero el orden de aparicion
        // en la lista deja de estar garantizado. Probalo y mira
        // la diferencia en la solapa Network del DevTools.

    } catch (e) {
        // Todo lo que falle adentro del try cae aca: sin red,
        // la API caida, un 404, un JSON invalido.
        console.log(e);
    }
}


/* ------------------------------------------------------------
   2do PEDIDO: el detalle de un pokemon y su tarjeta
   ------------------------------------------------------------ */

async function cargarPokemon(pokemon, lista) {
    try {
        // La url ya viene armada en la respuesta anterior:
        // no hay que concatenar nada a mano.
        const result = await fetch(pokemon.url);
        if (!result.ok) throw new Error(`HTTP ERROR ${result.status}`);

        const data = await result.json();

        // Destructuring anidado con renombre. Equivale a:
        //   const img = data.sprites.other.home.front_default;
        // pero en una linea. Si algun nivel del medio no
        // existiera, esto rompe: para eso estaria el ?.
        const { id, name, sprites: { other: { home: { front_default: img } } } } = data;

        // createElement crea el nodo EN MEMORIA: todavia no
        // esta en la pagina.
        const listItem = document.createElement("li");
        listItem.classList.add("pokemon-card");

        // Template string (backticks) para intercalar variables
        // con ${...} sin andar concatenando con +.
        listItem.innerHTML = `<img src="${img}" alt="${name}"> <span>${id} - ${name}</span>`;

        // appendChild lo cuelga del DOM: recien aca se ve.
        lista.appendChild(listItem);

    } catch (e) {
        // Si UN pokemon falla, se loguea y la lista sigue con
        // los demas. No queremos que un error corte todo.
        console.log(e);
    }
}


/* ------------------------------------------------------------
   MENU HAMBURGUESA
   ------------------------------------------------------------
   Otra vez el mismo patron: el JS solo prende y apaga una
   clase, toda la animacion vive en el CSS.
   ------------------------------------------------------------ */

const display = document.getElementById("display-button");
const menu    = document.getElementById("menu-desplegable");

display.addEventListener("click", () => {
    menu.classList.toggle("visible");      // desliza el panel
    display.classList.toggle("visible");   // convierte las rayas en X
});
