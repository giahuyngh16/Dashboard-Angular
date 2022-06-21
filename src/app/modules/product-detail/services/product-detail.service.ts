import { PRODUCT_DETAIL_API_PATH } from './../constants/product-detail-api-path.const';
import { IResponse } from './../../../core/interfaces/response.interface';
import { IFilterResponse } from '../../../core/interfaces/filter-response.interface';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '@app-core/services/base.service';
import { IProductDetail, IProductDetailFilter } from '../interfaces/product-detail.interface';
import { map } from 'rxjs/operators';


@Injectable()
export class ProductDetailService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getProductDetails(params: IProductDetailFilter): Observable<IResponse<IFilterResponse<IProductDetail[]>>> {
    return this.requestWithLoading().get(`${PRODUCT_DETAIL_API_PATH.ROOT}`, params);
  }

  createProductDetail(model: IProductDetail): Observable<string> {
    return this.requestWithLoading().post(PRODUCT_DETAIL_API_PATH.CREATE, model);
  }

  getProductDetail(id: number): Observable<IProductDetail> {
    return this.get(`${PRODUCT_DETAIL_API_PATH.GET}/?id=${id}`).pipe(map((dataResponse) => dataResponse && dataResponse.data));
  }

  updateProductDetail(body: IProductDetail): Observable<any> {
    return this.requestWithLoading().put(`${PRODUCT_DETAIL_API_PATH.UPDATE}`, body);
  }

}
