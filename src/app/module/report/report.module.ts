import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeExpenseComponent } from './income-expense/income-expense.component';
import { ProductionReportComponent } from './production-report/production-report.component';
import { MaterialModule } from 'src/material.module';

const components = [IncomeExpenseComponent,ProductionReportComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule,MaterialModule],
  exports: [components],
})
export class ReportModule {}
