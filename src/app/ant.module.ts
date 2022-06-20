import { NgModule, ModuleWithProviders } from '@angular/core';

import { 
    NzGridModule, 
    NzLayoutModule, 
    NzTabsModule,
    NzRadioModule
} from 'ng-zorro-antd';

@NgModule({
    imports: [
        NzGridModule,
        NzLayoutModule,
        NzTabsModule,
        NzRadioModule
    ],
    exports: [
        NzGridModule,
        NzLayoutModule,
        NzTabsModule,
        NzRadioModule
    ],
})
export class AntModule { 
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AntModule
        }
    }
}
