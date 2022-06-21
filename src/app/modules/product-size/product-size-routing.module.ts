import { ProductSizeCreateComponent } from './components/product-size-create/product-size-create.component';
import { ListProductSizeComponent } from './components/list-product-size/list-product-size.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRoutingsConfig } from '@app-core/routings';
import { AuthGuardService } from '@app-core/services/auth-guard.service';
import { ProductSizeUpdateComponent } from './components/product-size-update/product-size-update.component';



const routes: Routes = [
  {
    path: '',
    component: ListProductSizeComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.productSize.data.roles,
      breadcrumb: appRoutingsConfig.productSize.data.breadcrumb,
      url: appRoutingsConfig.productSize.data.url
    }
  },
  {
    path: 'create',
    component: ProductSizeCreateComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.productSize.data.roles,
      breadcrumb: appRoutingsConfig.productSize.children.createProductSize.data.breadcrumb,
      url: appRoutingsConfig.productSize.data.url
    }
  },
  {
    path: 'update/:id',
    component: ProductSizeUpdateComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.productSize.data.roles,
      breadcrumb: appRoutingsConfig.productSize.children.updateProductSize.data.breadcrumb,
      url: appRoutingsConfig.productSize.children.updateProductSize.data.url
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSizeRoutingModule { }
