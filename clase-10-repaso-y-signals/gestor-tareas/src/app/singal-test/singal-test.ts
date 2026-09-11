import { Component, signal } from '@angular/core';
import { FieldSearch } from '../comons/field-search/field-search';

@Component({
  imports: [FieldSearch],
  selector: 'app-singal-test',
  styleUrl: './singal-test.css',
  templateUrl: './singal-test.html',
})
export class SingalTest {
  readonly cantidad = signal(0)
  readonly campo = signal("")


  reiniciar(){
    this.cantidad.set(0)
  }


  sumar(){
    this.cantidad.update( (n) =>  n + 1 )
  }
}
