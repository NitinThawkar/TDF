import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
 import {ReactiveFormsModule} from '@angular/forms'; // add in app module

@Component({
  selector: 'app-react-from',
  templateUrl: './react-from.component.html',
  styleUrls: ['./react-from.component.css']
})
export class ReactFromComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  registrationForm = new FormGroup({
    userName: new FormControl('Vishwas'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

 // registrationForm: FormGroup;
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
}
