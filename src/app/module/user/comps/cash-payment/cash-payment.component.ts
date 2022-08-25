import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  transactionReason:string = "Payment to Driver";
  constructor(
    private userService:UserService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) { 
    this.account = new Account();
    this.customer = new Customer();
    this.person = new Person();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      console.log(parameter);
      this.userService.getAccountById(id).subscribe({
        next: (res) => {
          console.log(res);
          this.account = res.body;
          if(res.body.customer){
            this.personTitle = "Customer";
            this.person = res.body.customer.person;
          }
          if(res.body.supplyer){
            this.personTitle = "Suppler";
            this.person = res.body.supplyer.person;
          }
          if(res.body.driver){
            this.personTitle = "Driver";
            this.person = res.body.driver.person;
          }
          if(res.body.sordar){
            this.personTitle = "Sordar";
            this.person = res.body.sordar.person;
          }
          this.updatedPayment = this.account.balance;
        }
      });
    });
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
        updatedPayment: this.updatedPayment,
        transactionReason: this.transactionReason,
      }
      const params:Map<string,any> = new Map();
      params.set("account",cashReceiveObj);
      this.userService.updateAccount(params).subscribe({
        next:(res)=>{
          this.account = res.body;
          this.cashReceivedAmount=0;
          this.updated = false;
          this.route.navigate(["/home/cash-payment-due-list"]);
        },
        error:(err)=>{
          console.log(err);
          window.alert(err);
        }
      })

    }
  }

}
