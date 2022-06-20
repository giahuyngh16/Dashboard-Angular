import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'short'})
export class ShortPipe implements PipeTransform {
    transform(value: string, length = 100): string {
        if (value) {
            return length === value.length ? value : value.substr(0, length) + '...';
        } else {
            return '';
        }
    }
}
