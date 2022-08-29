import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account, Customer, InvoiceQueryBody, Person, Supplyer, SupplyQuery } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-supply-invoice',
  templateUrl: './list-supply-invoice.component.html',
  styleUrls: ['./list-supply-invoice.component.css']
})
export class ListSupplyInvoiceComponent implements OnInit {

  invoiceList!:any;
  customer!:Customer;
  offset: number = 0;
  limit = 5;
  queryBody!:SupplyQuery;
  contactNo!:string;
  statusList!:any[];
  supplyer!: Supplyer;
  account!: Account;
  person!: Person;
  notFoundMessage!: string;
  productList!: any[];
  constructor(
    private route: Router,
    private userService:UserService,
    private snackBar: MatSnackBar
    ) {
    this.invoiceList = [];
    this.queryBody = new SupplyQuery();
    this.statusList = [
      {label:"Select Delivery Status", value:null},
      {label:"Delivered", value:"DELIVERED"},
      {label:"Pending", value:"PENDING"}
      
    ]
   }
  ngOnInit(): void {
    this.fetchAllInvoices();
    this.fetchProductList();
  }


  fetchProductList() {
    this.userService.fetchAllProducts().subscribe({
      next: (data) => {
        console.log(data);

        this.productList = [{label:"Select Product",value:""}];
        data.body.map((elem:any)=>{
          this.productList.push({label:elem.productName,value:elem.productName});
        })

      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Product List Fetching Operation Failed" + err.message,"OK",2000);
      },
    });
  }
  searchInvoice(){
    this.fetchAllInvoices();
  }

  fetchAllInvoices(){
    const params: Map<string, any> = new Map();
    params.set('offset', this.offset);
    params.set('query', this.queryBody);
    this.userService.fetchAllSupplyInvoice(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.invoiceList = res.body;
        this.queryBody = new SupplyQuery();
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Supplyer Fetching Failed" + err.message,"OK",2000);
      },
      complete: ()=>{}
    });
  }
  openInvoice(invoice:any){
    this.route.navigate(["/home/schedule-delivery",invoice.id]);
  }
  editInvoice(invoice:any){
    this.route.navigate(["/home/edit-supply-invoice",invoice.id]);
  }
  nextPage() {
    // this.tnxIndex+=
    this.offset += 5;
    this.fetchAllInvoices();
  }
  previousPage() {
    if (this.offset > 5) {
      this.offset = this.limit + 5;
      
    } else if((this.offset-5)>=0) {
      this.offset = this.limit - 5;
    }
    else{
      return
    }
    this.fetchAllInvoices();
  }

}
