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
  expenseCategories!:any[];
  filteredExpenseCategoriesOptions!:any;
  selectedExpense!:Expense;
  expenseName:string = "";
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
          this.filteredExpenseCategoriesOptions = data.body;
        }
      },
      error:(err)=>{
        this.userService.showMessage("ERROR!","Expense Category Not Found","OK",2000);
      }
    })
  }
  onExpenseNameInput(event: any) {
    if (event.target.value == '') {
      this.filteredExpenseCategoriesOptions = this.expenseCategories;
    } else {
      this.filteredExpenseCategoriesOptions = this._filterSupplier(event.target.value);
    }
  }
  private _filterSupplier(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.expenseCategories.filter((expense:any) =>
    expense.expenseName.toLowerCase().includes(filterValue)
    );
  }
  onExpenseSelected(event:any){
    this.expenseName = event.option.value.expenseName;
    this.selectedExpense = event.option.value;
  }
  submit(){
    if(!this.selectedExpense.categoryName 
      || !this.selectedExpense.expenseAmount
      || !this.selectedExpense.expenseName
      ){
        this.userService.showMessage("ERROR","Invalid Form","CLOSE",1000);
        return;
      }
    this.isSubmitted = true;
    this.selectedExpense.tnxDate = this.tnxDate;
    const params:Map<string,any> = new Map();
    params.set("expense",this.selectedExpense);
    this.userService.doExpense(params).subscribe({
      next:(data)=>{
        this.isSubmitted = false;
        this.selectedExpense = new Expense();
        this.expenseName = "";
        // this.tnxDate = new Date();
        this.userService.showMessage("Success!","Transaction Completed","OK",2000);
      },
      error:(err)=>{
        this.isSubmitted = false;
        this.userService.showMessage("ERROR!","Operation Failed . Error:"+err.message,"OK",2000);
      }
    })
  }
  // onChnageType(){
  //   this.selectedExpense.refference = this.selectedExpense.expenseName;
  // }
}
