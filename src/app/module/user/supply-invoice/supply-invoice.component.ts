import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  Account,
  ApprovalModel,
  Customer,
  Driver,
  Person,
  Product,
  Supplyer,
  SupplyInvoiceIssueModel,
  Tasks,
  VehicleCategory,
} from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-supply-invoice',
  templateUrl: './supply-invoice.component.html',
  styleUrls: ['./supply-invoice.component.css'],
})
export class SupplyInvoiceComponent implements OnInit {
  issueSupplyForm!: FormGroup;
  supplyer!: Supplyer;
  account!: Account;
  person!: Person;
  supplyInvoice!: SupplyInvoiceIssueModel;
  invoiceIssueForm!: FormGroup;
  selectedProduct!: Product;
  selectedType!: number;
  selectedDriver!: Driver;
  productList: Product[] = [];
  vehicles!: VehicleCategory[];
  deliveryTypeList = [{ label: 'Select Delivery Types', value: 0 }];
  isCC: boolean = true;
  isCFT: boolean = false;
  isEsc: boolean = false;
  needSupplyer: boolean = false;
  drivers!: Driver[];
  notFoundMessage!: string;
  transportCostPerTrip:number = 0;
  costAmount:number = 0;
  totalCostAmount:number = 0;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.supplyer = new Supplyer();
    this.account = new Account();
    this.person = new Person();
    this.supplyer.person = this.person;
    this.selectedProduct = new Product();
    this.selectedType = 0;
    this.supplyInvoice = new SupplyInvoiceIssueModel();
    this.deliveryTypeList = [
      { label: 'Select Delivery Types', value: 0 },
      { label: 'গাড়ি চু্ক্তি', value: 1 },
      { label: 'CFT', value: 2 },
      // { label: 'এসকেভেটর', value: 3 },
    ];
  }

  ngOnInit(): void {
    this.fetchProductList();
    this.fetchVehicles();
    this.fetchDrivers();
  }
  prepareForm(formData: any) {
    // formData = new Person();
    this.issueSupplyForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      supplyerName: [formData.personName, [Validators.required]],
      contactNo: [formData.contactNo, [Validators.required]],
      address: [formData.personAddress],
      balance: [formData.balance],
      productId: [formData.productId],
    });
  }

  onChnageProduct() {
    // this.supplyerForm.get('productId')?.setValue(this.selectedProduct?.id);
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

  searchSupplyer() {
    console.log('Change Detected');
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.person = res.body;
          this.supplyer = res.body.supplyer;
          this.needSupplyer = false;
        } else {
          this.needSupplyer = true;
          this.notFoundMessage = '*Supplyer Not Found. Please Add Suppler';
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
  fetchProductList() {
    this.userService.fetchAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.productList = data.body;
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
  onChnageDeliveryType() {
    if (this.selectedType == 1) {
      this.isCC = true;
      this.isCFT = false;
      this.isEsc = false;
    } else if (this.selectedType == 2) {
      this.isCC = false;
      this.isCFT = true;
      this.isEsc = false;
    } else if (this.selectedType == 3) {
      this.isCC = false;
      this.isCFT = false;
      this.isEsc = true;
    }
  }
  calculateCCTotal() {
    this.supplyInvoice.totalPrice =
    this.supplyInvoice.pricePerTrip * this.supplyInvoice.numberOfTrips;
    this.calculateTransportCost();
  }
  calculateCFTotal() {
    this.supplyInvoice.totalCFTPrice =
    this.supplyInvoice.pricePerCFT * this.supplyInvoice.cftQuantity;
    this.supplyInvoice.actualCFTPrice =
    this.supplyInvoice.pricePerCFT * this.supplyInvoice.actualCftQuantity;
    this.supplyInvoice.totalPrice = this.supplyInvoice.actualCFTPrice;
    this.supplyInvoice.totalAmountToPay = this.supplyInvoice.totalPrice + this.supplyInvoice.transportCost;
  }
  calculateTransportCost(){
    this.supplyInvoice.transportCost = this.supplyInvoice.numberOfTrips * this.transportCostPerTrip;
    this.calculateSummary();
  }
  calculateTotalAmountToPay(){
    this.supplyInvoice.totalAmountToPay = this.supplyInvoice.totalPrice + this.supplyInvoice.transportCost;
  }
  onChnageVehicle() {
    // this.supplyInvoice.vehicleCategoryId = this.scheduleItem.vehicleCategory.id;
  }
  calculateHourlyCost() {
    this.supplyInvoice.totalPrice = this.supplyInvoice.totalHour * this.supplyInvoice.costPerHour;
    this.supplyInvoice.totalAmountToPay = this.supplyInvoice.totalPrice;
  }
  calculateDueAmount(){
    this.supplyInvoice.duePayment = this.supplyInvoice.totalAmountToPay - this.supplyInvoice.advancePayment; 
  }

  submitInvoice() {
    console.log(this.supplyInvoice);
    let supplyInvoiceModel:any = this.supplyInvoice;
    supplyInvoiceModel.supplyer = this.supplyer;
    // supplyInvoiceModel.supplyer.person = this.person;
    supplyInvoiceModel.driver = this.selectedDriver;
    supplyInvoiceModel.productName = this.selectedProduct.productName;
    supplyInvoiceModel.deliveryType = this.selectedType;
    const params: Map<string, any> = new Map();
    let approvalModel: ApprovalModel = new ApprovalModel();
    approvalModel.payload = JSON.stringify(supplyInvoiceModel);
    // todo add user
    approvalModel.createdBy = 'Manager';
    approvalModel.taskType = Tasks.CREATE_SUPPLY;
    params.set("approval",approvalModel);
    this.sendToApproval(params);
  }

  sendToApproval(params: any) {
    this.userService.createApproval(params).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home/supply-list']);
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

  uodateContact(data: any) {
    console.log('suppler added', data);
    this.person = data.person;
    this.account = data.account;
    this.supplyer = data;
    this.needSupplyer = false;
  }

  calculateSummary(){
    this.supplyInvoice.totalAmountToPay = this.supplyInvoice.totalPrice + this.supplyInvoice.transportCost;
  }
}
