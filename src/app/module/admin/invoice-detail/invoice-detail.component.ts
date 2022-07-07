import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account, Customer, Person } from '../../model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  invoice!:any;
  person!: Person;
  account!: Account;
  customer!: Customer;
  driverPerson!:Person;
  // orders!
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

    ngOnInit(): void {
      this.fetchInvoiceById();
    }
    fetchInvoiceById(){
      this.activatedRoute.params.subscribe(parameter => {
        let id = parameter['id'];
        console.log(parameter);
        this.userService.fetchInvoiceById(id).subscribe({
          next:(res)=>{
            this.invoice =res.body;
            this.person = this.invoice.customer.person;
            if(!this.invoice.scheduleOrders){
              this.invoice.scheduleOrders = [];
            }
            console.log(res);
          }
        })
       })
    }

}
