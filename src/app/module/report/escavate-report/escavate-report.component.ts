import { Component, OnInit } from '@angular/core';
import { ReportExportService } from '../report-export.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-escavate-report',
  templateUrl: './escavate-report.component.html',
  styleUrls: ['./escavate-report.component.css']
})
export class EscavateReportComponent implements OnInit {
  escavateRegestryList!:any[];
  escavateRegestryExportList!:any[];
  fromDate!:string;
  toDate!:string;
  offset:number = 0;
  limit = 10;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5,10,25,100,500,1000];
  queryBody!:any;
  constructor(
    private reportService:ReportService,
    private reportExportService: ReportExportService
  ) {
    this.queryBody = {
      fromDate: '',
      toDate: '',
      offset:0,
      limit:0
    }
    this.escavateRegestryList = [];
    this.escavateRegestryExportList = [];
    this.fromDate = '';
    this.toDate = '';
  }

  ngOnInit(): void {
    this.fetchEscavateRegistry();
  }

  fetchEscavateRegistry(){
    const params: Map<string, any> = new Map();
    this.queryBody.fromDate = this.fromDate;
    this.queryBody.toDate = this.toDate;
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.limit;
    params.set('query', this.queryBody);
    this.reportService.fetchEscavateRegistryReport(params).subscribe({
      next:(res)=>{
        this.escavateRegestryList = res.body.data;
        this.length = res.body.length;
        this.escavateRegestryExportList = [];
        let index = 0;
        this.escavateRegestryList.map((elem)=>{
          index++;
          let model = {
            SN: index,
            Date: this.applyFilter(elem.createdAt),
            ProductName: elem.productName,
            TotalHour: elem.totalHour,
            HourlyRate: elem.costPerHour,
            TotalCost: elem.totalAmountToPay,
          }
          this.escavateRegestryExportList.push(model);
        })
        
      }

    })
    
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }
  exportReport(){
    this.reportExportService.exportAsExcelFile(this.escavateRegestryExportList,"Escavate_registry");
  }

}
