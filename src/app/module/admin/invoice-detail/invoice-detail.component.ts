import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Customer, Person, Tasks } from '../../model';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent implements OnInit {
  invoice!: any;
  taskId!:number;
  person!: Person;
  account!: Account;
  customer!: Customer;
  driverPerson!: Person;
  isEdit: boolean = false;
  // orders!
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchInvoiceById();
  }
  fetchInvoiceById() {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.taskId = id;
      console.log(parameter);
      this.adminService.fetchTaskById(id).subscribe({
        next: (res) => {
          this.invoice = res.body;
          if(res.body.taskType==Tasks.UPDATE_INVOICE){
            this.isEdit = true;
          }else{
            this.isEdit = false;
          }
          this.fetchCustomerById(this.invoice.customerId);
          // this.person = this.invoice.customer.person;
          // if(!this.invoice.scheduleOrders){
          //   this.invoice.scheduleOrders = [];
          // }
          console.log(res);
        },
      });
    });
  }
  fetchCustomerById(id: any) {
    this.userService.fetchCustomerById(id).subscribe({
      next: (res) => {
        this.invoice.customer = res.body;
        this.person = this.invoice.customer.person;
        console.log(res);
      },
    });
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear();
  }
  approveInvoice(event: any) {
    console.log(event);
    const params: Map<string, any> = new Map();
    this.invoice.approvalStatus = event;
    this.invoice.taskId = this.taskId;
    this.invoice.isEdit = this.isEdit;
    params.set('invoice', this.invoice);
    this.adminService.approveInvoice(params).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/admin/task-list']);
      },
      error: (err) => console.log(err),
    });
  }
}
