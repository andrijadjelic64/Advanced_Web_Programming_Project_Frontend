import { Component, OnInit } from '@angular/core';
import {LoginRequest} from "../../model/login-request";
import {StorageService} from "../../service/storage.service";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";
import {permissionsConst} from "../../constants/permissions-const";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginRequest!: LoginRequest;

  constructor(private storageService: StorageService,
              private loginService: LoginService,
              private router: Router) {
    this.loginRequest = new LoginRequest();
  }


  ngOnInit(): void {
  }

  submit() {
      this.loginService.getJwt(this.loginRequest).subscribe(res => {
        console.log(res.jwt)
        this.storageService.saveData('jwt',res.jwt)
        if (res.permissions){
          res.permissions.forEach(function (value) {
            console.log(value);
          })
        }else{
          alert("You have no permissions.")
        }
        localStorage.setItem("canCreateUsers",String(res.permissions.some(x => x === permissionsConst.CAN_CREATE_USERS)))
        localStorage.setItem("canReadUsers",String(res.permissions.some(x => x === permissionsConst.CAN_READ_USERS)))
        localStorage.setItem("canUpdateUsers",String(res.permissions.some(x => x === permissionsConst.CAN_UPDATE_USERS)))
        localStorage.setItem("canDeleteUsers",String(res.permissions.some(x => x === permissionsConst.CAN_DELETE_USERS)))

        localStorage.setItem("canSearchMachines",String(res.permissions.some(x => x === permissionsConst.CAN_SEARCH_MACHINES)))
        localStorage.setItem("canStartMachines",String(res.permissions.some(x => x === permissionsConst.CAN_START_MACHINES)))
        localStorage.setItem("canStopMachines",String(res.permissions.some(x => x === permissionsConst.CAN_STOP_MACHINES)))
        localStorage.setItem("canRestartMachines",String(res.permissions.some(x => x === permissionsConst.CAN_RESTART_MACHINES)))
        localStorage.setItem("canCreateMachines",String(res.permissions.some(x => x === permissionsConst.CAN_CREATE_MACHINES)))
        localStorage.setItem("canDestroyMachines",String(res.permissions.some(x => x === permissionsConst.CAN_DESTROY_MACHINES)))


        // let flag1 = String(res.permissions.some(x => x === permissionsConst.CAN_READ_USERS));
        // let flag2 = String(res.permissions.some(x => x === permissionsConst.CAN_CREATE_USERS));
        // let flag3 = String(res.permissions.some(x => x === permissionsConst.CAN_UPDATE_USERS));
        // let flag4 = String(res.permissions.some(x => x === permissionsConst.CAN_DELETE_USERS));
        //
        // let flag11 = Boolean(flag1);
        // let flag22 = Boolean(flag2);
        // let flag33 = Boolean(flag3);
        // let flag44 = Boolean(flag4);


        if (localStorage.getItem('canReadUsers') === 'false' && localStorage.getItem('canCreateUsers') === 'false'
          && localStorage.getItem('canUpdateUsers') === 'false' && localStorage.getItem('canDeleteUsers') === 'false'
          && localStorage.getItem('canSearchMachines') === 'false' && localStorage.getItem('canStartMachines') === 'false'
          && localStorage.getItem('canStopMachines') === 'false' && localStorage.getItem('canRestartMachines') === 'false'
          && localStorage.getItem('canCreateMachines') === 'false' && localStorage.getItem('canDestroyMachines') === 'false') {
          alert("You have no permissions.")
        }else{
          this.router.navigate(['all-users']);
          this.loginService.setLoggedInStance(true);
        }
      });
  }
}
