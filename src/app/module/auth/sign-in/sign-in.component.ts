import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
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
    console.log(user);
    params.set("user",user);
    this.authService.signIn(params).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('token', res.body.token);
        if(res.body.userRole== "MANAGER"){
          this.router.navigate(["/home"]);
        }else if(res.body.userRole== "ADMIN"){
          this.router.navigate(["/admin"]);
        }
        
      },
      error:(err)=>{},
      complete: ()=>{}
    })
  }
}
