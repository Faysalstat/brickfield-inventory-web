import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeExpenseComponent } from './income-expense/income-expense.component';
import { ProductionReportComponent } from './production-report/production-report.component';
import { MaterialModule } from 'src/material.module';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { FormsModule } from '@angular/forms';
import { CashHandoverReportComponent } from './cash-handover-report/cash-handover-report.component';
import { SordarRecordReportComponent } from './sordar-record-report/sordar-record-report.component';
import { LoadUnloadReportComponent } from './load-unload-report/load-unload-report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { DeliveryReportComponent } from './delivery-report/delivery-report.component';

const components = [IncomeExpenseComponent,ProductionReportComponent,TransactionReportComponent,
  SordarRecordReportComponent, CashHandoverReportComponent, SordarRecordReportComponent, LoadUnloadReportComponent,
  SalesReportComponent, DeliveryReportComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule,MaterialModule,FormsModule],
  exports: [components],
})
export class ReportModule {}
