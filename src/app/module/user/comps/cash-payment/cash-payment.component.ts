import { Component, OnInit } from '@angular/core';
import { Account, Customer, Person } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.css']
})
export class CashPaymentComponent implements OnInit {
  cashReceivedAmount!: number;
  updatedDueAmount: number = 0;
  dueAmount!:number;
  updatedPayment!:number;
  person!: Person;
  customer!:Customer;
  account!:Account;
  updated : boolean = false;
  personTitle: string = "Customer";
  constructor(
    private userService:UserService
  ) { 
    this.account = new Account();
    this.customer = new Customer();
    this.person = new Person();
  }

  ngOnInit(): void {
  }
  onAmountAdded(){
    this.updated = true;
    this.updatedPayment = this.account.amountToPay - this.cashReceivedAmount;
  }
  searchCustomer() {
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.person = res.body;
          if(res.body.customer){
            this.personTitle = "Customer";
            this.account = res.body.customer.account;
          }
          if(res.body.supplyer){
            this.personTitle = "Suppler";
            this.account = res.body.supplyer.account;
          }
          if(res.body.driver){
            this.personTitle = "Driver";
            this.account = res.body.driver.account;
          }
          if(res.body.sordar){
            this.personTitle = "Sordar";
            this.account = res.body.sordar.account;
          }
          this.updatedPayment = this.account.balance;
        } else {
          return;
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  payCash(){
    if(this.cashReceivedAmount==0){
      return;
    }else{
      let cashReceiveObj = {
        accountId: this.account.id,
        amountReceived: this.cashReceivedAmount,
        updatedPayment: this.updatedPayment
      }
      const params:Map<string,any> = new Map();
      params.set("account",cashReceiveObj);
      this.userService.updateAccount(params).subscribe({
        next:(res)=>{
          this.account = res.body;
          this.cashReceivedAmount=0;
          this.updated = false;
        },
        error:(err)=>{
          console.log(err);
          window.alert(err);
        }
      })

    }
  }

}
