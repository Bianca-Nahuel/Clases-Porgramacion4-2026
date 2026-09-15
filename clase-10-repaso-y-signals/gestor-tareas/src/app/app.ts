import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ListaTareas } from './Tarea/lista-tareas/lista-tareas';
import { SingalTest } from './singal-test/singal-test';

@Component({
  imports: [RouterOutlet, RouterLinkWithHref],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('gestor-tareas');
}
