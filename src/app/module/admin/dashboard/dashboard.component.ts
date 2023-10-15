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
  totalBrick:number =0;
  totalStockValue:number = 0;
  
  constructor(
    private userService:UserService,
  ) { 

  }

  ngOnInit(): void {
    this.fetchBricks();
  }
 
  
  fetchBricks() {
    this.userService.fetchBricks().subscribe({
      next: (res) => {
        //console.log(res);
        if (res.body) {
          this.bricks = res.body;
          this.bricks.map((brick)=>{
            this.totalBrick += brick.quantity;
            this.totalStockValue += (brick.pricePerPiece * brick.quantity);
          })
        }
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Successfull" + err.message,"OK",2000);
      }
    });
  }
}
