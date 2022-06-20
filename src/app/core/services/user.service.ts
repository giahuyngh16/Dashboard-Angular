import { Injectable, Injector } from '@angular/core';

import { BaseService } from '@app-core/services/base.service';
import { Observable } from 'rxjs';
import { MASTER_DATA_API_PATH } from '@app-core/constants/master-data-api-path.const';

@Injectable()
export class UserService extends BaseService {
    constructor(injector: Injector) {
        super(injector);
    }

    getUserDetails(empCode: string): Observable<{id: number}> {
        return this.get(
            `${MASTER_DATA_API_PATH.USER_DETAILS}?empCode=${empCode}`
        );
    }
}
