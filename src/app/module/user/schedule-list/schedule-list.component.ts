
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ScheduleQuery } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  scheduleList!:any;
  statusColor!:string;
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  queryBody!:ScheduleQuery;
  constructor(
    private route: Router,
    private userService:UserService) {
    this.scheduleList = [];
    this.statusColor = "#02c22f";
    this.queryBody = new ScheduleQuery();
   }
  ngOnInit(): void {
    this.fetchAllSchedules();
  }

  applyFilter(date:Date) {
    let newDate = new Date(date);

    return (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
  }

  fetchAllSchedules(){
    const params: Map<string, any> = new Map();
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.pageSize;
    params.set('query', this.queryBody);
    this.userService.fetchAllSchedulesByStatus(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.scheduleList = res.body.data;
        this.length = res.body.length;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Schedule Fetching Operation Failed" + err.message,"OK",2000);
      },
      complete: ()=>{}
    });
  }
  setDelivery(schedule:any){
    this.route.navigate(["/home/schedule-delivery",schedule.id]);
  }
  formatStattus(status:string){
    if(status=="PENDING"){
      this.statusColor="red";
    }else if(status=="SHIPPING"){
      this.statusColor="#03adfc";
    }else if(status=="DELIVERED"){
      this.statusColor="#29d10f";
    }
    return status;
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchAllSchedules();
  }
}
