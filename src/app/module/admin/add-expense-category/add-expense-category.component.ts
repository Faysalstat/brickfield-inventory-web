import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-expense-category',
  templateUrl: './add-expense-category.component.html',
  styleUrls: ['./add-expense-category.component.css']
})
export class AddExpenseCategoryComponent implements OnInit {
  // addExpenseCategory
  selectedType!:string;
  expenseName!:string;
  categoryName!:string;
  types:any[];
  constructor(
    private adminService:AdminService
  ) {
    this.types = [
      {label:"Select Type", value:null},
      {label:"FACTORY", value:"FACTORY"},
      {label:"OFFICE", value:"OFFICE"},
    ]
  }

  ngOnInit(): void {
  }
  submit(){
    let category = {
      type: this.selectedType,
      expenseName: this.expenseName.trim(),
      categoryName: this.expenseName.trim(),
    };
    const params:Map<string,any> = new Map();
    params.set("category",category);
    this.adminService.addExpenseCategory(params).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        window.alert(err.message);
      }
    })

  }
}
