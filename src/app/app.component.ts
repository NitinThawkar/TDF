import { Component } from '@angular/core';
import {User} from './user';
import {EnrollmentService} from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMsg = '';
  constructor(private _EnrollmentService: EnrollmentService) { }
  

  title = 'app';
  topics = ['Angular', 'VUE', 'React', 'Bootsrtap'];

  userModel = new User('NItin', 'nit@gmail.com', 9999988888, 'default', 'morning', true);
  topicHasError = true;

  validateTopic(value) {
    if (value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    this._EnrollmentService.enroll(this.userModel)
    .subscribe(
      response => console.log('Success!', response),
      error => this.errorMsg = error.statusText
    )
   // console.log(this.errorMsg);
   // console.log(this.errorMsg );
  }
}
