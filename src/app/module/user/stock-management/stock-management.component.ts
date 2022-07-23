import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { RawBrickProduction } from '../../model';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css'],
})
export class StockManagementComponent implements OnInit {
  selectedMill!: string;
  mills = [{ label: 'Select mill name', value: '' }];
  selectedBrickProduction: RawBrickProduction = new RawBrickProduction();
  dailyProductionList!: RawBrickProduction[];
  totalRawProduction: number = 0;
  previousLoadQuantity: number = 0;
  latestLoadQuantity: number = 0;
  totalLoadQuantity: number = 0;
  loadComment!: string;
  constructor() {
    this.mills = [
      { label: 'Select mill name', value: '' },
      { label: '১নং পাগ মিল', value: '১নং পাগ মিল' },
      { label: '১নং অটো মিল', value: '১নং অটো মিল' },
      { label: '২নং অটো মিল', value: '২নং অটো মিল' },
    ];
    this.dailyProductionList = [];
  }

  ngOnInit(): void {}

  addRawProduction() {
    this.dailyProductionList.push(this.selectedBrickProduction);
    this.selectedBrickProduction = new RawBrickProduction();
    this.calculateTotalRawProduction();
  }

  deleteRawProduction(i: number) {
    this.dailyProductionList.slice(i);
  }

  calculateTotalRawProduction() {
    this.dailyProductionList.forEach((product) => {
      this.totalRawProduction += product.quantity;
    });
  }
}
