import { Component, OnInit } from '@angular/core';
import { Sordar } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sordar-list',
  templateUrl: './sordar-list.component.html',
  styleUrls: ['./sordar-list.component.css']
})
export class SordarListComponent implements OnInit {
  sordarList!: Sordar[];
  constructor(private userService: UserService) {
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
      error: (err) => {
        console.log(err);
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
      error: (err) => {},
      complete: () => {},
    });
  }

}
