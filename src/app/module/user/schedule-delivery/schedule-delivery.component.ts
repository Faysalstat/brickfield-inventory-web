import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Invoice,
  CustomerDomain,
  ScheduleDeliveryModel,
  Driver,
  Customer,
  Brick,
} from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule-delivery',
  templateUrl: './schedule-delivery.component.html',
  styleUrls: ['./schedule-delivery.component.css'],
})
export class ScheduleDeliveryComponent implements OnInit {
  customer!: Customer;
  brick!:Brick;
  delivery!: any;
  isPaymentDue: boolean= false;
  transportCostCustomerPayable: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
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
          this.fetchCustomerById(res.body.invoice.customerId);
          this.fetchBrickById(res.body.brickId);
          if(this.delivery?.invoice?.duePament >0){
            this.isPaymentDue = true;
          }else{
            this.isPaymentDue = false;
          }
        },
        error:(err)=>{
          this.snackBar.open(err, "Close it", {
            duration: 10000,
            horizontalPosition:'right',
            verticalPosition: 'top'
          });
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
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
      complete:()=>{
        console.log("done");
      }
    })
  }
  fetchCustomerById(id:any){
    this.userService.fetchCustomerById(id).subscribe({
      next:(res)=>{
        this.customer = res.body;
      }
    })
  }
  fetchBrickById(id:any){
    this.userService.fetchBrickById(id).subscribe({
      next:(res)=>{
        this.brick = res.body;
      }
    })
  }
}
