import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completada'
})
export class CompletadaPipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): string {
    return value? "completa"  : "pendiente";
  }
}
