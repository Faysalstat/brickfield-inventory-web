import { Component, OnInit } from '@angular/core';
import { Sordar } from '../../model';
import { ReportExportService } from '../../report-export.service';
import { UserService } from '../../user/user.service';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-sordar-record-report',
  templateUrl: './sordar-record-report.component.html',
  styleUrls: ['./sordar-record-report.component.css']
})
export class SordarRecordReportComponent implements OnInit {
  recordList!:any[];
  offset = 0;
  limit = 10;
  exportData!:any[];
  queryBody:any;
  selectedSordar:string = ''; 
  slectedRound: number = 0 ;
  selectedCategory:string = '';
  sordars!:Sordar[];
  categories!:any[];
  constructor(
    private reportService:ReportService,
    private reportExportService: ReportExportService,
    private userService:UserService
  ) {
    this.recordList = [];
    this.exportData = [];
    this.queryBody = {
      sordar:this.selectedSordar,
      category:""
    }
      
    this.categories = [
      { label: 'Select Category', value: '' },
      { label: '১নং পাগ মিল', value: '১নং পাগ মিল' },
      { label: '১নং অটো মিল', value: '১নং অটো মিল' },
      { label: '২নং অটো মিল', value: '২নং অটো মিল' },
      { label: 'লোড', value: 'LOAD' },
      { label: 'আনলোড', value: 'UNLOAD' },
    ]
   }

  ngOnInit(): void {
    this.fetchSordarProdReport();
    this.fetchSordarList();
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
  fetchSordarProdReport() {
    this.exportData = [];
    const params: Map<string, any> = new Map();
    this.queryBody.sordarId = this.selectedSordar
    this.queryBody.category = this.selectedCategory;
    this.queryBody.roundNo = this.slectedRound;
    params.set('query',this.queryBody)
    //console.log();
    this.reportService.fetchSordarProductionReport(params).subscribe({
      next: (datares) => {
        // this.expenseReasons = [];
        //console.log(datares);
        this.recordList = datares.body;
        let index = 0;
        this.exportData =[];
        this.recordList.map((elem)=>{
          index++;
          let sorProdRec = {
            sn: index,
            SordarName: elem.sordar.person.personName,
            CategoryName: elem.category,
            Quantity: elem.quantity,
            ProductionDate: elem.date

          }
          this.exportData.push(sorProdRec);
        })
        this.selectedSordar = '';
        this.selectedCategory ='';
      },
      error:(err)=>{
        //console.log(err);
        this.recordList = [];
      }
    });
  }
  nextPage() {
    // this.tnxIndex+=
    this.offset += 5;
    this.fetchSordarProdReport();
  }
  previousPage() {
    if (this.offset > 5) {
      this.offset = this.limit + 5;
      this.fetchSordarProdReport();
    } else {
      return;
    }
  }
  async export(){
    this.reportExportService.exportAsExcelFile(this.exportData, 'Sordar_Production_Report')
  }
  fetchReport(){
      this.fetchSordarProdReport();
  }
}
