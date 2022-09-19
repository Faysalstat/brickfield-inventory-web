import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  @Output() payrollEvent = new EventEmitter<string>();
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
        this.adminService.showMessage("SUCCEESS!","Payment Complete","OK",2000);
        this.payTo="";
        this.payingAmount = 0;
        this.remarks="";
      },
      error:(err)=>{
        console.log(err.message);
        this.adminService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })

  }

}
