import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../report.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {
  tnxList!: any[];
  exportData!:any[];
  tnxListForReport!: any[];
  // MatPaginator Inputs
  limit = 10;
  offset = 0;
  tnxIndex:number = 0;
  queryBody!:any;
  transactionTypes!:any[];
  expenseCatgories!:any[];
  selectedCategory!:any;
  selectedType!:any;
  totalIncomeAmount!:number;
  totalExpenseAmount!:number;
  totalReversedAmount!:number;
  fromDate!:any;
  toDate!:any;
  constructor(
    private userService: UserService,
    private reportService: ReportService
    ) {
    
    this.tnxList = [];
    this.exportData = [];
    this.selectedCategory = null;
    this.selectedType = null;
    this.fromDate = null;
    this.toDate = null;
    this.tnxListForReport = [];
    this.expenseCatgories = [
      {label:'Select Category',value:null},
      {label:'ভাড়া',value:"ভাড়া"},
      {label:'পরিবহন',value:"পরিবহন"},
      {label:'মজুরি',value:"মজুরি"},
      {label:'খরচ',value:"খরচ"},
      {label:'বিল',value:"বিল"}
    ];
    this.transactionTypes=[
      {label:'Select Transaction Type',value:null},
      {label:'Income',value:"INCOME"},
      {label:'Expense',value:"EXPENSE"},
    ]
    this.queryBody = {
      offset:this.offset,
      category: this.selectedCategory,
      type: this.selectedType,
      fromDate: this.fromDate,
      toDate: this.toDate
    }
  }

  ngOnInit(): void {
    this.fetchAllTransByPage();
  }

  fetchAllTransByPage() {
    this.exportData = [];
    this.totalIncomeAmount = 0;
    this.totalExpenseAmount = 0;
    this.totalReversedAmount = 0;
    const params: Map<string, any> = new Map();
    // params.set('limit', 5);
    // params.set('offset', this.offset);
    params.set('query',this.queryBody)
    console.log();
    this.userService.fetchAllTransByPage(params).subscribe({
      next: (datares) => {
        console.log(datares);
        this.tnxList = datares.body.data;
        this.tnxList.forEach(elem=>{
          let item = {
            TransactionType: elem.transactionType,
            TransactionReason: elem.transactionReason,
            IncomeAmount: elem.income,
            ExpenseAmount: elem.expense,
            Reversed: elem.reversedAmount,
            TnxDate:elem.transactionDate,
            Refference: elem.refference,
            ReceivedBy: (elem.receivedBy)?elem.receivedBy:elem.payTo,
          }
          this.exportData.push(item);
          this.totalIncomeAmount += elem.income;
          this.totalExpenseAmount += elem.expense;
          this.totalReversedAmount += elem.reversedAmount;
        });
      },
      error:(err)=>{
        console.log(err);
        this.tnxList = [];
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
  async export(){
    this.reportService.exportAsExcelFile(this.exportData, 'Transaction_Summary')
  }
  onChnageCategory(){
    this.queryBody.category = this.selectedCategory;
    this.fetchAllTransByPage();
  }
  onChnageType(){
    this.queryBody.type = this.selectedType;
    this.fetchAllTransByPage();
  }
  onDateChange(){
    this.queryBody.fromDate = this.fromDate;
    this.queryBody.toDate = this.toDate;
    this.fetchAllTransByPage();
  }

}
