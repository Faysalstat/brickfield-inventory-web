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
    private userService: UserService,
    private snackBar: MatSnackBar) {
    this.sordarList = [];
  }

  ngOnInit(): void {
    this.fetchDriversList();
  }

  fetchDriversList(){
    this.userService.fetchAllSordars().subscribe({
      next: (data) => {
        console.log(data.body);
        this.sordarList = data.body;
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
      complete: () => {},
    });
  }
  updateList($event:any){
    console.log("Sordar added. List updated");
    this.fetchDriversList();
  }
  deleteDriver(sordar: any) {
    const params = new Map<string, any>();
    params.set('customer', sordar);
    this.userService.deleteCustomer(params).subscribe({
      next: (res) => {
        console.log(res);
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
      complete: () => {},
    });
  }

}
