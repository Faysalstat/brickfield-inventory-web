import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-escavator-payment',
  templateUrl: './escavator-payment.component.html',
  styleUrls: ['./escavator-payment.component.css']
})
export class EscavatorPaymentComponent implements OnInit {
  selectedDriver!:Driver;
  driverList!:Driver[];
  totalHour:number=0;
  hourlyRate:number=0;
  totalBill:number=0;
  remark!:string;
  advancePayment:number=0;
  duePayment: number=0;
  productList!:any[];
  productName!:any;
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.fetchDrivers();
    this.fetchProductList();
  }
  fetchDrivers() {
    this.userService.fetchAllDrivers().subscribe({
      next: (data) => {
        console.log(data.body);
        this.driverList = data.body;
      },
    });
  }
  calculateTotalHourBill(){
   this.totalBill = this.hourlyRate * this.totalHour;  
  }
  submit(){
    let excavatorModel = {
      productName:this.productName,
      driver: this.selectedDriver,
      totalHour: this.totalHour,
      totalBill: this.totalBill,
      hourlyRate: this.hourlyRate,
      expenseName: "এসকেভেটের ভাড়া",
      categoryName: "পরিবহন",
      remark : this.remark,
      deliveryType: 3,
      advancePayment:this.advancePayment,
      duePayment:this.duePayment,

    } 
  const params:Map<string,any> = new Map();
  params.set("escavator",excavatorModel);
  this.userService.payEscavatorBill(params).subscribe({
    next:(resData)=>{
      console.log(resData)

    },
    error:(err)=>{
      console.log(err);
    }
  })
  }
  calculateDue(){
    this.duePayment = this.totalBill - this.advancePayment;
  }
  fetchProductList() {
    this.userService.fetchAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.productList = data.body;
        
      },
    });
  }

}
