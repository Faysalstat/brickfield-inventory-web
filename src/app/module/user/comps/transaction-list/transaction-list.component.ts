import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ReportService } from 'src/app/module/report.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  tnxList!: any[];
  tnxListForReport!: any[];
  // MatPaginator Inputs
  limit = 10;
  offset = 0;
  tnxIndex:number = 0;
  constructor(
    private userService: UserService,
    private reportService: ReportService
    ) {
    this.tnxList = [];
    this.tnxListForReport = [];
  }

  ngOnInit(): void {
    this.fetchAllTransByPage();
  }

  fetchAllTransByPage() {
    const params: Map<string, any> = new Map();
    params.set('limit', 5);
    params.set('offset', this.offset);
    console.log();
    this.userService.fetchAllTransByPage(params).subscribe({
      next: (datares) => {
        console.log(datares);
        this.tnxList = datares.body.data;
        this.tnxList.map((elem)=>{
          
        })
      },
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
  export(){
    this.reportService.exportAsExcelFile(this.tnxList, 'Transaction_Summary')
  }
}
