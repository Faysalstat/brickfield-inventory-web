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
  maxDate: Date = new Date();
  tnxDate: Date = new Date();
  isSubmitted: boolean = false;
  constructor(
    private userService:UserService,
    private snackBar: MatSnackBar
  ) {
    this.selectedExpense = new Expense();
    this.selectedExpense.tnxDate = new Date()
   }

  ngOnInit(): void {
    this.fetchExpenseCategory();
  }
  fetchExpenseCategory(){
    this.userService.fetchExpenseCategories("FACTORY").subscribe({
      next:(data)=>{
        if(data){
          this.expenseCategories = data.body;
        }
      },
      error:(err)=>{
        this.userService.showMessage("ERROR!","Expense Category Not Found","OK",2000);
      }
    })
  }

  submit(){
    if(!this.selectedExpense.categoryName 
      || !this.selectedExpense.expenseAmount
      || !this.selectedExpense.expenseName
      ){
        return;
      }
    this.isSubmitted = true;
    this.selectedExpense.tnxDate = this.tnxDate;
    const params:Map<string,any> = new Map();
    params.set("expense",this.selectedExpense);
    this.userService.doExpense(params).subscribe({
      next:(data)=>{
        this.isSubmitted = false;
        console.log(data);
        this.selectedExpense = new Expense();
        this.tnxDate = new Date();
        this.userService.showMessage("Success!","Transaction Completed","OK",2000);
      },
      error:(err)=>{
        this.isSubmitted = false;
        this.userService.showMessage("ERROR!","Operation Failed","OK",2000);
      }
    })
  }
  // onChnageType(){
  //   this.selectedExpense.refference = this.selectedExpense.expenseName;
  // }
}
