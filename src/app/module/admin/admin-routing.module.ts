import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { CashHandoverReportComponent } from '../report/cash-handover-report/cash-handover-report.component';
import { IncomeExpenseComponent } from '../report/income-expense/income-expense.component';
import { ProductionReportComponent } from '../report/production-report/production-report.component';
import { TransactionReportComponent } from '../report/transaction-report/transaction-report.component';
import { AdminComponent } from './admin.component';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HandoverDetailsComponent } from './handover-details/handover-details.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { PendingSchedulesComponent } from './pending-schedules/pending-schedules.component';
import { ReportsComponent } from './reports/reports.component';
import { TaskListComponent } from './task-list/task-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
    path: '', component: AdminComponent,canActivate:[AppAuthGuard],canActivateChild:[AppAuthGuard],
    children: [
        {path: '', component: DashboardComponent},
        {path: 'approval-list', component: ApprovalListComponent},
        {path: 'task-list', component: TaskListComponent},
        {path: 'pending-schedule', component: PendingSchedulesComponent},
        {path:'reports',component: ReportsComponent,children:[
          {path:"",component: TransactionReportComponent},
          {path:"production-report", component: ProductionReportComponent},
          // {path:"transaction-report", component: TransactionReportComponent},
          {path:"cash-handover-report",component: CashHandoverReportComponent}
        ]},
        {path: 'users', component: UsersComponent},
        {path: 'invoice-details/:id', component: InvoiceDetailComponent},
        {path: 'handover-details/:id', component: HandoverDetailsComponent},
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
