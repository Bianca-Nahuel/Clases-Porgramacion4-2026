/* ============================================================
   CLASE 7 - PARTE 2: CONSUMIR UNA API CON fetch (CRUD)
   ============================================================
   ANTES DE CORRER ESTE ARCHIVO hay que levantar la API falsa,
   parada en esta misma carpeta:

       npx json-server db.json --port 3001

   Eso publica los datos de db.json como una API REST completa:
       GET    /productos        lista todo
       GET    /productos/eea6   trae uno
       POST   /productos        crea
       PUT    /productos/eea6   reemplaza el recurso ENTERO
       PATCH  /productos/eea6   modifica SOLO los campos enviados
       DELETE /productos/eea6   borra

   Despues, en otra terminal:
       node 02-fetch-crud-json-server.js
   ============================================================ */


// Constantes de configuracion arriba de todo: si manana cambia
// el puerto o el dominio, se toca UN solo lugar.
const BASEURL = "http://localhost:3001/";

// Le avisamos al servidor que el body va en formato JSON.
// OJO: en clase quedo escrito "aplication/json" (con una sola p).
// Escrito asi el servidor puede no parsear el body. Va bien:
const headers = { "Content-Type": "application/json" };

// El cuerpo que vamos a mandar. Como es un PATCH, alcanza con
// los campos que queremos cambiar: el resto queda como estaba.
let producto = { nombre: "Teclado Con Luces" };


/**
 * Actualiza parcialmente el producto de id "eea6".
 *
 * Notas de lectura:
 *  - la funcion es async, asi que devuelve una promesa
 *  - el try/catch atrapa tanto la falla de red como el throw
 *    que hacemos nosotros al ver res.ok en false
 *  - hacer catch para despues throw e parece al pedo, pero
 *    sirve como punto unico donde loguear / transformar el
 *    error antes de que siga subiendo al que llamo
 */
async function actualizarProducto() {
    try {
        let res = await fetch(BASEURL + "productos/eea6", {
            method: "PATCH",              // GET es el default, cualquier otro se declara
            headers: headers,
            body: JSON.stringify(producto) // el body viaja como TEXTO, hay que serializar
        });

        // fetch no tira error con 404 / 500: hay que chequearlo
        if (!res.ok) throw new Error(`HTTP ERROR ${res.status}`);

        // .json() parsea el texto de la respuesta y devuelve promesa
        let data = await res.json();
        return data;

    } catch (e) {
        // Podriamos loguear, reintentar, mostrar un cartel...
        // Aca solo lo dejamos subir a quien llamo la funcion.
        throw e;
    }
}

actualizarProducto()
    .then(res => console.log("Actualizado:", res))
    .catch(e => console.log("Algo fallo:", e.message));


/* ------------------------------------------------------------
   LOS OTROS VERBOS, PARA COMPLETAR EL CRUD
   Descomenta de a uno y mira como queda db.json despues.
   json-server escribe los cambios en el archivo de verdad.
   ------------------------------------------------------------ */

// // LEER todos
// async function getProductos() {
//     const res = await fetch(BASEURL + "productos");
//     if (!res.ok) throw new Error(`HTTP ERROR ${res.status}`);
//     return res.json();
// }

// // CREAR (el id lo genera json-server solo)
// async function crearProducto(nuevo) {
//     const res = await fetch(BASEURL + "productos", {
//         method: "POST",
//         headers,
//         body: JSON.stringify(nuevo)
//     });
//     if (!res.ok) throw new Error(`HTTP ERROR ${res.status}`);
//     return res.json();
// }

// // REEMPLAZAR entero: los campos que no mandes SE PIERDEN.
// // Esa es la diferencia con PATCH.
// async function reemplazarProducto(id, completo) {
//     const res = await fetch(BASEURL + "productos/" + id, {
//         method: "PUT",
//         headers,
//         body: JSON.stringify(completo)
//     });
//     if (!res.ok) throw new Error(`HTTP ERROR ${res.status}`);
//     return res.json();
// }

// // BORRAR (no lleva body)
// async function borrarProducto(id) {
//     const res = await fetch(BASEURL + "productos/" + id, { method: "DELETE" });
//     if (!res.ok) throw new Error(`HTTP ERROR ${res.status}`);
//     return true;
// }
