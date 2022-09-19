import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css'],
})
export class ConfigurationsComponent implements OnInit {
  startingDate!: string;
  startDateOfTheYear!: string;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchStartDate();
  }
  fetchStartDate() {
    const params: Map<string, any> = new Map();
    params.set('configName', 'STARTING_DATE');
    this.adminService.fetchAppConfiguration(params).subscribe({
      next: (res) => {
        let date = new Date(res.body.value);
        date.setDate(date.getDate()+1);
        this.startDateOfTheYear = date.toDateString();
      },
    });
  }
  setAppConfiguration() {
    const params: Map<string, any> = new Map();
    let date = new Date(this.startingDate);
    let dateOffset = (24*60*60*1000);
    date.setTime(date.getTime() - dateOffset);
    console.log("Month "+ date.getMonth());
    console.log("Day "+ date.getDate());
    let startDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
    let configBody = {
      configName: 'STARTING_DATE',
      value: startDate,
    };
    params.set('config', configBody);
    this.adminService.addAppConfig(params).subscribe({
      next: (res) => {
        let date = new Date(res.body.value);
        date.setDate(date.getDate()+1);
        this.startDateOfTheYear = date.toDateString();
      },
      error: (err) => {},
    });
  }
}
