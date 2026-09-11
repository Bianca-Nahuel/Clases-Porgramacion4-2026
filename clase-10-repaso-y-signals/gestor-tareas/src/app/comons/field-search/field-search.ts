import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-field-search',
  styleUrl: './field-search.css',
  templateUrl: './field-search.html',
})
export class FieldSearch {
  field = model<string>()
  enviar = output()

  onClick(){
    this.enviar.emit()
  }
}
