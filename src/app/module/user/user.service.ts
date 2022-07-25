import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Urls} from '../constant/urls.const';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) { }

 
  public addCustomer(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("customer"))
    return this.http.post(Urls.CREATE_CUSTOMER,queryParams.get("customer"));
  }

  public addDriver(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("driver"))
    return this.http.post(Urls.CREATE_DRIVER,queryParams.get("driver"));
  }
  public addSordar(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("sordar"))
    return this.http.post(Urls.CREATE_SORDAR,queryParams.get("sordar"));
  }
  public addRawStock(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("rawbrick"))
    return this.http.post(Urls.CREATE_RAW_STOCK,queryParams.get("rawbrick"));
  }
  public addSupplyer(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("supplyer"))
    return this.http.post(Urls.CREATE_SUPPLYER,queryParams.get("supplyer"));
  }
  public setDelivery(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("schedule"))
    return this.http.post(Urls.SET_DELIVERY,queryParams.get("schedule"));
  }
  public createInvoice(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("invoice"))
    return this.http.post(Urls.CREATE_INVOICE,queryParams.get("invoice"));
  }
  public createScheduleOrder(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("schedules"))
    return this.http.post(Urls.CREATE_SCHEDULE_DELIVERY,queryParams.get("schedules"));
  }
  public createOrder(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("orders"))
    return this.http.post(Urls.CREATE_ORDER,queryParams.get("orders"));
  }
  public createApproval(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("approval"))
    return this.http.post(Urls.SEND_TO_APPROVAL,queryParams.get("approval"));
  }

  


  // FETCING DATA API 
  public fetchAllDrivers(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_DRIVERS);
  }
  public fetchAllSordars(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_SORDARS);
  }
  public fetchAllProducts(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_PRODUCTS);
  }
  public fetchAllSchedulesByStatus(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_SCHEDULES_BY_STATUS);
  }
  public fetchAllSchedulesByDate(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_SCHEDULES_BY_DATE);
  }

  public fetchAllCustomer(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_CUSTOMER);
  }
  public fetchPaymentDueList(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_DUE_PAYMENT_ACCOUNTS);
  }
  public fetchAllSupplyers(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_SUPPLYER);
  }
  public fetchAllPendingInvoice(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_PENDING_INVOICE);
  }
  
  public fetchAllInvoice(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_INVOICE);
  }
  public fetchInvoiceById(id:any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id",id);
    return this.http.get(Urls.FETCH_INVOICE_BY_ID,{params:params});
  }
  public fetchScheduleById(id:any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id",id);
    return this.http.get(Urls.FETCH_SCHEDULE_BY_ID,{params:params});
  }
  public fetchCustomerById(id:any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id",id);
    return this.http.get(Urls.FETCH_CUSTOMER_BY_ID,{params:params});
  }
  public getCustomerByContactNo(contactNo:string): Observable<any>{
    let params = new HttpParams();
    params = params.append("contactNo",contactNo);
    return this.http.get(Urls.FETCH_CUSTOMER_BY_CONTACTNO,{params:params});
  }
  public getAccountById(id:string): Observable<any>{
    let params = new HttpParams();
    params = params.append("id",id);
    return this.http.get(Urls.FETCH_ACCOUNT_BY_ID,{params:params});
  }
  public fetchBricks(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_BRICK);
  }
  public fetchRawBricks(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_RAW_BRICK);
  }

  public fetchRawStockReport(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_RAW_PRODUCTION_REPORT);
  }
  public fetchTransportCategories(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_TRANSPORT_CATEGORY);
  }

  public fetchExpenseCategories(): Observable<any>{
    return this.http.get(Urls.FETCH_EXPENSE_CATEGROY);
  }


  // UPDATE 
  public updateInvoice(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("invoice"))
    return this.http.post(Urls.UPDATE_INVOICE,queryParams.get("invoice"));
  }
  public updateAccount(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("account"))
    return this.http.post(Urls.UPDATE_BALANCE,queryParams.get("account"));
  }
  
  

// Delete 
public deleteCustomer(queryParams: Map<string,any>): Observable<any>{
  console.log(queryParams.get("customer"))
  return this.http.post(Urls.DELETE_CUSTOMER,queryParams.get("customer"));
}
public deleteDriver(queryParams: Map<string,any>): Observable<any>{
  console.log(queryParams.get("driver"))
  return this.http.post(Urls.DELETE_CUSTOMER,queryParams.get("driver"));
}
public deleteOrder(queryParams: Map<string,any>): Observable<any>{
  console.log(queryParams.get("order"))
  return this.http.post(Urls.DELETE_ORDER,queryParams.get("order"));
}
public deleteSchedule(queryParams: Map<string,any>): Observable<any>{
  console.log(queryParams.get("schedule"))
  return this.http.post(Urls.DELETE_SCHEDULE,queryParams.get("schedule"));
}

public fetchDueAmountInvoiceList(): Observable<any>{
  return this.http.get(Urls.FETCH_ALL_DUE_INVOICE);
}

public getRegistryReport():Observable<any>{
  return this.http.get(Urls.FETCH_REGISTER_SUMMARY);
}

}
