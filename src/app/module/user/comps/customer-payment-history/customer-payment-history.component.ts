import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ReportExportService } from 'src/app/module/report-export.service';

@Component({
  selector: 'customer-payment-history',
  templateUrl: './customer-payment-history.component.html',
  styleUrls: ['./customer-payment-history.component.css']
})
export class CustomerPaymentHistoryComponent implements OnInit {
  @Input() invoiceId!:any;
  accountHistory: any[] = [];
  accountHistoryExportable: any[] = [];
  constructor(
    private userService: UserService,
    private reportExportService: ReportExportService
  ) {
   
  }

  ngOnInit(): void {
    this.fetchAccountHistory();
  }
  fetchAccountHistory(){
    this.userService.fetchPaymentHistory(this.invoiceId).subscribe({
      next:(res)=>{
        //console.log(res);
        if(res.isSuccess){
          this.accountHistory = res.body;
          this.accountHistoryExportable = [];
          let sn = 0;
          let previousBalance = 0;
          this.accountHistory.map((elem) => {
            // let item = {
            //   SN: sn + 1,
            //   TNX_DATE: elem.tnxDate,
            //   PAYMENT_METHOD: elem.paymentMethod,
            //   COMMENT: elem.remark,
            //   DEBIT: elem.tnxType=="DEBIT"?elem.tnxAmount:0,
            //   CREDIT: elem.tnxType=="CREDIT"?elem.tnxAmount:0,
            //   BALANCE: (this.tnxSide =="DEBIT")?
            //   ((elem.tnxType == "DEBIT")?
            //   (elem.previousBalance + elem.tnxAmount):(elem.previousBalance - elem.tnxAmount))
            //   :((elem.tnxType == "CREDIT")?
            //   (elem.previousBalance + elem.tnxAmount):(elem.previousBalance - elem.tnxAmount))
            // };
            // this.accountHistoryExportable.push(item);
          });
          this.accountHistoryExportable.unshift({
            SN: '',
            TNX_DATE: '',
            TNX_TYPE: '',
            AMOUNT:'',
            COMMENT:'',
          });
        }else{
          this.userService.showMessage("ERROR",res.message,"OK",200);
        }
      }
    })
  }
  export() {
    this.reportExportService.exportAsExcelFile(
      this.accountHistoryExportable,
      'CUSTOMER_STATEMENT'
    );
  }
}
