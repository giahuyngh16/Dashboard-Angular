import { ProductSizeUpdateComponent } from './components/product-size-update/product-size-update.component';
import { ProductSizeFormComponent } from './components/product-size-form/product-size-form.component';
import { ProductSizeCreateComponent } from './components/product-size-create/product-size-create.component';
import { ProductSizeService } from './services/product-size.service';
import { ListProductSizeComponent } from './components/list-product-size/list-product-size.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '@app-shared/shared.module';
import { ProductSizeRoutingModule } from './product-size-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ProductSizeRoutingModule,
    NgZorroAntdModule
  ],
  exports: [],
  declarations: [
    ListProductSizeComponent,
    ProductSizeCreateComponent,
    ProductSizeFormComponent,
    ProductSizeUpdateComponent,
  ],
  providers: [
    ProductSizeService,
  ],
  entryComponents: [
  ]
})
export class ProductSizeModule { }
