import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { APP_MESSAGE } from '@app-core/constants/messages.const';
import { IRequestError } from '@app-core/interfaces/request-error.interface';
import { ROUTING_PATH } from '@app-core/routings';
import { AuthService } from '@app-core/services/auth.service';
import { IProductDetail } from '@app-modules/product-detail/interfaces/product-detail.interface';
import { ProductDetailService } from '@app-modules/product-detail/services/product-detail.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail-update',
  templateUrl: './product-detail-update.component.html',
  styleUrls: ['./product-detail-update.component.scss']
})
export class ProductDetailUpdateComponent implements OnInit {
  formGroup: FormGroup;
  isSubmited = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productDetailService: ProductDetailService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((param) => {
      this._productDetailService.getProductDetail(param.id).subscribe((productDetail) => {
        this.formGroup = new FormGroup({
          id: new FormControl(productDetail.id),
          name: new FormControl(productDetail.name, Validators.required),
          price: new FormControl(productDetail.price, Validators.required),
          basePrice: new FormControl(productDetail.basePrice, Validators.required),
          status: new FormControl(productDetail.status, Validators.required),
          description: new FormControl(productDetail.description, Validators.required),
          type: new FormControl(productDetail.type, Validators.required),
          pic1: new FormControl(productDetail.pic1),
          pic2: new FormControl(productDetail.pic2),
          pic3: new FormControl(productDetail.pic3),
        });
      })
    });
  }

  onSave(isClose = false): void {
    this.isSubmited = true;
    if (this.formGroup.invalid) {
      return;
    }
    const productDetail = this.formGroup.value;
    this._productDetailService
      .updateProductDetail(productDetail as IProductDetail)
      .subscribe(
        () => {
          this._nzNotificationService.success(
            APP_MESSAGE.NOTIFICATION.TITLE.SUCCESS,
            APP_MESSAGE.PRODUCT_DETAIL.UPDATED_SUCCESS,
            APP_CONFIG.CONFIG_SUCCESS_NOTIFICATION
          );
          if (isClose) {
            this._router.navigate([ROUTING_PATH.PRODUCT_DETAIL.ROOT]);
          } else {
            this._router.navigate([
              ROUTING_PATH.PRODUCT_DETAIL.UPDATE,
              productDetail.id,
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
