
import { IFilterResponse } from '../../../core/interfaces/filter-response.interface';
import { ICustomer, ICustomerFilter } from '../interfaces/customer.interface';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '@app-core/services/base.service';
import { CUSTOMER_API_PATH } from '../constants/customer-api-path.const';
import { IResponse } from '@app-core/interfaces/response.interface';


@Injectable()
export class CustomersService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    getUsers(): Observable<[]> {
        return this.requestWithLoading().get(CUSTOMER_API_PATH.ROOT);
    }

    getCustomers(params: ICustomerFilter): Observable<IResponse<IFilterResponse<ICustomer[]>>> {
      return this.requestWithLoading().get(`${CUSTOMER_API_PATH.ROOT}`, params);
    }

}
