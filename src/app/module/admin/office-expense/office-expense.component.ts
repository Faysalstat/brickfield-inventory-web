import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-office-expense',
  templateUrl: './office-expense.component.html',
  styleUrls: ['./office-expense.component.css']
})
export class OfficeExpenseComponent implements OnInit {
  expenseType!:string;
  expenseTypes!:string;
  amount!:number;
  receivedBy!:string;
  remarks!:string;
  balance!:number;
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.fetchGlBalance();
  }
  fetchGlBalance(){
    this.userService.fetchGLAccountBalance("OFFICE_GL").subscribe({
      next:(accRes)=>{
        console.log(accRes);
        this.balance = accRes.body.balance;
      },
      error:(err)=>{
       window.alert(err.message);
      }
    })
  }
  updateBalance(event:any){
    console.log("Balance Changed");
    this.fetchGlBalance();
  }
  submit(){
    let expenseModel = {
        expenseType: this.expenseType,
        amount: this.amount,
        receivedBy: this.receivedBy,
        remarks: this.remarks,
    }
  }

}
