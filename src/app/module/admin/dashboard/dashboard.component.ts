import { Component, OnInit } from '@angular/core';
import { Brick } from '../../model';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bricks!: Brick[];
  loadUnloadHistoryList!:any[];
  totalBrick:number =0;
  selectedType!:any;
  loadingTypes!:any[];
  fromDate!:any;
  toDate!:any;
  queryBody!:any;
  offset:number =0;
  constructor(
    private userService:UserService,
    private adminService:AdminService
  ) { 
    this.loadingTypes = [
      {label:"Select Loading Type",value:null},
      {label:"Load", value:"LOAD"},
      {label:"Unload", value:"UNLOAD"}
  ];
  this.fromDate = null;
  this.toDate = null;
  this.selectedType = null;
  this.queryBody = {
    offset:this.offset,
    type: this.selectedType,
    fromDate: this.fromDate,
    toDate: this.toDate
  }
  }

  ngOnInit(): void {
    this.fetchBricks();
    this.fetchLoadUnloadHistory();
  }
 
  
  fetchBricks() {
    this.userService.fetchBricks().subscribe({
      next: (res) => {
        console.log(res);
        if (res.body) {
          this.bricks = res.body;
          this.bricks.map((brick)=>{
            this.totalBrick += brick.quantity;
          })
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Successfull" + err.message,"OK",2000);
      }
    });
  }
  fetchLoadUnloadHistory(){
    const params: Map<string, any> = new Map();
    params.set('query',this.queryBody)
    this.adminService.fetchLoadUnloadHistory(params).subscribe({
      next:(res)=>{
        this.loadUnloadHistoryList = res.body;
        console.log(res);
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Successfull" + err.message,"OK",2000);
      }
    })
  }
  onChnageType(){
    this.queryBody.type = this.selectedType;
    this.fetchLoadUnloadHistory();
  }

  onDateChange(){
    this.queryBody.fromDate = this.fromDate;
    this.queryBody.toDate = this.toDate;
    this.fetchLoadUnloadHistory();
  }
  nextPage() {
    // this.tnxIndex+=
    this.queryBody.offset += 20;
    this.fetchLoadUnloadHistory();
  }
  previousPage() {
    if (this.queryBody.offset >= 20) {
      this.queryBody.offset -= 20;
      if(this.queryBody.offset < 0){
        this.queryBody.offset= 0;
      }
      this.fetchLoadUnloadHistory();
    } else {
      if(this.queryBody.offset < 0){
        this.queryBody.offset= 0;
      }
      this.fetchLoadUnloadHistory();
      return;
    }
  }
}
