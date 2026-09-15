import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-tarea-detail',
  styleUrl: './tarea-detail.css',
  templateUrl: './tarea-detail.html',
})
export class TareaDetail {
  readonly id_tarea = input.required<string>({alias:"id"})
}
