/* ============================================================
   CLASE 7 - PARTE 1: ASINCRONISMO EN JAVASCRIPT
   ============================================================
   Como ejecutar:
       node 01-timers-promesas-async-await.js

   Idea central: JavaScript tiene UN SOLO hilo. No puede hacer
   dos cosas a la vez. Lo que hace es delegar las tareas lentas
   (un timer, un pedido HTTP, leer un archivo) y seguir
   ejecutando. Cuando la tarea termina, su resultado vuelve a
   la cola y se procesa. Eso es el EVENT LOOP.
   ============================================================ */


/* ------------------------------------------------------------
   1. CLOSURE APLICADO: "ejecutar una sola vez"
   ------------------------------------------------------------
   Envuelve una funcion y hace que, por mas veces que la
   llames, se ejecute realmente una sola vez. Las llamadas
   siguientes devuelven el resultado cacheado.
   Es el patron que usan las librerias para inicializar algo
   una unica vez (conectar a una base, leer una config).
   ------------------------------------------------------------ */

function funcionUnaSolaVez(fn) {
    // Estas dos variables viven en el closure: sobreviven
    // entre llamadas y nadie de afuera las puede tocar.
    let fueLlamada = false;
    let resultado;

    return (...param) => {
        if (!fueLlamada) {
            fueLlamada = true;
            resultado = fn(...param);   // spread: le pasamos los argumentos tal cual
        }
        return resultado;
    };
}

let sumaUnaVez = funcionUnaSolaVez((a, b) => a + b);
console.log(sumaUnaVez(5, 5));   // 10  -> se ejecuta de verdad
console.log(sumaUnaVez(5, 2));   // 10  -> devuelve el cacheado, ignora los nuevos args


/* ------------------------------------------------------------
   2. TIMERS: setTimeout y setInterval
   ------------------------------------------------------------
   El tiempo que se pasa es un MINIMO garantizado, no exacto:
   la funcion se encola recien cuando pasa ese tiempo, y se
   ejecuta cuando el hilo principal queda libre.
   ------------------------------------------------------------ */

// setTimeout(callback, ms) -> ejecuta UNA vez, dentro de ms
let timer = setTimeout(() => { console.log("hola mundo"); }, 2000);
// clearTimeout(timer) lo cancelaria antes de que dispare

// Del tercer argumento en adelante se le pasan al callback
setTimeout((a, b) => console.log(a + b), 1000, 10, 2);   // imprime 12

// setInterval repite cada ms hasta que alguien lo frene.
// Si nadie llama a clearInterval, corre para siempre.
let i = 0;
let intervalo = setInterval(n => {
    console.log(`intervalo: ${++i}`);          // template string con backticks
    if (i === n) clearInterval(intervalo);     // condicion de corte
}, 1000, 6);


/* ------------------------------------------------------------
   3. EL ORDEN DE EJECUCION (el ejemplo que rompe la cabeza)
   ------------------------------------------------------------
   Prediccion: 1, 4, 3, 2. Por que?

   Primero corre TODO el codigo sincronico (1 y 4). Recien
   cuando la pila queda vacia se atienden las colas, y hay dos
   con distinta prioridad:
     - microtareas (promesas)  -> tienen prioridad
     - macrotareas (setTimeout) -> despues
   Por eso el .then (3) le gana al setTimeout de 0ms (2).
   ------------------------------------------------------------ */

console.log(1);                                  // sincronico

setTimeout(() => console.log(2));                // macrotarea

Promise.resolve().then(() => console.log(3));    // microtarea

console.log(4);                                  // sincronico


/* ------------------------------------------------------------
   4. PROMESAS
   ------------------------------------------------------------
   Una Promise es un objeto que representa un valor que
   TODAVIA no esta. Tiene tres estados:
       pending -> fulfilled (resolve)
       pending -> rejected  (reject)
   Una vez que cambia de estado, ya no vuelve atras.
   ------------------------------------------------------------ */

function promesa() {
    return new Promise((resolve, reject) => {
        // El "ejecutor" corre YA. Adentro simulamos algo lento
        // con un setTimeout y decidimos al azar si sale bien.
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve("Exito");            // camino feliz  -> lo agarra .then
            } else {
                reject(new Error("Fallo"));  // camino de error -> lo agarra .catch
            }
        }, 1000);
    });
}

// FORMA 1: encadenando .then / .catch / .finally
promesa()
    .then(res => console.log(res))      // se ejecuta si resolvio
    .catch(e => console.log(e))         // se ejecuta si rechazo
    .finally(() => console.log("fin")); // siempre, pase lo que pase


/* ------------------------------------------------------------
   5. async / await: LA MISMA PROMESA, ESCRITA COMO SINCRONICA
   ------------------------------------------------------------
   - Una funcion async SIEMPRE devuelve una promesa.
   - await pausa esa funcion hasta que la promesa se resuelva.
     No bloquea el hilo: el resto del programa sigue corriendo.
   - El error de un await se atrapa con try / catch normal.
   ------------------------------------------------------------ */

async function asincrona() {
    try {
        let result = await promesa();   // espera aca sin bloquear nada
        console.log(result);
    } catch (e) {
        console.log(e);                 // equivale al .catch
    }
    console.log("fin");                 // equivale al .finally
}

asincrona();


/* ------------------------------------------------------------
   6. fetch: PEDIDOS HTTP
   ------------------------------------------------------------
   fetch devuelve una promesa que resuelve con un objeto
   Response. Dos cosas importantes:

     a) fetch SOLO rechaza si falla la red. Un 404 o un 500
        resuelven igual, con res.ok en false. Por eso hay que
        chequear res.ok a mano y lanzar el error nosotros.
     b) el cuerpo no viene leido: hay que pedirlo con
        res.json() (o .text()), que devuelve OTRA promesa.

   Para que esto funcione levanta el servidor falso primero:
       npx json-server db.json --port 3001
   ------------------------------------------------------------ */

fetch("http://localhost:3001/productos")
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP ERROR ${res.status}`);   // lo agarra el .catch de abajo
        }
        return res.json();      // devolvemos la promesa para seguir la cadena
    })
    .then(json => console.log(json))
    .catch(e => console.log(e));
