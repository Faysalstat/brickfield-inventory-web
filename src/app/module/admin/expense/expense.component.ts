import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expenseType!:string;
  expenseTypes!:any[];
  amount!:number;
  receivedBy!:string;
  remarks!:string;
  constructor(
    private userService: UserService,
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
  }
  fetchExpenseCategory(){
    this.userService.fetchExpenseCategories("OFFICE").subscribe({
      next:(data)=>{
        if(data){
          this.expenseTypes = data.body;
        }
      },
      error:(err)=>{
        window.alert(err.message);
      }
    })
  }

  submit(){
    let expenseModel = {
        expenseType: this.expenseType,
        amount: this.amount,
        receivedBy: this.receivedBy,
        remarks: this.remarks,
    }
    const params:Map<string,any> = new Map();
    params.set("expense",expenseModel);
    this.adminService.doOfficeExpense(params).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        window.alert(err.message);
      }
    })


  }
}
