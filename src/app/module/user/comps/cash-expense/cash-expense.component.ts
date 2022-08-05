import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private userService:UserService,
    private snackBar: MatSnackBar
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

  submit(){
    const params:Map<string,any> = new Map();
    params.set("expense",this.selectedExpense);
    this.userService.doExpense(params).subscribe({
      next:(data)=>{
        console.log(data);
        this.selectedExpense = new Expense();
        window.location.reload();
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
  // onChnageType(){
  //   this.selectedExpense.refference = this.selectedExpense.expenseName;
  // }
}
