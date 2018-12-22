import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {CustomValidators} from '../Shared/custom.validators';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  nameLength = 0;

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };
  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domian should be dell.com'
    },
    'phone': {
      'required': 'phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };

  ngOnInit() {

    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills : new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });
    this.employeeForm = this.fb.group({
      fullName: ['nitin', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['nitin@gmail.com', [Validators.required, CustomValidators.emailDomain('dell.com')]],
      contactPreference: ['email'],
      phone: [],
      skills: this.fb.group({
        skillName: ['Ang', Validators.required],
        experienceInYears: [5, Validators.required],
        proficiency: ['', Validators.required]
      }),
    });

    this.employeeForm.get('fullName').valueChanges.subscribe((namevalue: string) => {
      console.log(namevalue);
      this.nameLength = namevalue.length;

    }
    );

    this.employeeForm.valueChanges.subscribe(
      value => {
        console.log(JSON.stringify(value));
      }
    );

    this.employeeForm.get('skills').valueChanges.subscribe((namevalue: string) => {
      console.log(namevalue);
      this.nameLength = namevalue.length;

    }
    );

    const skill = this.employeeForm.get('skills');
    skill.get('experienceInYears').valueChanges.subscribe((namevalue: number) => {
      console.log(namevalue);
      this.nameLength = namevalue;

    }
    );

    // When any of the form control value in employee form changes
    // our validation function logValidationErrors() is called
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });


    //14-Dynamically adding or removing form control validators in reactive form
    this.employeeForm.get('contactPreference')
      .valueChanges.subscribe((data: string) => {
        this.onContactPrefernceChange(data);
      });

  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
  }

  // onLoadDataClick(): void {
  //   this.employeeForm.setValue({
  //     fullName: 'Nitin Thawkar',
  //     email: 'Nitin @gmail.com',
  //     skills: {
  //       skillName: 'Angular',
  //       experienceInYears: 5,
  //       proficiency: 'beginner'
  //     }
  //   });
  //  }




  onLoadDataClickpatch(): void {
    this.employeeForm.patchValue({
      fullName: 'Nitin Thawkar',
      // email: 'Nitin @gmail.com',
      skills: {
        skillName: 'Angular',
        experienceInYears: 5,
        proficiency: 'beginner'
      }
    });
  }




  onLoadDataClick(): void {
    this.logKeyValuePairs(this.employeeForm);

    //12-Move validation messages to the component class in reactive form
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);

  }


  logValidationErrors(group: FormGroup = this.employeeForm): void {
    // Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get the control. The control can be a nested form group
      const abstractControl = group.get(key);
      // If the control is nested form group, recursively call
      // this same method
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
        // If the control is a FormControl
      } else {
        // Clear the existing validation errors
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          // Get all the validation messages of the form control
          // that has failed the validation
          const messages = this.validationMessages[key];
          // Find which validation has failed. For example required,
          // minlength or maxlength. Store that error message in the
          // formErrors object. The UI will bind to this object to
          // display the validation errors
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }


  logKeyValuePairs(group: FormGroup): void {
    // loop through each key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      // Get a reference to the control using the FormGroup.get() method
      const abstractControl = group.get(key);
      // If the control is an instance of FormGroup i.e a nested FormGroup
      // then recursively call this same method (logKeyValuePairs) passing it
      // the FormGroup so we can get to the form controls in it
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
        // If the control is not a FormGroup then we know it's a FormControl
        // abstractControl.disable();

      } else {
        console.log('Key = ' + key + ' && Value = ' + abstractControl.value);

        //disable the all from Controls
        // abstractControl.disable();

        //  abstractControl.markAsDirty()

      }
    });
  }

  // If the Selected Radio Button value is "phone", then add the
// required validator function otherwise remove it
onContactPrefernceChange(selectedValue: string) {
  const phoneFormControl = this.employeeForm.get('phone');
  if (selectedValue === 'phone') {
    phoneFormControl.setValidators(Validators.required);
  } else {
    phoneFormControl.clearValidators();
  }
  phoneFormControl.updateValueAndValidity();
}


}

function emailDomainn(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email === '' || domain.toLowerCase() === 'pragimtech.com') {
    return null;
  } else {
    return { 'emailDomain': true };
  }
}

// moved below  code in  shared/custom.validators.ts
// function emailDomain(domainName: string) {
//   return (control: AbstractControl): { [key: string]: any } | null => {
//     const email: string = control.value;
//     const domain = email.substring(email.lastIndexOf('@') + 1);
//     if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
//       return null;
//     } else {
//       return { 'emailDomain': true };
//     }
//   };
// }
