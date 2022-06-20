import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '@app-shared/shared.module';
import { UserComponent } from './user/user.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        UserRoutingModule,
        NgZorroAntdModule
    ],
    exports: [],
    declarations: [
        LoginComponent,
        UserComponent,
    ],
    providers: [

    ],
    entryComponents: [
    ]
})
export class UserModule { }
