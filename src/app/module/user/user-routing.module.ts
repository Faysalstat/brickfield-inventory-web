import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashPaymentDueListComponent } from './cash-payment-due-list/cash-payment-due-list.component';
import { CashPaymentComponent } from './comps/cash-payment/cash-payment.component';
import { CashReceiveComponent } from './comps/cash-receive/cash-receive.component';
import { CustomerAccountComponent } from './customer-account/customer-account.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { HomeComponent } from './home/home.component';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import { MakeInvoiceComponent } from './make-invoice/make-invoice.component';
import { ScheduleDeliveryComponent } from './schedule-delivery/schedule-delivery.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { SupplyInvoiceComponent } from './supply-invoice/supply-invoice.component';
import { SupplyerListComponent } from './supplyer-list/supplyer-list.component';
import { UserComponent } from './user.component';

const routes: Routes = [{
    path: '', component: UserComponent, children: [
        {path: '', component: HomeComponent},
        {path:'stock',component:StockManagementComponent},
        {path:'invoice',component:MakeInvoiceComponent},
        {path:'edit-invoice/:id',component:MakeInvoiceComponent},
        {path:'delivery',component:DeliveryComponent},
        {path:'customer',component:CustomerListComponent},
        {path:'account',component:CustomerAccountComponent},
        {path:'invoice-list',component:ListInvoicesComponent},
        {path:'schedule-list',component:ScheduleListComponent},
        {path:'schedule-delivery/:id', component:ScheduleDeliveryComponent},
        {path:'driver-management', component:DriverListComponent},
        {path:'supplyer-management', component:SupplyerListComponent},
        {path:'supply-invoice', component:SupplyInvoiceComponent},
        {path:'cash-receive', component:CashReceiveComponent},
        {path:'cash-payment-due-list', component:CashPaymentDueListComponent},
        {path:'cash-payment/:id', component:CashPaymentComponent},
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
