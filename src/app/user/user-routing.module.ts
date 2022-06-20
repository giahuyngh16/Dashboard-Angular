import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { appRoutingsConfig } from '@app-core/routings';



const routes: Routes = [
  {path: '',component: UserComponent ,children: [ {
    path: 'login', component: LoginComponent
  }]},


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
