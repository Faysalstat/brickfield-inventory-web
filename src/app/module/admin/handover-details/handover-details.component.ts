import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-handover-details',
  templateUrl: './handover-details.component.html',
  styleUrls: ['./handover-details.component.css']
})
export class HandoverDetailsComponent implements OnInit {
  taskId!:number;
  handoverDetails!:any;
  isSubmitted: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchDetailsById();
  }
  fetchDetailsById() {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.taskId = id;
      console.log(parameter);
      this.adminService.fetchTaskById(id).subscribe({
        next: (res) => {
          console.log(res);
          this.handoverDetails = res.body;
        },
      });
    });
  }
  approveInvoice(event: any){
    this.isSubmitted = true;
    this.handoverDetails.taskId = this.taskId;
    const params: Map<string, any> = new Map();
    
    if (event == 'APPROVED') {
      params.set('handover', this.handoverDetails);
      this.adminService.approveHandOverTask(params).subscribe({
        next: (data) => {
          this.isSubmitted = false;
          this.userService.showMessage("SUCCESS!","Payment Complete","OK",2000);
          this.router.navigate(['/admin/task-list']);
        },
        error: (err) => {
          this.isSubmitted = false;
          console.log(err.message);
          this.userService.showMessage("ERROR!","Operation Failed","OK",2000)}
      })
    }else{
      let model: any = {};
      model.taskId = this.taskId;
      params.set('model', model);
      this.adminService.declineTask(params).subscribe({
        next: (data) => {
          console.log(data);
          this.userService.showMessage(
            'SUCCESS!',
            'Operation Successfull',
            'OK',
            2000
          );
          this.router.navigate(['/admin/task-list']);
        },
        error: (err) => {
          console.log(err.message);
          this.userService.showMessage(
            'ERROR!',
            'Operation Failed' + err.message,
            'OK',
            2000
          );
        },
      });

    }


  }
}
