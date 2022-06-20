import { AttachmentType } from '@app-shared/enums/attachment.enum';

export interface IWebLink {
    name: string;
    link: string;
    type: AttachmentType;
}
