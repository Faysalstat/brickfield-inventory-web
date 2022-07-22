import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Account, Customer, Person, Product, Supplyer, SupplyInvoiceIssueModel, VehicleCategory } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-supply-invoice',
  templateUrl: './supply-invoice.component.html',
  styleUrls: ['./supply-invoice.component.css'],
})
export class SupplyInvoiceComponent implements OnInit {
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
  constructor(private userService: UserService) {
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
  }
  onChnageProduct() {
    // this.supplyerForm.get('productId')?.setValue(this.selectedProduct?.id);
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
  searchSupplyer() {
    console.log('Change Detected');
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          console.log(res.body);
          this.person = res.body;
          console.log(this.person);
          this.account = res.body.supplyer.account;
          console.log(this.account);
          this.supplyer = res.body.supplyer;
          console.log(this.supplyer);
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
  onChnageVehicle() {
    // this.supplyInvoice.vehicleCategoryId = this.scheduleItem.vehicleCategory.id;
  }
  // prepareForm(formData: any) {
  //   if (!formData) {
  //     formData = new SupplyInvoiceIssueModel();
  //   }
  //   this.invoiceIssueForm = this.formBuilder.group({
  //     id: [formData.id ? formData.id : null],
  //     customer: [formData.customer],
  //     totalPrice: [formData.totalPrice, [Validators.required]],
  //     totalQuantity: [formData.totalQuantity, [Validators.required]],
  //     advancePayment: [formData.advancePayment],
  //     transportCost: [formData.transportCost],
  //     duePayment: [formData.duePayment],
  //     deliveryStatus: [formData.deliveryStatus],
  //     approvalStatus: [formData.approvalStatus],
  //     issuedBy: [formData.issuedBy],
  //     customerId: [formData.customerId],
  //     orders: [formData.orders],
  //     scheduleOrders: [formData.scheduleOrders],
  //     scheduledQuantity: [formData.scheduledQuantity],
  //     totalBill: [formData.totalBill],
  //     newPayment: [formData.newPayment],
  //   });
  //   this.invoiceIssueForm.get('duePayment')?.valueChanges.subscribe((data) => {
  //     if (data > 0) {
  //       this.isDue = true;
  //     } else {
  //       this.isDue = false;
  //     }
  //   });

  //   this.invoiceIssueForm
  //     .get('advancePayment')
  //     ?.valueChanges.subscribe((data) => {
  //       this.invoiceIssueForm
  //         .get('duePayment')
  //         ?.setValue(this.invoiceIssueForm.get('totalBill')?.value - data);
  //     });
  //   this.invoiceIssueForm.get('totalBill')?.valueChanges.subscribe((data) => {
  //     this.invoiceIssueForm
  //       .get('duePayment')
  //       ?.setValue(data - this.invoiceIssueForm.get('advancePayment')?.value);
  //   });
  //   this.invoiceIssueForm
  //     .get('transportCost')
  //     ?.valueChanges.subscribe((data) => {
  //       if(this.transportCostCustomerPayable){
  //         this.invoiceIssueForm
  //         .get('totalBill')
  //         ?.setValue(this.invoiceIssueForm.get('totalPrice')?.value + data);
  //       }else{
  //         this.invoiceIssueForm
  //         .get('totalBill')
  //         ?.setValue(this.invoiceIssueForm.get('totalPrice')?.value);
  //       }
  //     });
  //   this.invoiceIssueForm.get('totalPrice')?.valueChanges.subscribe((data) => {
  //     if(this.transportCostCustomerPayable){
  //       this.invoiceIssueForm
  //       .get('totalBill')
  //       ?.setValue(this.invoiceIssueForm.get('transportCost')?.value + data);
  //     }else{
  //       this.invoiceIssueForm
  //       .get('totalBill')
  //       ?.setValue(data);
  //     }

  //   });
  //   this.invoiceIssueForm.get('newPayment')?.valueChanges.subscribe((data) => {
  //     this.invoiceIssueForm
  //       .get('advancePayment')
  //       ?.setValue(this.paidAmount + data);
  //   });
  // }
}
