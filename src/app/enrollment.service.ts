import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url = '';
  constructor(private _HttpClient: HttpClient) { }

  enroll(user: User) {
   return this._HttpClient.post<any>(this._url, user);
   }
}
