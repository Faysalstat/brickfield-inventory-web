import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-due-invoice-list',
  templateUrl: './due-invoice-list.component.html',
  styleUrls: ['./due-invoice-list.component.css']
})
export class DueInvoiceListComponent implements OnInit {
  invoiceList!:any;
  isListExist: boolean = false;

  // MatPaginator Inputs
  limit = 10;
  offset = 0;
  tnxIndex:number = 0;

  // MatPaginator Output
  pageEvent!: PageEvent;
  constructor(
    private route: Router,
    private userService:UserService
  ) { 
    this.invoiceList = [];
  }

  ngOnInit(): void {
    this.fetchDueAmountInvoiceList();
  }
  fetchDueAmountInvoiceList(){
    const params: Map<string, any> = new Map();
    params.set('offset', this.offset);
    this.userService.fetchDueAmountInvoiceList(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.invoiceList = res.body;
        if(this.invoiceList.length==0){
          this.isListExist = false;
        }else{
          this.isListExist = true;
        }
      },
      error:(err)=>{
        this.userService.showMessage("ERROR!","Data Fetching Failed!! err: " + err.message,"OK",2000);
      }
    })
  }
  viewInvoice(invoice:any){
    this.route.navigate(["/home/edit-invoice",invoice.id]);
  }

  nextPage() {
    // this.tnxIndex+=
    this.offset += 5;
    this.fetchDueAmountInvoiceList();
  }
  previousPage() {
    if (this.offset > 5) {
      this.offset = this.limit + 5;
      this.fetchDueAmountInvoiceList();
    } else {
      return;
    }
  }
}
