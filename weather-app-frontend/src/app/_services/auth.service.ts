import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_API, baseURL, httpOptions } from '../constants';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  submitLogin(payload: Object): Observable<any> {
    return this.http.post(
      AUTH_API + '/signin',
      payload,
      httpOptions
    );
  }



  submitSingin(payload: Object): Observable<any> {
    return this.http.post(
      AUTH_API + '/signup',
     payload,
      httpOptions
    );
  }

}
