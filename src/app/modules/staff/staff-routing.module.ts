import { StaffCreateComponent } from './components/staff-create/staff-create.component';
import { ListStaffComponent } from './components/list-staff/list-staff.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRoutingsConfig } from '@app-core/routings';
import { AuthGuardService } from '@app-core/services/auth-guard.service';
import { StaffUpdateComponent } from './components/staff-update/staff-update.component';



const routes: Routes = [
  {
    path: '',
    component: ListStaffComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.staff.data.roles,
      breadcrumb: appRoutingsConfig.staff.data.breadcrumb,
      url: appRoutingsConfig.staff.data.url
    }
  },
  {
    path: 'create',
    component: StaffCreateComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.staff.data.roles,
      breadcrumb: appRoutingsConfig.staff.children.createStaff.data.breadcrumb,
      url: appRoutingsConfig.staff.data.url
    }
  },
  {
    path: 'update/:id',
    component: StaffUpdateComponent,
    canActivate: [AuthGuardService],
    data: {
      roles: appRoutingsConfig.staff.data.roles,
      breadcrumb: appRoutingsConfig.staff.children.updateStaff.data.breadcrumb,
      url: appRoutingsConfig.staff.children.updateStaff.data.url
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
