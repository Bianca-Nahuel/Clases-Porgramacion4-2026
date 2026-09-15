import { Routes } from '@angular/router';
import { SingalTest } from './singal-test/singal-test';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
    {path:"s", pathMatch:"full",redirectTo:"inicio"},
    {path:"inicio",component:Inicio},
    {path:"tareas",loadComponent:() => import('./Tarea/lista-tareas/lista-tareas').then( a => a.ListaTareas) },
    {path:"tareas/:id",loadComponent:() => import('./Tarea/tarea-detail/tarea-detail').then(a => a.TareaDetail)},
    {path:"signal",component:SingalTest},  
];
