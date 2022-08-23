import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
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
