import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { CashHandoverReportComponent } from '../report/cash-handover-report/cash-handover-report.component';
import { IncomeExpenseComponent } from '../report/income-expense/income-expense.component';
import { ProductionReportComponent } from '../report/production-report/production-report.component';
import { SordarRecordReportComponent } from '../report/sordar-record-report/sordar-record-report.component';
import { TransactionReportComponent } from '../report/transaction-report/transaction-report.component';
import { AdminComponent } from './admin.component';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { HandoverDetailsComponent } from './handover-details/handover-details.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { OfficeExpenseComponent } from './office-expense/office-expense.component';
import { PayrollComponent } from './payroll/payroll.component';
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
        {path: 'expenses', component: OfficeExpenseComponent},
        {path:'reports',component: ReportsComponent,children:[
          {path:"",component: TransactionReportComponent},
          {path:"production-report", component: ProductionReportComponent},
          // {path:"transaction-report", component: TransactionReportComponent},
          {path:"cash-handover-report",component: CashHandoverReportComponent},
          {path:"sordar-report",component: SordarRecordReportComponent}
        ]},
        
        {path: 'employees', component: EmployeesComponent},
        {path: 'config', component: ConfigurationsComponent},
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
