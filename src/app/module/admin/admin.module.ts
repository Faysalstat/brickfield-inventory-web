import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/material.module';
import { ApprovalListComponent } from './approval-list/approval-list.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { PendingSchedulesComponent } from './pending-schedules/pending-schedules.component';
import { HandoverDetailsComponent } from './handover-details/handover-details.component';
import { PayrollComponent } from './payroll/payroll.component';
import { OfficeExpenseComponent } from './office-expense/office-expense.component';
import { ExpenseComponent } from './expense/expense.component';
import { PaySordarComponent } from './pay-sordar/pay-sordar.component';
import { AddExpenseCategoryComponent } from './add-expense-category/add-expense-category.component';
import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';
import { OfficeDepositComponent } from './office-deposit/office-deposit.component';
import { EmployeesComponent } from './employees/employees.component';
import { ConfigurationsComponent } from './configurations/configurations.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ApprovalListComponent,
    ReportsComponent,
    UsersComponent,
    InvoiceDetailComponent,
    TaskListComponent,
    PendingSchedulesComponent,
    HandoverDetailsComponent,
    PayrollComponent,
    OfficeExpenseComponent,
    ExpenseComponent,
    PaySordarComponent,
    AddExpenseCategoryComponent,
    DashboardSummaryComponent,
    OfficeDepositComponent,
    EmployeesComponent,
    ConfigurationsComponent,
    
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
