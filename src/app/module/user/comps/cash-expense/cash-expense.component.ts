import { Component, OnInit } from '@angular/core';
import { Driver, Expense } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cash-expense',
  templateUrl: './cash-expense.component.html',
  styleUrls: ['./cash-expense.component.css']
})
export class CashExpenseComponent implements OnInit {
  expenseCategories!:Expense[];
  selectedExpense!:Expense;


  constructor(
    private userService:UserService
  ) {
    this.selectedExpense = new Expense();
   }

  ngOnInit(): void {
    this.fetchExpenseCategory();
  }
  fetchExpenseCategory(){
    this.userService.fetchExpenseCategories().subscribe({
      next:(data)=>{
        if(data){
          this.expenseCategories = data.body;
        }
      }
    })
  }

  submit(){
    const params:Map<string,any> = new Map();
    params.set("expense",this.selectedExpense);
    this.userService.doExpense(params).subscribe({
      next:(data)=>{
        console.log(data);
        this.selectedExpense = new Expense();
      },
      error:(err)=>{
        window.alert(err);
      }
    })
  }
  // onChnageType(){
  //   this.selectedExpense.refference = this.selectedExpense.expenseName;
  // }
}
