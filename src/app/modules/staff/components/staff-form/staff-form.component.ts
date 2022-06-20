import { IStaffForm } from './../../interfaces/staff.interface';
import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '@app-core/services/auth.service';
import { CKEditor4 } from 'ckeditor4-angular';
import { RICH_TEXT_CONFIG } from '@app-core/constants/config.const';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StaffFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StaffFormComponent),
      multi: true,
    },
  ],
})
export class StaffFormComponent implements OnInit {
  @Input() isSubmited = false;

  formGroup: FormGroup;
  errorMessage: string;
  editorConfig: CKEditor4.Config = { ...RICH_TEXT_CONFIG };
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

  writeValue(value: IStaffForm): void {
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
    this.formGroup.get('address').patchValue( event.editor.getData());
}

  private _setUpForm(): void {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      address: new FormControl(null),
    })
  }
}
