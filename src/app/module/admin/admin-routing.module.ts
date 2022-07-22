import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuthGuard } from 'src/app/app-auth.guard';
import { AuthenticationGuard } from '../authentication.guard';
import { AdminComponent } from './admin.component';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { PendingDeliveryComponent } from './pending-delivery/pending-delivery.component';
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
        {path: 'pending-task', component: PendingDeliveryComponent},
        {path: 'pending-schedule', component: PendingSchedulesComponent},
        {path: 'reports', component: ReportsComponent},
        {path: 'users', component: UsersComponent},
        {path: 'invoice-details/:id', component: InvoiceDetailComponent},
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
