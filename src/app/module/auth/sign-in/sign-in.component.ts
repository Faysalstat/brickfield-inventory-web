import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model';
import { UserService } from '../../user/user.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  message!:string;
  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.prepareForm(null);
  }
  prepareForm(formData: any) {
    formData = new User();

    this.loginForm = this.formBuilder.group({
      username: [formData.username, [Validators.required]],
      password: [formData.password, [Validators.required]],
      // address: [formData.personAddress],
    });
  }
  signIn(){
    const params:Map<string,any> = new Map();
    const user = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    //console.log(user);
    params.set("user",user);
    this.authService.signIn(params).subscribe({
      next:(res)=>{
        //console.log(res);
        localStorage.setItem('token', res.body.token);
        localStorage.setItem('userId', res.body.userid);
        localStorage.setItem('username', res.body.username);
        sessionStorage.setItem('userRole',res.body.userRole)
        if(res.body.userRole== "MANAGER"){
          this.router.navigate(["/home"]);
        }else if(res.body.userRole== "ADMIN"){
          this.router.navigate(["/admin"]);
        }
        
      },
      error:(err)=>{
        this.userService.showMessage("ERROR!","Authentication Failed" + err.message,"OK",2000);
      },
      complete: ()=>{}
    })
  }
}
