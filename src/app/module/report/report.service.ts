import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../constant/urls.const';
import Swal from 'sweetalert2';
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
  public fetchDeliveryReport(): Observable<any> {
    return this.http.get(Urls.FETCH_DELIVERY_REPORT);
  }
  public fetchSordarProductionReport(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('query').offset);
    params = params.append('category',queryParams.get('query').category);
    params = params.append('sordar',queryParams.get('query').sordarId);
    params = params.append('roundNo',queryParams.get('query').roundNo);
    return this.http.get(Urls.FETCH_ALL_SORDARS_PRODUCTION_REPORT, { params: params });
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
