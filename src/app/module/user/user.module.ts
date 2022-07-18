import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompsModule } from './comps/comps.module';
import { MaterialModule } from 'src/material.module';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import { ScheduleDeliveryComponent } from './schedule-delivery/schedule-delivery.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { SupplyInvoiceComponent } from './supply-invoice/supply-invoice.component';
import { SupplyerListComponent } from './supplyer-list/supplyer-list.component';
import { MakeInvoiceComponent } from './make-invoice/make-invoice.component';
import { CashPaymentDueListComponent } from './cash-payment-due-list/cash-payment-due-list.component';



@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    CustomerListComponent,
    CustomerAccountComponent,
    StockManagementComponent,
    DeliveryComponent,
    ListInvoicesComponent,
    ScheduleDeliveryComponent,
    DriverListComponent,
    ScheduleListComponent,
    SupplyInvoiceComponent,
    SupplyerListComponent,
    MakeInvoiceComponent,
    CashPaymentDueListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CompsModule,
    MaterialModule
  ]
})
export class UserModule { }
