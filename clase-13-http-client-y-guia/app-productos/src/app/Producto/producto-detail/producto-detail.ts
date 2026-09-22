import { Component, computed, inject, input } from '@angular/core';
import { Productos } from '../../Productos/productos';
import { Producto } from '../../producto-model';


@Component({
  imports: [],
  selector: 'app-producto-detail',
  styleUrl: './producto-detail.css',
  templateUrl: './producto-detail.html',
})
export class ProductoDetail {
  productosService = inject(Productos)
  id = input.required<string>()
  producto = this.productosService.getProductById(this.id)

  comprar(){
    let compra:Partial<Producto> = {id:this.producto.value()!.id, stock:this.producto.value()!.stock} 
    this.productosService.comprar(compra).subscribe(
      {
        next: () => this.producto.reload()
      }
    )
  }

}
