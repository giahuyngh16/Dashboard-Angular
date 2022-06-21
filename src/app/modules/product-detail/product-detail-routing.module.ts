import { ProductDetailCreateComponent } from './components/product-detail-create/product-detail-create.component';
import { ListProductDetailComponent } from './components/list-product-detail/list-product-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRoutingsConfig } from '@app-core/routings';
import { AuthGuardService } from '@app-core/services/auth-guard.service';
import { ProductDetailUpdateComponent } from './components/product-detail-update/product-detail-update.component';



const routes: Routes = [
  {
    path: '',
    component: ListProductDetailComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.productDetail.data.roles,
      breadcrumb: appRoutingsConfig.productDetail.data.breadcrumb,
      url: appRoutingsConfig.productDetail.data.url
    }
  },
  {
    path: 'create',
    component: ProductDetailCreateComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.productDetail.data.roles,
      breadcrumb: appRoutingsConfig.productDetail.children.createProductDetail.data.breadcrumb,
      url: appRoutingsConfig.productDetail.data.url
    }
  },
  {
    path: 'update/:id',
    component: ProductDetailUpdateComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.productDetail.data.roles,
      breadcrumb: appRoutingsConfig.productDetail.children.updateProductDetail.data.breadcrumb,
      url: appRoutingsConfig.productDetail.children.updateProductDetail.data.url
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailRoutingModule { }
