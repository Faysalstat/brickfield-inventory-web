import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-production-report',
  templateUrl: './production-report.component.html',
  styleUrls: ['./production-report.component.css']
})
export class ProductionReportComponent implements OnInit {
  loadReportList!:any[];
  unLoadReportList!:any[];
  rawProductionReportList!:any[];
  saleReportList!:any[];
  constructor(
    private reportService: ReportService,

  ) {
    this.loadReportList=[];
    this.unLoadReportList=[];
    this.rawProductionReportList=[];
    this.saleReportList=[];
  }

  ngOnInit(): void {
    this.fetchLoadReport();
    this.fetchUnloadReport();
    this.fetchRawProductionReport();
    this.fetchSaleReport();
  }

  fetchLoadReport(){
    this.reportService.fetchLoadReport().subscribe({
      next:(res)=>{
        console.log(res.body);
        this.loadReportList = res.body;
      },
      error:(err)=>{
        this.loadReportList=[];
        console.log(err);
      }
    })
  }
  fetchUnloadReport(){
    this.reportService.fetchUnloadReport().subscribe({
      next:(res)=>{
        console.log(res.body);
        this.unLoadReportList = res.body;
      },
      error:(err)=>{
        this.unLoadReportList = [];
        console.log(err);
      }
    })
  }
  fetchRawProductionReport(){
    this.reportService.fetchRawPRoductionReport().subscribe({
      next:(res)=>{
        console.log(res.body);
        this.rawProductionReportList = res.body;
      },
      error:(err)=>{
        this.rawProductionReportList = [];
        console.log(err);
      }
    })
  }
  fetchSaleReport(){
    this.reportService.fetchSaleReport().subscribe({
      next:(res)=>{
        console.log(res.body);
        this.saleReportList = res.body;
      },
      error:(err)=>{
        this.saleReportList = [];
        console.log(err);
      }
    })
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }
}
