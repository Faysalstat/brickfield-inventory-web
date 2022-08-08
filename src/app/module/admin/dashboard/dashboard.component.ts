import { Component, OnInit } from '@angular/core';
import { Brick } from '../../model';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bricks!: Brick[];
  loadUnloadHistoryList!:any[];
  constructor(
    private userService:UserService,
    private adminService:AdminService
  ) { }

  ngOnInit(): void {
    this.fetchBricks();
    this.fetchLoadUnloadHistory();
  }
  fetchBricks() {
    this.userService.fetchBricks().subscribe({
      next: (res) => {
        console.log(res);
        if (res.body) {
          this.bricks = res.body;
        }
      },
    });
  }
  fetchLoadUnloadHistory(){
    this.adminService.fetchLoadUnloadHistory().subscribe({
      next:(res)=>{
        this.loadUnloadHistoryList = res.body;
        console.log(res);
      },
      error:(err)=>{
        window.alert(err);
      }
    })
  }
}
