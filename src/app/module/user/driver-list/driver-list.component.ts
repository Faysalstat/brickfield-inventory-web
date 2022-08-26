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
        console.log(data.body);
        this.driverList = data.body;
      },
      error: (err) => {
        console.log(err.message);
        this.userService.showMessage("ERROR!","Driver Fetching Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }
  updateList($event:any){
    console.log("Driver added. List updated");
    this.fetchDriversList();
  }
  deleteDriver(driver: any) {
    const params = new Map<string, any>();
    params.set('customer', driver);
    this.userService.deleteCustomer(params).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }

}
