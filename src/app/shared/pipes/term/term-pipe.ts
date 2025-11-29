import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'term',
})
export class TermPipe implements PipeTransform {
  transform(value: string): unknown {
    return value.split(' ', 3).join(' ');
  }
}
