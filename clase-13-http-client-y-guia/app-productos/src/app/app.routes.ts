import { Routes } from '@angular/router';
import { ListaProductos } from './Producto/lista-productos/lista-productos';
import { ProductoDetail } from './Producto/producto-detail/producto-detail';

export const routes: Routes = [
    {path:"", redirectTo:"productos",pathMatch:'full'},
    {path:"productos",component:ListaProductos},
    {path:"productos/:id",component:ProductoDetail}

];
