import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-pending-delivery',
  templateUrl: './pending-delivery.component.html',
  styleUrls: ['./pending-delivery.component.css'],
})
export class PendingDeliveryComponent implements OnInit {
  scheduleList!: any;
  statusColor!: string;
  constructor(
    private route: Router, 
    private userService: UserService) {
    this.scheduleList = [];
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
    this.userService.fetchAllSchedulesByStatus().subscribe({
      next: (res) => {
        console.log(res);
        this.scheduleList = res.body;
      },
      error: (err) => {},
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
