import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  @Output() expenseEvent = new EventEmitter<string>();
  expenseType!:string;
  expenseTypes!:any[];
  amount!:number;
  receivedBy!:string;
  remarks!:string;
  selectedExpense!:any;
  isSubmitted: boolean = false;
  expenseCategories!:any[];
  filteredExpenseCategoriesOptions!:any;
  expenseName:string = "";
  issueDate:Date = new Date();
  constructor(
    private userService: UserService,
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
    this.fetchExpenseCategory();
  }
  fetchExpenseCategory(){
    this.userService.fetchExpenseCategories("OFFICE").subscribe({
      next:(data)=>{
        if(data){
          this.expenseTypes = data.body;
          this.expenseCategories = data.body;
          this.filteredExpenseCategoriesOptions = data.body;
          console.log(data.body);
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
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
    console.log(event);
    this.expenseName = event.option.value.expenseName;
    this.selectedExpense = event.option.value;
  }
  submit(){
    if(!this.amount || this.amount == 0 || !this.selectedExpense){
      this.adminService.showMessage("INVALID FORM","Input All field","OK",400);
      return;
    }
    this.isSubmitted = true;
    let expenseModel = {
        expenseReason: this.selectedExpense.expenseName,
        category: this.selectedExpense.categoryName,
        amount: this.amount || 0,
        receivedBy: this.receivedBy,
        remarks: this.remarks,
        tnxDate:this.issueDate
    }
    const params:Map<string,any> = new Map();
    params.set("expense",expenseModel);
    this.adminService.doOfficeExpense(params).subscribe({
      next:(data)=>{
        this.isSubmitted = false;
        console.log(data);
        this.selectedExpense = null;
        this.amount = 0;
        this.receivedBy = "";
        this.remarks ="";
        this.expenseName = "";
        this.expenseEvent.emit("Balance Changed");
        
        this.userService.showMessage("Success!","Payment Complete","OK",2000);
      },
      error:(err)=>{
        this.isSubmitted = false;
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })


  }
}
