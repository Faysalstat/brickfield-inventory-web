import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApprovalModel, Tasks } from '../../model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList!:ApprovalModel[];
  constructor(
    private route: Router,
    private adminService:AdminService
  ) {
    this.taskList = [];
   }

  ngOnInit(): void {
    this.fetchAllTaskList();
  }
  fetchAllTaskList(){
    this.adminService.fetchAllTask().subscribe({
      next:(data)=>{
        console.log(data)
        this.taskList = data.body;
      },
      error:(err)=> console.log(err)
    })
  }
  openTask(task:any){
    if(task.taskType == Tasks.CASH_HANDOVER){
      this.route.navigate(["/admin/handover-details",task.id]);
    }else{
      this.route.navigate(["/admin/invoice-details",task.id]);
    }
    
  }

}
