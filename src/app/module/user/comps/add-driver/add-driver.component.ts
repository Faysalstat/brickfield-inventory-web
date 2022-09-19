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
  person!:Person;
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
    let driver:any = {};
    driver.personName = this.driverForm.get('name')?.value;
    driver.contactNo = this.driverForm.get('contactNo')?.value;
    driver.personAddress = this.driverForm.get('address')?.value;
    driver.clientType = "DRIVER";
    
    if(this.person){
      driver.personId = this.person.id;
    }
    params.set("driver",driver);
    this.userService.addDriver(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.driverAddedEvent.emit("Hello from parent");
        this.driverForm.reset();
        this.message = "";
      },
      error:(err)=>{
        this.userService.showMessage("ERROR!","Driver Add Failed","OK",2000);
      },
      complete: ()=>{}
    })
  }
  searchDriver(){
    console.log("Change Detected");
    this.userService.getCustomerByContactNo(this.driverForm.get('contactNo')?.value).subscribe({
      next:(res)=>{
        if(res.body){
          this.person = res.body;
          this.driverForm.get('name')?.setValue(res.body?.personName);
          this.driverForm.get('amountToPay')?.setValue(res.body?.account?.balance);
          this.driverForm.get('address')?.setValue(res.body?.personAddress);
          if(res.body.driver){
            this.driverForm.get('name')?.disable();
            this.driverForm.get('address')?.disable();
            this.driverForm.get('amountToPay')?.disable();
            this.disable = true;
            this.message = "* This Driver already exists in database!"
          }else{
            this.disable = false;
            this.message = "* This Person is not a Driver. Please Add!!"
          }

        }else{
          this.disable = false;
          return;
        }
      },
      error:(err)=>{
        console.log(err);
        this.userService.showMessage("ERROR!","Driver Fetching Failed","OK",2000);
        
      },
      complete: ()=>{}
    })
  }

}
