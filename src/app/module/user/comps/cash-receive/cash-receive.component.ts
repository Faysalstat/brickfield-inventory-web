import { Component, OnInit } from '@angular/core';
import { Account, Customer, Person } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cash-receive',
  templateUrl: './cash-receive.component.html',
  styleUrls: ['./cash-receive.component.css']
})
export class CashReceiveComponent implements OnInit {
  cashReceivedAmount!: number;
  updatedDueAmount: number = 0;
  dueAmount!:number;
  updatedBalance!:number;
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
    this.updatedBalance = this.account.balance + this.cashReceivedAmount;
  }
  searchCustomer() {
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.person = res.body;
          this.personTitle = "Customer";
          this.account = res.body.customer.account;
          this.updatedBalance = this.account.balance;
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
  receiveCash(){
    if(this.cashReceivedAmount==0){
      return;
    }else{
      let cashReceiveObj = {
        accountId: this.account.id,
        amountReceived: this.cashReceivedAmount,
        updatedBalance: this.updatedBalance
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