import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-sts-input',
    templateUrl: 'sts-input.component.html',
    styleUrls: ['sts-input.component.scss']
})

export class STSInputComponent implements OnInit, OnDestroy {

    @Input() placeholder = '';
    @Input() icon: string;
    @Input() value: string;
    @Input() isImportedIcon = false;

    @Output() valueChange = new EventEmitter<string>();

    focused = false;
    $subject = new Subject();

    constructor() { }

    ngOnInit() {
        this.$subject.pipe(debounceTime(500)).subscribe(() => {
            this.valueChange.emit(this.value);
        });
    }

    ngOnDestroy() {
        this.$subject.unsubscribe();
    }

    onFocus(): void {
        this.focused = true;
    }

    onBlur(): void {
        this.focused = false;
    }
}
