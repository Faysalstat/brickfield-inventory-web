import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Driver, EscavatorExpenseModel } from 'src/app/module/model';
import { UserService } from '../../user.service';
import { NotificationComponent } from '../notification/notification.component';

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
  constructor(
    private userService:UserService,
    private snackBar: MatSnackBar
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
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      }
    });
  }
  calculateTotalHourBill(){
   this.excavatorCostModel.totalBill = this.excavatorCostModel.hourlyRate * this.excavatorCostModel.totalHour;  
  }
  submit(){
    let excavatorModel = {
      productName:this.excavatorCostModel.productName,
      driver: this.excavatorCostModel.driver,
      totalHour: this.excavatorCostModel.totalHour,
      totalBill: this.excavatorCostModel.totalBill,
      hourlyRate: this.excavatorCostModel.hourlyRate,
      expenseName: "এসকেভেটের ভাড়া",
      categoryName: "পরিবহন",
      remark : this.excavatorCostModel.remark,
      deliveryType: 3,
      advancePayment:this.excavatorCostModel.advancePayment,
      duePayment:this.excavatorCostModel.duePayment,

    } 
  const params:Map<string,any> = new Map();
  params.set("escavator",excavatorModel);
  this.userService.payEscavatorBill(params).subscribe({
    next:(resData)=>{
      console.log(resData)
      this.snackBar.openFromComponent(NotificationComponent, {
        duration: 1000,
      });
      this.excavatorCostModel = new EscavatorExpenseModel();
    },
    error:(err)=>{
      this.snackBar.open(err, "Close it", {
        duration: 10000,
        horizontalPosition:'right',
        verticalPosition: 'top'
      });
    }
  })
  }
  calculateDue(){
    this.excavatorCostModel.duePayment = this.excavatorCostModel.totalBill - this.excavatorCostModel.advancePayment;
  }
  fetchProductList() {
    this.userService.fetchAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.productList = data.body;
        
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      }
    });
  }

}
