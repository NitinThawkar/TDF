import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  _url = 'http://localhost:56329/api/enroll/SaveEnroll';
 // _url = 'http://localhost:56329/api/enroll/SaveEnrollError'
  constructor(private _http: HttpClient) { }

  register(userData) {
    return this._http.post<any>(this._url, userData);
  }
}