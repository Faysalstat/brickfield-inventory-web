import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sordar } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sordar-list',
  templateUrl: './sordar-list.component.html',
  styleUrls: ['./sordar-list.component.css']
})
export class SordarListComponent implements OnInit {
  sordarList!: Sordar[];
  constructor(
    private userService: UserService) {
    this.sordarList = [];
  }

  ngOnInit(): void {
    this.fetchSordarsList();
  }

  fetchSordarsList(){
    this.userService.fetchAllSordars().subscribe({
      next: (data) => {
        console.log(data.body);
        this.sordarList = data.body;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Sordar Fetching Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }
  updateList($event:any){
    console.log("Sordar added. List updated");
    this.fetchSordarsList();
  }
  deleteDriver(sordar: any) {
    const params = new Map<string, any>();
    params.set('customer', sordar);
    this.userService.deleteCustomer(params).subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }

}
