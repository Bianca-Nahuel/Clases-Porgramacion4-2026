import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-buscador',
  styleUrl: './buscador.css',
  templateUrl: './buscador.html',
})
export class Buscador {
  campoBusqueda = signal("")
  buscar = output<string>()

  onBuscar(){
    this.buscar.emit(this.campoBusqueda());
    this.campoBusqueda.set("")
  }

}
