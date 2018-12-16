import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder, Validator } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // add in app module
import { ForbiddenNameValidator, ForbiddenNameValidatorStrValues } from '../../app/Shared/user-name.validator';
import { PasswordValidator } from '../../app/Shared/password.validator';
import { RegistrationService } from '../registration.service';
@Component({
  selector: 'app-react-from',
  templateUrl: './react-from.component.html',
  styleUrls: ['./react-from.component.css']
})
export class ReactFromComponent implements OnInit {

  registrationForm: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  // alternateEmails accces this in template
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  // if we call addAlternateEmail this will add new control in form array
  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }


  constructor(private fb: FormBuilder , private _registrationService: RegistrationService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), ForbiddenNameValidator, ForbiddenNameValidatorStrValues(/password/)]],
      password: [''],
      confirmPassword: [''],
      email: [''],
      subscribe: [''],
      address: this.fb.group({
        city: ['fsb'],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    }, { validator: PasswordValidator });

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
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
  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      );
  }

}
