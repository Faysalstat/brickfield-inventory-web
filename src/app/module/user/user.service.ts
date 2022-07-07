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
  public fetchAllDrivers(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_DRIVERS);
  }


  public addSordar(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("sorder"))
    return this.http.post(Urls.CREATE_DRIVER,queryParams.get("sorder"));
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
  public addSupplyer(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("supplyer"))
    return this.http.post(Urls.CREATE_SUPPLYER,queryParams.get("supplyer"));
  }
  
  public fetchAllCustomer(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_CUSTOMER);
  }
  public fetchAllSupplyers(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_SUPPLYER);
  }
  
  public fetchAllInvoice(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_INVOICE);
  }
  public fetchInvoiceById(id:any): Observable<any>{
    let params = new HttpParams();
    params = params.append("id",id);
    return this.http.get(Urls.FETCH_INVOICE_BY_ID,{params:params});
  }
  public getCustomerByContactNo(contactNo:string): Observable<any>{
    let params = new HttpParams();
    params = params.append("contactNo",contactNo);
    return this.http.get(Urls.FETCH_CUSTOMER_BY_CONTACTNO,{params:params});
  }

  public createInvoice(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("invoice"))
    return this.http.post(Urls.CREATE_INVOICE,queryParams.get("invoice"));
  }
  public updateInvoice(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("invoice"))
    return this.http.post(Urls.UPDATE_INVOICE,queryParams.get("invoice"));
  }
  public updateAccount(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("account"))
    return this.http.post(Urls.UPDATE_BALANCE,queryParams.get("account"));
  }
  public createScheduleOrder(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("schedules"))
    return this.http.post(Urls.CREATE_SCHEDULE_DELIVERY,queryParams.get("schedules"));
  }
  public createOrder(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("orders"))
    return this.http.post(Urls.CREATE_ORDER,queryParams.get("orders"));
  }
  public fetchBricks(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_BRICK);
  }
  public fetchTransportCategories(): Observable<any>{
    return this.http.get(Urls.FETCH_ALL_TRANSPORT_CATEGORY);
  }

// Delete 
public deleteCustomer(queryParams: Map<string,any>): Observable<any>{
  console.log(queryParams.get("customer"))
  return this.http.post(Urls.DELETE_CUSTOMER,queryParams.get("customer"));
}
public deleteOrder(queryParams: Map<string,any>): Observable<any>{
  console.log(queryParams.get("order"))
  return this.http.post(Urls.DELETE_ORDER,queryParams.get("order"));
}
public deleteSchedule(queryParams: Map<string,any>): Observable<any>{
  console.log(queryParams.get("schedule"))
  return this.http.post(Urls.DELETE_SCHEDULE,queryParams.get("schedule"));
}

}
