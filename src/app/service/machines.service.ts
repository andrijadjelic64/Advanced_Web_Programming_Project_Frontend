import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Machine} from "../model/machine";

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  private apiUrl = environment.postApi

  private readonly getAllMachinesUrl = this.apiUrl + '/api/machines/all';
  private readonly startMachineUrl = this.apiUrl + '/api/machines/start';
  private readonly stopMachineUrl = this.apiUrl + '/api/machines/stop';
  private readonly restartMachineUrl = this.apiUrl + '/api/machines/restart';
  private readonly createMachineUrl = this.apiUrl + '/api/machines/create';
  private readonly destroyMachineUrl = this.apiUrl + '/api/machines/destroy';

  private readonly scheduleStartMachineUrl = this.apiUrl + '/api/schedule/start';
  private readonly scheduleStopMachineUrl = this.apiUrl + '/api/schedule/stop';
  private readonly scheduleRestartMachineUrl = this.apiUrl + '/api/schedule/restart';


  constructor(private httpClient: HttpClient) { }


  getAllMachines(jwt: string,name:string| null,status:string| null): Observable<Machine[]> {

    let params = new HttpParams();
    if(name!==null){
      params = params.append("name", name + '')
    }
    if(status!==null){
      params = params.append("status", status + '')
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      }),
      params: params

    };
    debugger;
    return this.httpClient.get<Machine[]>(this.getAllMachinesUrl,httpOptions);
  }

  startMachine(jwt: string,machineId:number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      }),
    };

    return this.httpClient.get(`${this.startMachineUrl}/${machineId}`,httpOptions);

  }
  stopMachine(jwt: string,machineId:number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      }),
    };

    return this.httpClient.get(`${this.stopMachineUrl}/${machineId}`,httpOptions);

  }
  restartMachine(jwt: string,machineId:number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      }),
    };
    return this.httpClient.get(`${this.restartMachineUrl}/${machineId}`,httpOptions);
  }
  destroyMachine(jwt: string,machineId:number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      }),
    };

    return this.httpClient.get(`${this.destroyMachineUrl}/${machineId}`,httpOptions);

  }
  createMachine(jwt: string, name:string,active:boolean): Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      })
    };
    const httpBody = {
      name:name,
      active:active
    }
    return this.httpClient.post<User>(this.createMachineUrl,httpBody, httpOptions);
  }

  scheduleStart(jwt: string, machineId: number, date: string | null): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      }),
    };

    return this.httpClient.get(`${this.scheduleStartMachineUrl}/${machineId}?date=${date}`,httpOptions);
  }

  scheduleStop(jwt: string, machineId: number, date: string | null): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      }),
    };

    return this.httpClient.get(`${this.scheduleStopMachineUrl}/${machineId}?date=${date}`,httpOptions);
  }

  scheduleRestart(jwt: string, machineId: number, date: string | null): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      }),
    };

    return this.httpClient.get(`${this.scheduleRestartMachineUrl}/${machineId}?date=${date}`,httpOptions);
  }
}
