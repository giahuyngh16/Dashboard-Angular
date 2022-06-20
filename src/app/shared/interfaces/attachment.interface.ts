import { AttachmentType, AttachmentFolderOnEntity } from '@app-shared/enums/attachment.enum';

export interface IAttachment {
    id: number;
    name: string;
    link: string;
    fileExtension: string;
    type: AttachmentType;
    folderOnEntity: AttachmentFolderOnEntity;
    key: string;
    estimateNote?: string;

    status?: string;
    statusName?: string;
    preview?: string;
}

export interface IContactFileType {
    name: string;
    postfix: string;
}
