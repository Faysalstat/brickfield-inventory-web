import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Urls} from '../constant/urls.const';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  public signIn(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("user"));
    return this.http.post(Urls.USER_SIGN_IN,queryParams.get("user"));
  }
  public signOut(queryParams: Map<string,any>): Observable<any>{
    return this.http.post(Urls.USER_SIGN_OUT,queryParams.get("user"));
  }
}
