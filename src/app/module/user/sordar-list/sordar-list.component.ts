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
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(
    private userService: UserService) {
    this.sordarList = [];
  }

  ngOnInit(): void {
    this.fetchSordarsList();
  }

  fetchSordarsList(){
    // const params: Map<string, any> = new Map();
    // params.set('offset', this.offset);
    // params.set('limit', this.pageSize);
    this.userService.fetchAllSordars().subscribe({
      next: (data) => {
        //console.log(data.body);
        this.sordarList = data.body;
        // this.length = data.body.length;
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Sordar Fetching Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }
  updateList($event:any){
    //console.log("Sordar added. List updated");
    this.fetchSordarsList();
  }
  deleteSordar(sordar: any) {
    const params = new Map<string, any>();
    sordar.type = "SORDAR";
    params.set('client', sordar);
    this.userService.deleteCustomer(params).subscribe({
      next: (res) => {
        //console.log(res);
        this.fetchSordarsList();
        this.userService.showMessage("SUCCESS!","Sordar Deleted","OK",2000);
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: () => {},
    });
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchSordarsList();
  }
}
