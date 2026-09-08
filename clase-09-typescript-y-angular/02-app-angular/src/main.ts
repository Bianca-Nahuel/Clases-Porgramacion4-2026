/* ============================================================
   PUNTO DE ENTRADA DE LA APLICACION
   ============================================================
   Este es el primer archivo que se ejecuta en el navegador.
   Su unico trabajo es arrancar Angular montando el componente
   raiz adentro de <app-root>, el tag que esta en index.html.
   ============================================================ */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// bootstrapApplication(componenteRaiz, configuracion)
// Es la forma standalone, sin NgModule. Desde Angular 17 es la
// manera recomendada de arrancar una app.
bootstrapApplication(App, appConfig)
  // Devuelve una promesa: si algo falla al arrancar (un provider
  // mal configurado, un import roto), cae aca.
  .catch((err) => console.error(err));
