import { Component, OnInit } from '@angular/core';
import { Brick } from '../../model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bricks!: Brick[];
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.fetchBricks();
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
}
