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
          console.log(data.body);
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
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
