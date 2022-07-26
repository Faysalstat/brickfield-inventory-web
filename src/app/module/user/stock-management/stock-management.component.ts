import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Brick, RawBrickProduction } from '../../model';
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
  selectedBrickProduction: RawBrickProduction = new RawBrickProduction();
  dailyProductionList!: RawBrickProduction[];
  totalRawProduction: number = 0;
  previousLoadQuantity: number = 0;
  latestLoadQuantity: number = 0;
  totalLoadQuantity: number = 0;
  loadingDate!: Date;
  unloadQuantity: number = 0;
  loadComment!: string;
  bricks!: Brick[];
  selectedBrick!:Brick;
  rawStockList!:[];

  constructor(
    private userService:UserService,
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
    this.fetchRawStock();
    this.fetchRawStockReport();
  }
  fetchBricks() {
    this.userService.fetchBricks().subscribe({
      next: (res) => {
        console.log(res);
        
        if (res.body) {
          this.bricks = res.body;
          this.bricks.map((brick:any)=>{
            brick.unloadQuantity = 0;
            brick.updatedTotalQuantity= 0;
          });
        }
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
    });
  }
  fetchRawStockReport(){
    this.userService.fetchRawStockReport().subscribe({
      next: (res)=>{
        console.log(res.body);
        this.rawProductionReport = res.body;

      }
    })
  }
  addRawProduction() {
    // this.dailyProductionList.push(this.selectedBrickProduction);
    console.log(" data submitted ")
    if(!this.selectedBrickProduction){
      return
    }
    const params: Map<string, any> = new Map();
    params.set('rawbrick', this.selectedBrickProduction);
    this.userService.addRawStock(params).subscribe({
      next:(data)=>{
        this.dailyProductionList  = data.body;
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        this.fetchRawStock();
        this.fetchRawStockReport();
      }
    })
    this.selectedBrickProduction = new RawBrickProduction();
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
      }
    })
    
  }

  deleteRawProduction(i: number) {
    this.dailyProductionList.slice(i);
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
        console.log(err);
        window.alert(err);
      },
      complete:()=>{
        this.fetchBricks();
      }
    })

  }
  editStock(i:number){

  }
  onUnloadQuantityAdded(i:number){
    this.bricks[i].updatedTotalQuantity = this.bricks[i].unloadQuantity + this.bricks[i].quantity;
  }
  
}
