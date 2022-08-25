import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account, Driver, Person } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  @Output() driverAddedEvent = new EventEmitter<string>();
  driverForm!: FormGroup;
  disable:boolean = true;
  message:string = "";
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService) { }

  ngOnInit(): void {
    this.prepareForm(null);
  }
  prepareForm(formData: any) {
    formData = new Account();
    this.driverForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      name: [formData.person?.personName, [Validators.required]],
      contactNo: [formData.person?.contactNo, [Validators.required],],
      address: [formData.person?.personAddress],
      amountToPay: [formData.amountToPay]
    });
  }

  submit() {
    
    const params:Map<string,any> = new Map();
    console.log(this.driverForm.controls);
    if(this.driverForm.invalid || this.disable){
      return;
    }
    const customer = {
      personName:this.driverForm.get('name')?.value,
      contactNo:this.driverForm.get('contactNo')?.value,
      personAddress:this.driverForm.get('address')?.value,
      amountToPay:this.driverForm.get('amountToPay')?.value||0,
      due:0,
      balance:0
    }
    params.set("driver",customer);
    this.userService.addDriver(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.driverAddedEvent.emit("Hello from parent");
        this.driverForm.reset();
      },
      error:(err)=>{},
      complete: ()=>{}
    })
  }
  searchDriver(){
    console.log("Change Detected");
    this.userService.getCustomerByContactNo(this.driverForm.get('contactNo')?.value).subscribe({
      next:(res)=>{
        if(res.body){
          this.driverForm.get('name')?.setValue(res.body?.personName);
          this.driverForm.get('amountToPay')?.setValue(res.body?.account?.balance);
          this.driverForm.get('address')?.setValue(res.body?.personAddress);
          this.driverForm.get('name')?.disable();
          this.driverForm.get('address')?.disable();
          this.driverForm.get('amountToPay')?.disable();
          if(res.body.driver){
            this.disable = true;
            this.message = "* This Driver already exists in database!"
          }else{
           this.disable = false;
          }
          

        }else{
          this.disable = false;
          return;
        }
      },
      error:(err)=>{
        console.log(err);
        
      },
      complete: ()=>{}
    })
  }

}
