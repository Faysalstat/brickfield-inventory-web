import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { UserService } from '../../user/user.service';
import { ReportExportService } from '../report-export.service';

@Component({
  selector: 'app-load-unload-report',
  templateUrl: './load-unload-report.component.html',
  styleUrls: ['./load-unload-report.component.css']
})
export class LoadUnloadReportComponent implements OnInit {

  loadUnloadHistoryList!:any[];
  loadUnloadExportList!:any[];
  selectedType!:any;
  loadingTypes!:any[];
  fromDate!:any;
  toDate!:any;
  queryBody!:any;
  offset:number =0;
  startingDate!: string;
  constructor(
    private adminService:AdminService,
    private userService:UserService,
    private reportExportService: ReportExportService
  ) {
    this.loadingTypes = [
      {label:"Select Loading Type",value:null},
      {label:"Load", value:"LOAD"},
      {label:"Unload", value:"UNLOAD"}
  ];
  this.loadUnloadExportList = [];
  this.fromDate = null;
  this.toDate = null;
  this.selectedType = null;
  this.queryBody = {
    offset:this.offset,
    type: this.selectedType,
    fromDate: this.fromDate,
    toDate: this.toDate
  }
   }

  ngOnInit(): void {
    this.fetchLoadUnloadHistory();
  }
  fetchLoadUnloadHistory(){
    const params: Map<string, any> = new Map();
    params.set('query',this.queryBody)
    this.adminService.fetchLoadUnloadHistory(params).subscribe({
      next:(res)=>{
        this.loadUnloadHistoryList = res.body;
        console.log(res);
        let index = 0;
        this.loadUnloadExportList = [];
        this.loadUnloadHistoryList.map((elem)=>{
          index++;
          let model = {
            SN: index,
            Type: elem.type,
            Quantity: elem.quantity,
            Date: this.applyFilter(elem.productionDate)
          }
          this.loadUnloadExportList.push(model);
        })
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Successfull" + err.message,"OK",2000);
      }
    })
  }
  onChnageType(){
    this.queryBody.type = this.selectedType;
    this.fetchLoadUnloadHistory();
  }

  onDateChange(){
    this.queryBody.fromDate = this.fromDate;
    this.queryBody.toDate = this.toDate;
    this.fetchLoadUnloadHistory();
  }
  onPageChange(event:any) {
    // this.tnxIndex+=
    this.queryBody.offset += 20;
    this.fetchLoadUnloadHistory();
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }
  exportLoadReport(){
    this.reportExportService.exportAsExcelFile(this.loadUnloadExportList, 'Load_Unload_Report');
  }
}
