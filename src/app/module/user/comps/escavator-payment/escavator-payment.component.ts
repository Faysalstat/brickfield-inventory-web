import { Component, OnInit } from '@angular/core';
import { Driver, EscavatorExpenseModel } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-escavator-payment',
  templateUrl: './escavator-payment.component.html',
  styleUrls: ['./escavator-payment.component.css']
})
export class EscavatorPaymentComponent implements OnInit {
  selectedDriver!:Driver;
  driverList!:Driver[];
  excavatorCostModel:EscavatorExpenseModel = new EscavatorExpenseModel();
  productList!:any[];
  isSubmitted:boolean = false;
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.fetchDrivers();
    this.fetchProductList();
    
  }
  fetchDrivers() {
    const params: Map<string, any> = new Map();
    params.set('offset', 0);
    params.set('limit', 100);
    this.userService.fetchAllDrivers(params).subscribe({
      next: (data) => {
        //console.log(data.body);
        this.driverList = data.body.data;
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    });
  }
  calculateTotalHourBill(){
   this.excavatorCostModel.totalBill = this.excavatorCostModel.hourlyRate * this.excavatorCostModel.totalHour;  
  }
  submit(){
    this.isSubmitted = true;
    let excavatorModel = {
      productName:this.excavatorCostModel.productName,
      driver: this.excavatorCostModel.driver,
      totalHour: this.excavatorCostModel.totalHour,
      totalBill: this.excavatorCostModel.totalBill,
      hourlyRate: this.excavatorCostModel.hourlyRate,
      expenseName: "এসকেভেটের ভাড়া",
      categoryName: "পরিবহন",
      remark : this.excavatorCostModel.remark,
      deliveryType: 4,
      advancePayment:this.excavatorCostModel.advancePayment,
      duePayment:this.excavatorCostModel.duePayment,
      tnxDate:this.excavatorCostModel.tnxDate
    } 
  const params:Map<string,any> = new Map();
  params.set("escavator",excavatorModel);
  this.userService.payEscavatorBill(params).subscribe({
    next:(resData)=>{
      this.isSubmitted = false;
      //console.log(resData)
      this.userService.showMessage("Successs!","Operation Success","OK",2000);
      this.excavatorCostModel = new EscavatorExpenseModel();
    },
    error:(err)=>{
      this.isSubmitted = false;
      //console.log(err.message);
      this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
    }
  })
  }
  calculateDue(){
    this.excavatorCostModel.duePayment = this.excavatorCostModel.totalBill - this.excavatorCostModel.advancePayment;
  }
  fetchProductList() {
    this.isSubmitted = true;
    this.userService.fetchAllProducts().subscribe({
      next: (data) => {
        this.isSubmitted = false;
        //console.log(data);
        this.productList = data.body;
        
      },
      error:(err)=>{
        this.isSubmitted = false;
        //console.log(err.message);
      this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    });
  }

}
