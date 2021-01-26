import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fnCall'
})
export class FnCallPipe implements PipeTransform {

  transform(fn: (...args: unknown[]) => unknown, ...args: unknown[]): unknown {
    return fn(...args);
  }

}
