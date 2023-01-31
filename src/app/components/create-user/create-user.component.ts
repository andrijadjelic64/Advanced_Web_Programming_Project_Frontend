import { Component, OnInit } from '@angular/core';
import {permissionsConst} from "../../constants/permissions-const";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../service/storage.service";
import {UsersService} from "../../service/users.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  uCanCreateUsers: boolean;
  uCanReadUsers: boolean;
  uCanUpdateUsers: boolean;
  uCanDeleteUsers: boolean;

  uCanSearchMachines: boolean;
  uCanStartMachines: boolean;
  uCanStopMachines: boolean;
  uCanRestartMachines: boolean;
  uCanCreateMachines: boolean;
  uCanDestroyMachines: boolean;

  selectedPermissions: string[] = [];
  createUserForm: FormGroup;

  constructor(private storageService: StorageService,
              private userService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: NgToastService) {
    this.uCanCreateUsers = false;
    this.uCanReadUsers = false;
    this.uCanUpdateUsers = false;
    this.uCanDeleteUsers = false;

    this.createUserForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }

  submit() {
    this.loadPermissionsToList();
    this.userService.createUser(this.storageService.getData('jwt'), this.createUserForm.get('firstName')?.value,
      this.createUserForm.get('lastName')?.value, this.createUserForm.get('email')?.value,this.createUserForm.get('password')?.value,
      this.selectedPermissions).subscribe(res => {

        this.toast.success({detail:"User has been created",summary:'SUCCES', duration: 5000});
        this.router.navigate(['/all-users']);
    });
  }


  loadPermissionsToList() {
    if(this.uCanCreateUsers){
      this.selectedPermissions.push(permissionsConst.CAN_CREATE_USERS)
    }
    if(this.uCanReadUsers){
      this.selectedPermissions.push(permissionsConst.CAN_READ_USERS)
    }
    if(this.uCanUpdateUsers){
      this.selectedPermissions.push(permissionsConst.CAN_UPDATE_USERS)
    }
    if(this.uCanDeleteUsers){
      this.selectedPermissions.push(permissionsConst.CAN_DELETE_USERS)
    }
    if(this.uCanSearchMachines){
      this.selectedPermissions.push(permissionsConst.CAN_SEARCH_MACHINES)
    }
    if(this.uCanStartMachines){
      this.selectedPermissions.push(permissionsConst.CAN_START_MACHINES)
    }
    if(this.uCanStopMachines){
      this.selectedPermissions.push(permissionsConst.CAN_STOP_MACHINES)
    }
    if(this.uCanRestartMachines){
      this.selectedPermissions.push(permissionsConst.CAN_RESTART_MACHINES)
    }
    if(this.uCanCreateMachines){
      this.selectedPermissions.push(permissionsConst.CAN_CREATE_MACHINES)
    }
    if(this.uCanDestroyMachines){
      this.selectedPermissions.push(permissionsConst.CAN_DESTROY_MACHINES)
    }
    // this.selectedPermissions = this.selectedUser.permissions.map(x => x.permission);
    // console.log(this.permissions)
  }

  toggleCanCreateUsers(): void {
    this.uCanCreateUsers = !this.uCanCreateUsers
  }

  toggleCanReadUsers(): void {
    this.uCanReadUsers = !this.uCanReadUsers
  }

  toggleCanUpdateUsers(): void {
    this.uCanUpdateUsers = !this.uCanUpdateUsers
  }

  toggleCanDeleteUsers(): void {
    this.uCanDeleteUsers = !this.uCanDeleteUsers
  }

  toggleCanSearchMachines(): void {
    this.uCanSearchMachines = !this.uCanSearchMachines
  }
  toggleCanStartMachines(): void {
    this.uCanStartMachines = !this.uCanStartMachines
  }
  toggleCanStopMachines(): void {
    this.uCanStopMachines = !this.uCanStopMachines
  }
  toggleCanRestartMachines(): void {
    this.uCanRestartMachines = !this.uCanRestartMachines
  }
  toggleCanCreateMachines(): void {
    this.uCanCreateMachines = !this.uCanCreateMachines
  }
  toggleCanDestroyMachines(): void {
    this.uCanDestroyMachines = !this.uCanDestroyMachines
  }
}
