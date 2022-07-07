import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice,CustomerDomain,ScheduleDeliveryModel,Driver } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-schedule-delivery',
  templateUrl: './schedule-delivery.component.html',
  styleUrls: ['./schedule-delivery.component.css'],
})
export class ScheduleDeliveryComponent implements OnInit {
  selectedDriver!:any;
  drivers!: Driver[];
  invoice!: Invoice;
  customer!:CustomerDomain;
  delivery!:ScheduleDeliveryModel;
  date!:Date;
  scheduleOrders!:ScheduleDeliveryModel[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
      this.delivery = new ScheduleDeliveryModel();
    this.date = new Date();
    this.scheduleOrders =[];
    this.drivers =[];
    }

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
          if(!this.invoice.scheduleOrders){
            this.invoice.scheduleOrders = [];
          }
          // this.customer = 
          console.log(res);
          this.fetchDrivers();
        }

      })
     })
  }
  fetchDrivers(){
    this.userService.fetchAllDrivers().subscribe({
      next:(data)=>{
        console.log(data.body);
        this.drivers = data.body;
      }
    })
  }
  onChnageDriver(){
    this.delivery.driverId = this.selectedDriver.id;

  }
  addSchedule(){
    // this.delivery.scheduledDate = this.date.getFullYear() +"-"+ this.date.getMonth() +"-" + this.date.getDate();
    // console.log(this.delivery.scheduledDate);
    this.delivery.invoiceId = this.invoice.id;
    const params:Map<string,any> = new Map();
    params.set("schedules",this.delivery);
    this.userService.createScheduleOrder(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.fetchInvoiceById();
        this.delivery = new ScheduleDeliveryModel();
    // this.delivery.scheduledDate = this.date.getFullYear() +"-"+ this.date.getMonth() +"-" + this.date.getDate();
    

      },
      error:(err)=>{},
      complete: ()=>{}
    })
  }
  applyFilter(date:any) {
    let newDate = new Date(date);
    return newDate.getFullYear()+"/"+newDate.getMonth()+"/"+newDate.getDate()
  }
  editOrder(i:any){
    this.delivery = this.invoice.scheduleOrders[i];
  }
  deleteOrder(schedule:any){
    const params:Map<string,any> = new Map();
    params.set("schedule",schedule);
    
    this.userService.deleteSchedule(params).subscribe({
      next:(data)=>{
        console.log(data);
        this.fetchInvoiceById();
      },
      error:(err)=> console.log(err)
    })
  }
}
