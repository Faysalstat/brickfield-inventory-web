import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-sordar-record-report',
  templateUrl: './sordar-record-report.component.html',
  styleUrls: ['./sordar-record-report.component.css']
})
export class SordarRecordReportComponent implements OnInit {
  recordList!:any[];
  offset = 0;
  limit = 10;
  exportData!:any[];
  queryBody:any;
  constructor(
    private reportService:ReportService
  ) {
    this.recordList = [];
    this.queryBody = {
      sordarId:"",
      category:""
    }
   }

  ngOnInit(): void {
    this.fetchAllTransByPage();
  }
  fetchAllTransByPage() {
    this.exportData = [];
    const params: Map<string, any> = new Map();
    // params.set('limit', 5);
    // params.set('offset', this.offset);
    params.set('query',this.queryBody)
    console.log();
    this.reportService.fetchSordarProductionReport(params).subscribe({
      next: (datares) => {
        // this.expenseReasons = [];
        console.log(datares);
        this.recordList = datares.body;
        // this.recordList.forEach(elem=>{
        //   let item = {
        //     TransactionType: elem.transactionType,
        //     TransactionReason: elem.transactionReason,
        //     IncomeAmount: elem.income,
        //     ExpenseAmount: elem.expense,
        //     Reversed: elem.reversedAmount,
        //     TnxDate:elem.transactionDate,
        //     Refference: elem.refference,
        //     ReceivedBy: (elem.receivedBy)?elem.receivedBy:elem.payTo,
        //   }
        //   this.exportData.push(item);
   
          
        // });
      },
      error:(err)=>{
        console.log(err);
        this.recordList = [];
      }
    });
  }
  nextPage() {
    // this.tnxIndex+=
    this.offset += 5;
    this.fetchAllTransByPage();
  }
  previousPage() {
    if (this.offset > 5) {
      this.offset = this.limit + 5;
      this.fetchAllTransByPage();
    } else {
      return;
    }
  }
}
