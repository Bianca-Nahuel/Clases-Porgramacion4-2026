/* ============================================================
   CONFIGURACION GLOBAL DE LA APLICACION
   ============================================================
   Aca se registran los "providers": los servicios y features
   que van a estar disponibles en TODA la app via inyeccion de
   dependencias (router, HttpClient, animaciones, etc).

   Antes esto vivia en el AppModule. Con componentes standalone
   el NgModule desaparecio y quedo este objeto de configuracion.
   ============================================================ */

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Engancha los errores no manejados del navegador
    // (window.onerror y las promesas rechazadas sin catch)
    // al manejador de errores de Angular.
    provideBrowserGlobalErrorListeners(),

    // Activa el ruteo con la tabla definida en app.routes.ts.
    // Sin esto, <router-outlet> y routerLink no funcionan.
    provideRouter(routes)
  ]
};
