import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NZ_ICONS, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AntModule } from './ant.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule, icons } from './core/core.module';

import { BaseService } from '@app-core/services/base.service';

import { httpInterceptorProviders } from '@app-core/interceptors';

import { AppComponent } from './app.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    AntModule.forRoot()
  ],
  providers: [
    BaseService,
    ...httpInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
