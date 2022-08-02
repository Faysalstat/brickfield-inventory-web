import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person, Product } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-supplyer',
  templateUrl: './add-supplyer.component.html',
  styleUrls: ['./add-supplyer.component.css']
})
export class AddSupplyerComponent implements OnInit {
  @Output() supplyerAddedEvent = new EventEmitter<string>();
  @Input() contactNo = "";
  supplyerForm!: FormGroup;
  disable!:true;
  message:string = "";
  products:Product[] = [];
  selectedProduct!:any;
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService
  ) { 
    this.selectedProduct = {};
    this.prepareForm(null);
  }

  ngOnInit(): void {
    
    this.fetchProducts();
    this.supplyerForm.get("contactNo")?.setValue(this.contactNo);
  }
  onChnageProduct(){
    this.supplyerForm.get('productId')?.setValue(this.selectedProduct?.id);
  }
  prepareForm(formData: any) {
    formData = new Person();
    this.supplyerForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      name: [formData.personName, [Validators.required]],
      contactNo: [formData.contactNo, [Validators.required],],
      address: [formData.personAddress],
      balance:[formData.balance],
      productId:[formData.productId]
    });
  }
  fetchProducts(){
    this.userService.fetchAllProducts().subscribe({
      next:(data)=>{
        console.log(data);
        this.products =data.body;
      }
    })
  }
  submit() {
    const params:Map<string,any> = new Map();
    console.log(this.supplyerForm.controls);
    if(this.supplyerForm.invalid || this.disable){
      return;
    }
    const supplyer = {
      personName:this.supplyerForm.get('name')?.value,
      contactNo:this.supplyerForm.get('contactNo')?.value,
      personAddress:this.supplyerForm.get('address')?.value,
      balance:this.supplyerForm.get('balance')?.value||0,
      due:0,
      amountToPay:0,
      // productId:this.selectedProduct.id
    }
    params.set("supplyer",supplyer);
    this.userService.addSupplyer(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.supplyerAddedEvent.emit(res.body);
        this.supplyerForm.reset();
      },
      error:(err)=>{},
      complete: ()=>{}
    })
  }


  searchSupplyer(){
    console.log("Change Detected");
    this.userService.getCustomerByContactNo(this.supplyerForm.get('contactNo')?.value).subscribe({
      next:(res)=>{
        console.log(res.body);
        if(res.body){
          this.message= "This person is in our database";
          this.supplyerForm.get('name')?.setValue(res.body?.personName);
          this.supplyerForm.get('address')?.setValue(res.body?.personAddress);
          this.supplyerForm.get('name')?.disable();
          this.supplyerForm.get('address')?.disable();
          if(res.body.customer){
            this.message= "This person is in our database. </br> This person is a customer";
            this.supplyerForm.get('balance')?.setValue(res.body?.customer?.account?.balance);
            this.supplyerForm.get('balance')?.disable();
          }
          
          this.message = "* This Customer already exists!"

        }
        else{
          this.supplyerForm.get('name')?.enable();
          this.supplyerForm.get('address')?.enable();
          this.supplyerForm.get('balance')?.enable();
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
