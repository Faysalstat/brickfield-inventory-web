import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard-summary',
  templateUrl: './dashboard-summary.component.html',
  styleUrls: ['./dashboard-summary.component.css']
})
export class DashboardSummaryComponent implements OnInit {
  summary!:any;
  officeBalance!:number;
  factoryBalance!:number;
  totalRebateTaken!:number;
  totalRebateGiven!:number;
  constructor(
    private userService:UserService,
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
    this.fetchFactoryBalance();
    this.fetchOfficeBalance();
    this.fetchIncomeExpenseSummary();
    this.fetchTotalRebate();
  }
  fetchFactoryBalance(){
    this.userService.fetchGLAccountBalance("FACTORY_GL").subscribe({
      next:(data)=>{
        console.log(data.body);
        this.factoryBalance = data.body.balance;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
  fetchOfficeBalance(){
    this.userService.fetchGLAccountBalance("OFFICE_GL").subscribe({
      next:(data)=>{
        console.log(data.body);
        this.officeBalance = data.body.balance;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
  fetchIncomeExpenseSummary(){
    this.adminService.getIncomeExpenseSummary().subscribe({
      next:(data)=>{
        console.log(data);
        this.summary = data.body;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
  fetchTotalRebate(){
    this.adminService.fetchTotalRebate().subscribe({
      next:(res)=>{
        this.totalRebateTaken = res.body.totalRebateTaken;
        this.totalRebateGiven = res.body.totalRebateGiven;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }

}
