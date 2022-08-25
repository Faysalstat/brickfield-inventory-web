import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-sordar',
  templateUrl: './add-sordar.component.html',
  styleUrls: ['./add-sordar.component.css']
})
export class AddSordarComponent implements OnInit {
  @Output() sordarAddedEvent = new EventEmitter<string>();
  sordarForm!: FormGroup;
  disable!:boolean;
  message:string = "";
  mills = [{ label: 'Select mill name', value: '' }];
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService) {
      this.mills = [
        { label: 'Select mill name', value: '' },
        { label: '১নং পাগ মিল', value: '১নং পাগ মিল' },
        { label: '১নং অটো মিল', value: '১নং অটো মিল' },
        { label: '২নং অটো মিল', value: '২নং অটো মিল' },
      ];
     }

  ngOnInit(): void {
    this.prepareForm(null);
  }
  prepareForm(formData: any) {
    formData = new Account();
    this.sordarForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      name: [formData.person?.personName, [Validators.required]],
      contactNo: [formData.person?.contactNo, [Validators.required],],
      address: [formData.person?.personAddress],
      amountToPay: [formData.amountToPay],
      category: [formData.category]
    });
  }

  submit() {
    
    const params:Map<string,any> = new Map();
    console.log(this.sordarForm.controls);
    if(this.sordarForm.invalid || this.disable){
      return;
    }
    const sordar = {
      personName:this.sordarForm.get('name')?.value,
      contactNo:this.sordarForm.get('contactNo')?.value,
      personAddress:this.sordarForm.get('address')?.value,
      amountToPay:this.sordarForm.get('amountToPay')?.value||0,
      category:this.sordarForm.get('category')?.value, 
      due:0,
      balance:0
    }
    params.set("sordar",sordar);
    this.userService.addSordar(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.sordarAddedEvent.emit("Hello from parent");
        this.sordarForm.reset();
      },
      error:(err)=>{},
      complete: ()=>{}
    })
  }
  searchsordar(){
    console.log("Change Detected");
    this.userService.getCustomerByContactNo(this.sordarForm.get('contactNo')?.value).subscribe({
      next:(res)=>{
        if(res.body){
          this.sordarForm.get('name')?.setValue(res.body?.personName);
          this.sordarForm.get('amountToPay')?.setValue(res.body?.account?.balance);
          this.sordarForm.get('address')?.setValue(res.body?.personAddress);
          this.sordarForm.get('name')?.disable();
          this.sordarForm.get('address')?.disable();
          this.sordarForm.get('amountToPay')?.disable();

          this.message = "* This sordar already exists in database!"

        }else{
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
