import { Pipe, PipeTransform } from '@angular/core';

type TSortByKeys = 'asc' | 'desc';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {
  transform(value: object, typeSort?: TSortByKeys): Array<any> {
    if (!value) {
      return [];
    }
    if (!typeSort) {
      return Object.keys(value);
    }
    let result = [];
    switch (typeSort) {
      case 'asc':
        result = Object.keys(value).sort();
        break;
      case 'desc':
        result = Object.keys(value).sort(() => -1);
        break;
      default:
        result = Object.keys(value);
    }
    return result;
  }
}
