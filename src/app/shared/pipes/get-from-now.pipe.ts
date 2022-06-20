import { Pipe, PipeTransform } from '@angular/core';
import { calculateDaysToNow } from '@app-core/helpers/sts-utils';


@Pipe({
    name: 'getFromNow',
})
export class GetFromNowPipe implements PipeTransform {
    transform(date: Date): string {
        return calculateDaysToNow(date.toString()).replace('ago', 'left');
    }
}
