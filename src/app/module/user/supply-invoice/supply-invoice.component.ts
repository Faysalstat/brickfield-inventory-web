import { Component, OnInit } from '@angular/core';
import { Account, Customer, Person, Product, Supplyer, SupplyInvoiceIssueModel } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-supply-invoice',
  templateUrl: './supply-invoice.component.html',
  styleUrls: ['./supply-invoice.component.css']
})
export class SupplyInvoiceComponent implements OnInit {
  supplyer!:Supplyer;
  account!: Account;
  person!: Person;
  supplyInvoice!:SupplyInvoiceIssueModel;

  selectedProduct!:Product;
  productList:Product[]=[];
  constructor(
    private userService:UserService
  ) { 
    this.supplyer = new Supplyer();
    this.account = new Account();
    this.person = new Person();
    this.selectedProduct = new Product();
    this.supplyInvoice = new SupplyInvoiceIssueModel();
  }

  ngOnInit(): void {
    this.fetchProductList();
  }
  onChnageProduct(){
    // this.supplyerForm.get('productId')?.setValue(this.selectedProduct?.id);
  }
  searchSupplyer(){
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
fetchProductList(){
  this.userService.fetchAllProducts().subscribe({
    next:(data)=>{
      console.log(data);
      this.productList = data.body;
    }
  })
}
}
