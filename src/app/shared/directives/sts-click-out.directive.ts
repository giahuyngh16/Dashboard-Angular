import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStsClickOutside]'
})
export class StsClickOutsideDirective {
  @Output() onClickOutside = new EventEmitter<boolean>();
  private _isMouseOnto = false;
  constructor(private _eRef: ElementRef) { }

  @HostListener('mouseover', ['$event']) onEnter(e: MouseEvent) {
    this._isMouseOnto = true;
  }

  @HostListener('mouseleave', ['$event']) onLeave(e: MouseEvent) {
    this._isMouseOnto = false;
  }
  
  @HostListener('document:mousedown', ['$event']) onClickOutSideListener(e: Event) {
    const target = e.target as HTMLElement;
    if (!this._eRef.nativeElement.contains(target) && !this._isMouseOnto) {
      this.onClickOutside.emit(true);
    } else {
      this.onClickOutside.emit(false);
    }
  }
}
