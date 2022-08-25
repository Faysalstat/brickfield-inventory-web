import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeExpenseComponent } from './income-expense/income-expense.component';
import { ProductionReportComponent } from './production-report/production-report.component';
import { MaterialModule } from 'src/material.module';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { FormsModule } from '@angular/forms';
import { CashHandoverReportComponent } from './cash-handover-report/cash-handover-report.component';

const components = [IncomeExpenseComponent,ProductionReportComponent,TransactionReportComponent];

@NgModule({
  declarations: [components, CashHandoverReportComponent],
  imports: [CommonModule,MaterialModule,FormsModule],
  exports: [components],
})
export class ReportModule {}
