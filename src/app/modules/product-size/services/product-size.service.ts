import { PRODUCT_SIZE_API_PATH } from './../constants/product-size-api-path.const';
import { IResponse } from './../../../core/interfaces/response.interface';
import { IFilterResponse } from '../../../core/interfaces/filter-response.interface';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '@app-core/services/base.service';
import { IProductSize, IProductSizeFilter } from '../interfaces/product-size.interface';
import { map } from 'rxjs/operators';


@Injectable()
export class ProductSizeService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getProductSizes(params: IProductSizeFilter): Observable<IResponse<IFilterResponse<IProductSize[]>>> {
    return this.requestWithLoading().get(`${PRODUCT_SIZE_API_PATH.ROOT}`, params);
  }

  createProductSize(model: IProductSize): Observable<string> {
    return this.requestWithLoading().post(PRODUCT_SIZE_API_PATH.CREATE, model);
  }

  getProductSize(id: number): Observable<IProductSize> {
    return this.get(`${PRODUCT_SIZE_API_PATH.GET}/?id=${id}`).pipe(map((dataResponse) => dataResponse && dataResponse.data));
  }

  updateProductSize(body: IProductSize): Observable<any> {
    return this.requestWithLoading().put(`${PRODUCT_SIZE_API_PATH.UPDATE}`, body);
  }

}
