import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Customer, Person, Supplyer, Tasks } from '../../model';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent implements OnInit {
  invoice!: any;
  supplyInvoice!: any;
  taskId!: number;
  person!: Person;
  account!: Account;
  customer!: Customer;
  supplyer!: Supplyer;
  driverPerson!: Person;
  deliveryType!: string;
  isEdit: boolean = false;
  isSupply: boolean = false;
  isCC: boolean = false;
  isCFT: boolean = false;
  isECL: boolean = false;
  isTON: boolean = false;
  isSubmitted: boolean = false;
  comment!: string;
  isLoading: boolean = false;
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
          if (res.body.taskType == Tasks.CREATE_SUPPLY) {
            this.supplyInvoice = res.body;
            console.log(this.supplyInvoice);
            if (this.supplyInvoice.deliveryType == 1) {
              this.isCC = true;
              this.deliveryType = 'গাড়ি চু্ক্তি';
            }
            if (this.supplyInvoice.deliveryType == 2) {
              this.isCFT = true;
              this.deliveryType = 'CFT';
            }
            if (this.supplyInvoice.deliveryType == 3) {
              this.isTON = true;
              this.deliveryType = 'TON';
            }
            if (this.supplyInvoice.deliveryType == 4) {
              this.isECL = true;
              this.deliveryType = 'এসকেভেটর';
            }
            this.isSupply = true;
            this.comment = this.supplyInvoice.comment;
            this.fetchSupplyerById(this.supplyInvoice.supplyer.id);
          } else {
            this.isSupply = false;
            this.invoice = res.body;
            if (res.body.taskType == Tasks.UPDATE_INVOICE) {
              this.isEdit = true;
            } else {
              this.isEdit = false;
            }
            this.comment = this.invoice.comment;
            this.fetchCustomerById(this.invoice.customerId);
          }
          console.log(res);
        },
        error: (err) => {
          console.log(err.message);
          this.userService.showMessage(
            'ERROR!',
            'Operation Failed' + err.message,
            'OK',
            2000
          );
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
      error: (err) => {
        console.log(err.message);
        this.userService.showMessage(
          'ERROR!',
          'Operation Failed' + err.message,
          'OK',
          2000
        );
      },
    });
  }
  fetchSupplyerById(id: any) {
    this.userService.fetchSupplyerById(id).subscribe({
      next: (res) => {
        this.supplyInvoice.supplyer = res.body;
        this.person = this.supplyInvoice.supplyer.person;
        console.log(res);
      },
      error: (err) => {
        console.log(err.message);
        this.userService.showMessage(
          'ERROR!',
          'Operation Failed' + err.message,
          'OK',
          2000
        );
      },
    });
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  }
  approveInvoice(event: any) {
    this.isSubmitted = true;
    this.isLoading = true;
    const params: Map<string, any> = new Map();
    if (event == 'APPROVED' || event == 'CORRECTION') {
      console.log(event);
      this.invoice.approvalStatus = event;
      this.invoice.taskId = this.taskId;
      this.invoice.isEdit = this.isEdit;
      this.invoice.comment = this.comment;
      params.set('invoice', this.invoice);
      this.adminService.approveSaleTask(params).subscribe({
        next: (data) => {
          console.log(data);
          this.isSubmitted = false;
          this.isLoading = false;
          this.userService.showMessage(
            'Success!',
            'Approval Done!',
            'OK',
            2000
          );
          this.router.navigate(['/admin/task-list']);
        },
        error: (err) => {
          console.log(err.message);
          this.isSubmitted = false;
          this.isLoading = false;
          this.userService.showMessage(
            'ERROR!',
            'Operation Failed' + err.message,
            'OK',
            2000
          );
        },
      });
    } else {
      let model: any = {};
      model.taskId = this.taskId;
      model.comment = this.comment;
      if (this.invoice) {
        model.invoiceId = this.invoice.id;
      }
      params.set('model', model);
      this.adminService.declineTask(params).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/admin/task-list']);
        },
        error: (err) => {
          console.log(err.message);
          this.userService.showMessage(
            'ERROR!',
            'Operation Failed' + err.message,
            'OK',
            2000
          );
        },
      });
    }
  }

  approveSupplyInvoice(event: any) {
    this.isSubmitted = true;
    const params: Map<string, any> = new Map();
    if (event == 'APPROVED') {
      console.log(event);
      this.supplyInvoice.approvalStatus = event;
      this.supplyInvoice.taskId = this.taskId;
      this.supplyInvoice.isEdit = this.isEdit;
      this.supplyInvoice.comment = this.comment;
      if (this.isTON) {
        this.supplyInvoice.totalQuantity = this.supplyInvoice.totalTonQuantity;
      }
      params.set('supplyInvoice', this.supplyInvoice);
      this.adminService.approveSupplyTask(params).subscribe({
        next: (data) => {
          this.isSubmitted = false;
          this.userService.showMessage('SUCCESS!', 'Approval Done', 'OK', 2000);
          this.router.navigate(['/admin/task-list']);
        },
        error: (err) => {
          this.isSubmitted = false;
          this.userService.showMessage(
            'ERROR!',
            'Operation Failed' + err.message,
            'OK',
            2000
          );
        },
      });
    } else {
      params.set('taskId', this.taskId);
      this.adminService.declineTask(params).subscribe({
        next: (data) => {
          this.userService.showMessage('SUCCESS!', 'Task Declied', 'OK', 2000);
          this.router.navigate(['/admin/task-list']);
        },
        error: (err) => {
          this.userService.showMessage(
            'ERROR!',
            'Operation Failed' + err.message,
            'OK',
            2000
          );
        },
      });
    }
  }
}
