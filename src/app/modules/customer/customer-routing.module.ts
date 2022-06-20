import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRoutingsConfig } from '@app-core/routings';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { AuthGuardService } from '@app-core/services/auth-guard.service';



const routes: Routes = [
    {
        path: '',
        component: ListCustomersComponent,
        canActivate: [AuthGuardService],
        data: {
            roles: appRoutingsConfig.customer.data.roles,
            breadcrumb: appRoutingsConfig.customer.data.breadcrumb,
            url: appRoutingsConfig.customer.data.url
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
