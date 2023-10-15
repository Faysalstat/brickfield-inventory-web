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
  offset:number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  queryBody!:any;
  constructor(
    private route: Router,
    private adminService:AdminService
  ) {
    this.taskList = [];
    this.queryBody = {
      taskType : '',
      limit : 0,
      offset : 0
    }
   }

  ngOnInit(): void {
    this.fetchAllTaskList();
  }
  fetchAllTaskList(){
    const params: Map<string, any> = new Map();
    this.queryBody.offset = this.offset;
    this.queryBody.limit = this.pageSize;
    params.set('query', this.queryBody);
    this.adminService.fetchAllTask(params).subscribe({
      next:(data)=>{
        //console.log(data)
        this.taskList = data.body.data;
        this.length = data.body.length;
      },
      error:(err)=> {
        //console.log(err.message);
        this.adminService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
  openTask(task:any){
    if(task.taskType == Tasks.CASH_HANDOVER){
      this.route.navigate(["/admin/handover-details",task.id]);
    }else{
      this.route.navigate(["/admin/invoice-details",task.id]);
    }
    
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchAllTaskList();
  }
  refresh(){
    
  }

}
