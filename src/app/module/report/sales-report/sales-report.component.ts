import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ReportExportService } from '../report-export.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  orderList!:any[];
  orderExportList!:any[];
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5,10,25,100,500,1000];
  queryBody!:any;
  bricks!:any;
  selectedCategory!:string;
  constructor(
    private userService: UserService,
    private reportExportService:ReportExportService
  ) {
    this.orderList =[];
    this.orderExportList =[];
    this.bricks = [];
    this.queryBody = {
      doNo:'',
      limit : 0,
      offset : 0,
      brickId:'',
    }
   }

  ngOnInit(): void {
    this.fetchSalesReport();
    this.fetchBricks();
  }
  fetchSalesReport(){
    const params: Map<string, any> = new Map();
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.pageSize;
    params.set('query', this.queryBody);
    params.set('query',this.queryBody)
    this.userService.fetchAllOrders(params).subscribe({
      next:(res)=>{
        this.orderList = res.body.data;
        this.length = res.body.length;
        let index = 0;
        this.orderList.map((elem)=>{
          index++;
          let model = {
            SN: index,
            DoNo: elem.invoice.doNo,
            Customer:elem.invoice.customer.person.personName,
            Category:elem.brick.category,
            QuantityOrdered:elem.quantity,
            PurchaseDate:this.applyFilter(elem.invoice.purchaseDate)
          }
          this.orderExportList.push(model);
      })
      }
    })
  }
  fetchBricks(){
    this.userService.fetchBricks().subscribe({
      next:(res)=>{
        this.bricks = res.body;
      }
    })
  }
  exportSalesReport(){
    this.reportExportService.exportAsExcelFile(this.orderExportList, 'Sales_Report');
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchSalesReport();
  }
}
