import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationGuardService } from './authentication-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanActivateChild{
  constructor(
    private router: Router,
    private authService: AuthenticationGuardService
  ) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error('Method not implemented.');
    //console.log(localStorage.getItem("token"));
    const idToken = localStorage.getItem("token");
    return this.verify(idToken);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // let authenticated = false;
    //console.log(localStorage.getItem("token"));
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
  async verifyAdmin(token:any) {
    if (!token) {
      this.router.navigate(['auth']);
    }
    let authenticated = await this.authService.isLoggedIn(token);
    if (authenticated.body && authenticated.body.userRole=="ADMIN") {
          //console.log("Welcome to admin panel");
        }else{
          //console.log("You are not permited to admin panel");
          this.router.navigate(['auth']);
        }
    return authenticated.body;
  }
}
