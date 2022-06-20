import { AttachmentType, AttachmentFolderOnEntity } from '@app-shared/enums/attachment.enum';

interface IUploadFile {
    contentBase64: string;
    name: string;
    type: AttachmentType;
    folderOnEntity: AttachmentFolderOnEntity;
}

export { IUploadFile };
