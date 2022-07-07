import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Brick, Customer, Driver, Invoice, InvoiceIssueModel, OrderModel, Person, ScheduleDeliveryModel } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
  invoiceIssueForm!: FormGroup;
  customer!: Customer;
  account!: Account;
  person!: Person;
  bricks!: Brick[];
  selectedBrick!: Brick;
  orders: OrderModel[] = new Array();
  schedules: ScheduleDeliveryModel[] = new Array();
  orderItem!: OrderModel;
  unscheduledQuantity!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
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
    this.prepareForm(null);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parameter => {
      let id = parameter['id'];
      console.log(parameter);
      this.userService.fetchInvoiceById(id).subscribe({
        next:(res)=>{
          this.prepareForm(res.body);
          this.person = res.body.customer.person;
          this.account = res.body.customer.account;
          this.orders = res.body.orders;
          this.schedules = res.body.scheduleOrders;
          // this.invoice =res.body;
          // if(!this.invoice.scheduleOrders){
          //   this.invoice.scheduleOrders = [];
          // }
          // // this.customer = 
          console.log(res);
        }

      })
    })
    
    this.fetchBricks();
  }
  prepareForm(formData: any) {
    if(!formData){
      formData = new Invoice();
    }
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
      scheduleOrders:[formData.scheduleOrders],
      scheduledQuantity:[formData.scheduledQuantity]

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
    this.invoiceIssueForm.get('scheduledQuantity')?.valueChanges.subscribe((data)=>{
      this.unscheduledQuantity = this.invoiceIssueForm.get('totalQuantity')?.value - data;
    })
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
    params.set('invoice', invoice);
    console.log("=========invoice object for update===========")
    // this.userService.updateInvoice(params).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.router.navigate(['/home/invoice-list']);
    //   },
    //   error: (err) => {},
    //   complete: () => {},
    // });
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
  applyFilter(date:any) {
    let newDate = new Date(date);
    return newDate.getFullYear()+"/"+newDate.getMonth()+"/"+newDate.getDate()
  }

}
