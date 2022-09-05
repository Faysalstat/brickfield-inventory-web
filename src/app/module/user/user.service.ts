import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Urls} from '../constant/urls.const';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  public showMessage(title:string,msg:string,close:string,timer:number){
      return Swal.fire({
        title: title,
        text: msg,
        confirmButtonText: close,
        timer: timer
      });
  }
  public addCustomer(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('customer'));
    return this.http.post(Urls.CREATE_CUSTOMER, queryParams.get('customer'));
  }

  public addDriver(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('driver'));
    return this.http.post(Urls.CREATE_DRIVER, queryParams.get('driver'));
  }
  public addSordar(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('sordar'));
    return this.http.post(Urls.CREATE_SORDAR, queryParams.get('sordar'));
  }
  public addRawStock(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('rawbrick'));
    return this.http.post(Urls.CREATE_RAW_STOCK, queryParams.get('rawbrick'));
  }
  public addSupplyer(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('supplyer'));
    return this.http.post(Urls.CREATE_SUPPLYER, queryParams.get('supplyer'));
  }
  public setDelivery(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('schedule'));
    return this.http.post(Urls.SET_DELIVERY, queryParams.get('schedule'));
  }
  public createInvoice(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('invoice'));
    return this.http.post(Urls.CREATE_INVOICE, queryParams.get('invoice'));
  }
  public createScheduleOrder(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('schedules'));
    return this.http.post(
      Urls.CREATE_SCHEDULE_DELIVERY,
      queryParams.get('schedules')
    );
  }
  public createOrder(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('orders'));
    return this.http.post(Urls.CREATE_ORDER, queryParams.get('orders'));
  }
  public createApproval(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('approval'));
    return this.http.post(Urls.SEND_TO_APPROVAL, queryParams.get('approval'));
  }

  // FETCING DATA API
  public fetchAllDrivers(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('offset'));
    return this.http.get(Urls.FETCH_ALL_DRIVERS,{params:params});
  }
  public fetchAllSordars(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_SORDARS);
  }
  public fetchAllProducts(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_PRODUCTS);
  }
  public fetchAllSchedulesByStatus(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_SCHEDULES_BY_STATUS);
  }
  public fetchAllSchedulesByDate(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_SCHEDULES_BY_DATE);
  }

  public fetchAllCustomer(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('offset'));
    return this.http.get(Urls.FETCH_ALL_CUSTOMER,{params:params});
  }
  public fetchPaymentDueList(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_DUE_PAYMENT_ACCOUNTS);
  }
  public fetchAllSupplyers(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('offset'));
    return this.http.get(Urls.FETCH_ALL_SUPPLYER,{params:params});
  }
  public fetchAllPendingInvoice(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_PENDING_INVOICE);
  }

  public fetchAllInvoice(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('query').offset);
    params = params.append('limit',queryParams.get('query').limit);
    params = params.append('contactNo',queryParams.get('query').contactNo);
    params = params.append('invoiceNo',queryParams.get('query').invoiceNo);
    params = params.append('doNo',queryParams.get('query').doNo);
    params = params.append('deliveryStatus',queryParams.get('query').deliveryStatus);
    return this.http.get(Urls.FETCH_ALL_INVOICE,{params:params});
  }

  public fetchAllSupplyInvoice(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('offset'));
    params = params.append('productName',queryParams.get('query').productName);
    params = params.append('contactNo',queryParams.get('query').contactNo);
    params = params.append('fromDate',queryParams.get('query').fromDate);
    params = params.append('toDate',queryParams.get('query').toDate);
    return this.http.get(Urls.FETCH_ALL_SUPPLY_INVOICE,{params:params});
  }
  public fetchInvoiceById(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(Urls.FETCH_INVOICE_BY_ID, { params: params });
  }
  public fetchSupplyInvoiceById(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(Urls.FETCH_SUPPLY_INVOICE_BY_ID, { params: params });
  }
  public fetchScheduleById(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(Urls.FETCH_SCHEDULE_BY_ID, { params: params });
  }
  public fetchCustomerById(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(Urls.FETCH_CUSTOMER_BY_ID, { params: params });
  }
  public fetchSupplyerById(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(Urls.FETCH_SUPPLYER_BY_ID, { params: params });
  }
  public getCustomerByContactNo(contactNo: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('contactNo', contactNo);
    return this.http.get(Urls.FETCH_CUSTOMER_BY_CONTACTNO, { params: params });
  }
  public getAccountById(id: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(Urls.FETCH_ACCOUNT_BY_ID, { params: params });
  }
  public getUserById(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(Urls.FETCH_USER_BY_ID, { params: params });
  }
  public fetchBricks(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_BRICK);
  }
  public fetchBrickById(id: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(Urls.FETCH_BRICK_BY_ID, { params: params });
  }
  public fetchRawBricks(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_RAW_BRICK);
  }

  public fetchRawStockReport(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_RAW_PRODUCTION_REPORT);
  }
  public fetchLoadUnloadReport(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_LOAD_UNLOAD_REPORT);
  }
  public fetchTransportCategories(): Observable<any> {
    return this.http.get(Urls.FETCH_ALL_TRANSPORT_CATEGORY);
  }
  
  public fetchExpenseCategories(type:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('type',type);
    return this.http.get(Urls.FETCH_EXPENSE_CATEGROY, { params: params });
  }
  public fetchExpenseReasons(category:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('category',category);
    return this.http.get(Urls.FETCH_EXPENSE_REASONS_BY_CATEGROY, { params: params });
  }
  public fetchAllTransByPage(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('query').offset);
    params = params.append('category',queryParams.get('query').category);
    params = params.append('reason',queryParams.get('query').reason);
    params = params.append('type',queryParams.get('query').type);
    params = params.append('glType',queryParams.get('query').glType);
    params = params.append('fromDate',queryParams.get('query').fromDate);
    params = params.append('toDate',queryParams.get('query').toDate);
    return this.http.get(Urls.FETCH_ALL_TRANSACTION, { params: params });
  }
  public fetchDueAmountInvoiceList(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('offset'));
    return this.http.get(Urls.FETCH_ALL_DUE_INVOICE,{ params: params });
  }
  public fetchGLAccountBalance(type: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.http.get(Urls.FETCH_GL_ACCOUNT_BY_TYPE, { params: params });
  }
  public fetchEscavatorDuePaymentList(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('offset'));
    return this.http.get(Urls.FETCH_ESCAVATOR_DUE_LIST,{ params: params });
  }

  
  
  // UPDATE
  public updateInvoice(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('invoice'));
    return this.http.post(Urls.UPDATE_INVOICE, queryParams.get('invoice'));
  }
  public updateSupplyInvoice(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('supplyInvoice'));
    return this.http.post(Urls.UPDATE_SUPPLY_INVOICE, queryParams.get('supplyInvoice'));
  }
  public updateAccount(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('account'));
    return this.http.post(Urls.UPDATE_BALANCE, queryParams.get('account'));
  }
  public changePassword(queryParams: Map<string, any>): Observable<any> {
    
    return this.http.post(Urls.UPDATE_USER,queryParams.get('user'));
  }

  public UnloadProduction(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('unload'));
    return this.http.post(Urls.UNLOAD_PRODUCTION, queryParams.get('unload'));
  }
  public LoadProduction(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('load'));
    return this.http.post(Urls.LOAD_PRODUCTION, queryParams.get('load'));
  }
  public deleteLoadProductionItem(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('deleteload'));
    return this.http.post(Urls.DELETE_LOAD_PRODUCTION, queryParams.get('deleteload'));
  }

  public doExpense(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('expense'));
    return this.http.post(Urls.DO_EXPENSE, queryParams.get('expense'));
  }

  public doDepositToFactoryGL(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('deposit'));
    return this.http.post(Urls.DO_DEPOSIT, queryParams.get('deposit'));
  }
  
  public payEscavatorBill(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('escavator'));
    return this.http.post(Urls.PAY_ESCAVATOR, queryParams.get('escavator'));
  }
  public addSordarRecord(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('record'));
    return this.http.post(Urls.ADD_SORDAR_RECORD, queryParams.get('record'));
  }
  
  // Delete
  public deleteCustomer(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('customer'));
    return this.http.post(Urls.DELETE_CUSTOMER, queryParams.get('customer'));
  }
  public deleteDriver(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('driver'));
    return this.http.post(Urls.DELETE_CUSTOMER, queryParams.get('driver'));
  }
  public deleteOrder(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('order'));
    return this.http.post(Urls.DELETE_ORDER, queryParams.get('order'));
  }
  public deleteSchedule(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('schedule'));
    return this.http.post(Urls.DELETE_SCHEDULE, queryParams.get('schedule'));
  }

 
  
  public getRegistryReport(): Observable<any> {
    return this.http.get(Urls.FETCH_REGISTER_SUMMARY);
  }

  
}
