
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  scheduleList!:any;
  statusColor!:string;
  constructor(
    private route: Router,
    private userService:UserService) {
    this.scheduleList = [];
   }
  ngOnInit(): void {
    this.fetchAllSchedules();
  }

  applyFilter(date:Date) {
    let newDate = new Date(date);

    return newDate.getDate()+"/"+newDate.getMonth()+"/"+newDate.getFullYear()
  }

  fetchAllSchedules(){
    this.userService.fetchAllSchedulesByStatus().subscribe({
      next:(res)=>{
        console.log(res);
        this.scheduleList = res.body;
      },
      error:(err)=>{},
      complete: ()=>{}
    });
  }
  setDelivery(invoice:any){
    this.route.navigate(["/home/schedule-delivery",invoice.id]);
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
}
