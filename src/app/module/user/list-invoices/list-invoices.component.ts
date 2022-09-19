import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, InvoiceDomain, InvoiceQueryBody } from '../../model';
import { ReportExportService } from '../../report/report-export.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.css']
})
export class ListInvoicesComponent implements OnInit {
 
  invoiceList!:any[];
  invoiceExportList!:any[];
  customer!:Customer;
  
  queryBody!:InvoiceQueryBody;
  contactNo!:string;
  statusList!:any[];
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100, 500, 1000];
  dueList:any[];
  constructor(
    private route: Router,
    private userService:UserService,
    private reportExportService: ReportExportService) {
    this.invoiceList = [];
    this.queryBody = new InvoiceQueryBody();
    this.statusList = [
      {label:"Delivered", value:"DELIVERED"},
      {label:"Pending", value:"PENDING"},
      {label:"Schedule Pending", value:"SCHEDULE_PENDING"}
      
    ]
    this.dueList = [
      {label:"Find All", value:false},
      {label:"Due", value:true}
    ]
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
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }

  fetchAllInvoices(){
    this.invoiceExportList = [];
    const params: Map<string, any> = new Map();
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.pageSize;
    params.set('query', this.queryBody);
    this.userService.fetchAllInvoice(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.invoiceList = res.body.data;
        this.length = res.body.length;
        let index = 0;
        this.invoiceList.map((elem:any)=>{
          let model = {
            Invoice_No : elem.invoiceNo,
            DO_NO : elem.doNo,
            Customer : elem.customer.person.personName,
            ContactNo: elem.customer.person.contactNo,
            Address :elem.customer.person.personAddress,
            Quantity :elem.totalQuantity,
            Price :elem.totalBill,
            Advance : elem.advancePayment,
            Due : elem.duePament,
            Rebate : elem.rebate,
            Delivery_Status :elem.deliveryStatus,
            Date: elem.purchaseDate
          }
          this.invoiceExportList.push(model);
        })
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Invoice Fetching Failed" + err.message,"OK",2000);
      },
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
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchAllInvoices();
  }
  refresh(){
    this.queryBody = new InvoiceQueryBody();
    this.fetchAllInvoices();
  }
  export(){
    this.reportExportService.exportAsExcelFile(this.invoiceExportList,"Invoice_Report");
  }
}
