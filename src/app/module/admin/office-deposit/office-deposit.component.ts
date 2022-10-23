import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-office-deposit',
  templateUrl: './office-deposit.component.html',
  styleUrls: ['./office-deposit.component.css']
})
export class OfficeDepositComponent implements OnInit {
  @Output() depositEvent = new EventEmitter<string>();
  depositAmount!:number;
  depositType!:string;
  depositFrom!:string;
  depositDate:Date = new Date();
  remark!:String;
  types:any[];
  constructor(
    private userService :UserService
  ) { 
    this.types=[
      {label:"Director Investment", value:"DIRECTOR_INVESTMENT"},
      {label:"Loan", value:"LOAN"},
      {label:"Bank", value:"BANK"},
      {label:"Other", value:"OTHER"}
    ]
  }

  ngOnInit(): void {
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }
  submit(){
    const params: Map<string, any> = new Map();
    let depositModel = {
      depositAmount: this.depositAmount,
      depositFrom: this.depositFrom,
      depositDate: this.depositDate,
      depositType: this.depositType,
      remark:this.remark,
      accountType:"OFFICE_GL",
      reason:this.depositType,
      payTo:"OFFICE GL",
      issuedBy: "ADMIN"
    }
    params.set('deposit', depositModel);
    this.userService.doDepositToFactoryGL(params).subscribe({
      next:(data)=>{
        console.log(data.body);
        this.depositAmount = 0;
        this.depositFrom = "";
        this.depositDate = new Date();
        this.depositType = "HANDOVER";
        this.remark = "";
        this.userService.showMessage("SUCCESS!","Deposit Complete","OK",2000);
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })

  }
}

