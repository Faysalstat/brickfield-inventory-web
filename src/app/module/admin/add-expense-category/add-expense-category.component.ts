import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-expense-category',
  templateUrl: './add-expense-category.component.html',
  styleUrls: ['./add-expense-category.component.css'],
})
export class AddExpenseCategoryComponent implements OnInit {
  // addExpenseCategory
  selectedType!: string;
  selectedCategory!: string;
  expenseName!: string;
  categoryName!: string;
  types: any[];
  expenseCatgories: any;
  constructor(private adminService: AdminService) {
    this.types = [
      { label: 'Select Type', value: null },
      { label: 'FACTORY', value: 'FACTORY' },
      { label: 'OFFICE', value: 'OFFICE' },
    ];
    this.expenseCatgories = [
      { label: 'Select Category', value: null },
      { label: 'ভাড়া', value: 'ভাড়া' },
      { label: 'পরিবহন', value: 'পরিবহন' },
      { label: 'মজুরি', value: 'মজুরি' },
      { label: 'খরচ', value: 'খরচ' },
      { label: 'বিল', value: 'বিল' },
    ];
  }

  ngOnInit(): void {}
  submit() {
    let category = {
      type: this.selectedType,
      expenseName: this.expenseName.trim(),
      categoryName: this.selectedCategory.trim(),
    };
    const params: Map<string, any> = new Map();
    params.set('category', category);
    this.adminService.addExpenseCategory(params).subscribe({
      next: (data) => {
        //console.log(data);
        this.selectedType = '';
        this.selectedCategory = '';
        this.expenseName = '';
        this.adminService.showMessage("Success!","Operation Successfull","OK",2000);
      },
      error: (err) => {
        this.adminService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
    });
  }
}
