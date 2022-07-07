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
  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    this.fetchCustomers();
    this.initiateDummy();
  }

  fetchCustomers() {
    this.userService.fetchAllCustomer().subscribe({
      next: (res) => {
        console.log(res.body);
        this.customerList = res.body;
      },
      error: (err) => {
        console.log(err);
        this.customerList = [
          {
            id: 1,
            person: {
              id: 1,
              personName: 'Faysal Ahmad',
              personAddress: 'Hatirjhil, dhaka',
              contactNo: '012352323',
            },
            account: {
              id: 1,
              
              balance: 100,
              due: 50,
              amountToPay: 0,
            },
          },
          {
            id: 2,
            person: {
              id: 2,
              personName: 'Milton',
              personAddress: 'Seugari Bogra',
              contactNo: '012352323',
            },
            account: {
              id: 2,
              
              balance: 10000,
              due: 50,
              amountToPay: 0,
            },
          },
        ];
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
        console.log(res);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  updateList(event:any){
    this.fetchCustomers();
  }
}
