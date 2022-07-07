import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Account,
  Brick,
  Customer,
  InvoiceIssueModel,
  OrderModel,
  Person,
} from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  invoiceIssueForm!: FormGroup;
  customer!: Customer;
  account!: Account;
  person!: Person;
  bricks!: Brick[];
  selectedBrick!: Brick;
  orders: OrderModel[] = new Array();
  orderItem!: OrderModel;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.customer = new Customer();
    this.account = new Account();
    this.person = new Person();
    this.selectedBrick = new Brick();
    this.orderItem = new OrderModel();
    this.bricks = [];
    // [
    //   {
    //     id: 1,
    //     categoryName: 'Select Brick Type',
    //     pricePerPiece: 0,
    //     quantity: 0,
    //   },
    //   {
    //     id: 2,
    //     categoryName: 'Paka Brick',
    //     pricePerPiece: 15,
    //     quantity: 1000000,
    //   },
    //   {
    //     id: 3,
    //     categoryName: 'Pora Brick',
    //     pricePerPiece: 10,
    //     quantity: 10000,
    //   },
    //   {
    //     id: 3,
    //     categoryName: 'Vanga Brick',
    //     pricePerPiece: 8,
    //     quantity: 50000,
    //   },
    // ];
  }

  ngOnInit(): void {
    this.prepareForm(null);
    this.fetchBricks();
  }
  prepareForm(formData: any) {
    formData = new InvoiceIssueModel();
    this.invoiceIssueForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      totalPrice: [formData.totalPrice, [Validators.required]],
      totalQuantity: [formData.totalQuantity, [Validators.required]],
      advancePayment: [formData.advancePayment],
      duePament: [formData.duePament],
      deliveryStatus: [formData.deliveryStatus],
      approvalStatus: [formData.approvalStatus],
      issuedBy: [formData.issuedBy],
      customerId: [formData.customerId],
      orders: [formData.orders],
    });

    this.invoiceIssueForm
      .get('advancePayment')
      ?.valueChanges.subscribe((data) => {
        this.invoiceIssueForm
          .get('duePament')
          ?.setValue(this.invoiceIssueForm.get('totalPrice')?.value - data);
      });
    this.invoiceIssueForm.get('totalPrice')?.valueChanges.subscribe((data) => {
      this.invoiceIssueForm
        .get('duePament')
        ?.setValue(data - this.invoiceIssueForm.get('advancePayment')?.value);
    });
  }

  fetchBricks() {
    this.userService.fetchBricks().subscribe({
      next: (res) => {
        console.log(res);
        if(res.body){
          this.bricks = res.body;
        }
        
      },
    });
  }
  searchCustomer() {
    console.log('Change Detected');
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          console.log(res.body);
          this.person = res.body;
          console.log(this.person);
          this.account = res.body.customer.account;
          console.log(this.account);
          this.customer = res.body.customer;
          console.log(this.customer);
        } else {
          return;
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  onChnageBrick() {
    console.log(this.selectedBrick);
    this.orderItem.brickId = this.selectedBrick.id;
    this.orderItem.brick = this.selectedBrick;
  }
  calculateTotalPrice() {
    this.orderItem.totalPrice =
      this.selectedBrick.pricePerPiece * this.orderItem.quantity;
  }
  addOrder() {
    this.orders.push(this.orderItem);
    this.selectedBrick = new Brick();
    this.orderItem = new OrderModel();
    this.calculateTotal();
  }
  submitInvoice() {
    console.log(this.orders);
    const params: Map<string, any> = new Map();
    console.log(this.invoiceIssueForm.value);
    if (this.invoiceIssueForm.invalid) {
      return;
    }
    let invoice: InvoiceIssueModel = this.invoiceIssueForm.value;
    invoice.customerId = this.customer.id;
    invoice.orders = this.orders;
    invoice.approvalStatus = 'PENDING';
    invoice.issuedBy = 'manager';
    params.set('invoice', invoice);
    this.userService.createInvoice(params).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home/invoice-list']);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  editOrder(i: any) {
    this.orderItem = this.orders[i];
    this.selectedBrick = this.orderItem.brick;
    console.log(this.orderItem);
    this.deleteOrder(i);
    this.calculateTotal();
  }
  deleteOrder(i: any) {
    this.orders.splice(i, 1);
    console.log('===deleted====');
    console.log(this.orders);
  }
  calculateTotal() {
    let totalPrice = 0;
    let totalQuantity = 0;
    this.orders.forEach((order) => {
      totalPrice = totalPrice + order.totalPrice;
      totalQuantity = totalQuantity + order.quantity;
    });
    this.invoiceIssueForm.get('totalPrice')?.setValue(totalPrice);
    this.invoiceIssueForm.get('totalQuantity')?.setValue(totalQuantity);
  }
 
}
