import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-escavator-due-payment-list',
  templateUrl: './escavator-due-payment-list.component.html',
  styleUrls: ['./escavator-due-payment-list.component.css']
})
export class EscavatorDuePaymentListComponent implements OnInit {


  duePaymentList!:any[];
  constructor(
    private userService:UserService
  ) {
    this.duePaymentList = [];
   }

  ngOnInit(): void {
    this.fetchEscavatorDuePaymentList();
  }

  fetchEscavatorDuePaymentList(){
    let params = new Map<string, any>();
    params.set("offset",5);
    this.userService.fetchEscavatorDuePaymentList(params).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.duePaymentList = res.body;
      }
    })
  }
  payCash(client:any){

  }

}
