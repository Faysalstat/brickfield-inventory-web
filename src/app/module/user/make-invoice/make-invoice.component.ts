import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, ApprovalModel, Brick, Customer, CustomerDomain, Driver, Invoice, InvoiceDomain, InvoiceIssueModel, OrderModel, Person, ScheduleDeliveryModel, Tasks, VehicleCategory } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-make-invoice',
  templateUrl: './make-invoice.component.html',
  styleUrls: ['./make-invoice.component.css'],
})
export class MakeInvoiceComponent implements OnInit {
  invoiceIssueForm!: FormGroup;
  invoiceId!: number;
  customer!: Customer;
  account!: Account;
  person!: Person;
  bricks!: Brick[];
  selectedBrick!: Brick;
  orders: OrderModel[] = new Array();
  ordersForDeliveryList: OrderModel[] = new Array();
  newOrders: OrderModel[] = new Array();
  schedules: ScheduleDeliveryModel[] = new Array();
  newSchedules: ScheduleDeliveryModel[] = new Array();
  orderItem!: OrderModel;
  scheduleItem!: ScheduleDeliveryModel;
  unscheduledQuantity!: number;
  selectedDriver!: any;
  selectedVehicle!: any;
  drivers!: Driver[];
  vehicles!: VehicleCategory[];
  customerBalance!: number;
  paidAmount!: number;
  // invoice!: Invoice;
  delivery!: ScheduleDeliveryModel;
  date!: Date;
  scheduleOrders!: ScheduleDeliveryModel[];
  isEdit: boolean = false;
  isReceiving: boolean = false;
  status!: string;
  isNeg!: boolean;
  isDue!: boolean;
  transportCostCustomerPayable:boolean = false;
  selectedOrder!: OrderModel;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.customer = new Customer();
    this.account = new Account();
    this.person = new Person();
    this.selectedBrick = new Brick();
    this.orderItem = new OrderModel();
    this.scheduleItem = new ScheduleDeliveryModel();
    this.bricks = [];
    this.delivery = new ScheduleDeliveryModel();
    this.date = new Date();
    this.scheduleOrders = [];
    this.drivers = [];
    this.prepareForm(null);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      console.log(parameter);
      if (id) {
        this.isEdit = true;
        this.invoiceId = id;
        this.fetchInvoiceById(id);
      } else {
        this.isEdit = false;
      }
    });
    this.fetchBricks();
    this.fetchDrivers();
    this.fetchVehicles();
  }

  prepareForm(formData: any) {
    if (!formData) {
      formData = new InvoiceDomain();
    }
    this.invoiceIssueForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      customer: [formData.customer],
      totalPrice: [formData.totalPrice, [Validators.required]],
      totalQuantity: [formData.totalQuantity, [Validators.required]],
      advancePayment: [formData.advancePayment],
      transportCost: [formData.transportCost],
      duePayment: [formData.duePayment],
      deliveryStatus: [formData.deliveryStatus],
      approvalStatus: [formData.approvalStatus],
      issuedBy: [formData.issuedBy],
      customerId: [formData.customerId],
      orders: [formData.orders],
      scheduleOrders: [formData.scheduleOrders],
      scheduledQuantity: [formData.scheduledQuantity],
      totalBill: [formData.totalBill],
      newPayment: [formData.newPayment],
      comment:[formData.comment]
    });
    this.invoiceIssueForm.get('duePayment')?.valueChanges.subscribe((data) => {
      if (data > 0) {
        this.isDue = true;
      } else {
        this.isDue = false;
      }
    });

    this.invoiceIssueForm
      .get('advancePayment')
      ?.valueChanges.subscribe((data) => {
        this.invoiceIssueForm
          .get('duePayment')
          ?.setValue(this.invoiceIssueForm.get('totalBill')?.value - data);
      });
    this.invoiceIssueForm.get('totalBill')?.valueChanges.subscribe((data) => {
      this.invoiceIssueForm
        .get('duePayment')
        ?.setValue(data - this.invoiceIssueForm.get('advancePayment')?.value);
    });
    // this.invoiceIssueForm
    //   .get('transportCost')
    //   ?.valueChanges.subscribe((data) => {
    //     if(this.transportCostCustomerPayable){
    //       this.invoiceIssueForm
    //       .get('totalBill')
    //       ?.setValue(this.invoiceIssueForm.get('totalPrice')?.value + data);
    //     }else{
    //       this.invoiceIssueForm
    //       .get('totalBill')
    //       ?.setValue(this.invoiceIssueForm.get('totalPrice')?.value);
    //     }
    //   });
    this.invoiceIssueForm.get('totalPrice')?.valueChanges.subscribe((data) => {
      if(this.transportCostCustomerPayable){
        this.invoiceIssueForm
        .get('totalBill')
        ?.setValue(data);
      }else{
        this.invoiceIssueForm
        .get('totalBill')
        ?.setValue(data);
      }
        
      
      
    });
    this.invoiceIssueForm.get('newPayment')?.valueChanges.subscribe((data) => {
      this.invoiceIssueForm
        .get('advancePayment')
        ?.setValue(this.paidAmount + data);
    });
  }
  searchCustomer() {
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.person = res.body;
          this.account = res.body.customer.account;
          if (this.account.balance >= 0) {
            this.isNeg = false;
            this.customerBalance = this.account.balance;
          } else {
            this.isNeg = true;
            this.customerBalance = Math.abs(this.account.balance);
          }
          this.customer = res.body.customer;
        } else {
          return;
        }
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
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
    if (this.isEdit) {
      const params: Map<string, any> = new Map();
      this.orderItem.invoiceId = this.invoiceIssueForm.get('id')?.value;
      params.set('orders', this.orderItem);
      this.newOrders.push(this.orderItem);
      
    }
    this.orders.push(this.orderItem);
    // this.ordersForDeliveryList.push(this.orderItem);
    this.selectedBrick = new Brick();
    this.orderItem = new OrderModel();
    this.calculateOrderTotal();
  }
  fetchBricks() {
    this.userService.fetchBricks().subscribe({
      next: (res) => {
        console.log(res);
        if (res.body) {
          this.bricks = res.body;
        }
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
    });
  }

  deleteOrder(index: any) {
    if (this.isEdit) {
      const params: Map<string, any> = new Map();
      params.set('order', this.orders[index]);
      this.userService.deleteOrder(params).subscribe({
        next: (data) => {
          console.log(data);
          window.alert('Order deleted');
          this.orders.splice(index, 1);
          this.calculateOrderTotal();
        },
        error:(err)=>{
          this.snackBar.open(err, "Close it", {
            duration: 10000,
            horizontalPosition:'right',
            verticalPosition: 'top'
          });
        },
        complete: () => {
          this.updateInvoice();
        },
      });
    } else {
      this.orders.splice(index, 1);
      console.log('===deleted====');
      console.log(this.orders);
      this.calculateOrderTotal();
    }
  }
  calculateOrderTotal() {
    let totalPrice = 0;
    let totalQuantity = 0;
    this.orders.forEach((order) => {
      totalPrice = totalPrice + order.totalPrice;
      totalQuantity = totalQuantity + order.quantity;
    });
    this.invoiceIssueForm.get('totalPrice')?.setValue(totalPrice);
    this.invoiceIssueForm.get('totalQuantity')?.setValue(totalQuantity);
  }

  onChnageDriver() {
    this.scheduleItem.driverId = this.scheduleItem.driver.id;
  }
  onChnageVehicle() {
    this.scheduleItem.vehicleCategoryId = this.scheduleItem.vehicleCategory.id;
  }
  addSchedule() {
    if (!this.scheduleItem.vehicleCategory || !this.scheduleItem.driver) {
      return;
    }
    if (this.isEdit) {
      const params: Map<string, any> = new Map();
      this.scheduleItem.invoiceId = this.invoiceIssueForm.get('id')?.value;
      this.scheduleItem.vehicleCategoryId =
      this.scheduleItem.vehicleCategory.id;
      params.set('schedules', this.scheduleItem);
      this.newSchedules.push(this.scheduleItem);
    } 
    this.schedules.push(this.scheduleItem);
    this.selectedVehicle = new VehicleCategory();
    this.selectedDriver = new Driver();
    this.scheduleItem = new ScheduleDeliveryModel();
    this.calculateScheduleTotal();
    this.checkScheduledQuantity();
  }
  calculateScheduleTotal() {
    let scheduledQuantity = 0;
    let totalTransportCost = 0;
    this.schedules.forEach((schedule) => {
      scheduledQuantity = scheduledQuantity + schedule.deliverableQuantity;
      totalTransportCost = totalTransportCost + schedule?.transportCost;
    });
    this.invoiceIssueForm.get('scheduledQuantity')?.setValue(scheduledQuantity);
    this.invoiceIssueForm.get('transportCost')?.setValue(totalTransportCost);
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }
  fetchInvoiceById(id: any) {
    this.userService.fetchInvoiceById(id).subscribe({
      next: (res) => {
        if (res.body) {
          console.log(res);
          this.invoiceIssueForm.get('id')?.setValue(res.body.id);
          this.customer = res.body.customer;
          this.person = res.body.customer.person;
          this.account = res.body.customer.account;
          if (this.account.balance >= 0) {
            this.isNeg = false;
            this.customerBalance = this.account.balance;
          } else {
            this.isNeg = true;
            this.customerBalance = Math.abs(this.account.balance);
          }
          this.orders = res.body.orders;
          
          this.schedules = res.body.scheduleOrders;
          this.ordersForDeliveryList= this.orders;
          this.paidAmount = res.body.advancePayment;
          this.status = res.body.approvalStatus;
          this.invoiceIssueForm
            .get('totalQuantity')
            ?.setValue(res.body.totalQuantity);
          this.invoiceIssueForm
            .get('totalPrice')
            ?.setValue(res.body.totalPrice);
          this.invoiceIssueForm
            .get('advancePayment')
            ?.setValue(res.body.advancePayment);
          this.invoiceIssueForm
            .get('duePayment')
            ?.setValue(res.body.duePayment);
          this.invoiceIssueForm.get('totalBill')?.setValue(res.body.totalBill);
          this.invoiceIssueForm.get('comment')?.setValue(res.body.comment);
          this.calculateScheduleTotal();
          this.calculateOrderTotal();

          this.invoiceIssueForm.get('totalQuantity')?.disable();
          this.invoiceIssueForm.get('totalPrice')?.disable();
          this.invoiceIssueForm.get('advancePayment')?.disable();
          this.invoiceIssueForm.get('duePayment')?.disable();
          this.invoiceIssueForm.get('totalBill')?.disable();
        }
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
    });
  }
  editDelivery(index: any) {}
  deleteDelivery(index: any) {
    if (this.isEdit) {
      const params: Map<string, any> = new Map();
      params.set('schedule', this.schedules[index]);
      this.userService.deleteSchedule(params).subscribe({
        next: (data) => {
          console.log(data);
          window.alert('Schedule deleted');
          this.schedules.splice(index, 1);
          this.calculateScheduleTotal();
        },
        error:(err)=>{
          this.snackBar.open(err, "Close it", {
            duration: 10000,
            horizontalPosition:'right',
            verticalPosition: 'top'
          });
        },
        complete: () => {
          this.updateInvoice();
        },
      });
    } else {
      this.schedules.splice(index, 1);
      console.log('===deleted====');
      console.log(this.schedules);
    }
  }
  fetchVehicles() {
    this.userService.fetchTransportCategories().subscribe({
      next: (data) => {
        console.log(data.body);
        this.vehicles = data.body;
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
    });
  }
  fetchDrivers() {
    this.userService.fetchAllDrivers().subscribe({
      next: (data) => {
        console.log(data.body);
        this.drivers = data.body;
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
    });
  }
  checkScheduledQuantity() {
    // for(let schedule of this.scheduleOrders)
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
    invoice.scheduleOrders = this.schedules;
    invoice.approvalStatus = 'PENDING';
    invoice.issuedBy = 'manager';

    // 1 = true, 0 = false 
 
    
    let approvalModel: ApprovalModel = new ApprovalModel();
    approvalModel.payload = JSON.stringify(invoice);
    // todo add user
    approvalModel.createdBy = 'Manager';
    approvalModel.taskType = Tasks.CREATE_INVOICE;
    params.set('approval', approvalModel);
    console.log(invoice);
    this.sendToApproval(params);
  }
  sendToApproval(params: any) {
    this.userService.createApproval(params).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home/invoice-list']);
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
      complete: () => {},
    });
  }
  createInvoice(params: any) {
    this.userService.createInvoice(params).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home/invoice-list']);
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  updateInvoice() {
    const params: Map<string, any> = new Map();
    let invoiceUpdateModel = {
      id: this.invoiceIssueForm.get('id')?.value,
      totalPrice: this.invoiceIssueForm.get('totalPrice')?.value,
      totalBill: this.invoiceIssueForm.get('totalBill')?.value,
      totalQuantity: this.invoiceIssueForm.get('totalQuantity')?.value,
      transportCost: this.invoiceIssueForm.get('transportCost')?.value,
      scheduledQuantity: this.invoiceIssueForm.get('scheduledQuantity')?.value,
      advancePayment: this.invoiceIssueForm.get('advancePayment')?.value,
      duePayment: this.invoiceIssueForm.get('duePayment')?.value,
      newPayment: this.invoiceIssueForm.get('newPayment')?.value,
      customerId:this.customer.id,
      account: this.account,
      orders : this.newOrders,
      comment: this.invoiceIssueForm.get('comment')?.value,
      
      scheduleOrders : this.newSchedules,
    };
    let approvalModel: ApprovalModel = new ApprovalModel();
    approvalModel.payload = JSON.stringify(invoiceUpdateModel);
    // todo add user
    approvalModel.createdBy = 'Manager';
    approvalModel.taskType = Tasks.UPDATE_INVOICE;
    approvalModel.invoiceId = invoiceUpdateModel.id;
    params.set('approval', approvalModel);
    this.sendToApproval(params);
  }
  showreceive() {
    this.isReceiving = true;
  }
  calculateBill(){
    this.invoiceIssueForm
          .get('totalBill')
          ?.setValue(this.invoiceIssueForm.get('totalPrice')?.value);
  }
  onChnageOrder(){
    this.scheduleItem.deliverableQuantity = this.selectedOrder.quantity;
    this.scheduleItem.brickId = this.selectedOrder.brick.id;
  }
}
