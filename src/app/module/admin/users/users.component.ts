import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../model';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm!: FormGroup;
  disable!:true;
  message:string = "";
  selectedRole!:string;
  roles!:any[];
  isExist:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private adminService:AdminService,
    private userService: UserService
  ) {
    this.roles = [
      {roleName:"ADMIN"},
      {roleName:"MANAGER"},
      // {roleName:"SUPERADMIN"},
    ]
   }

  ngOnInit(): void {
    this.prepareForm(null);
  }
  prepareForm(formData: any) {
    formData = new Person();
    this.userForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      name: [formData.personName, [Validators.required]],
      contactNo: [formData.contactNo, [Validators.required],],
      address: [formData.personAddress],
      username:[formData.username,[Validators.required]],
      password:[formData.password,[Validators.required]],
      userRole:[formData.userRole,[Validators.required]],
    });
  }
  searchCustomer(){
    //console.log("Change Detected");
    this.userService.getCustomerByContactNo(this.userForm.get('contactNo')?.value).subscribe({
      next:(res)=>{
        //console.log(res.body);
        if(res.body){
          this.message= "This person is in our database";
          this.userForm.get('name')?.setValue(res.body?.personName);
          this.userForm.get('address')?.setValue(res.body?.personAddress);
          this.userForm.get('name')?.disable();
          this.userForm.get('address')?.disable();
          this.message = "* This contact already exists in database! "
        }
        else{
          this.userForm.get('name')?.enable();
          this.userForm.get('address')?.enable();
          this.userForm.get('password')?.enable();
          return;
        }
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
        
      },
      complete: ()=>{}
    })
  }
  onChangeRole(){

  }
  checkUser(){
    let userName = this.userForm.get('username')?.value;
    this.adminService.checkExistingUser(userName).subscribe({
      next:(res)=>{
        this.isExist = res.body;
        this.message = res.message;
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
  submit() {
    const params:Map<string,any> = new Map();
    //console.log(this.userForm.controls);
    if(this.userForm.invalid){
      return;
    }
    const user = {
      personName:this.userForm.get('name')?.value,
      contactNo:this.userForm.get('contactNo')?.value,
      personAddress:this.userForm.get('address')?.value,
      password:this.userForm.get('password')?.value,
      userName:this.userForm.get('username')?.value,
      userRole:this.userForm.get('userRole')?.value
    }
    params.set("user",user);
    this.adminService.addUser(params).subscribe({
      next:(res)=>{
        //console.log(res);
        this.userForm.reset();
        this.userService.showMessage("SUCCESS!","Operation Successfull!","OK",2000);
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: ()=>{}
    })
  }

}
