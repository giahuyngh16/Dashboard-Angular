import { environment } from './../../../../../environments/environment';
import { IProductDetail } from './../../interfaces/product-detail.interface';
import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '@app-core/services/auth.service';
import { CKEditor4 } from 'ckeditor4-angular';
import { RICH_TEXT_CONFIG } from '@app-core/constants/config.const';

@Component({
  selector: 'app-product-detail-form',
  templateUrl: './product-detail-form.component.html',
  styleUrls: ['./product-detail-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductDetailFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductDetailFormComponent),
      multi: true,
    },
  ],
})
export class ProductDetailFormComponent implements OnInit {
  @Input() isSubmited = false;
  @Input() formGroup: FormGroup;
  @Input() isUpdate: false;

  errorMessage: string;
  editorConfig: CKEditor4.Config = { ...RICH_TEXT_CONFIG };
  environment = environment;
  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._setUpForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isSubmited && this.formGroup) {
      for (const key in this.formGroup.controls) {
        if (this.formGroup.controls.hasOwnProperty(key)) {
          this.formGroup.controls[key].markAsDirty();
          this.formGroup.controls[key].updateValueAndValidity();
        }
      }
    }
  }

  onTouched: () => void = () => { };

  writeValue(value: IProductDetail): void {
    value && this.formGroup.setValue(value, { emitEvent: true });
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid
      ? null
      : {
        invalidForm: { valid: false },
      };
  }

  isDirty(controlName: string) {
    return this.formGroup.get(controlName) ? this.formGroup.get(controlName).dirty : null;
  }

  onChangeDetails(event: CKEditor4.EventInfo) {
    this.formGroup.get('description').patchValue( event.editor.getData());
}

  private _setUpForm(): void {
    if(!this.formGroup && !this.isUpdate){
      this.formGroup = new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        basePrice: new FormControl(null, Validators.required),
        status: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required),
        pic1: new FormControl(null),
        pic2: new FormControl(null),
        pic3: new FormControl(null),
      });
    }
  }
}
