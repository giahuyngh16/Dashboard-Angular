import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appOnlyNumber]',
})
export class OnlyNumberDirective {
    private navigationKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'Clear',
        'Copy',
        'Paste',
    ];
    private _KEYCODES = { ZERO: 48, NINE: 57, NUMPAD_0: 96, NUMPAD_9: 105 };

    inputElement: HTMLElement;
    constructor(private _elementRef: ElementRef) {
        this.inputElement = _elementRef.nativeElement;
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (
            this.navigationKeys.indexOf(event.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
            (event.key === 'a' && event.ctrlKey === true) || // Allow: Ctrl+A
            (event.key === 'c' && event.ctrlKey === true) || // Allow: Ctrl+C
            (event.key === 'v' && event.ctrlKey === true) || // Allow: Ctrl+V
            (event.key === 'x' && event.ctrlKey === true) || // Allow: Ctrl+X
            (event.key === 'a' && event.metaKey === true) || // Allow: Cmd+A (Mac)
            (event.key === 'c' && event.metaKey === true) || // Allow: Cmd+C (Mac)
            (event.key === 'v' && event.metaKey === true) || // Allow: Cmd+V (Mac)
            (event.key === 'x' && event.metaKey === true) // Allow: Cmd+X (Mac)
        ) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if (
            (event.shiftKey ||
                event.keyCode < this._KEYCODES.ZERO ||
                event.keyCode > this._KEYCODES.NINE) &&
            (event.keyCode < this._KEYCODES.NUMPAD_0 ||
                event.keyCode > this._KEYCODES.NUMPAD_9)
        ) {
            event.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const pastedInput: string = event.clipboardData
            .getData('text/plain')
            .replace(/\D/g, ''); // get a digit-only string
        document.execCommand('insertText', false, pastedInput);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        const textData = event.dataTransfer.getData('text').replace(/\D/g, '');
        this.inputElement.focus();
        document.execCommand('insertText', false, textData);
    }
}
