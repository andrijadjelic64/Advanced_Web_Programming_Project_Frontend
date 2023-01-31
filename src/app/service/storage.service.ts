import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Permission} from "../model/permission";
import {Machine} from "../model/machine";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _selectedUser:User;
  private _selectedMachine:Machine;

  constructor() { }



  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);

  }


  get selectedMachine(): Machine {
    return this._selectedMachine;
  }

  set selectedMachine(value: Machine) {
    this._selectedMachine = value;
  }

  get selectedUser(): User {
    return this._selectedUser;
  }

  set selectedUser(value: User) {
    this._selectedUser = value;
  }

  public getData(key: string) {
    return localStorage.getItem(key)!.toString();
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

}
