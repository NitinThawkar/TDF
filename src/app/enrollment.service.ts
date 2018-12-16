import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from './user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url = 'http://localhost:56329/api/enroll/SaveEnroll';
   // _url = 'http://localhost:56329/api/enroll/SaveEnrollError'
  constructor(private _HttpClient: HttpClient) { }

  enroll(user: User) {
    return this._HttpClient.post<any>(this._url, user)
      .pipe(catchError(this.errorHandlerMethod))
  }

  errorHandlerMethod(error: HttpErrorResponse) {
    return throwError(error)
  }
}
