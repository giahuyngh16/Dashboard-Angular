import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { APP_MESSAGE } from '@app-core/constants/messages.const';
import { IRequestError } from '@app-core/interfaces/request-error.interface';
import { ROUTING_PATH } from '@app-core/routings';
import { ProductSizeService } from '@app-modules/product-size/services/product-size.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-product-size-create',
  templateUrl: './product-size-create.component.html',
  styleUrls: ['./product-size-create.component.scss']
})
export class ProductSizeCreateComponent implements OnInit {
  formGroup: FormGroup;
  isSubmited = false;

  constructor(
    private _router: Router,
    private _productSizeService: ProductSizeService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService
  ) { }

  ngOnInit() {
    
  }

  onSave(isClose = false): void {
    this.isSubmited = true;
    if (this.formGroup.invalid) {
      return;
    }

    const productSize = this.formGroup.value;
    this._productSizeService.createProductSize(productSize).subscribe(
      (productSizeId) => {
        this._nzNotificationService.success(
          APP_MESSAGE.NOTIFICATION.TITLE.SUCCESS,
          APP_MESSAGE.PRODUCT_SIZE.CREATE_SUCCESS,
          APP_CONFIG.CONFIG_SUCCESS_NOTIFICATION
        );
        if (isClose) {
          this._router.navigate([ROUTING_PATH.PRODUCT_SIZE.ROOT]);
        } else {
          this._router.navigate([
            ROUTING_PATH.PRODUCT_SIZE.UPDATE,
            productSizeId,
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
    this._router.navigate(['./product-size']);
  }

  onCancel() {
    if (this.formGroup.dirty) {
      this._nzModalService.confirm({
        nzTitle: 'Confirm',
        nzContent: APP_MESSAGE.CONFIRM_MESSAGE,
        nzOnOk: () => {
          this._router.navigate([ROUTING_PATH.PRODUCT_SIZE.ROOT]);
        },
      });
    } else {
      this.back();
    }
  }
}
