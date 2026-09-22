import { inject, Service, Signal, signal } from '@angular/core';
import { Producto } from '../producto-model';
import { HttpClient, httpResource } from '@angular/common/http';



@Service()
export class Productos {
    private http = inject(HttpClient)
    private baseUrl = 'http://localhost:3000/productos'   
    
    getProductById(id: Signal<string>){
        return httpResource<Producto>( () => `${this.baseUrl}/${id()}`)
    }

    filterProducts(nombre: Signal<string | undefined>){
        return httpResource<Producto[]>(() => {
            return {
            url: this.baseUrl,
            params: {nombre_like:nombre() ?? ""} 
        } 
    } )
    }

    comprar(producto:Partial<Producto>){
        producto.stock! -= 1
        return this.http.patch<Producto>(`${this.baseUrl}/${producto.id}`,producto)
    }

}
