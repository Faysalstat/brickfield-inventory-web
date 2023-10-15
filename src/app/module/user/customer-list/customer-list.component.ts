import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer, Person } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[] = [];
  // MatPaginator Inputs
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tnxIndex:number = 0;
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    this.fetchCustomers();
    this.initiateDummy();
  }

  fetchCustomers() {
    const params: Map<string, any> = new Map();
    params.set('offset', this.offset);
    params.set('limit', this.pageSize);
    this.userService.fetchAllCustomer(params).subscribe({
      next: (res) => {
        //console.log(res.body);
        this.customerList = res.body.data;
        this.length = res.body.length;
      },
      error: (err) => {
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Customer Fetching Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }
  initiateDummy() {}

  edit(customer: any) {
    this.route.navigate(['/home/edit-customer']);
  }
  deletecustomer(custoemr: any) {
    const params = new Map<string, any>();
    params.set('customer', custoemr);
    this.userService.deleteCustomer(params).subscribe({
      next: (res) => {
        //console.log(res);
      },
      error: (err) => {
        //console.log(err.message);
      this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }
  updateList(event:any){
    this.fetchCustomers();
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchCustomers();
  }
}
