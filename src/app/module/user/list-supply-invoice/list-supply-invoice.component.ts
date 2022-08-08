import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account, Customer, InvoiceQueryBody, Person, Supplyer } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-supply-invoice',
  templateUrl: './list-supply-invoice.component.html',
  styleUrls: ['./list-supply-invoice.component.css']
})
export class ListSupplyInvoiceComponent implements OnInit {

  invoiceList!:any;
  customer!:Customer;
  offset:number = 0;
  limit = 5;
  queryBody!:InvoiceQueryBody;
  contactNo!:string;
  statusList!:any[];
  supplyer!: Supplyer;
  account!: Account;
  person!: Person;
  notFoundMessage!: string;
  constructor(
    private route: Router,
    private userService:UserService,
    private snackBar: MatSnackBar
    ) {
    this.invoiceList = [];
    this.queryBody = new InvoiceQueryBody();
    this.statusList = [
      {label:"Select Delivery Status", value:null},
      {label:"Delivered", value:"DELIVERED"},
      {label:"Pending", value:"PENDING"}
      
    ]
   }
  ngOnInit(): void {
    this.fetchAllInvoices();
  }
  searchInvoice(){
    this.fetchAllInvoices();
  }

  searchSupplyer() {
    console.log('Change Detected');
    this.userService.getCustomerByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.person = res.body;
          this.supplyer = res.body.supplyer;
          this.queryBody.supplyerId = this.supplyer.id;
        } else {
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

  fetchAllInvoices(){
    const params: Map<string, any> = new Map();
    this.queryBody.offset = this.offset;
    params.set('query', this.queryBody);
    this.userService.fetchAllSupplyInvoice(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.invoiceList = res.body;
      },
      error:(err)=>{},
      complete: ()=>{}
    });
  }
  openInvoice(invoice:any){
    this.route.navigate(["/home/schedule-delivery",invoice.id]);
  }
  editInvoice(invoice:any){
    this.route.navigate(["/home/edit-invoice",invoice.id]);
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
