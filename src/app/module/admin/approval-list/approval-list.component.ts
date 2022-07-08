import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent implements OnInit {
  invoiceList!:any;
  invoice!:any;
  constructor(
    private route: Router,
    private userService:UserService) {
    this.invoiceList = [];
   }

   ngOnInit(): void {
    this.fetchAllInvoices();
  }

  

  fetchAllInvoices(){
    this.userService.fetchAllPendingInvoice().subscribe({
      next:(res)=>{
        console.log(res);
        this.invoiceList = res.body;
      },
      error:(err)=>{},
      complete: ()=>{}
    });
  }
  openInvoice(invoice:any){
    this.route.navigate(["/admin/invoice-details",invoice.id]);
  }

}
