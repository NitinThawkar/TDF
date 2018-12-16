import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
 import {ReactiveFormsModule} from '@angular/forms'; // add in app module

@Component({
  selector: 'app-react-from',
  templateUrl: './react-from.component.html',
  styleUrls: ['./react-from.component.css']
})
export class ReactFromComponent implements OnInit {

  registrationForm = this.fb.group({
    userName: ['Nitinv'],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: ['fsb'],
      state: [''],
      postalCode: ['']
    })
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  // registrationForm = new FormGroup({
  //   userName: new FormControl('Vishwas'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  // });

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Vishwas'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });


  loadAPIData() {
    // this.registrationForm.setValue({
    //   userName: 'Bruce',
    //   password: 'test',
    //   confirmPassword: 'test',
    //   address: {
    //     city: 'City',
    //     state: 'State',
    //     postalCode: '123456'
    //   }
    // });

    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test'
    });
  }
}
