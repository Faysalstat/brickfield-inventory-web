import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Driver } from '../../model';
import { AddDriverComponent } from '../comps/add-driver/add-driver.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})

export class DriverListComponent implements OnInit {
  driverList!: Driver[];
  constructor(private userService: UserService) {
    this.driverList = [];
  }

  ngOnInit(): void {
    this.fetchDriversList();
  }

  fetchDriversList(){
    this.userService.fetchAllDrivers().subscribe({
      next: (data) => {
        this.driverList = data.body;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  updateList($event:any){
    console.log("Driver added. List updated");
    this.fetchDriversList();
  }

}
