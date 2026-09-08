/* ============================================================
   TEST DEL COMPONENTE RAIZ
   ============================================================
   Se corren con:  npm test   (Vitest, configurado por el CLI)

   TestBed arma un mini-Angular en memoria para poder crear el
   componente sin levantar la app entera.

   Nota: el test que venia por defecto buscaba el texto
   "Hello, app-clase9" en un <h1>. Ese h1 pertenece al template
   de bienvenida del CLI, que reemplazamos por nuestro
   componente, asi que fallaba. Aca esta corregido para
   verificar lo que la app realmente renderiza.
   ============================================================ */

import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {

  // Se ejecuta antes de CADA it(): deja un entorno limpio.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],   // el componente es standalone: se importa, no se declara
    }).compileComponents();
  });

  it('deberia crearse', () => {
    // createComponent devuelve un "fixture": el componente mas
    // las herramientas para inspeccionarlo.
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;   // la instancia de la clase
    expect(app).toBeTruthy();
  });

  it('deberia renderizar el componente hijo', async () => {
    const fixture = TestBed.createComponent(App);

    // whenStable espera a que Angular termine de renderizar
    await fixture.whenStable();

    // nativeElement es el nodo del DOM de verdad
    const compiled = fixture.nativeElement as HTMLElement;

    // El hijo pinta un <h1> con obj.title = "Hola Mundo"
    expect(compiled.querySelector('h1')?.textContent).toContain('Hola Mundo');
  });
});
