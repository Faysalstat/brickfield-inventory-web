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
  constructor(
    private userService:UserService,
    private snackBar: MatSnackBar
  ) {
    this.mills = [
      { label: 'Select mill name', value: '' },
      { label: '১নং পাগ মিল', value: '১নং পাগ মিল' },
      { label: '১নং অটো মিল', value: '১নং অটো মিল' },
      { label: '২নং অটো মিল', value: '২নং অটো মিল' },
    ];
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
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
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
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
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
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
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
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
      },
    })
  }
  addRawProduction() {
    
    // this.dailyProductionList.push(this.selectedBrickProduction);
    console.log(" data submitted ")
    if(!this.selectedBrickProduction){
      return
    }
    this.selectedBrickProduction.sordarName = this.selectedSordar.person.personName;
    this.selectedBrickProduction.sordarId = this.selectedSordar.id;
    const params: Map<string, any> = new Map();
    params.set('rawbrick', this.selectedBrickProduction);
    this.userService.addRawStock(params).subscribe({
      next:(data)=>{
        this.dailyProductionList  = data.body;
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
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
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
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
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
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
      },
      error:(err)=>{
        this.snackBar.open(err, "Close it", {
          duration: 10000,
          horizontalPosition:'right',
          verticalPosition: 'top'
        });
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
        window.alert("Sordars Fetching Failed");
      }
    })
  }
}
