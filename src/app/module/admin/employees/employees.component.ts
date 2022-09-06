import { Component, OnInit } from '@angular/core';
import { Sordar } from '../../model';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  sordarList!: Sordar[];
  sordar: Sordar = new Sordar();
  isEdit:boolean = false;
  constructor(
    private userService: UserService,
    private adminService: AdminService
    ) {
    this.sordarList = [];
  }

  ngOnInit(): void {
    this.fetchSordarsList();
  }

  fetchSordarsList() {
    this.userService.fetchAllSordars().subscribe({
      next: (data) => {
        console.log(data.body);
        this.sordarList = data.body;
      },
      error: (err) => {
        console.log(err.message);
        this.userService.showMessage(
          'ERROR!',
          'Sordar Fetching Operation Failed' + err.message,
          'OK',
          2000
        );
      },
      complete: () => {},
    });
  }
  updateList($event: any) {
    console.log('Sordar added. List updated');
    this.fetchSordarsList();
  }
  deleteDriver(sordar: any) {
    const params = new Map<string, any>();
    params.set('customer', sordar);
    this.userService.deleteCustomer(params).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.message);
        this.userService.showMessage(
          'ERROR!',
          'Operation Failed' + err.message,
          'OK',
          2000
        );
      },
      complete: () => {},
    });
  }
  edit(i: any) {
    this.sordar = this.sordarList[i];
    this.isEdit = true;
  }
  updateSordar() {
    const params = new Map<string, any>();
    params.set('sordar', this.sordar);
    this.adminService.updateSordar(params).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.sordar = new Sordar();
        this.isEdit = false;
      },
      error:(err)=>{
        console.log(err);
      }

    })
  }
}
