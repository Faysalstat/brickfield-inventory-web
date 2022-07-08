import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { PendingDeliveryComponent } from './pending-delivery/pending-delivery.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
    path: '', component: AdminComponent, children: [
        {path: '', component: DashboardComponent},
        {path: 'approval-list', component: ApprovalListComponent},
        {path: 'pending-task', component: PendingDeliveryComponent},
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
