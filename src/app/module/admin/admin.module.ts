import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/material.module';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { PendingDeliveryComponent } from './pending-delivery/pending-delivery.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ApprovalListComponent,
    PendingDeliveryComponent,
    ReportsComponent,
    UsersComponent,
    InvoiceDetailComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
