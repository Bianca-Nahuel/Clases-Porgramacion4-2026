/* ============================================================
   CLASE 6 - FUNCIONES, CLOSURES, OBJETOS Y ARREGLOS
   ============================================================
   Como ejecutar:
       node 02-clase6-funciones-objetos-arreglos.js

   Arranca repasando lo de la clase 5 y despues avanza a los
   temas que mas se usan en el dia a dia: closures, clases,
   spread / rest, metodos de arreglo y destructuring.
   ============================================================ */


/* ------------------------------------------------------------
   1. REPASO: SCOPE, HOISTING Y COERCION
   ------------------------------------------------------------ */

let valor2 = 3;
const valor3 = 10;

if (true) {
    var valor1 = 1;   // var se escapa del bloque
    let valor2 = 5;   // let NO: esta es otra variable, muere aca
}

// valor1 vale 1 (sobrevivio al if). valor2 vale 3 (la de afuera).
console.log(valor1, valor2);   // 1 3

console.log(Number(valor1));                // 1
console.log(Number.isNaN(Number("a")));     // true

// ** asocia de DERECHA a izquierda: es 2**(2**3) = 2**8 = 256,
// no (2**2)**3 = 64. Es el unico operador binario que hace esto.
console.log(2 ** 2 ** 3);                   // 256

console.log(valor2 < valor3 ? "si" : "no"); // "si"

var valor4 = { nombre: "nahuel", edad: 5 };
console.log(valor4?.edad ?? "N/A");         // 5


/* ------------------------------------------------------------
   2. DECLARACION vs EXPRESION DE FUNCION (HOISTING)
   ------------------------------------------------------------ */

// Esto FUNCIONA aunque suma se declare mas abajo: las
// declaraciones de funcion se izan completas (hoisting).
console.log(suma(10, 14));   // 24

function suma(a, b) {
    return a + b;
}

// Una funcion guardada en una variable NO se iza: si intentas
// llamarla antes de esta linea, tiras ReferenceError.
let suma2 = function (a, b) {
    return a + b;
};

// La misma funcion como arrow. Sintaxis: (params) => { cuerpo }
suma2 = (a, b) => {
    return a + b;
};

console.log(suma2(10, 5));   // 15

let mult = a => {
    for (let i = 0; i <= 10; i++) {
        console.log(a * i);
    }
};

// Cuerpo de una sola expresion: sin llaves y sin return.
// Es la forma mas usada en la practica.
suma2 = (a, b) => a + b;
console.log(suma2(10, 5));   // 15

// Coercion rara del ==: el arreglo se convierte a string ("1")
// y despues a numero (1). Otro motivo para usar siempre ===.
console.log(1 == ["1"]);     // true
console.log(1 === ["1"]);    // false


/* ------------------------------------------------------------
   3. FUNCIONES DE ORDEN SUPERIOR
   ------------------------------------------------------------
   Reciben funciones y/o devuelven funciones.
   ------------------------------------------------------------ */

// Recibe la operacion como parametro: la funcion no sabe ni le
// importa si va a sumar o restar.
function calc(a, b, calculo) {
    return calculo(a, b);
}

console.log(calc(10, 5, suma2));              // 15
console.log(calc(10, 5, (c, d) => c - d));    // 5


// Devuelve una funcion segun lo que le pidan (una "fabrica").
function calculadoraInv(operador) {
    switch (operador) {
        case "suma":
            return (a, b) => a + b;
        case "resta":
            return (a, b) => a - b;
    }
    // Si no matchea ningun case devuelve undefined:
    // llamar al resultado explota. Convendria un default.
}

let operacion = calculadoraInv("resta");
console.log(operacion(10, 5));   // 5


/* ------------------------------------------------------------
   4. CLOSURE: LA FUNCION SE ACUERDA DE DONDE NACIO
   ------------------------------------------------------------
   Una funcion definida adentro de otra "captura" las variables
   de la de afuera y las mantiene vivas aunque la externa ya
   haya terminado. Eso es un closure.
   ------------------------------------------------------------ */

function potencia(exponente) {
    // La flecha se queda con SU copia de exponente
    return base => base ** exponente;
}

let cuadrado = potencia(2);   // recuerda exponente = 2
let cubo     = potencia(3);   // recuerda exponente = 3
console.log(cuadrado(5));     // 25
console.log(cubo(5));         // 125


function recordador() {
    // contador es privado: nadie de afuera puede tocarlo,
    // solo la funcion que devolvemos.
    let contador = 0;

    return function (a, b) {
        contador++;
        return {
            resultado: a + b,
            llamados: contador
        };
    };
}

// Cada llamada a recordador() crea un contador NUEVO e
// independiente. Eso es lo importante de este ejemplo.
const sumaA = recordador();
const sumaB = recordador();

console.log(sumaA(1, 1));   // { resultado: 2, llamados: 1 }
console.log(sumaA(2, 3));   // { resultado: 5, llamados: 2 }
console.log(sumaB(1, 1));   // { resultado: 2, llamados: 1 }  <- su propio contador


/* ------------------------------------------------------------
   5. CLASES: EL MISMO PROBLEMA, RESUELTO CON OBJETOS
   ------------------------------------------------------------
   Una clase hace lo mismo que el closure de arriba pero con
   estado explicito en this. Por convencion los nombres de
   clase van en PascalCase (Sumador, no sumador).
   ------------------------------------------------------------ */

class Sumador {
    constructor() {
        // Se ejecuta al hacer new. Aca se inicializa el estado.
        this.contador = 0;
    }

    sumar(a, b) {
        this.contador++;
        return { resultado: a + b, llamados: this.contador };
    }
}

// OJO: en clase estas dos lineas quedaron sin const/let, lo que
// crea variables globales implicitas. Funciona por casualidad y
// revienta en modo estricto o dentro de un modulo. Van declaradas.
const obj1 = new Sumador();
const obj2 = new Sumador();

console.log(obj1.sumar(5, 10));   // { resultado: 15, llamados: 1 }
console.log(obj1.sumar(1, 1));    // { resultado: 2,  llamados: 2 }
console.log(obj2.sumar(5, 10));   // { resultado: 15, llamados: 1 }  <- instancia aparte


/* ------------------------------------------------------------
   6. PARAMETROS POR DEFECTO, REST Y SPREAD
   ------------------------------------------------------------ */

let exponenteOpc = (numero, exp = 2) => numero ** exp;
console.log(exponenteOpc(2));      // 4   (usa el default)
console.log(exponenteOpc(2, 5));   // 32


// ...arr como PARAMETRO = rest: junta todos los argumentos
// sobrantes en un arreglo de verdad. Va siempre ultimo.
let sumaVarios = (a, b, ...arr) => {
    let res = a + b;
    arr.forEach(e => res += e);
    return res;
};

console.log(sumaVarios(1, 2, 3, 4, 56, 7));   // 73

let numerosSueltos = [1, 2, 3, 4, 5, 6];

// ...arr en la LLAMADA = spread: desarma el arreglo en
// argumentos sueltos. Mismo simbolo, operacion inversa.
console.log(sumaVarios(...numerosSueltos));   // 21


// Spread sobre objetos: copia las propiedades en uno nuevo.
// Sirve para "modificar" sin mutar el original, que es como se
// trabaja el estado en React y en general.
const usuario = { nombre: "nahuel", apellido: "bianca" };
const usuarioMod = { ...usuario, edad: 24 };
console.log(usuarioMod);   // { nombre: 'nahuel', apellido: 'bianca', edad: 24 }
console.log(usuario);      // intacto

// Atencion: la copia es SUPERFICIAL. Los objetos anidados
// se comparten entre el original y la copia.


/* ------------------------------------------------------------
   7. STRINGS
   ------------------------------------------------------------ */

let str = "Hola Mundo Mensaje";

// split parte el string en un arreglo usando un separador,
// join lo vuelve a unir. reverse() da vuelta el arreglo.
let palabras = str.split(" ");
console.log(palabras.reverse().join(" "));   // "Mensaje Mundo Hola"

// Los strings son inmutables: str + "..." no modifica str,
// crea uno nuevo y lo reasigna.
str = "nahuel ";
str = str + "bianca";
console.log(str);   // "nahuel bianca"


/* ------------------------------------------------------------
   8. METODOS DE ARREGLO: filter, map, sort
   ------------------------------------------------------------
   Los tres devuelven / recorren SIN escribir un for a mano.
   filter y map devuelven un arreglo NUEVO.
   ------------------------------------------------------------ */

const alumnos = [
    { nombre: "ana",   nota: 6 },
    { nombre: "pedro", nota: 8 },
    { nombre: "juan",  nota: 5 },
    { nombre: "jose",  nota: 2 },
];

// filter: se queda con los elementos donde el callback da true
const aprobados = alumnos.filter(e => e.nota >= 6);

// map: transforma cada elemento en otra cosa (misma cantidad)
const nombresApr = aprobados.map(e => e.nombre);
console.log(nombresApr);   // [ 'ana', 'pedro' ]

// Se encadenan: filtrar y despues transformar, en una linea
console.log(alumnos.filter(e => e.nota >= 6).map(e => e.nombre));


const numeros = [1, 4, 5, 2, 6, 8, 9];

// El callback de filter recibe (elemento, indice, arregloCompleto).
// Aca usamos los tres: nos quedamos con los numeros que son
// mayores o iguales a TODOS los que vienen despues.
let filtro = function (n, i, arr = []) {
    for (++i; i < arr.length; i++) {
        if (n >= arr[i]) return false;
    }
    return true;
};

const numerosMenores = numeros.filter(filtro);
console.log(numerosMenores);   // [ 1, 2, 6, 8, 9 ]


// sort MUTA el arreglo original. Por eso copiamos con spread
// antes de ordenar: asi alumnos queda como estaba.
// El comparador devuelve negativo / 0 / positivo.
const alumnosOrd = [...alumnos].sort((a, b) => a.nota - b.nota);
console.log(alumnos);      // orden original
console.log(alumnosOrd);   // ordenado por nota ascendente


/* ------------------------------------------------------------
   9. this EN OBJETOS: metodo comun vs arrow
   ------------------------------------------------------------ */

const objeto = {
    nombre: "A",
    // Metodo comun: this apunta al objeto que lo llama
    metodo() { return this.nombre; },
    // Arrow: NO tiene this propio, hereda el del scope donde
    // se escribio (aca el modulo). Por eso da undefined.
    // Regla: nunca uses arrow para definir un metodo de objeto.
    metodoF: () => this.nombre
};

console.log(
    objeto.metodo(),      // "A"
    objeto.metodoF(),     // undefined
    objeto["nombre"]      // "A"  <- notacion de corchetes
);


/* ------------------------------------------------------------
   10. DESTRUCTURING
   ------------------------------------------------------------
   Sacar propiedades de un objeto (o elementos de un arreglo)
   directo a variables. Se usa muchisimo en React y en Angular.
   ------------------------------------------------------------ */

const persona = {
    nombre: "N",
    apellido: "B",
    edad: 24,
    nac: { pais: "Arg", ciudad: "MDQ" }
};

// Los nombres tienen que coincidir con las propiedades.
// nac: { pais, ciudad } entra un nivel mas adentro.
let { nombre, apellido, edad, nac: { pais, ciudad } } = persona;
console.log(nombre, apellido, edad, pais, ciudad);   // N B 24 Arg MDQ

// nac: nacionalidad  -> renombra la propiedad al extraerla
// ...persona2        -> rest: todo lo que sobra, en un objeto nuevo
let { nac: nacionalidad, ...persona2 } = persona;
console.log(nacionalidad);   // { pais: 'Arg', ciudad: 'MDQ' }
console.log(persona2);       // { nombre: 'N', apellido: 'B', edad: 24 }

// Tambien funciona con arreglos, por posicion:
const [primero, segundo, ...resto] = [10, 20, 30, 40];
console.log(primero, segundo, resto);   // 10 20 [ 30, 40 ]
