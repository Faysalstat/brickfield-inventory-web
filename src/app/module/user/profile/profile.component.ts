import { Component, OnInit } from '@angular/core';
import { User } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username!:string;
  password!:string;
  userProfile!:any;
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('userId');
    this.userService.getUserById(userId).subscribe({
      next:(userRes)=>{
        //console.log(userRes);
        this.userProfile = userRes.body;
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);

      }
    })

  }
  changePassword(){
    let userModel = {
      userName: this.userProfile.userName,
      password : this.password
    }
    const params: Map<string, any> = new Map();
    params.set('user', userModel);
    this.userService.changePassword(params).subscribe({
      next:(data)=>{
        //console.log(data.body);
        window.location.reload();

      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
        window.location.reload();
      }
    })

  }
}
