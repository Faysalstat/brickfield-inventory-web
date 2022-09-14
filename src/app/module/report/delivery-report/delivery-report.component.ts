import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ReportExportService } from '../report-export.service';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.css']
})
export class DeliveryReportComponent implements OnInit {
  scheduleList!:any[];
  scheduleExportList!:any[];
  selectedType!:string;
  fromDate!:string;
  toDate!:Date;
  types!:any[];
  constructor(
    private userService:UserService,
    private reportExportService: ReportExportService
  ) { 
    this.scheduleList = [];
    this.scheduleExportList = [];
    this.selectedType = "PENDING";
    this.fromDate = '';
    this.toDate = new Date();
    this.toDate.setDate(this.toDate.getDate()+5);
    this.types = [
      {label:"Pending",value:"PENDING"},
      {label:"Delivered",value:"DELIVERED"},
    ]
  }

  ngOnInit(): void {
    this.fetchScheduleList();
  }

  fetchScheduleList(){
    const params: Map<string, any> = new Map();
    params.set('fromDate',this.fromDate);
    params.set('toDate',this.toDate);
    params.set('status',this.selectedType)
    this.userService.fetchAllSchedulesByDate(params).subscribe({
      next:(res)=>{
        this.scheduleList = res.body;
        let index = 0;
        this.scheduleList.map((elem)=>{
          index++;
          let model = {
            DoNO: elem.invoice.doNo,
            Customer: elem.invoice.customer.person.personName,
            Category: elem.brick.category,
            Quantity: elem.deliverableQuantity,
            Driver: elem.driver.person.personName,
            Location: elem.deliveryLocation,
            Date: this.applyFilter(elem.scheduledDate),
            Status: elem.deliveryStatus
          }
          this.scheduleExportList.push(model);
        })
      }
    })

  }
  applyFilter(date: Date) {
    let newDate = new Date(date);

    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }
  export(){
    this.reportExportService.exportAsExcelFile(this.scheduleExportList,"Pending_Schedule");
  }

}
