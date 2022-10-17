import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  isTON: boolean = false;
  
  needSupplyer: boolean = false;
  drivers!: Driver[];
  notFoundMessage!: string;
  transportCostPerTrip:number = 0;
  costAmount:number = 0;
  totalCostAmount:number = 0;
  isApprovalNeeded:boolean = false;
  isSubmitted:boolean = false;
  constructor(
    
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
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
      { label: 'TON', value: 3 },
      // { label: 'এসকেভেটর', value: 3 },
    ]; 
    // miracoff, monas 10
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
    const params: Map<string, any> = new Map();
    params.set('offset', 0);
    params.set('limit', 100);
    this.userService.fetchAllDrivers(params).subscribe({
      next: (data) => {
        console.log(data.body);
        this.drivers = data.body.data;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Driver Fetching Operation Failed" + err.message,"OK",2000);
      },
    });
  }

  searchSupplyer() {
    console.log('Change Detected');
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.person = res.body;
          console.log(res.body);
          if(res.body.supplyer){
            this.supplyer = res.body.supplyer;
            this.notFoundMessage = '';
          }else{
            this.userService.showMessage("ERROR!","Not a Supplyer, Add Now!","OK",2000);
            this.notFoundMessage = '*Not a Supplyer, Add Now!';
            this.needSupplyer = true;
            return;
          }
          this.needSupplyer = false;
        } else {
          this.needSupplyer = true;
          this.notFoundMessage = '*Supplyer Not Found. Please Add Suppler';
          this.person.personAddress = "";
          this.person.personName = '';
          return;
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Supplyer Searching Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }

  addSupplyer(){
    const params:Map<string,any> = new Map();
    if(!this.person.contactNo || !this.person.personName || !this.person.personAddress){
      this.userService.showMessage("WARNING!","Invalid Input","OK",10000);
      return;
    }
    let supplyer = {
      personId: this.person.id,
      personName:this.person.personName,
      contactNo:this.person.contactNo,
      personAddress:this.person.personAddress,
      clientType:"SUPPLYER"
    }
    params.set("supplyer",supplyer);
    this.userService.addSupplyer(params).subscribe({
      next:(res)=>{
        this.supplyer = res.body;
        this.notFoundMessage = '';
        this.needSupplyer = false;
        this.userService.showMessage("SUCCESS!","Supplyer Created","OK",1000);

      },
      error:(err)=>{
        console.log(err.message);
        this.notFoundMessage = '*Supplyer Not Found. Please Add Suppler';
        this.needSupplyer = true;
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: ()=>{}
    })
  }
  fetchProductList() {
    this.userService.fetchAllProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.productList = data.body;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Product List Fetching Operation Failed" + err.message,"OK",2000);
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
        console.log(err.message);
        this.userService.showMessage("ERROR!","Vehicle Fetching Operation Failed" + err.message,"OK",2000);
      },
    });
  }
  onChnageDeliveryType() {
    if (this.selectedType == 1) {
      this.isCC = true;
      this.isCFT = false;
      this.isTON = false;
    } else if (this.selectedType == 2) {
      this.isCC = false;
      this.isCFT = true;
      this.isTON = false;
    } else if (this.selectedType == 3) {
      this.isCC = false;
      this.isCFT = false;
      this.isTON = true;
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
    this.supplyInvoice.duePayment = this.supplyInvoice.totalAmountToPay - this.supplyInvoice.advancePayment - this.supplyInvoice.rebate;
  }
  calculateTransportCost(){
    this.supplyInvoice.transportCost = this.supplyInvoice.numberOfTrips * this.transportCostPerTrip;
    this.calculateSummary();
  }
  calculateTotalAmountToPay(){
    this.supplyInvoice.totalAmountToPay = this.supplyInvoice.totalPrice + this.supplyInvoice.transportCost;
    this.supplyInvoice.duePayment = this.supplyInvoice.totalAmountToPay - this.supplyInvoice.advancePayment - this.supplyInvoice.rebate;
  }
  onChnageVehicle() {
    // this.supplyInvoice.vehicleCategoryId = this.scheduleItem.vehicleCategory.id;
  }
  calculateHourlyCost() {
    this.supplyInvoice.totalPrice = this.supplyInvoice.totalHour * this.supplyInvoice.costPerHour;
    this.supplyInvoice.totalAmountToPay = this.supplyInvoice.totalPrice;
  }
  calculateDueAmount(){
    this.supplyInvoice.duePayment = this.supplyInvoice.totalAmountToPay - this.supplyInvoice.advancePayment - this.supplyInvoice.rebate;
  }

  submitInvoice() {
    
    console.log(this.supplyInvoice);
    if(!this.supplyer){
      this.userService.showMessage("ERROR!","Invalid Form, ADD SUPPLYER","OK",2000);
      return;
    }
    if(!this.selectedProduct || !this.selectedType || this.selectedType==0){
      this.userService.showMessage("ERROR!","Invalid Form! Select Product and Type","OK",2000);
      return;
    }
    let supplyInvoiceModel:any = this.supplyInvoice;
    supplyInvoiceModel.supplyer = this.supplyer;
    supplyInvoiceModel.driver = this.selectedDriver;
    supplyInvoiceModel.productName = this.selectedProduct.productName;
    supplyInvoiceModel.deliveryType = this.selectedType;
    if(this.selectedType == 1){
      supplyInvoiceModel.quantityType = this.supplyInvoice.numberOfTrips + " গাড়ি";
    }
    if(this.selectedType == 2){
      supplyInvoiceModel.quantityType = this.supplyInvoice.actualCftQuantity + " CFT";
    }
    if(this.selectedType == 3){
      supplyInvoiceModel.quantityType = this.supplyInvoice.totalTonQuantity + " TON";
    }
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
    this.isSubmitted =true;
    this.userService.createApproval(params).subscribe({
      next: (res) => {
        console.log(res);
        this.isSubmitted =false;
        this.userService.showMessage("Success!","Item Sent For Approval","OK",2000);
        this.router.navigate(['/home/supply-list']);
      },
      error:(err)=>{
        console.log(err.message);
        this.isSubmitted =false;
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
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
    this.supplyInvoice.duePayment = this.supplyInvoice.totalAmountToPay - this.supplyInvoice.advancePayment - this.supplyInvoice.rebate;
  }
  calculateTonTotal(){
    this.supplyInvoice.totalTonCost =  this.supplyInvoice.totalTonQuantity*this.supplyInvoice.costPerTon;
    this.supplyInvoice.totalPrice = this.supplyInvoice.totalTonCost;
    this.supplyInvoice.totalAmountToPay = this.supplyInvoice.totalPrice + this.supplyInvoice.transportCost;
  }
  setInvoiceData(){

  }
}
