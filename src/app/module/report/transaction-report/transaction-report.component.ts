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
  expenseReasons!:any[];
  glTypes!:any[];
  selectedGlType!:any;
  selectedCategory!:any;
  selectedReason!:any;
  selectedType!:any;
  totalIncomeAmount!:number;
  totalExpenseAmount!:number;
  totalReversedAmount!:number;
  fromDate!:any;
  toDate!:any;
  isExpense:boolean = false;
  constructor(
    private userService: UserService,
    private reportService: ReportService
    ) {
    
    this.tnxList = [];
    this.exportData = [];
    this.selectedCategory = null;
    this.selectedReason = null;
    this.selectedType = null;
    this.selectedGlType = "FACTORY_GL";
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
    this.expenseReasons = [{label:'Select Category',value:null}];
    this.transactionTypes=[
      {label:'Select Transaction Type',value:null},
      {label:'Income',value:"INCOME"},
      {label:'Expense',value:"EXPENSE"},
      {label:'Deposit',value:"DEPOSIT"},
    ];
    this.glTypes=[
      {label:'Select GL Type',value:null},
      {label:'Factory GL',value:"FACTORY_GL"},
      {label:'Office GL',value:"OFFICE_GL"}
    ]
    this.queryBody = {
      offset:this.offset,
      reason:this.selectedReason,
      category: this.selectedCategory,
      type: this.selectedType,
      glType:this.selectedGlType,
      fromDate: this.fromDate,
      toDate: this.toDate
    }
  }

  ngOnInit(): void {
    this.fetchAllTransByPage();
    this.fetchExpenseReasons(null);
  }
  fetchExpenseReasons(category:any){
    this.userService.fetchExpenseReasons(category).subscribe({
      next:(data)=>{
        if(data){
          console.log(data.body);
          data.body.map((elem:any)=>{
            this.expenseReasons.push({label:elem.transactionReason,value:elem.transactionReason});
          })
          // this.expenseReasons = data.body;
        }
      },
      error:(err)=>{
        window.alert(err.message);
      }
    })
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
        // this.expenseReasons = [];
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
          // if(iscatChange){
          //   this.expenseReasons.push({label:elem.transactionReason,value:elem.transactionReason});
          //   console.log(this.expenseReasons);
          // }
          
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
    this.fetchExpenseReasons(this.selectedCategory);
    this.fetchAllTransByPage();
  }
  onChnageReason(){
    this.queryBody.reason = this.selectedReason;
    console.log(this.selectedReason);
    this.fetchAllTransByPage();
  }
  onChnageType(){
    this.queryBody.type = this.selectedType;
    if(this.selectedType == "EXPENSE"){
      this.isExpense = true;
    }else{
      this.isExpense = false;
    }
    
    this.fetchAllTransByPage();
  }
  onChnageGLType(){
    this.queryBody.glType = this.selectedGlType;
    if(this.selectedGlType == "OFFICE_GL"){

    }else{

    }
    this.fetchAllTransByPage();
  }
  onDateChange(){
    this.queryBody.fromDate = this.fromDate;
    this.queryBody.toDate = this.toDate;
    this.fetchAllTransByPage();
  }

}
