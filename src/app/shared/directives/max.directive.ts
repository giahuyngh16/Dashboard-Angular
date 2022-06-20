import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appMax]',
})
export class MaxDirective {
    @Input() max: number;

    constructor(private _control: NgControl) {}

    @HostListener('keyup')
    onKeyUp() {
        if (this.max && this._control.value > this.max) {
            this._control.reset(this.max);
        }
    }
}
