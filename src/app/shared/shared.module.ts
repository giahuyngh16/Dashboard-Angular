import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { NZ_ICONS, NgZorroAntdModule } from 'ng-zorro-antd';
import { CKEditorModule } from 'ckeditor4-angular';

import { icons } from '@app-core/core.module';

import { StsClickOutsideDirective } from './directives/sts-click-out.directive';
import { StsSortTableDirective } from './directives/sts-sort-table.directive';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { MaxDirective } from './directives/max.directive';
import { ShortPipe } from './pipes/short.pipe';
import { GetAttachmentsPipe } from './pipes/get-attachments.pipe';
import { GetFromNowPipe } from './pipes/get-from-now.pipe';
import { CalculatePercentPipe } from './pipes/calculate-percent.pipe';

import { StsCheckboxDropdownComponent } from './components/sts-checkbox-dropdown/sts-checkbox-dropdown.component';
import { StsPaginationComponent } from './components/sts-pagination/sts-pagination.component';
import { StsDateRangeComponent } from './components/sts-date-range/sts-date-range.component';
import { STSInputComponent } from './components/sts-input/sts-input.component';
import { STSWebLinkComponent } from './components/sts-web-link/sts-web-link.component';
import { StsFileComponent } from './components/sts-file/sts-file.component';
import { STSIconComponent } from '@app-shared/components/sts-icon/sts-icon.component';
import { StsCollapseComponent } from './components/sts-collapse/sts-collapse.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot({
            thousandSeparator: ',',
            specialCharacters: [','],
            dropSpecialCharacters: true
        }),
        NgZorroAntdModule,
        CKEditorModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        NgxMaskModule,
        CKEditorModule,
        ShortPipe,
        GetAttachmentsPipe,
        StsClickOutsideDirective,
        StsSortTableDirective,
        StsCheckboxDropdownComponent,
        StsPaginationComponent,
        StsDateRangeComponent,
        STSInputComponent,
        STSIconComponent,
        STSWebLinkComponent,
        StsFileComponent,
        StsCollapseComponent,
        GetFromNowPipe,
        OnlyNumberDirective,
        MaxDirective,
        CalculatePercentPipe,
    ],
    declarations: [
        StsClickOutsideDirective,
        StsSortTableDirective,
        ShortPipe,
        GetAttachmentsPipe,
        StsCheckboxDropdownComponent,
        StsDateRangeComponent,
        STSInputComponent,
        STSIconComponent,
        StsPaginationComponent,
        STSWebLinkComponent,
        StsFileComponent,
        StsCollapseComponent,
        GetFromNowPipe,
        OnlyNumberDirective,
        MaxDirective,
        CalculatePercentPipe,
    ],
    entryComponents: [
    ],
    providers: [
        { provide: NZ_ICONS, useValue: icons }
    ]
})
export class SharedModule { }
