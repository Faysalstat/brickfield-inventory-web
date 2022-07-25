import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Urls} from './constant/urls.const';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( private http:HttpClient) { }

  
  public fetchPaymentDueList(): Observable<any>{
    return this.http.get(Urls.FETCH_ACCOUNT_BY_ID);
  }
}
