import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brick, RawBrickProduction, Sordar } from '../../model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.css'],
})
export class StockManagementComponent implements OnInit {
  selectedMill!: string;
  mills = [{ label: 'Select mill name', value: '' }];
  rawProductionReport!:any;
  loadUnloadReport!:any;
  selectedBrickProduction: RawBrickProduction = new RawBrickProduction();
  dailyProductionList!: RawBrickProduction[];
  totalRawProduction: number = 0;
  previousLoadQuantity: number = 0;
  latestLoadQuantity: number = 0;
  totalLoadQuantity: number = 0;
  loadingDate: Date = new Date();
  sordarloadingDate: Date = new Date();
  unloadQuantity: number = 0;
  loadComment!: string;
  bricks!: Brick[];
  sordars!: Sordar[];
  selectedBrick!:Brick;
  rawStockList!:[];
  loadedReserve!:number;
  totalBricks!:number;
  totalStockValue!:number;
  selectedSordar!: Sordar;
  selectedLoadSordar!: Sordar;
  loadType: any[];
  selectedLoadType!:any;
  totalSordarLoad!:number;
  constructor(
    private userService:UserService
  ) {
    this.mills = [
      { label: 'Select mill name', value: '' },
      { label: '১নং পাগ মিল', value: '১নং পাগ মিল' },
      { label: '১নং অটো মিল', value: '১নং অটো মিল' },
      { label: '২নং অটো মিল', value: '২নং অটো মিল' },
    ];
    this.loadType = [
      { label: 'Select type', value: '' },
      { label: 'লোড', value: 'LOAD' },
      { label: 'আনলোড', value: 'UNLOAD' },
    ]
    this.dailyProductionList = [];
    this.rawStockList = [];
  }

  ngOnInit(): void {
    this.fetchBricks();
    this.fetchSordarList();
    this.fetchRawStock();
    this.fetchRawStockReport();
    this.fetchLoadUnloadReport();
  }
  fetchBricks() {
    this.userService.fetchBricks().subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.body) {
          this.totalBricks = 0;
          this.totalStockValue = 0;
          this.bricks = res.body;
          this.bricks.map((brick:any)=>{
            brick.unloadQuantity = 0;
            brick.updatedTotalQuantity= 0;
            this.totalBricks += brick.quantity;
            this.totalStockValue += (brick.quantity*brick.pricePerPiece);
          });
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
    });
  }

  fetchRawStock(){
    this.userService.fetchRawBricks().subscribe({
      next: (res) => {
        console.log(res);
        if (res.body) {
          this.dailyProductionList = res.body;
          this.calculateTotalRawProduction();
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Raw Stock Fetching Operation Failed" + err.message,"OK",2000);
      },
    });
  }
  fetchRawStockReport(){
    this.userService.fetchRawStockReport().subscribe({
      next: (res)=>{
        console.log(res.body);
        this.rawProductionReport = res.body;

      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Raw Stock Report FEtching Operation Failed" + err.message,"OK",2000);
      },
    })
  }
  fetchLoadUnloadReport(){
    this.userService.fetchLoadUnloadReport().subscribe({
      next: (res)=>{
        console.log(res.body);
        this.loadUnloadReport = res.body;
        this.loadedReserve = this.loadUnloadReport.loadStock - this.loadUnloadReport.unloadStock;

      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Load Unload Report Fetching Operation Failed" + err.message,"OK",2000);
      },
    })
  }
  addRawProduction() {
    
    // this.dailyProductionList.push(this.selectedBrickProduction);
    console.log(" data submitted ")
    if(!this.selectedBrickProduction){
      return
    }
    this.selectedBrickProduction.sordar = this.selectedSordar;
    const params: Map<string, any> = new Map();
    params.set('rawbrick', this.selectedBrickProduction);
    this.userService.addRawStock(params).subscribe({
      next:(data)=>{
        this.dailyProductionList  = data.body;
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete:()=>{
        this.fetchRawStock();
        this.fetchRawStockReport();
      }
    })
    this.selectedBrickProduction = new RawBrickProduction();
    this.selectedSordar = new Sordar();
    this.calculateTotalRawProduction();
  }

  loadRawProduction(){
    let rawLoadModel = {
      category : "RAW_BRICK",
      quantity : this.latestLoadQuantity,
      comment: this.loadComment,
      productionDate: this.loadingDate,
      type: "LOAD"
    }
    console.log(rawLoadModel);
    const params: Map<string, any> = new Map();
    params.set("load",rawLoadModel);

    this.userService.LoadProduction(params).subscribe({
      next:(loadRes)=>{
        console.log(loadRes);
        this.latestLoadQuantity=0;
        this.loadingDate= new Date();
        this.fetchRawStockReport();
        this.fetchLoadUnloadReport();
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
    })
    
  }

  deleteRawProduction(production:RawBrickProduction ) {
    const params: Map<string, any> = new Map();
    params.set('deleteload',production);
    this.userService.deleteLoadProductionItem(params).subscribe({
      next:(res)=>{
        window.alert("item deleted");
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
    })
  }

  calculateTotalRawProduction() {
    this.dailyProductionList.forEach((product) => {
      this.totalRawProduction += product.quantity;
    });
  }
  onChnageBrick(){

  }
  addUnloadBricks(i:number){
    console.log(this.bricks);
    let unloadModel = this.bricks[i];
    unloadModel.type = "UNLOAD";
    console.log(unloadModel);
    const params: Map<string, any> = new Map();
    params.set("unload",unloadModel);

    this.userService.UnloadProduction(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.userService.showMessage("Success!","Brick Uploaded","OK",2000);
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete:()=>{
        this.fetchBricks();
        this.fetchLoadUnloadReport();
      }
    })

  }
  editStock(i:number){

  }
  onUnloadQuantityAdded(i:number){
    this.bricks[i].updatedTotalQuantity = this.bricks[i].unloadQuantity + this.bricks[i].quantity;
  }
  fetchSordarList(){
    this.userService.fetchAllSordars().subscribe({
      next:(res)=>{
        this.sordars = res.body;
        console.log(res);
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Sordar Fetching Operation Failed" + err.message,"OK",2000);
      }
    })
  }
  addSordarRecord(){
    let record = {
      sordarId: this.selectedLoadSordar.id,
      category: this.selectedLoadType,
      date: this.sordarloadingDate,
      quantity: this.totalSordarLoad

    };
    const params: Map<string, any> = new Map();
    params.set("record",record);
    this.userService.addSordarRecord(params).subscribe({
      next:(res)=>{
        console.log(res);
        this.selectedLoadSordar = new Sordar();
        this.selectedLoadType = '';
        this.sordarloadingDate = new Date();
        this.totalSordarLoad = 0
      },
      error:(err)=>{
        console.log(err.message);
        this.userService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      }
    })
  }
}
