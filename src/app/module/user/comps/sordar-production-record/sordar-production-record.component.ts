import { Component, OnInit } from '@angular/core';
import { Sordar } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-sordar-production-record',
  templateUrl: './sordar-production-record.component.html',
  styleUrls: ['./sordar-production-record.component.css']
})
export class SordarProductionRecordComponent implements OnInit {
  selectedSordar!:Sordar;
  sordars!:any[];
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.fetchSordarList();
  }
  onChnageSordar(){

  }
  fetchSordarList(){
    this.userService.fetchAllSordars().subscribe({
      next:(res)=>{
        this.sordars = res.body;
        //console.log(res);
      },
      error:(err)=>{
        //console.log(err.message);
      this.userService.showMessage("ERROR!","Sordars Fetching Failed" + err.message,"OK",2000);
      }
    })
  }

}
