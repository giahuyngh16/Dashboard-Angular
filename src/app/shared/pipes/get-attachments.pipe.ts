import { Pipe, PipeTransform } from '@angular/core';
import { IAttachment } from '@app-shared/interfaces/attachment.interface';
import { AttachmentType } from '@app-shared/enums/attachment.enum';

@Pipe({
    name: 'getAttachments',
})
export class GetAttachmentsPipe implements PipeTransform {
    transform(attachments: IAttachment[], isFile: boolean): IAttachment[] {
      if(!attachments) return [];

      if (isFile) {
            return attachments.filter(
                (attachment) => attachment.type === AttachmentType.SystemFile
            );
        } else {
            return attachments.filter(
                (attachment) => attachment.type === AttachmentType.WebLink
            );
        }
    }
}
