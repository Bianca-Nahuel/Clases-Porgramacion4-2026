import { Component, computed, inject, input, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../../models/tarea';
import { CardTarea } from '../card-tarea/card-tarea';
import { FieldSearch } from '../../comons/field-search/field-search';
import { CantTareasPipe } from '../Pipes/cant-tareas-pipe';
import { Router } from '@angular/router';

@Component({
  imports: [CardTarea, FieldSearch, CantTareasPipe],
  selector: 'app-lista-tareas',
  styleUrl: './lista-tareas.css',
  templateUrl: './lista-tareas.html',
})
export class ListaTareas {
  router = inject(Router)
  arr = signal<Tarea[]>([])
  field = signal("")
  query = signal("")
  name = input<string | undefined>()
  arrFiltro = computed( ()=> this.arr().filter((e) => e.descripcion.includes(this.name() ?? "" )  ) )

  cantTareasComp = computed(   () =>  { 
    console.log("comp")
    return this.arr().length 
  } )
  


  agregar(){
    let aux:Tarea = {id:this.arr.length, descripcion:this.field(), estaCompletada:false}
    this.arr.update(
      (tarea) => [...tarea,aux]
     )
    this.field.set("")
  }

  buscar(){
    this.router.navigate(['/tareas'],{queryParams:{name: this.query()}})
  }

  tareaToggle(t:Tarea,estado:boolean){
    t.estaCompletada = estado
    console.log(t)
  }

  cantTareas(){
    console.log("fun")
    return this.arr().length
  }

}
