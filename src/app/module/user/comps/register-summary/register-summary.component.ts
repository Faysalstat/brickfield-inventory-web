import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionSummary } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register-summary',
  templateUrl: './register-summary.component.html',
  styleUrls: ['./register-summary.component.css']
})
export class RegisterSummaryComponent implements OnInit {
  summary!:TransactionSummary;
  constructor(
    private userService:UserService
  ) { 
    this.summary = new TransactionSummary();
  }
  ngOnInit(): void {
    this.fetcRegistryReport();
  }

  fetcRegistryReport(){
    this.userService.getRegistryReport().subscribe({
      next:(res)=>{
        console.log(res);
        if(!res.body.totalIncome){
          this.summary.totalIncome = 0;
        }else{
          this.summary.totalIncome = res.body.totalIncome;
        }
        if(!res.body.totalExpense){
          this.summary.totalExpense = 0;
        }else{
          this.summary.totalExpense = res.body.totalExpense;
        }
        if(!res.body.balance){
          this.summary.balance = 0;
        }else{
          this.summary.balance = res.body.balance;
        }
        if(!res.body.totalSale){
          this.summary.totalSale = 0;
        }else{
          this.summary.totalSale = res.body.totalSale;
        }
        
      },
      error:(err)=>{
        console.log(err.message);
      this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
    })
  }

}
