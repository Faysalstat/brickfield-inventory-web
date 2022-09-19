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
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tnxIndex:number = 0;
  constructor(private userService: UserService) {
    this.driverList = [];
  }

  ngOnInit(): void {
    this.fetchDriversList();
  }

  fetchDriversList(){
    const params: Map<string, any> = new Map();
    params.set('offset', this.offset);
    params.set('limit', this.pageSize);
    this.userService.fetchAllDrivers(params).subscribe({
      next: (data) => {
        console.log(data.body);
        this.driverList = data.body.data;
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
    driver.type = "DRIVER";
    params.set('client', driver);
    this.userService.deleteCustomer(params).subscribe({
      next: (res) => {
        console.log(res);
        this.fetchDriversList();
        this.userService.showMessage("SUCCESS!","Driver Deleted","OK",2000);
      },
      error: (err) => {
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }

  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchDriversList();
  }

}
