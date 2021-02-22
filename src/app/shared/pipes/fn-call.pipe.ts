import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fnCall'
})
export class FnCallPipe implements PipeTransform {

  transform(fn: (...args: any[]) => any, ...args: any[]): any {
    return fn(...args);
  }

}
