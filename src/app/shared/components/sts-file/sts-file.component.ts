import { Component, OnInit, Input } from '@angular/core';

import { AttachmentType } from '@app-shared/enums/attachment.enum';

import { IAttachment } from '@app-shared/interfaces/attachment.interface';

@Component({
    selector: 'app-sts-file',
    templateUrl: './sts-file.component.html',
    styleUrls: ['./sts-file.component.scss']
})
export class StsFileComponent implements OnInit {
    @Input() file: IAttachment;

    constructor() { }

    ngOnInit() {}

    openFile() {
        window.open(this.file.type === AttachmentType.WebLink ?
            (this.file.link.includes('http') ? this.file.link : 'https://' + this.file.link) : this.file.preview, '_blank');
    }

}
