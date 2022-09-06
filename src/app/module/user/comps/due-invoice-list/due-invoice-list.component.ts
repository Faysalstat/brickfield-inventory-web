import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { InvoiceQueryBody } from 'src/app/module/model';
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
  offset = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  queryBody!:InvoiceQueryBody;
  constructor(
    private route: Router,
    private userService:UserService
  ) { 
    this.invoiceList = [];
    this.queryBody = new InvoiceQueryBody();
  }

  ngOnInit(): void {
    this.fetchDueAmountInvoiceList();
  }
  fetchDueAmountInvoiceList(){
    const params: Map<string, any> = new Map();
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.pageSize;
    this.queryBody.isDue = true;
    params.set('query', this.queryBody);
    this.userService.fetchAllInvoice(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.invoiceList = res.body.data;
        this.length = res.body.length;
        if(this.invoiceList.length==0){
          this.isListExist = false;
        }else{
          this.isListExist = true;
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Invoice Fetching Failed" + err.message,"OK",2000);
      },
      complete: ()=>{}
    });
    // this.userService.fetchDueAmountInvoiceList(params).subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //     this.invoiceList = res.body;
    //     if(this.invoiceList.length==0){
    //       this.isListExist = false;
    //     }else{
    //       this.isListExist = true;
    //     }
    //   },
    //   error:(err)=>{
    //     this.userService.showMessage("ERROR!","Data Fetching Failed!! err: " + err.message,"OK",2000);
    //   }
    // })
  }
  viewInvoice(invoice:any){
    this.route.navigate(["/home/edit-invoice",invoice.id]);
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchDueAmountInvoiceList();
  }

}
