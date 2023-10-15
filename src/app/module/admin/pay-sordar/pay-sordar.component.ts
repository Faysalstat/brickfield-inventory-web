import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Sordar } from '../../model';
import { UserService } from '../../user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-pay-sordar',
  templateUrl: './pay-sordar.component.html',
  styleUrls: ['./pay-sordar.component.css']
})
export class PaySordarComponent implements OnInit {
  @Output() payrollEvent = new EventEmitter<string>();
  selectedSordar: Sordar = new Sordar();
  sordars!: Sordar[];
  categories!:any[];
  tnxDate:Date = new Date();
  amount!:number;
  remarks!:string;
  category!:string;
  constructor(
    private userService: UserService,
    private adminService:AdminService
  ) { 
    this.categories = [
      { label: 'Select mill name', value: '' },
      { label: '১নং পাগ মিল', value: '১নং পাগ মিল' },
      { label: '১নং অটো মিল', value: '১নং অটো মিল' },
      { label: '২নং অটো মিল', value: '২নং অটো মিল' },
      { label: 'লোড', value: 'লোড' },
      { label: 'আনলোড', value: 'আনলোড' },
      { label: 'আগুন মিস্ত্রি', value: 'আগুন মিস্ত্রি' },
      
    ];
  }

  ngOnInit(): void {
    this.fetchSordarList();
  }
  onChnageSordar(){
    // this.category = this.selectedSordar.category;
  }
  fetchSordarList(){
    this.userService.fetchAllSordars().subscribe({
      next:(res)=>{
        this.sordars = res.body;
        //console.log(res);
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
  submit(){
    let expenseModel = {
      expenseReason: this.category + ' সরদার',
      category: 'মজুরি',
      amount: this.amount,
      receivedBy: this.selectedSordar.person.personName,
      remarks: this.remarks,
      sordarAccId: this.selectedSordar.account.id,
      tnxDate:this.tnxDate
    };
    const params: Map<string, any> = new Map();
    params.set('payment', expenseModel);
    this.adminService.doSordarPayment(params).subscribe({
      next:(data)=>{
        //console.log(data.body);
        this.selectedSordar = new Sordar();
        this.amount = 0;
        this.remarks = "";
        this.userService.showMessage("SUCCEESS!","Payment Complete","OK",2000);
      },
      error:(err)=>{
        //console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
}
