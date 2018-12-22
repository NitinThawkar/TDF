import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills : new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    });
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
