import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit {
today!:Date;
  constructor() {
    this.today = new Date();
   }

  ngOnInit(): void {
  }
  

}
