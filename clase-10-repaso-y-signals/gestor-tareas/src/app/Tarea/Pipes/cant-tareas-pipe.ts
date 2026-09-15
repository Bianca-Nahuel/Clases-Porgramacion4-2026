import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cantTareas',
  pure:false
})
export class CantTareasPipe implements PipeTransform {
  transform(value: unknown[], ...args: unknown[]): Number {
    return value.length;
  }
}
