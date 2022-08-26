import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-due-payment-list',
  templateUrl: './due-payment-list.component.html',
  styleUrls: ['./due-payment-list.component.css']
})
export class DuePaymentListComponent implements OnInit {
  clientList!:any[];
  isListExist: boolean = false;
  constructor(
    private userService:UserService,
    private route: Router,
    
  ) {
    this.clientList=[];
   }

  ngOnInit(): void {
    this.fetchCashPaymentDueList();
  }

  fetchCashPaymentDueList(){
    this.userService.fetchPaymentDueList().subscribe({
      next:(res)=>{
        this.clientList = res.body;
        if(this.clientList.length==0){
          this.isListExist = false;
        }else{
          this.isListExist = true;
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed!! err: " + err.message,"OK",2000);
      }
    })
  }
  payCash(client:any){
    this.route.navigate(["/home/cash-payment",client.id]);
  }
}
