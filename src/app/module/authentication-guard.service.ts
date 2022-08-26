import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Urls} from './constant/urls.const';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService {

  constructor(
    private router: Router,
    private http:HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (false) {
      return true;
    } 
    else {
      this.router.navigate(['auth'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
  public isLoggedIn(token:any):Promise<any>{
    let params = new HttpParams();
    params = params.append("token",token);
    return this.http.get(Urls.CHECK_IS_LOGGEDIN,{params:params}).toPromise();
  }
}
