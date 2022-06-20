import { StaffUpdateComponent } from './components/staff-update/staff-update.component';
import { StaffFormComponent } from './components/staff-form/staff-form.component';
import { StaffCreateComponent } from './components/staff-create/staff-create.component';
import { StaffService } from './services/staff.service';
import { ListStaffComponent } from './components/list-staff/list-staff.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '@app-shared/shared.module';
import { StaffRoutingModule } from './staff-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StaffRoutingModule,
    NgZorroAntdModule
  ],
  exports: [],
  declarations: [
    ListStaffComponent,
    StaffCreateComponent,
    StaffFormComponent,
    StaffUpdateComponent,
  ],
  providers: [
    StaffService,
  ],
  entryComponents: [
  ]
})
export class StaffModule { }
