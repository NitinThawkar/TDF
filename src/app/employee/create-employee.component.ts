import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  nameLength = 0;

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
      email: ['nitin@gmail.com'],
      skills: this.fb.group({
        skillName: ['Ang'],
        experienceInYears: [5],
        proficiency: ['beginner']
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
  

   

}
