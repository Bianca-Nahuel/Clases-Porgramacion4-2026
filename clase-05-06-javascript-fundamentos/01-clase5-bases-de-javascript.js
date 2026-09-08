/* ============================================================
   CLASE 5 - BASES DE JAVASCRIPT
   ============================================================
   Como ejecutar este archivo:
       node 01-clase5-bases-de-javascript.js
   o pegando los bloques de a uno en la consola del navegador (F12).

   Sugerencia: no lo corras entero de una. Anda comentando y
   descomentando bloques, prediciendo que va a imprimir ANTES
   de ejecutarlo. Si tu prediccion falla, ahi esta el concepto
   que todavia no cerro.
   ============================================================ */


/* ------------------------------------------------------------
   1. SALIDA POR CONSOLA Y VALORES LITERALES
   ------------------------------------------------------------ */

console.log("hola mundo");

// Estas tres lineas son valores literales sueltos. Son codigo
// valido: se evaluan y se descartan, porque no se los asigna
// a nada ni se los imprime. No hacen absolutamente nada.
24;
"hola mundo";
null;


/* ------------------------------------------------------------
   2. const: LA REFERENCIA NO SE PUEDE REASIGNAR
   ------------------------------------------------------------ */

const num = 5;
// num = 6;   <-- TypeError: Assignment to constant variable.
console.log(num);

// OJO, la confusion clasica: const NO congela el contenido.
// Lo que no se puede cambiar es a QUE apunta la variable.
const arr = [];
arr.push(1);   // permitido: modifico el arreglo que ya existe
arr.push(2);   // permitido
console.log(arr);   // [ 1, 2 ]

// arr = [9];  <-- ESTO si rompe: le estoy dando un arreglo NUEVO


/* ------------------------------------------------------------
   3. var vs let: POR QUE NO USAMOS MAS var
   ------------------------------------------------------------
   var tiene tres problemas:
     a) hoisting: existe desde el arranque del scope con valor
        undefined, asi que se puede "usar" antes de declararla
        sin que salte error.
     b) su alcance es la FUNCION, no el bloque: se escapa del
        if / for donde la declaraste.
     c) se puede redeclarar la misma variable sin aviso.
   ------------------------------------------------------------ */

var a = 5;

if (true) {
    // Este var NO crea una variable nueva: pisa la de arriba,
    // porque el if no genera un scope propio para var.
    var a = "hola mundo";
    console.log(a);   // "hola mundo"
}

console.log(a);       // "hola mundo"  <-- se filtro fuera del if


// let arregla los tres problemas: vive en su bloque {}, no se
// puede redeclarar y usarla antes de declararla tira ReferenceError.
let b = 5;

if (true) {
    // Esta es OTRA variable, distinta de la de afuera.
    // Vive solo adentro de estas llaves.
    let b = "hola mundo";
    console.log(b);   // "hola mundo"
}

console.log(b);       // 5  <-- la de afuera quedo intacta

// Regla practica para la cursada: const por defecto,
// let solo cuando de verdad vas a reasignar, var nunca.


/* ------------------------------------------------------------
   4. TIPOS DE DATOS
   ------------------------------------------------------------
   Primitivos: number, string, boolean, undefined, null,
               symbol, bigint.
   Objetos:    todo lo demas (objetos, arreglos, funciones...).
   JavaScript es de tipado DINAMICO: el tipo lo tiene el valor,
   no la variable, y puede cambiar en cualquier momento.
   ------------------------------------------------------------ */

let num1 = 25;                                        // number
let str  = "hola";                                    // string
let bool = true;                                      // boolean
var undf;                                             // undefined (declarada, sin valor)
let nul  = null;                                      // null (ausencia INTENCIONAL de valor)
let sym  = Symbol("id");                              // symbol: identificador unico
const obj  = { nombre: "nahuel", apellido: "Bianca" }; // object
const arrA = [1, 2, 3, 4, 5];                         // object (los arreglos son objetos)


/* ------------------------------------------------------------
   5. CONVERSION DE TIPOS Y NaN
   ------------------------------------------------------------ */

str = "a25";
str = Number(str);                    // "a25" no es un numero => NaN

// NaN es el unico valor de JS que NO es igual a si mismo,
// asi que NUNCA se lo compara con ==. Se usa Number.isNaN().
console.log(Number.isNaN(str));       // true
console.log(str == NaN);              // false  <-- siempre false, sirve de nada

console.log(1 == 1);                  // true


/* ------------------------------------------------------------
   6. OPERADORES
   ------------------------------------------------------------ */

console.log("hola" + " mundo");       // + sobre strings concatena

// == compara con COERCION: convierte los tipos antes de comparar.
console.log(1 == "1");                // true   <- el string se convierte a numero
console.log(1 != "1");                // false

// === compara valor Y tipo. Es el que hay que usar siempre.
console.log(1 === "1");               // false
console.log(1 !== "1");               // true

console.log(2 ** 3);                  // 8   exponenciacion
console.log(typeof 1);                // "number"

// typeof [] devuelve "object", no sirve para detectar arreglos.
// Para eso esta Array.isArray().
console.log(Array.isArray([]));       // true


/* ------------------------------------------------------------
   7. TERNARIO, OPTIONAL CHAINING Y NULLISH COALESCING
   ------------------------------------------------------------ */

let valor = (5 < 7);                                  // true

// condicion ? valorSiTrue : valorSiFalse
let resultado = valor ? "verdadero" : "falso";
console.log(resultado);               // "verdadero"

var object;                           // undefined

// ?. corta la cadena si el valor es null o undefined y devuelve
//    undefined, en vez de tirar "cannot read property of undefined".
// ?? usa el valor de la derecha solo si el de la izquierda es
//    null o undefined.
console.log(object?.nombre ?? "a");   // "a"

// Diferencia clave entre ?? y ||:
//   || usa la derecha con cualquier valor FALSY (0, "", false, NaN...)
//   ?? solo con null / undefined
console.log(0 || "no existe");        // "no existe"  <- 0 es falsy
console.log(0 ?? "no existe");        // 0            <- 0 no es null ni undefined


/* ------------------------------------------------------------
   8. FUNCIONES
   ------------------------------------------------------------ */

// Expresion de funcion guardada en una variable.
// El parametro b tiene VALOR POR DEFECTO: si no lo mandas, vale "mundo".
let sum = function (a, b = "mundo") {
    return a + b;
};

console.log(sum("hola"));             // "holamundo"
console.log(typeof sum);              // "function"

let exp = function (e) {
    return e * 2;
};

// Funcion flecha: (parametros) => cuerpo
// Si el cuerpo es UNA sola expresion, se puede omitir las llaves
// y el return: el valor de esa expresion es lo que devuelve.
let arrwExp = () => 2 * 2;


/* ------------------------------------------------------------
   9. CALLBACKS: UNA FUNCION QUE RECIBE OTRA FUNCION
   ------------------------------------------------------------
   En JS las funciones son valores como cualquier otro: se
   guardan en variables, se pasan como argumento y se devuelven.
   A eso se le dice "funciones de primera clase", y es lo que
   hace posible map, filter, addEventListener, etc.
   ------------------------------------------------------------ */

let callbackFn = function (arr, fn) {
    const arrAux = [];
    arr.forEach(element => {
        // fn es la funcion que nos pasaron: la aplicamos a cada elemento
        arrAux.push(fn(element));
    });
    return arrAux;
};

// La misma funcion escrita con sintaxis de flecha
let callbackArrow = (arr, fn) => {
    const arrAux = [];
    arr.forEach(element => {
        arrAux.push(fn(element));
    });
    return arrAux;
};

console.log(arrA);                              // [1, 2, 3, 4, 5]
console.log(callbackFn(arrA, e => e * 2));      // [2, 4, 6, 8, 10]

// Lo que acabamos de escribir a mano ya existe en el lenguaje:
console.log(arrA.map(e => e * 2));              // [2, 4, 6, 8, 10]
