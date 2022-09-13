import { Component, OnInit } from '@angular/core';
import { ReportExportService } from '../report-export.service';
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
  deliveryReportList!:any[];
  rawProductionExportList!:any[];
  loadExportList!:any[];
  unloadExportList!:any[];
  deliveryExportList!:any[];
  constructor(
    private reportService: ReportService,
    private reportExportService:ReportExportService

  ) {
    this.loadReportList=[];
    this.unLoadReportList=[];
    this.rawProductionReportList=[];
    this.deliveryReportList=[];
    this.rawProductionExportList = [];
    this.loadExportList=[];
    this.unloadExportList=[];
    this.deliveryExportList=[];
  }

  ngOnInit(): void {
    this.fetchLoadReport();
    this.fetchUnloadReport();
    this.fetchRawProductionReport();
    this.fetchDeliveryReport();
  }

  fetchLoadReport(){
    this.reportService.fetchLoadReport().subscribe({
      next:(res)=>{
        console.log(res.body);
        this.loadReportList = res.body;
        let index = 0;
        this.loadReportList.map((elem)=>{
          index++;
          let model = {
            SN: index,
            Quantity: elem.quantity,
            
            LoadingDate: this.applyFilter(elem.createdAt)
          }
          this.loadExportList.push(model);
        })
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
        let index = 0;
        this.unLoadReportList.map((elem)=>{
          index++;
          let model = {
            SN: index,
            Category: elem.categoryName,
            Quantity: elem.quantity,
            UnloadingDate: this.applyFilter(elem.createdAt)
          }
          this.unloadExportList.push(model);
        })
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
        let index = 0;
        this.rawProductionReportList.map((elem)=>{
          index++;
          let model = {
            SN: index,
            MillCategory: elem.categoryName,
            Quantity: elem.quantity,
            Sordar: elem.sordarName,
            ProductionDate: elem.productionDate
          }
          this.rawProductionExportList.push(model);
        })
      },
      error:(err)=>{
        this.rawProductionReportList = [];
        console.log(err);
      }
    })
  }
  fetchDeliveryReport(){
    this.reportService.fetchDeliveryReport().subscribe({
      next:(res)=>{
        console.log(res.body);
        this.deliveryReportList = res.body;
        let index = 0;
        this.deliveryReportList.map((elem)=>{
          index++;
          let model = {
            SN: index,
            DONo: elem.invoice.doNo,
            Category: elem.brick.categoryName,
            Quantity: elem.deliverableQuantity,
            Date: this.applyFilter(elem.updatedAt)
          }
          this.deliveryExportList.push(model);
        })
        },
      error:(err)=>{
        this.deliveryReportList = [];
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
  exportRawProduction(){
    this.reportExportService.exportAsExcelFile(this.rawProductionExportList, 'Raw_Production_Report');
  }
  exportLoadReport(){
    this.reportExportService.exportAsExcelFile(this.loadExportList, 'Raw_Production_Report');
  }
  exportUnloadReport(){
    this.reportExportService.exportAsExcelFile(this.unloadExportList, 'Raw_Production_Report');
  }
  exportSalesReport(){
    this.reportExportService.exportAsExcelFile(this.deliveryExportList, 'Raw_Production_Report');
  }
}
