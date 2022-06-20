import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { APP_MESSAGE } from '@app-core/constants/messages.const';
import { IRequestError } from '@app-core/interfaces/request-error.interface';
import { ROUTING_PATH } from '@app-core/routings';
import { StaffService } from '@app-modules/staff/services/staff.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.scss']
})
export class StaffCreateComponent implements OnInit {
  formGroup: FormGroup;
  isSubmited = false;

  constructor(
    private _router: Router,
    private _staffService: StaffService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService
  ) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      staff: new FormControl(null, Validators.required),
    });
  }

  onSave(isClose = false): void {
    this.isSubmited = true;
    if (this.formGroup.invalid) {
      return;
    }

    const staff = this.formGroup.get('staff').value;
    this._staffService.createStaff(staff).subscribe(
      (staffId) => {
        this._nzNotificationService.success(
          APP_MESSAGE.NOTIFICATION.TITLE.SUCCESS,
          APP_MESSAGE.STAFF.CREATE_SUCCESS,
          APP_CONFIG.CONFIG_SUCCESS_NOTIFICATION
        );
        if (isClose) {
          this._router.navigate([ROUTING_PATH.STAFF.ROOT]);
        } else {
          this._router.navigate([
            ROUTING_PATH.STAFF.UPDATE_STAFF,
            staffId,
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
