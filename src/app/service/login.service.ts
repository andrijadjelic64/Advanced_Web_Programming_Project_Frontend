import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../model/login-response";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = false;
  private apiUrl = environment.postApi
  private readonly loginUrl = this.apiUrl + '/auth/login';
  constructor(private httpClient: HttpClient,
              private storageService: StorageService) {}


  // private httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json;charset=utf-8', 'Accept': 'application/json'}),
  //   responseType: 'text' as 'json'
  // };

  getJwt(loginRequest: LoginRequest): Observable<LoginResponse> {
    this.storageService.removeData('jwt')
    this.storageService.removeData("canReadUsers")
    this.storageService.removeData("canCreateUsers")
    this.storageService.removeData("canUpdateUsers")
    this.storageService.removeData("canDeleteUsers")
    const httpBody = {
      email: loginRequest.email,
      password: loginRequest.password
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8'
      })
    };
    return this.httpClient.post<LoginResponse>(this.loginUrl,httpBody,httpOptions);

    // const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
    //
    // return this.httpClient.post<Token>(this.loginUrl,httpBody,{headers: headers});
  }

  logOut(){
    this.storageService.removeData('jwt')
    this.storageService.removeData("canReadUsers")
    this.storageService.removeData("canCreateUsers")
    this.storageService.removeData("canUpdateUsers")
    this.storageService.removeData("canDeleteUsers")
    this.setLoggedInStance(false);
  }
  setLoggedInStance(stance:boolean){
    this.loggedIn=stance;
  }

  // getJwt(loginRequest: LoginRequest)Observable<Token>{
  //   return this.httpClient.post<Token>(this.loginUrl, loginRequest, {observe: 'response', responseType: 'text' as 'json' })
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  //
  // return this.httpClient.post<any>(this.loginUrl, loginRequest, {observe: 'response', responseType: 'text' as 'json' })
  //   .subscribe((res: HttpResponse<any>) => {
  //     debugger;
  //     localStorage.setItem('access_token', res.headers.get('access_token'));
  // }
}
