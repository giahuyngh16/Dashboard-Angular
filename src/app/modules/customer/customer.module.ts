import { CustomersService } from './services/customer.service';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SharedModule } from '@app-shared/shared.module';
import { CustomerRoutingModule} from './customer-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CustomerRoutingModule,
        NgZorroAntdModule
    ],
    exports: [],
    declarations: [
        ListCustomersComponent,
    ],
    providers: [
        CustomersService
    ],
    entryComponents: [
    ]
})
export class CustomerModule { }
