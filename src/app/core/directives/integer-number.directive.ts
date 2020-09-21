import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appIntegerNumber]'
})
export class IntegerNumberDirective {

  private _min: number;
  private _max: number;

  @Input()
  set min(v: number) {
    this._min = v === undefined || v === null ? v : +v;
  }
  get min(): number {
    return this._min;
  }

  @Input()
  set max(v: number) {
    this._max = v === undefined || v === null ? v : +v;
  }
  get max(): number {
    return this._max;
  }

  constructor(
    private el: ElementRef,
    @Optional() private control?: NgControl
  ) { }

  setValue(v: number): void {
    if (this.control) {
      this.control.control.setValue(v);
    } else {
      this.el.nativeElement.value = v;
    }
  }

  @HostListener('input') onInput(): void {
    if (
      this.el.nativeElement.value === '' ||
      this.el.nativeElement.value === null ||
      this.el.nativeElement.value === undefined
    ) {
      return;
    }

    const value = +this.el.nativeElement.value;
    if (Number.isInteger(this.min) && this.min > value) {
      this.setValue(this.min);
    } else if (Number.isInteger(this.max) && this.max > value) {
      this.setValue(this.max);
    } else if (!Number.isInteger(value)) {
      this.setValue(Math.floor(value));
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    if (event.key === '.') {
      event.preventDefault();
    }
  }
}
