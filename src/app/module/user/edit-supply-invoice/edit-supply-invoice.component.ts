import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-supply-invoice',
  templateUrl: './edit-supply-invoice.component.html',
  styleUrls: ['./edit-supply-invoice.component.css'],
})
export class EditSupplyInvoiceComponent implements OnInit {
  isEdit: boolean = false;
  invoiceId!: number;
  supplyInvoice!: any;
  person!: Person;
  isCC: boolean = false;
  isCFT: boolean = false;
  isEsc: boolean = false;
  isTON: boolean = false;
  deliveryType!: string;
  newPayment : number=0;
  rebate: number = 0;
  newDue: number = 0;
  comment!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      console.log(parameter);
      if (id) {
        this.isEdit = true;
        this.invoiceId = id;
        this.fetchSupplyInvoiceById(id);
      }
    });
  }
  fetchSupplyInvoiceById(id: any) {
    this.userService.fetchSupplyInvoiceById(id).subscribe({
      next: (data) => {
        console.log(data.body);
        this.supplyInvoice = data.body;
        this.person = this.supplyInvoice.supplyer.person;
        if (this.supplyInvoice.deliveryType == 1) {
          this.isCC = true;
          this.deliveryType = 'গাড়ি চু্ক্তি';
        }
        if (this.supplyInvoice.deliveryType == 2) {
          this.isCFT = true;
          this.deliveryType = 'CFT';
        }
        if (this.supplyInvoice.deliveryType == 3) {
          this.isTON = true;
          this.deliveryType = 'TON';
        }
        this.comment = this.supplyInvoice.comment;
      },
      error: (err) => {
        console.log(err);
        window.alert(err.message);
      },
    });
  }
  calculateDue(){
    this.newDue = this.supplyInvoice.duePayment - this.newPayment - this.rebate;
  }
  updateSupplyInvoice() {
    const params: Map<string, any> = new Map();
    // this.supplyInvoice.comment = this.comment;
    this.supplyInvoice.newPayment = this.newPayment;
    this.supplyInvoice.rebate = this.rebate;
    params.set('supplyInvoice', this.supplyInvoice);
    this.userService.updateSupplyInvoice(params).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        window.alert(err.message);
      },
    });
  }
}
