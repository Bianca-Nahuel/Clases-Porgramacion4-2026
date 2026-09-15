import { Component, input, output } from '@angular/core';
import { Tarea } from '../../../models/tarea';
import { UpperCasePipe } from '@angular/common';
import { CompletadaPipe } from '../Pipes/completada-pipe';

@Component({
  imports: [UpperCasePipe, CompletadaPipe],
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
