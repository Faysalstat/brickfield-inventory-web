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

    return newDate.getFullYear()+"/"+newDate.getMonth()+"/"+newDate.getDate()
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
}
