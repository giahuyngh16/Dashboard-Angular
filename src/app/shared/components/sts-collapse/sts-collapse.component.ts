import {
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-sts-collapse',
    templateUrl: './sts-collapse.component.html',
    styleUrls: ['./sts-collapse.component.scss'],
})
export class StsCollapseComponent implements OnInit {
    @Input() headerText: string;
    @Input() isActive = true;

    @HostBinding('class.border')
    @Input()
    isBordered = true;

    @Output() isActiveChange = new EventEmitter<boolean>();
    constructor() {}

    ngOnInit() {}

    togglePanel(): void {
        this.isActive = !this.isActive;
        this.isActiveChange.emit(this.isActive);
    }
}
