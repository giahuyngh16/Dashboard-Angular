import { Injector, Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { Observable } from 'rxjs';

import { FILE_API_PATH } from '@app-core/constants/file.const';
import { AttachmentType } from '@app-shared/enums/attachment.enum';

import { IUploadFile } from '@app-core/interfaces/file.interface';
import { IAttachment } from '@app-shared/interfaces/attachment.interface';

@Injectable({
    providedIn: 'root'
})
export class FileService extends BaseService {

    constructor(injector: Injector) {
        super(injector);
    }

    upload(body: IUploadFile[]): Observable<IAttachment[]> {
        return this.requestWithLoading().post(`${FILE_API_PATH.ROOT}/${FILE_API_PATH.UPLOAD}`, body);
    }

    getBase64(file): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const fileModel = {
                    content : reader.result,
                    name: file.name,
                    size: file.size,
                    lastModifiedDate : file.lastModifiedDate,
                    type: AttachmentType.SystemFile,
                    underlyingFile: file
                };
                resolve(fileModel);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    }
}
