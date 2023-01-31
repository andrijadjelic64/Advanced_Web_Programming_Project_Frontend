import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DomaciFront3';
  loggedIn=false;

  constructor(private loginService:LoginService) {
  }

  ngOnInit(): void {
  }

  logged(): boolean {
    return localStorage.getItem('jwt') !== null;
  }
  logOut(){
    this.loginService.logOut();
  }

}
