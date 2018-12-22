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
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
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

  onLoadDataClick(): void {
    this.employeeForm.setValue({
      fullName: 'Nitin Thawkar',
      email: 'Nitin @gmail.com',
      skills: {
        skillName: 'Angular',
        experienceInYears: 5,
        proficiency: 'beginner'
      }
    });
   }

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

}
