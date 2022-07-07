import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleDeliveryModel } from 'src/app/module/model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  
  constructor(
    private userService:UserService,
    private activatedRoute: ActivatedRoute
    ) { 
    
  }

  ngOnInit(): void {
    
  }
  
}
