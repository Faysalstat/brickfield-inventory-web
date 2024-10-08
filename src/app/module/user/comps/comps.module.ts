import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPersonComponent } from './add-person/add-person.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddSupplyerComponent } from './add-supplyer/add-supplyer.component';
import { MatIconModule } from '@angular/material/icon';
import { CashPaymentComponent } from './cash-payment/cash-payment.component';
import { CashReceiveComponent } from './cash-receive/cash-receive.component';
import { DueInvoiceListComponent } from './due-invoice-list/due-invoice-list.component';
import { DuePaymentListComponent } from './due-payment-list/due-payment-list.component';
import { RegisterSummaryComponent } from './register-summary/register-summary.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddSordarComponent } from './add-sordar/add-sordar.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { CashExpenseComponent } from './cash-expense/cash-expense.component';
import { EscavatorPaymentComponent } from './escavator-payment/escavator-payment.component';
import { CashHandoverComponent } from './cash-handover/cash-handover.component';
import { EscavatorDuePaymentListComponent } from './escavator-due-payment-list/escavator-due-payment-list.component';
import { DepositManagementComponent } from './deposit-management/deposit-management.component';
import { SordarProductionRecordComponent } from './sordar-production-record/sordar-production-record.component';
const components = [
  AddPersonComponent,AddDriverComponent,AddSupplyerComponent,
  CashPaymentComponent,CashReceiveComponent,DueInvoiceListComponent,DuePaymentListComponent,
  RegisterSummaryComponent,NavBarComponent,AddSordarComponent,TransactionListComponent,CashExpenseComponent,
  EscavatorPaymentComponent,CashHandoverComponent,EscavatorDuePaymentListComponent,
  DepositManagementComponent,SordarProductionRecordComponent
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
