import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { LayoutService } from './services/layout.service';
import { AuthService } from './services/auth.service';
import { RedirectGuardService } from './services/redirect-guard.service';
import { AuthGuardService } from './services/auth-guard.service';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

import { ObjectKeysPipe } from '../shared/pipes/object-keys.pipe';

const antDesignIcons = AllIcons as {
    [key: string]: any;
  };
export const icons: any[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule,
        NgZorroAntdModule
    ],
    exports: [
        SideBarComponent,
        NavBarComponent,
        BreadcrumbComponent,
    ],
    declarations: [
        SideBarComponent,
        NavBarComponent,
        BreadcrumbComponent,
        PageNotFoundComponent,
        UnauthorizedComponent,
        ObjectKeysPipe
    ],
    providers: [
        LayoutService,
        AuthService,
        AuthGuardService,
        RedirectGuardService,
    ],
})
export class CoreModule { }
