import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Account,
  Customer,
  Driver,
  Person,
  Product,
  Supplyer,
  SupplyInvoiceIssueModel,
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
  productList: Product[] = [];
  vehicles!: VehicleCategory[];
  deliveryTypeList = [{ label: 'Select Delivery Types', value: 0 }];
  isCC: boolean = true;
  isCFT: boolean = false;
  isEsc: boolean = false;
  needSupplyer: boolean = false;
  drivers!: Driver[];
  notFoundMessage!: string;
  transportCostPerTrip!:number;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.supplyer = new Supplyer();
    this.account = new Account();
    this.person = new Person();
    this.selectedProduct = new Product();
    this.selectedType = 0;
    this.supplyInvoice = new SupplyInvoiceIssueModel();
    this.deliveryTypeList = [
      { label: 'Select Delivery Types', value: 0 },
      { label: 'গাড়ি চু্ক্তি', value: 1 },
      { label: 'CFT', value: 2 },
      { label: 'এসকেভেটর', value: 3 },
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
    });
  }

  searchSupplyer() {
    console.log('Change Detected');
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.person = res.body;
          this.supplyer = res.body.supplyer;
        } else {
          this.needSupplyer = true;
          this.notFoundMessage = '*Supplyer Not Found. Please Add Suppler';
          return;
        }
      },
      error: (err) => {
        console.log(err);
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
    });
  }
  fetchVehicles() {
    this.userService.fetchTransportCategories().subscribe({
      next: (data) => {
        console.log(data.body);
        this.vehicles = data.body;
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
  calculateTransportCost(){
    this.supplyInvoice.transportCost = this.supplyInvoice.numberOfTrips * this.transportCostPerTrip;
  }
  onChnageVehicle() {
    // this.supplyInvoice.vehicleCategoryId = this.scheduleItem.vehicleCategory.id;
  }
  onChnageDriver() {}

  submitInvoice() {
    console.log(this.supplyInvoice);
  }
  uodateContact(data: any) {
    console.log('suppler added', data);
    this.person = data.person;
    this.account = data.account;
    this.supplyer = data;
    this.needSupplyer = false;
  }
}
