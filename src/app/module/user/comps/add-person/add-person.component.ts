import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  @Output() customerAddedEvent = new EventEmitter<string>();
  customerForm!: FormGroup;
  disable!:true;
  message:string = "";
  personId!:number;
  isCustomer: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService) { }

  ngOnInit(): void {
    this.prepareForm(null);
  }
  prepareForm(formData: any) {
    formData = new Person();
    this.customerForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      name: [formData.personName, [Validators.required]],
      contactNo: [formData.contactNo, [Validators.required],],
      address: [formData.personAddress],
      balance:[formData.balance]
    });
  }
  submit() {
    const params:Map<string,any> = new Map();
    console.log(this.customerForm.controls);
    if(this.customerForm.invalid || this.disable){
      return;
    }
    let customer = {
      personId : this.customerForm.get("id")?.value,
      personName:this.customerForm.get('name')?.value,
      contactNo:this.customerForm.get('contactNo')?.value,
      personAddress:this.customerForm.get('address')?.value,
      balance:this.customerForm.get('balance')?.value||0,
      due:0,
      amountToPay:0
    }
    params.set("customer",customer);
    this.userService.addCustomer(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.customerAddedEvent.emit("Hello from parent");
        this.customerForm.reset();

      },
      error:(err)=>{
        this.userService.showMessage("ERROR!","Operation Failed","OK",2000);
      },
      complete: ()=>{}
    })
  }
  searchCustomer(){
    console.log("Change Detected");
    this.userService.getCustomerByContactNo(this.customerForm.get('contactNo')?.value).subscribe({
      next:(res)=>{
        console.log(res.body);
        if(res.body){
          this.message= "This person is in our database";
          this.customerForm.get('id')?.setValue(res.body?.id);
          this.customerForm.get('name')?.setValue(res.body?.personName);
          this.customerForm.get('address')?.setValue(res.body?.personAddress);
          this.customerForm.get('name')?.disable();
          this.customerForm.get('address')?.disable();
          if(res.body.customer){
            this.message= "This person is in our database. </br> This person is a customer";
            this.customerForm.get('balance')?.setValue(res.body?.customer?.account?.balance);
            this.customerForm.get('balance')?.disable();
          }
          
          // this.message = "* This Customer already exists!"

        }
        else{
          this.customerForm.get('name')?.enable();
          this.customerForm.get('address')?.enable();
          this.customerForm.get('balance')?.enable();
          this.message= "";
          return;
        }
      },
      error:(err)=>{
        console.log(err);
        this.userService.showMessage("ERROR!","Not Found","OK",2000);
        
      },
      complete: ()=>{}
    })
  }
}
