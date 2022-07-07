import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.css']
})
export class ListInvoicesComponent implements OnInit {
 
  invoiceList!:any;
  constructor(
    private route: Router,
    private userService:UserService) {
    this.invoiceList = [];
   }
  ngOnInit(): void {
    this.fetchAllInvoices();
  }

  

  fetchAllInvoices(){
    this.userService.fetchAllInvoice().subscribe({
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
