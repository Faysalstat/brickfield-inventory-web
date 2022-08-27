import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Supplyer } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-supplyer-list',
  templateUrl: './supplyer-list.component.html',
  styleUrls: ['./supplyer-list.component.css'],
})
export class SupplyerListComponent implements OnInit {
  supplyersList!: Supplyer[];
  limit = 10;
  offset = 0;
  constructor(
    private userService: UserService) {
    this.supplyersList = [];
  }

  ngOnInit(): void {
    this.fetchSupplyers();
  }
  fetchSupplyers() {
    const params: Map<string, any> = new Map();
    params.set('offset', this.offset);
    this.userService.fetchAllSupplyers(params).subscribe({
      next: (data) => {
        console.log(data);
        this.supplyersList = data.body;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
    });
  }
  updateList(event: any) {
    this.fetchSupplyers();
  }
  edit(customer: any) {
    // this.route.navigate(['/home/edit-customer']);
  }
  deletecustomer(supplyer: any) {
    const params = new Map<string, any>();
    params.set('customer', supplyer);
    // this.userService.deleteCustomer(params).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    //   error: (err) => {},
    //   complete: () => {},
    // });
  }
  nextPage() {
    // this.tnxIndex+=
    this.offset += 20;
    this.fetchSupplyers();
  }
  previousPage() {
    if (this.offset > 20) {
      this.offset -= 20;
      this.fetchSupplyers();
    } else {
      return;
    }
  }
}
