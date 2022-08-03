import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Urls } from '../constant/urls.const';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http:HttpClient) { }


  public approveTask(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("invoice"))
    return this.http.post(Urls.CREATE_INVOICE,queryParams.get("invoice"));
  }

  public declineTask(queryParams: Map<string,any>): Observable<any>{
    console.log(queryParams.get("taskId"))
    return this.http.post(Urls.DELETE_TASK,queryParams.get("taskId"));
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
}
