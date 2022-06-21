import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_CONFIG } from '@app-core/constants/config.const';
import { APP_MESSAGE } from '@app-core/constants/messages.const';
import { IRequestError } from '@app-core/interfaces/request-error.interface';
import { ROUTING_PATH } from '@app-core/routings';
import { AuthService } from '@app-core/services/auth.service';
import { IProductSize } from '@app-modules/product-size/interfaces/product-size.interface';
import { ProductSizeService } from '@app-modules/product-size/services/product-size.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-size-update',
  templateUrl: './product-size-update.component.html',
  styleUrls: ['./product-size-update.component.scss']
})
export class ProductSizeUpdateComponent implements OnInit {
  formGroup: FormGroup;
  isSubmited = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _productSizeService: ProductSizeService,
    private _nzNotificationService: NzNotificationService,
    private _nzModalService: NzModalService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((param) => {
      this._productSizeService.getProductSize(param.id).subscribe((productSize) => {
        this.formGroup = new FormGroup({
          id: new FormControl(productSize.id),
          name: new FormControl(productSize.name, Validators.required),
          quantity: new FormControl(productSize.quantity, Validators.required),
          size: new FormControl(productSize.size, Validators.required),
          idProductDetail: new FormControl(productSize.idProductDetail, Validators.required),
        });
      })
    });
  }

  onSave(isClose = false): void {
    this.isSubmited = true;
    if (this.formGroup.invalid) {
      return;
    }
    const productSize = this.formGroup.value;
    this._productSizeService
      .updateProductSize(productSize as IProductSize)
      .subscribe(
        () => {
          this._nzNotificationService.success(
            APP_MESSAGE.NOTIFICATION.TITLE.SUCCESS,
            APP_MESSAGE.PRODUCT_SIZE.UPDATED_SUCCESS,
            APP_CONFIG.CONFIG_SUCCESS_NOTIFICATION
          );
          if (isClose) {
            this._router.navigate([ROUTING_PATH.PRODUCT_SIZE.ROOT]);
          } else {
            this._router.navigate([
              ROUTING_PATH.PRODUCT_SIZE.UPDATE,
              productSize.id,
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
