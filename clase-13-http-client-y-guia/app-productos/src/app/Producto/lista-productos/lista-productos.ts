import { Component, computed, inject, input, signal } from '@angular/core';
import { TarjetaProducto } from '../tarjeta-producto/tarjeta-producto';
import { Buscador } from '../../buscador/buscador';
import { Router, RouterLink } from '@angular/router';
import { Productos } from '../../Productos/productos';


@Component({
  imports: [TarjetaProducto, Buscador, RouterLink],
  selector: 'app-lista-productos',
  styleUrl: './lista-productos.css',
  templateUrl: './lista-productos.html',
})
export class ListaProductos {
  router = inject(Router)
  productosService = inject(Productos)
  nombre = input<string | undefined>()
  listaProductos = this.productosService.filterProducts(this.nombre)
  

  filtrar(campo:string){
    this.router.navigate(['productos'],{queryParams:{nombre:campo}})
  }

  
}
