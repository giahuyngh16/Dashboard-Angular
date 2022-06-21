import { environment } from './../../../../../environments/environment';
import { IProductSize } from './../../interfaces/product-size.interface';
import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '@app-core/services/auth.service';
import { CKEditor4 } from 'ckeditor4-angular';
import { RICH_TEXT_CONFIG } from '@app-core/constants/config.const';

@Component({
  selector: 'app-product-size-form',
  templateUrl: './product-size-form.component.html',
  styleUrls: ['./product-size-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductSizeFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductSizeFormComponent),
      multi: true,
    },
  ],
})
export class ProductSizeFormComponent implements OnInit {
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

  writeValue(value: IProductSize): void {
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

  onChangeQuantity(event) {
    debugger;
    const selectedQuantity = event.target.value;
    if (selectedQuantity >= 1 && selectedQuantity <= 50) {
      this.formGroup.get('quantity').patchValue(selectedQuantity);
    }
    else {
      this.formGroup.get('quantity').patchValue(1);
    }
}

onChangeSize(event) {
  debugger;
  const selectedSize = event.target.value;
  if (selectedSize >= 35 && selectedSize <= 46) {
    this.formGroup.get('size').patchValue(selectedSize);
  }
  else {
    this.formGroup.get('size').patchValue(35);
  }
}

  private _setUpForm(): void {
    if(!this.formGroup && !this.isUpdate){
      this.formGroup = new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, Validators.required),
        size: new FormControl(null, Validators.required),
        idProductDetail: new FormControl(null, Validators.required),
      });
    }
  }
}
