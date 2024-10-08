import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-pending-schedules',
  templateUrl: './pending-schedules.component.html',
  styleUrls: ['./pending-schedules.component.css']
})
export class PendingSchedulesComponent implements OnInit {
  scheduleList!: any;
  statusColor!: string;
  numberOfNextDays: number = 5;
  days!:number[];
  fromDate!:Date;
  toDate!:Date;
  constructor(
    private route: Router, 
    private userService: UserService) {
    this.scheduleList = [];
    this.days = [1,2,3,5,7,10];
    this.fromDate = new Date();
    this.toDate = new Date();
    this.toDate.setDate(this.toDate.getDate()+5);
  }
  ngOnInit(): void {
    this.fetchAllSchedules();
  }

  applyFilter(date: Date) {
    let newDate = new Date(date);

    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }

  fetchAllSchedules() {
    const params: Map<string, any> = new Map();
    params.set('fromDate',this.fromDate);
    params.set('toDate',this.toDate)
    this.userService.fetchAllSchedulesByDate(params).subscribe({
      next: (res) => {
        console.log(res);
        this.scheduleList = res.body;
      },
      error: (err) => {
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }
  setDelivery(invoice: any) {
    this.route.navigate(['/home/schedule-delivery', invoice.id]);
  }
  formatStattus(status: string) {
    if (status == 'PENDING') {
      this.statusColor = 'red';
    } else if (status == 'SHIPPING') {
      this.statusColor = '#03adfc';
    } else if (status == 'DELIVERED') {
      this.statusColor = '#29d10f';
    }
    return status;
  }

}
