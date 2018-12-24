import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../Shared/custom.validators';
import { ActivatedRoute } from '@angular/router';  // part 27
import { EmployeeService } from './employee.service'; // part 27
import { IEmployee } from './IEmployee'; // part 27
import { ISkill } from './ISkill'; // part 27
//import { Route } from '@angular/router'; //part 29
import { Router } from '@angular/router'; //part 29

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  // part 29
  employee: IEmployee;  
  nameLength = 0;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) { }


  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone': '',
    //'skillName': '',
    // 'experienceInYears': '',
    // 'proficiency': ''
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

    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },

    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email do not match.'
    },


    'phone': {
      'required': 'phone is required.'
    },
    // 'skillName': {
    //   'required': 'Skill Name is required.',
    // },
    // 'experienceInYears': {
    //   'required': 'Experience is required.',
    // },
    // 'proficiency': {
    //   'required': 'Proficiency is required.',
    // },
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
      // email: ['nitin@gmail.com', [Validators.required, CustomValidators.emailDomain('dell.com')]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('dell.com')]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: matchEmails }),

      phone: [],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ]),
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

    // const skill = this.employeeForm.get('skills');
    // skill.get('experienceInYears0').valueChanges.subscribe((namevalue: number) => {
    //   console.log(namevalue);
    //   this.nameLength = namevalue;

    // }
    // );

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


    //part 27
   
    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.getEmployee(empId);
      }
    });


  }

  //part 27
 
  getEmployee(id: number) {
    this.employeeService.getEmployee(id)
      .subscribe(
        (employee: IEmployee) => {

        //Part 29
        // Store the employee object returned by the
        // REST API in the employee property
        this.employee = employee;
        this.editEmployee(employee);
         },
        (err: any) => console.log(err)
      );
  }

  //part 27
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });

    // part 28
  this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));

  }
  // part 28
  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    });

    return formArray;
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }


  onSubmit(): void {
    console.log(this.employeeForm.value);

    //Part 29
    this.mapFormValuesToEmployeeModel();
    this.employeeService.updateEmployee(this.employee).subscribe(
      () => this.router.navigate(['list']),
      (err: any) => console.log(err)
    );

  }
//Part 29
  mapFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;
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

  createFormArrayClick(): void {
    const formArray = new FormArray([
      new FormControl('John', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ]);


    //using form builder
    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
    ]);

    formArray1.push(new FormControl('ram', Validators.required));
    console.log('formArray.value ' + formArray1.value);
    console.log('control length ' + formArray1.length);
    console.log('formArray.value ' + formArray1.at(3).value);

    for (const control of formArray.controls) {
      if (control instanceof FormControl) {
        console.log('control is FormControl');
      }
      if (control instanceof FormGroup) {
        console.log('control is FormGroup');
      }
      if (control instanceof FormArray) {
        console.log('control is FormArray');
      }
    }

  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillButtonClick_old(skillGroupIndex: number): void {
    (<FormArray>this.employeeForm.get('skills')).removeAt(skillGroupIndex);
  }

  //part 28
  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }


  logValidationErrors_(group: FormGroup = this.employeeForm): void {
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

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      // Loop through nested form groups and form controls to check
      // for validation errors. For the form groups and form controls
      // that have failed validation, retrieve the corresponding
      // validation message from validationMessages object and store
      // it in the formErrors object. The UI binds to the formErrors
      // object properties to display the validation errors.
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

      // We need this additional check to get to the FormGroup
      // in the FormArray and then recursively call this
      // logValidationErrors() method to fix the broken validation
      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);
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

  //Part 27 




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


// Nested form group (emailGroup) is passed as a parameter. Retrieve email and
// confirmEmail form controls. If the values are equal return null to indicate
// validation passed otherwise an object with emailMismatch key. Please note we
// used this same key in the validationMessages object against emailGroup
// property to store the corresponding validation error message
function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine && confirmEmailControl.value === '') {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}
