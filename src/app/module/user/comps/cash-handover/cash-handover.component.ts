import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApprovalModel, Tasks } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cash-handover',
  templateUrl: './cash-handover.component.html',
  styleUrls: ['./cash-handover.component.css'],
})
export class CashHandoverComponent implements OnInit {
  amount: number = 0;
  remarks!: string;
  balance!: number;
  tnxDate:Date = new Date();
  isSubmitted:boolean = false;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchGlBalance();
  }
  fetchGlBalance() {
    this.userService.fetchGLAccountBalance('FACTORY_GL').subscribe({
      next: (accRes) => {
        this.balance = accRes.body.balance;
      },
      error: (err) => {
        this.snackBar.open(err, 'Close it', {
          duration: 10000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }
  sendForApproval() {
    this.isSubmitted = true;
    const params: Map<string, any> = new Map();
    let approvalModel: ApprovalModel = new ApprovalModel();
    approvalModel.payload = JSON.stringify({
      amount: this.amount,
      remarks: this.remarks,
      tnxDate: this.tnxDate,
    });
    approvalModel.createdBy = 'Manager';
    approvalModel.taskType = Tasks.CASH_HANDOVER;
    params.set('approval', approvalModel);
    console.log(approvalModel);
    this.userService.createApproval(params).subscribe({
      next: (res) => {
        this.isSubmitted = false;
        console.log(res);
        this.userService.showMessage("SUCCESS!","Send for Approval","OK",2000)
        this.amount = 0;
        this.remarks = '';
      },
      error: (err) => {
        this.isSubmitted = false;
        console.log(err.message);
        this.userService.showMessage('ERROR!', 'Operation Failed', 'OK', 2000);
      },
      complete: () => {},
    });
  }
  applyFilter(newDate:any) {
    // let newDate = new Date();
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  }
  updateBalance(event: any) {
    console.log('Balance Updated By Expense');
  }
}
