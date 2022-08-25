import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../constant/urls.const';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}

  public fetchLoadReport(): Observable<any> {
    return this.http.get(Urls.FETCH_LOAD_REPORT);
  }
  public fetchUnloadReport(): Observable<any> {
    return this.http.get(Urls.FETCH_UNLOAD_REPORT);
  }
  public fetchRawPRoductionReport(): Observable<any> {
    return this.http.get(Urls.FETCH_RAW_PRODUCTION_REPORT);
  }
  public fetchSaleReport(): Observable<any> {
    return this.http.get(Urls.FETCH_SALE_REPORT);
  }
}
