import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { APP_MESSAGE } from '@app-core/constants/messages.const';
import { IRequestError } from '@app-core/interfaces/request-error.interface';
import { ROUTING_PATH } from '@app-core/routings';
import { AuthService } from '@app-core/services/auth.service';
import { IStaffForm } from '@app-modules/staff/interfaces/staff.interface';
import { StaffService } from '@app-modules/staff/services/staff.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-staff-update',
  templateUrl: './staff-update.component.html',
  styleUrls: ['./staff-update.component.scss']
})
export class StaffUpdateComponent implements OnInit {
  formGroup: FormGroup;
  isSubmited = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _staffService: StaffService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap
    .pipe(
        map((paramMap) => paramMap.get('id')),
        switchMap((id) => this._staffService.getStaff(Number(id)))
    )
    .subscribe((staff) => {
        const staffModel = {
            id: staff.id,
            fullName: staff.fullName,
            phoneNumber: staff.phoneNumber,
            email: staff.email,
            address: staff.address
        } as IStaffForm;
        this.formGroup = new FormGroup({
            staff: new FormControl(staffModel, Validators.required),
        });
    });
  }

  onSave(isClose = false): void {
    this.isSubmited = true;
    if (this.formGroup.invalid) {
        return;
    }

    const staff = this.formGroup.get('staff').value;
    this._staffService
        .updateStaff(staff.id, { ...staff })
        .subscribe(
            () => {
                this._nzNotificationService.success(
                    APP_MESSAGE.NOTIFICATION.TITLE.SUCCESS,
                    APP_MESSAGE.STAFF.UPDATED_SUCCESS,
                    APP_CONFIG.CONFIG_SUCCESS_NOTIFICATION
                );
                if (isClose) {
                    this._router.navigate([ROUTING_PATH.STAFF.ROOT]);
                } else {
                    this._router.navigate([
                        ROUTING_PATH.STAFF.UPDATE_STAFF,
                        staff.id,
                    ]);
                }
            },
            (error: IRequestError) => {
                error &&
                    this._nzNotificationService.error(
                        APP_MESSAGE.NOTIFICATION.TITLE.ERROR,
                        error.message,
                        APP_CONFIG.CONFIG_ERROR_NOTIFICATION
                    );
            }
        );
}

  back(): void {
    this._router.navigate(['./staff']);
  }

  onCancel() {
    if (this.formGroup.dirty) {
      this._nzModalService.confirm({
        nzTitle: 'Confirm',
        nzContent: APP_MESSAGE.CONFIRM_MESSAGE,
        nzOnOk: () => {
          this._router.navigate([ROUTING_PATH.STAFF.ROOT]);
        },
      });
    } else {
      this.back();
    }
  }

}
