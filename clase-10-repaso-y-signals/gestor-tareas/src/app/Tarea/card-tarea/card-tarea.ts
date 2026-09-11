import { Component, input, output } from '@angular/core';
import { Tarea } from '../../../models/tarea';

@Component({
  imports: [],
  selector: 'app-card-tarea',
  styleUrl: './card-tarea.css',
  templateUrl: './card-tarea.html',
})
export class CardTarea {
  tarea = input.required<Tarea>()
  toggle = output<boolean>()

  onClick(){
    this.toggle.emit(!this.tarea().estaCompletada)
  }

}
