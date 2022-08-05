import { Component, OnInit } from '@angular/core';
import { ApprovalModel, Tasks } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cash-handover',
  templateUrl: './cash-handover.component.html',
  styleUrls: ['./cash-handover.component.css']
})
export class CashHandoverComponent implements OnInit {
  amount:number = 0;
  remarks!:string;
  balance!:number
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.fetchGlBalance();
  }
  fetchGlBalance(){
    this.userService.fetchGLAccountBalance("FACTORY_GL").subscribe({
      next:(accRes)=>{
        this.balance = accRes.body.balance;
      }
    })
  }
  sendForApproval(){
    const params: Map<string, any> = new Map();
    let today = this.applyFilter();
    let approvalModel: ApprovalModel = new ApprovalModel();
    approvalModel.payload = JSON.stringify({amount:this.amount,remarks:this.remarks,tnxDate:today});
    approvalModel.createdBy = 'Manager';
    approvalModel.taskType = Tasks.CASH_HANDOVER;
    params.set('approval', approvalModel);
    console.log(approvalModel);
    this.userService.createApproval(params).subscribe({
      next: (res) => {
        console.log(res);
        this.amount = 0;
        this.remarks ="";
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  applyFilter() {
    let newDate = new Date();
    return (
      (newDate.getDate()) +"/"+(newDate.getMonth()+1) + '/' + newDate.getFullYear()
    );
  }
}
