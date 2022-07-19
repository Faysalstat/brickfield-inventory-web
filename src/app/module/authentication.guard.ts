import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationGuardService } from './authentication-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationGuardService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // let authenticated = false;
    console.log(localStorage.getItem("token"));
    const idToken = localStorage.getItem("token");
    return this.verify(idToken);
    // .subscribe({
    //   next: (res) => {
    //     authenticated = res.body;
    //     if (!authenticated) {
    //       this.router.navigate(['auth']);
    //     }
    //     return true;
    //   },
    //   error:(err)=>{
    //     return false;
    //   },
    //   complete:()=>{
    //     return authenticated;
    //   }
    // });
  }
  async verify(token:any) {
    if (!token) {
      this.router.navigate(['auth']);
    }
    let authenticated = await this.authService.isLoggedIn(token);
    if (!authenticated.body) {
            this.router.navigate(['auth']);
          }
    return authenticated.body;
  }
}
