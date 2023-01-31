import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {InteractionService} from "../../shared/interaction.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../service/users.service";
import {Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";
import {permissionsConst} from "../../constants/permissions-const";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  // public selectedUser: User;
  // public selectedAction: string;

  uCanReadUsers: boolean;
  uCanCreateUsers: boolean;
  uCanUpdateUsers: boolean;
  uCanDeleteUsers: boolean;

  uCanSearchMachines: boolean;
  uCanStartMachines: boolean;
  uCanStopMachines: boolean;
  uCanRestartMachines: boolean;
  uCanCreateMachines: boolean;
  uCanDestroyMachines: boolean;

  selectedUser: User;
  selectedPermissions: string[] = [];
  updateUserForm: FormGroup;

  // permissionMap = new Map<string, boolean>([
  //   ["uCanCreateUsers", false],
  //   ["uCanReadUsers", false],
  //   ["uCanUpdateUsers", true],
  //   ["uCanDeleteUsers", false],
  //
  // ]);


  // private subscription1 = new Subscription();
  // constructor(private interactionService: InteractionService) {
  //   this.subscription1 = this.interactionService.edit$.subscribe(
  //     res => {
  //       if (res.name === 'user-detail') {
  //         this.selectedUser = res.object;
  //         this.selectedAction = res.action;
  //       }
  //
  //     }
  //   );
  // }

  constructor(private storageService: StorageService,
              private userService: UsersService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: NgToastService) {

    this.selectedUser = storageService.selectedUser;

    // console.log(this.selectedUser)
    this.uCanReadUsers = this.setCanUserReadUsers()
    this.uCanCreateUsers = this.setCanUserCreateUsers()
    this.uCanUpdateUsers = this.setCanUserUpdateUsers()
    this.uCanDeleteUsers = this.setCanUserDeleteUsers()

    this.uCanSearchMachines = this.setCanUserSearchMachines();
    this.uCanStartMachines = this.setCanUserStartMachines();
    this.uCanStopMachines = this.setCanUserStopMachines();
    this.uCanRestartMachines = this.setCanUserRestartMachines();
    this.uCanCreateMachines = this.setCanUserCreateMachines();
    this.uCanDestroyMachines = this.setCanUserDestroyMachines();

    this.updateUserForm = this.formBuilder.group({
      firstName: [this.selectedUser.firstName, Validators.required],
      lastName: [this.selectedUser.lastName, Validators.required],
      email: [this.selectedUser.email, Validators.required],
    })

  }

  ngOnInit(): void {
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

  submit() {

    this.loadPermissionsToList();
    this.userService.updateUser(this.storageService.getData('jwt'),this.selectedUser.userId,this.updateUserForm.get('firstName')?.value,
      this.updateUserForm.get('lastName')?.value, this.updateUserForm.get('email')?.value,this.selectedPermissions).subscribe(res => {

      this.toast.success({detail:"User has been updated",summary:'SUCCES', duration: 5000});
      this.router.navigate(['/all-users']);
    });

  }



  setCanUserCreateUsers(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_CREATE_USERS)
  }

  setCanUserReadUsers(): boolean {
    // @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_READ_USERS)
  }

  setCanUserUpdateUsers(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_UPDATE_USERS)
  }

  setCanUserDeleteUsers(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_DELETE_USERS)
  }

  setCanUserSearchMachines(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_SEARCH_MACHINES)
  }
  setCanUserStartMachines(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_START_MACHINES)
  }
  setCanUserStopMachines(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_STOP_MACHINES)
  }
  setCanUserRestartMachines(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_RESTART_MACHINES)
  }
  setCanUserCreateMachines(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_CREATE_MACHINES)
  }
  setCanUserDestroyMachines(): boolean {
// @ts-ignore
    return this.selectedUser.permissions.some(x => x.permission === permissionsConst.CAN_DESTROY_MACHINES)
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
