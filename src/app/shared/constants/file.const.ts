import { UploadFileStatus } from 'ng-zorro-antd';

import { IContactFileType } from '@app-shared/interfaces/attachment.interface';

export const FILE_STATUS: { [key: string]: UploadFileStatus } = {
    DONE: 'done',
    UPLOADING: 'uploading',
    ERROR: 'error',
};

export const MODE = {
    LINK: 'link',
    FILE: 'file'
};

export const ATTACHMENT_FOLDER_ON_ENTITY = {
};

export const ATTACHMENT_TYPE = {
    GoogleDrive: 1,
    WebLink: 2,
    SystemFile: 3,
};

export const MAX_FILE_SIZE = 25 * 1024 * 1024;
