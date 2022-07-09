import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Urls } from '../constant/urls.const';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http:HttpClient) { }


  public approveInvoice(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("invoice"))
    return this.http.post(Urls.APPROVE_INVOICE,queryParams.get("invoice"));
  }
  public addUser(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("user"))
    return this.http.post(Urls.CREATE_USER,queryParams.get("user"));
  }
}
