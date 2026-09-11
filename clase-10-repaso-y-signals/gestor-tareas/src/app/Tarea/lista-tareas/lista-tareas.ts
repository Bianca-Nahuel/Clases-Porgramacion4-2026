import { Component, computed, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../../models/tarea';
import { CardTarea } from '../card-tarea/card-tarea';
import { FieldSearch } from '../../comons/field-search/field-search';

@Component({
  imports: [CardTarea, FieldSearch],
  selector: 'app-lista-tareas',
  styleUrl: './lista-tareas.css',
  templateUrl: './lista-tareas.html',
})
export class ListaTareas {
  arr = signal<Tarea[]>([])
  field = signal("")
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

  tareaToggle(t:Tarea,estado:boolean){
    t.estaCompletada = estado
    console.log(t)
  }

  cantTareas(){
    console.log("fun")
    return this.arr().length
  }

}
