/* ============================================================
   TABLA DE RUTAS
   ============================================================
   Cada ruta asocia una URL con un componente. Angular busca la
   primera que matchee y renderiza ese componente adentro del
   <router-outlet>.

   En esta clase todavia esta vacia: la app muestra un unico
   componente fijo desde app.html. Se completa en la clase de
   ruteo.
   ============================================================ */

import { Routes } from '@angular/router';

export const routes: Routes = [
  // Asi se veria una ruta cuando la usemos:
  //
  //   { path: '',          component: Home },              // la raiz
  //   { path: 'productos', component: ListaProductos },
  //   { path: 'productos/:id', component: DetalleProducto }, // parametro
  //   { path: '**',        component: NotFound },          // comodin, va SIEMPRE ultimo
  //
  // Version con lazy loading (el componente se descarga recien
  // cuando se entra a la ruta):
  //
  //   { path: 'productos', loadComponent: () => import('./productos/productos').then(m => m.Productos) },
];
