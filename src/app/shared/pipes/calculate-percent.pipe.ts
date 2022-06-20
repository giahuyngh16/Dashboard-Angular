import { Pipe, PipeTransform } from '@angular/core';

import { DECIMAL_NUMBER } from '@app-shared/constants/common.const';

@Pipe({name: 'calculatePercent'})
export class CalculatePercentPipe implements PipeTransform {
  transform(value: any, total: number): any {
     total = total || DECIMAL_NUMBER.ONE;
     return `${value} (${(value/total * 100).toFixed(DECIMAL_NUMBER.TWO)}%)` ;
  }
}
