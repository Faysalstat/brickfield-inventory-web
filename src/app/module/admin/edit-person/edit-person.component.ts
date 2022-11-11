import { Component, OnInit } from '@angular/core';
import { Person } from '../../model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
})
export class EditPersonComponent implements OnInit {
  person: Person = new Person();
  constructor(private adminService: AdminService) {}
  isEditable:boolean = false;
  ngOnInit(): void {}

  searchPersonByContactNo() {
    this.adminService.fetchPersonByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if(res.body){
          this.adminService.showMessage("SUCCESS!!","Person Found","OK",500);
          this.person = res.body;
          this.isEditable = true;
        }else{
          this.adminService.showMessage("FAILED!!","Person Not Found","OK",500);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  submit() {
    const params: Map<string, any> = new Map();
    params.set('person', this.person);
    this.adminService.updatePerson(params).subscribe({
      next: (res) => {
        console.log(res.body);
        this.person = new Person();
        this.adminService.showMessage("SUCCESS!!","Person Details Updated","OK",500);
        this.isEditable = false;
      },
      error:(err)=>{
        this.adminService.showMessage("ERROR!!","Person Details update Failed","OK",500);
      }
    });
  }
}
