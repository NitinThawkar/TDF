import { Component } from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  topics = ['Angular', 'VUE', 'React', 'Bootsrtap'];

  userModel = new User('', 'nit@gmail.com', 123311, 'Angular', 'morning', true);
}
