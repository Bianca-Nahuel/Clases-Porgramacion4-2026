import { Component } from '@angular/core';
// FormsModule trae la directiva ngModel: sin este import, [(ngModel)] no compila
import { FormsModule } from '@angular/forms';

@Component({
  // Lo que el template necesita. Reemplaza a los NgModule: cada componente declara sus dependencias
  imports: [FormsModule],
  // El nombre del tag con el que se usa este componente en otro template
  selector: 'app-componente-test',
  // Los estilos, encapsulados: no se escapan a otros componentes
  styleUrl: './componente-test.css',
  // La vista, en archivo aparte. Si fuera corta se podria escribir en linea con template
  templateUrl: './componente-test.html',
  // No hace falta standalone: true, es el comportamiento por defecto desde la v19
})
export class ComponenteTest {
  // Ninguna propiedad esta anotada: TypeScript infiere el tipo del valor inicial
  obj = {title:"Hola Mundo"}   // inferido: { title: string }
  num = 0                      // inferido: number
  type = "text"                // inferido: string
  texto=""                     // inferido: string

  arr=['a','b','c','d']

  // : void indica que no devuelve nada util. Es opcional pero conviene anotarlo.
  // La logica vive aca, no en el HTML
  add():void {
    this.num++
  }

}