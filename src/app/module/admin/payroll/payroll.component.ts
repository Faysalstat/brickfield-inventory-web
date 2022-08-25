import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  payTo!:string;
  payingAmount!:number;
  remarks!:string;
  constructor(
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
  }

  submit(){
    let payModel ={
      receivedBy: this.payTo,
      amount: this.payingAmount,
      remarks:this.remarks
    }
    const params:Map<string,any> = new Map();
    params.set("salary",payModel);
    this.adminService.paySalary(params).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(err)=>{
        window.alert(err.message);
      }
    })

  }

}
