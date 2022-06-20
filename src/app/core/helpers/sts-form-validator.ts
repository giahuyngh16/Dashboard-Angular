import { FormGroup, FormControl, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';

const REGEX_VALID_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_VALID_PHONE = /[0-9]{8,12}/;

export class StsFormValidator {
  static validForm(formGroup: FormGroup): { [key: string]: any } {
    const errFields = {};
    const validCheck = (formObj: FormGroup, errObj: Object) => {
      Object.keys(formObj.controls).forEach(field => {
        const control = formObj.get(field);
        if (control instanceof FormControl) {
          errObj[`${field}`] = control.errors;
        } else if (control instanceof FormGroup) {
          errObj[`${field}`] = {};
          return validCheck(control, errObj[`${field}`]);
        } else if (control instanceof FormArray) {
          errObj[`${field}`] = control.errors;
          Array.from(Array(control.controls.length).keys()).forEach(index => {
            errObj[`${field}${index}`] = {};
            return validCheck(control.at(index) as FormGroup, errObj[`${field}${index}`]);
          });
        }
      });
    };
    validCheck(formGroup, errFields);
    return errFields;
  }
  static validEmail(control: AbstractControl): ValidationErrors | null {
    return !control.value ? null : (REGEX_VALID_EMAIL.test(control.value) ? null : { email: true });
  }
  static emptyBlankSpace(control: AbstractControl): ValidationErrors | null {
    return (String(control.value).trim().length > 0) ? null : { blankSpace: true };
  }
  static validPhone(control: AbstractControl): ValidationErrors | null {
    const phoneNoLength = String(control.value).trim();
    return (phoneNoLength.length >= 9 && phoneNoLength.length <= 12 && REGEX_VALID_PHONE.test(phoneNoLength)) ? null : { invalidPhone: true };
  }
  static isIntType(control: AbstractControl): ValidationErrors | null {
    const isInt = Number.isInteger(Number(control.value));
    return isInt ? null : { isIntType: true };
  }
}
