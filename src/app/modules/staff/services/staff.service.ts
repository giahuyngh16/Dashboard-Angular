import { IStaffDetails, IStaffForm } from './../interfaces/staff.interface';
import { STAFF_API_PATH } from './../constants/staff-api-path.const';
import { IResponse } from './../../../core/interfaces/response.interface';
import { IFilterResponse } from '../../../core/interfaces/filter-response.interface';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from '@app-core/services/base.service';
import { IStaff, IStaffFilter } from '../interfaces/staff.interface';
import { map } from 'rxjs/operators';


@Injectable()
export class StaffService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }

  getStaffs(params: IStaffFilter): Observable<IResponse<IFilterResponse<IStaff[]>>> {
    return this.requestWithLoading().get(`${STAFF_API_PATH.ROOT}`, params);
  }

  createStaff(model: IStaffForm): Observable<any> {
    return this.requestWithLoading().post(STAFF_API_PATH.CREATE, model);
  }

  getStaff(id: number): Observable<IStaffDetails> {
    return this.get(`${STAFF_API_PATH.GET}/${id}`).pipe(map((dataResponse) => dataResponse && dataResponse.data));
  }

  updateStaff(body: IStaffForm): Observable<any> {
    return this.requestWithLoading().put(`${STAFF_API_PATH.UPDATE}`, body);
  }

}
