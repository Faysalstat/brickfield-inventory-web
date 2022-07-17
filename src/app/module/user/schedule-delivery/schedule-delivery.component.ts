import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Invoice,
  CustomerDomain,
  ScheduleDeliveryModel,
  Driver,
} from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule-delivery',
  templateUrl: './schedule-delivery.component.html',
  styleUrls: ['./schedule-delivery.component.css'],
})
export class ScheduleDeliveryComponent implements OnInit {
  customer!: CustomerDomain;
  delivery!: any;
  isPaymentDue: boolean= false;
  transportCostCustomerPayable: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.delivery = new ScheduleDeliveryModel();
  }

  ngOnInit(): void {
    this.fetchScheduleById();
  }
  fetchScheduleById() {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      console.log(parameter);
      this.userService.fetchScheduleById(id).subscribe({
        next: (res) => {
          console.log(res);
          this.delivery = res.body;
          if(this.delivery?.invoice?.duePament >0){
            this.isPaymentDue = true;
          }else{
            this.isPaymentDue = false;
          }
        },
      });
    });
  }

  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  }
  doDelivery(){
    console.log(this.delivery);
    this.delivery.transportCostCustomerPayable = this.transportCostCustomerPayable;
    const params: Map<string, any> = new Map();
    params.set("schedule", this.delivery);
    this.userService.setDelivery(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/home/schedule-list']);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("done");
      }
    })
  }
}
