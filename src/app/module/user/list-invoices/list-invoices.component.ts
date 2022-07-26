import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, InvoiceDomain, InvoiceQueryBody } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.css']
})
export class ListInvoicesComponent implements OnInit {
 
  invoiceList!:any;
  customer!:Customer;
  offset:number = 0;
  queryBody!:InvoiceQueryBody;
  contactNo!:string;
  constructor(
    private route: Router,
    private userService:UserService) {
    this.invoiceList = [];
    this.queryBody = new InvoiceQueryBody();
   }
  ngOnInit(): void {
    this.fetchAllInvoices();
  }
  searchInvoice(){
    this.fetchAllInvoices();
  }

  searchCustomer() {
    this.userService.getCustomerByContactNo(this.contactNo).subscribe({
      next: (res) => {
        if (res.body && res.body.customer.id) {
            this.customer = res.body.customer;
            this.queryBody.customerId = this.customer.id;
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

  fetchAllInvoices(){
    const params: Map<string, any> = new Map();
    params.set('query', this.queryBody);
    this.userService.fetchAllInvoice(params).subscribe({
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
}
