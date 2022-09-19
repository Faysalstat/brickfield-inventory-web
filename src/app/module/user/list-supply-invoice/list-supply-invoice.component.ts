import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Account, Customer, InvoiceQueryBody, Person, Supplyer, SupplyQuery } from '../../model';
import { ReportExportService } from '../../report-export.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-supply-invoice',
  templateUrl: './list-supply-invoice.component.html',
  styleUrls: ['./list-supply-invoice.component.css']
})
export class ListSupplyInvoiceComponent implements OnInit {

  invoiceList!:any;
  invoiceExportList!:any[];
  customer!:Customer;
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100, 500, 1000];
  queryBody!:SupplyQuery;
  contactNo!:string;
  statusList!:any[];
  supplyer!: Supplyer;
  account!: Account;
  person!: Person;
  notFoundMessage!: string;
  productList!: any[];
  dueList!:any[];
  constructor(
    private route: Router,
    private userService:UserService,
    private reportExportService: ReportExportService
    ) {
    this.invoiceList = [];
    this.invoiceExportList = [];
    this.queryBody = new SupplyQuery();
    this.statusList = [
      {label:"Select Delivery Status", value:null},
      {label:"Delivered", value:"DELIVERED"},
      {label:"Pending", value:"PENDING"}
      
    ];
    this.dueList = [
      {label:"Find All", value:false},
      {label:"Due", value:true}
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
    this.invoiceExportList = [];
    const params: Map<string, any> = new Map();
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.pageSize;
    params.set('query', this.queryBody);
    this.userService.fetchAllSupplyInvoice(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.invoiceList = res.body.data;
        this.length = res.body.length;
        this.queryBody = new SupplyQuery();
        let index = 0;
        this.invoiceList.map((elem:any)=>{
          index++;
          let model = {
            SN: index,
            Supplyer: elem.supplyer.person.personName,
            Contact: elem.supplyer.person.contactNo,
            Product: elem.productName,
            Quantity: elem.quantityType,
            TotalPrice: elem.totalAmountToPay,
            Advance:  elem.advancePayment,
            Due: elem.duePayment,
            Rebate: elem.rebate
          }
        this.invoiceExportList.push(model);
        })
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
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchAllInvoices();
  }
  export(){
    this.reportExportService.exportAsExcelFile(this.invoiceExportList,"Supply_Report");
  }
  refresh(){
    this.queryBody = new SupplyQuery();
    this.fetchAllInvoices();
  }
}
