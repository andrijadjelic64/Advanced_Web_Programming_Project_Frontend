import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "../model/login-request";
import {Observable} from "rxjs";
import {LoginResponse} from "../model/login-response";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.postApi
  private readonly getAllUsersUrl = this.apiUrl + '/api/users/all';
  private readonly updateUserUrl = this.apiUrl + '/api/users/update';
  private readonly createUserUrl = this.apiUrl + '/api/users/create';
  private readonly deleteUserUrl = this.apiUrl + '/api/users';

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(jwt: string): Observable<User[]> {
    // const httpBody = {
    //   email: loginRequest.email,
    //   password: loginRequest.password
    // }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.httpClient.get<User[]>(this.getAllUsersUrl,httpOptions);

    // const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
    //
    // return this.httpClient.post<Token>(this.loginUrl,httpBody,{headers: headers});
  }
  // createUser(loginRequest: LoginRequest): Observable<Token> {
  //   const httpBody = {
  //     email: loginRequest.email,
  //     password: loginRequest.password
  //   }
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json; charset=utf-8'
  //     })
  //   };
  //   return this.httpClient.post<Token>(this.loginUrl,httpBody,httpOptions);
  //
  //   // const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
  //   //
  //   // return this.httpClient.post<Token>(this.loginUrl,httpBody,{headers: headers});
  // }

  updateUser(jwt: string, userId:number, firstName:string,lastName:string,email:string, permissions:string[]): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      })
    };
    const httpBody = {
      userId: userId,
      firstName:firstName,
      lastName:lastName,
      email:email,
      permissions:permissions
    }
    return this.httpClient.put<User>(this.updateUserUrl,httpBody, httpOptions);
  }

  createUser(jwt: string, firstName:string,lastName:string,email:string, password:string,permissions:string[]): Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${jwt}`
      })
    };
    const httpBody = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password,
      permissions:permissions
    }
    return this.httpClient.post<User>(this.createUserUrl,httpBody, httpOptions);
  }

  deleteUser(jwt: string, userId:number): Observable<User>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    return this.httpClient.delete<User>(`${this.deleteUserUrl}/${userId}`, httpOptions);
  }
}
