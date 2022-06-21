import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { APP_MESSAGE } from '@app-core/constants/messages.const';
import { IRequestError } from '@app-core/interfaces/request-error.interface';
import { ROUTING_PATH } from '@app-core/routings';
import { ProductDetailService } from '@app-modules/product-detail/services/product-detail.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-product-detail-create',
  templateUrl: './product-detail-create.component.html',
  styleUrls: ['./product-detail-create.component.scss']
})
export class ProductDetailCreateComponent implements OnInit {
  formGroup: FormGroup;
  isSubmited = false;

  constructor(
    private _router: Router,
    private _productDetailService: ProductDetailService,
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

    const productDetail = this.formGroup.value;
    this._productDetailService.createProductDetail(productDetail).subscribe(
      (productDetailId) => {
        this._nzNotificationService.success(
          APP_MESSAGE.NOTIFICATION.TITLE.SUCCESS,
          APP_MESSAGE.PRODUCT_DETAIL.CREATE_SUCCESS,
          APP_CONFIG.CONFIG_SUCCESS_NOTIFICATION
        );
        if (isClose) {
          this._router.navigate([ROUTING_PATH.PRODUCT_DETAIL.ROOT]);
        } else {
          this._router.navigate([
            ROUTING_PATH.PRODUCT_DETAIL.UPDATE,
            productDetailId,
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
    this._router.navigate(['./product-detail']);
  }

  onCancel() {
    if (this.formGroup.dirty) {
      this._nzModalService.confirm({
        nzTitle: 'Confirm',
        nzContent: APP_MESSAGE.CONFIRM_MESSAGE,
        nzOnOk: () => {
          this._router.navigate([ROUTING_PATH.PRODUCT_DETAIL.ROOT]);
        },
      });
    } else {
      this.back();
    }
  }
}
