import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AttachmentType } from '@app-shared/enums/attachment.enum';

import { IWebLink } from '@app-shared/interfaces/web-link.interface';
import { IAttachment } from '@app-shared/interfaces/attachment.interface';

@Component({
    selector: 'app-sts-web-link',
    templateUrl: 'sts-web-link.component.html',
    styleUrls: ['sts-web-link.component.scss']
})

export class STSWebLinkComponent implements OnInit {

    @Input() links: IAttachment[] = [];
    @Input() placeholder = 'http://...';

    @Output() linksChange = new EventEmitter<IAttachment[]>();

    focused = false;
    regExpLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    $subject = new Subject();

    constructor() { }

    ngOnInit() {
        this.$subject.pipe(debounceTime(1000)).subscribe(() => {
            this.linksChange.emit(this.links);
        });
    }

    onAddWebLink(): void {
        this.links.push({
            name: null,
            link: null,
            type: AttachmentType.WebLink
        } as IAttachment);

        this.$subject.next();
    }

    onDeleteWebLink(index: number): void {
        this.links.splice(index, 1);
        this.$subject.next();
    }

    redirect(link: string) {
        if (link && this.isValidLink(link)) {
            link = link.includes('http') ? link : 'https://' + link;
            window.open(link , '_blank');
        }
    }

    isValidLink(link: string) {
        if (!link) {
            return true;
        }
        return link.match(new RegExp(this.regExpLink));
    }
}
