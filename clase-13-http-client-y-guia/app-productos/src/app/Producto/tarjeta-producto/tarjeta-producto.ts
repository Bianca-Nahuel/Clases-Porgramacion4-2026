import { Component, input } from '@angular/core';
import { Producto } from '../../producto-model';

@Component({
  imports: [],
  selector: 'app-tarjeta-producto',
  styleUrl: './tarjeta-producto.css',
  templateUrl: './tarjeta-producto.html',
})
export class TarjetaProducto {
  producto = input.required<Producto>()
}
