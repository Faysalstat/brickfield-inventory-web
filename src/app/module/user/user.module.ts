import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { StockManagementComponent } from './stock-management/stock-management.component';
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
import { InvoiceFormComponent } from './supply/invoice-form/invoice-form.component';
import { SordarListComponent } from './sordar-list/sordar-list.component';
import { UserReportsComponent } from './user-reports/reports.component';
import { ReportModule } from '../report/report.module';
import { IssueExpenseComponent } from './issue-expense/issue-expense.component';
import { ListSupplyInvoiceComponent } from './list-supply-invoice/list-supply-invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditSupplyInvoiceComponent } from './edit-supply-invoice/edit-supply-invoice.component';



@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    CustomerListComponent,
    CustomerAccountComponent,
    StockManagementComponent,
    ListInvoicesComponent,
    ScheduleDeliveryComponent,
    DriverListComponent,
    ScheduleListComponent,
    SupplyInvoiceComponent,
    SupplyerListComponent,
    MakeInvoiceComponent,
    CashPaymentDueListComponent,
    InvoiceFormComponent,
    SordarListComponent,
    UserReportsComponent,
    IssueExpenseComponent,
    ListSupplyInvoiceComponent,
    ProfileComponent,
    ChangePasswordComponent,
    EditSupplyInvoiceComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CompsModule,
    MaterialModule,
    ReportModule
  ]
})
export class UserModule { }
