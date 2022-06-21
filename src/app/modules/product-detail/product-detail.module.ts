import { ProductDetailUpdateComponent } from './components/product-detail-update/product-detail-update.component';
import { ProductDetailFormComponent } from './components/product-detail-form/product-detail-form.component';
import { ProductDetailCreateComponent } from './components/product-detail-create/product-detail-create.component';
import { ProductDetailService } from './services/product-detail.service';
import { ListProductDetailComponent } from './components/list-product-detail/list-product-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '@app-shared/shared.module';
import { ProductDetailRoutingModule } from './product-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductDetailRoutingModule,
    NgZorroAntdModule
  ],
  exports: [],
  declarations: [
    ListProductDetailComponent,
    ProductDetailCreateComponent,
    ProductDetailFormComponent,
    ProductDetailUpdateComponent,
  ],
  providers: [
    ProductDetailService,
  ],
  entryComponents: [
  ]
})
export class ProductDetailModule { }
