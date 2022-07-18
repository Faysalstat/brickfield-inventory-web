import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-due-invoice-list',
  templateUrl: './due-invoice-list.component.html',
  styleUrls: ['./due-invoice-list.component.css']
})
export class DueInvoiceListComponent implements OnInit {
  invoiceList!:any;
  isListExist: boolean = false;
  constructor(
    private route: Router,
    private userService:UserService
  ) { 
    this.invoiceList = [];
  }

  ngOnInit(): void {
    this.fetchDueAmountInvoiceList();
  }
  fetchDueAmountInvoiceList(){
    this.userService.fetchDueAmountInvoiceList().subscribe({
      next:(res)=>{
        console.log(res);
        this.invoiceList = res.body;
        if(this.invoiceList.length==0){
          this.isListExist = false;
        }else{
          this.isListExist = true;
        }
      }
    })
  }
  viewInvoice(invoice:any){
    this.route.navigate(["/home/edit-invoice",invoice.id]);
  }
}
