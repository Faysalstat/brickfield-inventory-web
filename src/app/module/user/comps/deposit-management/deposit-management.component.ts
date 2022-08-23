import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-deposit-management',
  templateUrl: './deposit-management.component.html',
  styleUrls: ['./deposit-management.component.css']
})
export class DepositManagementComponent implements OnInit {
  depositAmount!:number;
  depositType!:string;
  depositFrom!:string;
  depositDate!:string;
  remark!:String;
  types:any[];
  constructor(
    private userService :UserService
  ) { 
    this.types=[
      {label:"Hand Over", value:"HANDOVER"},
      {label:"Loan", value:"LOAN"},
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
    }
    params.set('deposit', depositModel);
    this.userService.doDepositToFactoryGL(params).subscribe({
      next:(data)=>{
        console.log(data.body);
      },
      error:(err)=>{
        window.alert(err.message);
      }
    })

  }
}
