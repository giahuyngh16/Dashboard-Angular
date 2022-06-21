import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRoutingsConfig } from './core/routings';

import { RedirectGuardService } from '@app-core/services/redirect-guard.service';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './core/components/unauthorized/unauthorized.component';
import { AuthGuardService } from '@app-core/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [],
    canActivate: [RedirectGuardService]
  },
  {
    path: 'index',
    redirectTo: appRoutingsConfig.users.path,
    pathMatch: 'full'
  },
  {
    path: appRoutingsConfig.users.path,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),

  },
  {
    path: appRoutingsConfig.customer.path,
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),

  },
  {
    path: appRoutingsConfig.staff.path,
    loadChildren: () => import('./modules/staff/staff.module').then(m => m.StaffModule),

  },
  {
    path: appRoutingsConfig.productDetail.path,
    loadChildren: () => import('./modules/product-detail/product-detail.module').then(m => m.ProductDetailModule),

  },
  {
    path: appRoutingsConfig.productSize.path,
    loadChildren: () => import('./modules/product-size/product-size.module').then(m => m.ProductSizeModule),

  },
  {
    path: appRoutingsConfig.unauthorized.path,
    component: UnauthorizedComponent,
    data: {
      breadcrumb: appRoutingsConfig.unauthorized.data.breadcrumb,
      roles: appRoutingsConfig.unauthorized.data.roles,
    }
  },
  {
    path: appRoutingsConfig.notFound.path,
    component: PageNotFoundComponent,
    data: {
      breadcrumb: appRoutingsConfig.notFound.data.breadcrumb,
      roles: appRoutingsConfig.notFound.data.roles,
    }
  },
  { path: '**', redirectTo: appRoutingsConfig.notFound.path }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
