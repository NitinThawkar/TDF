import { AbstractControl, ValidatorFn } from '@angular/forms';


// validation return two values  if fail  return object
// return null if value is valid or validation pass and export function 
export function ForbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
    // not in quote /admin/
    const forbidden = /admin/.test(control.value);

    // return Key value or null
    return forbidden ? { 'forbiddenNameVal': { value: control.value } } : null;
}

// export function ForbiddenNameValidatorOld(forbiddenName: RegExp): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//         const forbidden = forbiddenName.test(control.value);
//         return forbidden ? { 'forbiddenName': { value: control.value } } : null;
//     };