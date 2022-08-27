import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Urls } from '../constant/urls.const';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http:HttpClient) { }


  public approveSaleTask(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("invoice"))
    return this.http.post(Urls.CREATE_INVOICE,queryParams.get("invoice"));
  }
  public paySalary(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("salary"))
    return this.http.post(Urls.PAY_SALARY,queryParams.get("salary"));
  }
  public doOfficeExpense(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("expense"))
    return this.http.post(Urls.OFFICE_EXPENSE,queryParams.get("expense"));
  }
  public addExpenseCategory(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("category"))
    return this.http.post(Urls.ADD_EXPENSE_CATEORY,queryParams.get("category"));
  }
  public doSordarPayment(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("payment"))
    return this.http.post(Urls.SORDAR_PAYMENT,queryParams.get("payment"));
  }
  public approveHandOverTask(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("handover"))
    return this.http.post(Urls.PAY_OWNER,queryParams.get("handover"));
  }
  public approveSupplyTask(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("supplyInvoice"))
    return this.http.post(Urls.CREATE_SUPPLY_INVOICE,queryParams.get("supplyInvoice"));
  }

  public declineTask(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("model"))
    return this.http.post(Urls.DECLINE_TASK,queryParams.get("model"));
  }

  public addUser(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("user"))
    return this.http.post(Urls.CREATE_USER,queryParams.get("user"));
  }

  public fetchAllTask(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_TASK);
  }
  public fetchTaskById(id:any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id",id);
    return this.http.get(Urls.FETCH_TASK_BY_ID,{params:params});
  }
  public checkExistingUser(username:string):Observable<any>{
    let params = new HttpParams();
    params = params.append("username",username);
    return this.http.get(Urls.FETCH_USER_BY_NAME,{params:params});
  }
  public fetchLoadUnloadHistory(queryParams: Map<string, any>): Observable<any>{
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('query').offset);
    params = params.append('type',queryParams.get('query').type);
    params = params.append('fromDate',queryParams.get('query').fromDate);
    params = params.append('toDate',queryParams.get('query').toDate);
    return this.http.get(Urls.FETCH_LOAD_UNLOAD_HISTORY,{params:params});
  }
  public getIncomeExpenseSummary(): Observable<any> {
    return this.http.get(Urls.FETCH_INCOME_EXPENSE_REPOST);
  }
  public fetchTotalRebate(): Observable<any> {
    return this.http.get(Urls.FETCH_TOTAL_REBATE);
  }
  public showMessage(title:string,msg:string,close:string,timer:number){
    return Swal.fire({
      title: title,
      text: msg,
      confirmButtonText: close,
      timer: timer
    });
}

}
