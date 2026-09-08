// Parametro con valor por defecto: al llamarla se puede omitir.
// No hace falta anotar el retorno, TS lo infiere: number
function calcularTotal(valor: number,cantidad = 1){
    return valor * cantidad
}

// Anotacion explicita, redundante: con el valor inicial TS ya inferia string
let str:string = "100"

// Number() convierte en tiempo de ejecucion. Sin esto no compila:
// un string no es asignable a un parametro de tipo number
console.log(calcularTotal(Number(str),50))


// Declaraciones sin valor inicial: aca la anotacion SI es necesaria,
// no hay de donde inferir. TS lleva la cuenta de que todavia no fueron
// asignadas y no deja usarlas hasta que lo esten
let a: string
let arr:string[]

// Con valor inicial no se anota nada: inferido string
let b = "hola"

let numeros:number[]
// Tupla: array de longitud y tipos fijos, distinto de number[]
let tupla:[number,number]


// unknown es el any seguro: acepta cualquier valor pero no deja operarlo
// hasta averiguar que es
let x:unknown

// Narrowing con typeof: dentro del if, TS ya sabe que x es string
if(typeof x === `string`){
    x.toLowerCase()
}

if(typeof x === `number`){
    4 * x
}

// Fuera del if no compilan: sobre unknown no se puede llamar nada
//x.toLowerCase()
//4 * x


// never como retorno: esta funcion no devuelve, corta el flujo.
// La anotacion es obligatoria, TS no la infiere sola
function emptyError():never{
    throw new Error("EL objeto enviaod esta vacio")
}


// Gracias al never de arriba, TS sabe que la rama del if nunca continua.
// Por eso infiere que esta funcion devuelve string, y no string | undefined
function fucninA(str:string){

    if(str === ""){
        emptyError()
    } else{
        return str.toUpperCase()
    }
    
}


// Interface: describe la forma de un objeto. No genera codigo, se borra al compilar
interface Usuario{
    readonly id:number                       // solo lectura despues de crear
    nombre:string
    edad: number
    rol: "admin" | "usuario" | "operario"    // union de literales: solo esos tres valores
    email?:string                            // opcional, el tipo real es string | undefined
}

// extends: hereda todas las propiedades y suma las propias
interface Admin extends Usuario{
    contraseña:string
}

let usuario: Usuario

// El objeto tiene que traer todas las propiedades obligatorias.
// Si falta una, o sobra una que no esta en la interface, no compila
usuario = {id: 1, nombre: "nahuel", edad: 5, rol:"admin", email:"email@gmail.com"}


// Partial<T>: utility type que convierte todas las propiedades en opcionales.
// Sirve para actualizaciones parciales, donde solo mandas los campos que cambian
let usuarioOpcional: Partial<Usuario>

usuarioOpcional = {rol:"admin"}

// No compila: id es readonly
//usuario.id = 5


// Tres formas de trabajar con una propiedad opcional:

// 1) Guarda explicita: dentro del if, TS sabe que email es string
if(usuario.email) usuario.email.toLowerCase()

// 2) Optional chaining: si es undefined corta y devuelve undefined, no rompe
usuario.email?.toLocaleUpperCase()

// 3) Non-null assertion: le prometemos al compilador que no es undefined.
//    NO verifica nada en runtime, se borra al compilar. Si mentimos, explota
usuario.email!.toLocaleUpperCase()


// type alias: nombra una union. Una interface no puede expresar esto
type binario = 0 | 1

let valor: number | string
let valorBinario: binario


// Union discriminada: la propiedad estado hace de discriminante.
// Generico <T>: el tipo de los datos entra desde afuera
type EstadoCarga<T> =
 | { estado: 'cargando' }
 | { estado: 'exito'; datos: T }
 | { estado: 'error'; mensaje: string }


function render(s: EstadoCarga<Usuario[]>) {
 // El switch sobre el discriminante angosta el tipo en cada rama
 switch (s.estado) {
    case 'cargando': return 'Cargando...'
    case 'exito': return s.datos.length // TS sabe que existe datos
    case 'error': return s.mensaje // y aca que existe mensaje
    default: 
              // Chequeo exhaustivo: si estan todos los casos cubiertos,
              // aca no queda ninguna variante y s es never.
              // Al agregar un estado nuevo a EstadoCarga sin su case,
              // esta linea deja de compilar
              let _error:never = s
 }
}