import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cash-payment-due-list',
  templateUrl: './cash-payment-due-list.component.html',
  styleUrls: ['./cash-payment-due-list.component.css']
})
export class CashPaymentDueListComponent implements OnInit {
  clientList!:any[];
  constructor(
    
    
  ) {
   }

  ngOnInit(): void {
  }

}
