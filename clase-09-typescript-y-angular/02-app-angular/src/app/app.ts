/* ============================================================
   COMPONENTE RAIZ
   ============================================================
   Todo lo que se ve en pantalla cuelga de este componente.
   Un componente en Angular son tres cosas juntas:
     - una clase TypeScript  -> los datos y la logica
     - un template HTML      -> la vista
     - una hoja CSS          -> los estilos, encapsulados
   El decorador @Component es lo que las une.
   ============================================================ */

import { Component, signal } from '@angular/core';
import { ComponenteTest } from './componente-test/componente-test';

@Component({
  // Los componentes y directivas que USA el template.
  // Si sacas ComponenteTest de aca, <app-componente-test> en
  // app.html deja de compilar. Esto reemplaza a los NgModule:
  // cada componente declara sus propias dependencias.
  imports: [ComponenteTest],

  // El tag HTML con el que se instancia. index.html tiene
  // <app-root></app-root>: por eso este selector.
  selector: 'app-root',

  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // signal() es la forma moderna de guardar estado reactivo en
  // Angular. Envuelve un valor y avisa a la vista cuando cambia.
  //   leer:      title()
  //   escribir:  title.set('otro')  /  title.update(v => v + '!')
  // No se usa en esta demo, viene con el proyecto generado por
  // el CLI. Se ve en detalle mas adelante.
  protected readonly title = signal('app-clase9');
}
