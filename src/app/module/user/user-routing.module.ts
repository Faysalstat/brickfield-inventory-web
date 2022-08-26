import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { CashHandoverReportComponent } from '../report/cash-handover-report/cash-handover-report.component';
import { ProductionReportComponent } from '../report/production-report/production-report.component';
import { TransactionReportComponent } from '../report/transaction-report/transaction-report.component';
import { CashPaymentDueListComponent } from './cash-payment-due-list/cash-payment-due-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CashPaymentComponent } from './comps/cash-payment/cash-payment.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { EditSupplyInvoiceComponent } from './edit-supply-invoice/edit-supply-invoice.component';
import { HomeComponent } from './home/home.component';
import { IssueExpenseComponent } from './issue-expense/issue-expense.component';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
import { ListSupplyInvoiceComponent } from './list-supply-invoice/list-supply-invoice.component';
import { MakeInvoiceComponent } from './make-invoice/make-invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleDeliveryComponent } from './schedule-delivery/schedule-delivery.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { SordarListComponent } from './sordar-list/sordar-list.component';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { SupplyInvoiceComponent } from './supply-invoice/supply-invoice.component';
import { SupplyerListComponent } from './supplyer-list/supplyer-list.component';
import { UserReportsComponent } from './user-reports/reports.component';
import { UserComponent } from './user.component';

const routes: Routes = [{
    path: '', component: UserComponent,canActivate:[AppAuthGuard],
    children: [
        {path: '', component: HomeComponent},
        {path:'stock',component:StockManagementComponent},
        {path:'invoice',component:MakeInvoiceComponent},
        {path:'edit-invoice/:id',component:MakeInvoiceComponent},
        {path:'customer',component:CustomerListComponent},
        {path:'invoice-list',component:ListInvoicesComponent},
        {path:'supply-list',component:ListSupplyInvoiceComponent},
        {path:'schedule-list',component:ScheduleListComponent},
        {path:'schedule-delivery/:id', component:ScheduleDeliveryComponent},
        {path:'driver-management', component:DriverListComponent},
        {path:'sordar-management', component:SordarListComponent},
        {path:'supplyer-management', component:SupplyerListComponent},
        {path:'supply-invoice', component:SupplyInvoiceComponent},
        {path:'edit-supply-invoice/:id',component:EditSupplyInvoiceComponent},
        {path:'issue-expense', component:IssueExpenseComponent},
        {path:'profile', component:ProfileComponent},
        {path:'change-password', component:ChangePasswordComponent},
        {path:'cash-payment-due-list', component:CashPaymentDueListComponent},
        {path:'cash-payment/:id', component:CashPaymentComponent},
        {path:'reports',component: UserReportsComponent,children:[
          {path:"",component: TransactionReportComponent},
          {path:"production-report", component: ProductionReportComponent},
          {path:"cash-handover-report",component: CashHandoverReportComponent},
          // {path:"transaction-report", component: TransactionReportComponent},
        ]}
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
