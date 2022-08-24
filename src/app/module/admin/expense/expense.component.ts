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
        window.alert(err.message);
      }
    })
  }

  submit(){
    let expenseModel = {
        expenseReason: this.selectedExpense.expenseName,
        category: this.selectedExpense.categoryName,
        amount: this.amount,
        receivedBy: this.receivedBy,
        remarks: this.remarks,
    }
    const params:Map<string,any> = new Map();
    params.set("payment",expenseModel);
    this.adminService.doSordarPayment(params).subscribe({
      next:(data)=>{
        console.log(data);
        this.selectedExpense = null;
        this.amount = 0;
        this.receivedBy = "";
        this.remarks ="";
        this.expenseEvent.emit("Balance Changed");
      },
      error:(err)=>{
        window.alert(err.message);
      }
    })


  }
}
