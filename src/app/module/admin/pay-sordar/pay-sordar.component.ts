import { Component, OnInit } from '@angular/core';
import { Sordar } from '../../model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-pay-sordar',
  templateUrl: './pay-sordar.component.html',
  styleUrls: ['./pay-sordar.component.css']
})
export class PaySordarComponent implements OnInit {
  selectedSordar!: Sordar;
  sordars!: Sordar[];
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.fetchSordarList();
  }
  fetchSordarList(){
    this.userService.fetchAllSordars().subscribe({
      next:(res)=>{
        this.sordars = res.body;
        console.log(res);
      },
      error:(err)=>{
        window.alert("Sordars Fetching Failed");
      }
    })
  }
}
