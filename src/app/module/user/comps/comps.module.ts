import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPersonComponent } from './add-person/add-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { AddSupplyerComponent } from './add-supplyer/add-supplyer.component';
import { MatIconModule } from '@angular/material/icon';
import { StockListComponent } from './stock-list/stock-list.component';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { CashReceiveComponent } from './cash-receive/cash-receive.component';
const components = [
  AddPersonComponent,AddDriverComponent,AddScheduleComponent,AddSupplyerComponent,StockListComponent,
  CashPaymentComponent,CashReceiveComponent
]


@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule
  ],
  exports:components
})
export class CompsModule { }
