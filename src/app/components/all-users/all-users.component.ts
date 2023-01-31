import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../../model/user";
import {StorageService} from "../../service/storage.service";
import {UsersService} from "../../service/users.service";
import {Subscription} from "rxjs";
import {InteractionService} from "../../shared/interaction.service";
import {InteractionObject} from "../../shared/interaction-object";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {


  allUsersResponse!: User[];
  canCreatePermission: boolean = false;
  canUpdatePermission: boolean = false;
  canDeletePermission: boolean = false;


  // @Output() allUsersEvent = new EventEmitter();

  // private domainName = 'user-detail'; // default name sent as subscription
  // public selectedObj: any;
  // public selectedAction!: string;


  // private subscription1 = new Subscription();

  constructor(private storageService: StorageService,
              private usersService:UsersService,
              private interactionService: InteractionService,
              private router: Router,
              private toast: NgToastService) {
  }

  ngOnInit(): void {
    this.initializeUsersPermissions();
    this.getAllUsers()

  }

  private initializeUsersPermissions(): void{
    this.canCreatePermission = this.storageService.getData('canCreateUsers')==="true";
    this.canUpdatePermission = this.storageService.getData('canUpdateUsers')==="true";
    this.canDeletePermission = this.storageService.getData('canDeleteUsers')==="true";


  }


  getAllUsers() {

    this.usersService.getAllUsers(this.storageService.getData('jwt')).subscribe(res => {
      this.allUsersResponse = res;
    });


  }

  edit(selectedUser: any) {
    // this.selectedObj = obj;
    // this.selectedAction = 'edit';
    // this.allUsersService.getUser(this.storageService.getData('token'), this.selectedObj.userId).subscribe(
    //   obj => {
    //     this.selectedObj = obj;
    //     const io = new InteractionObject(this.selectedAction, this.domainName, this.selectedObj);
    //     this.allUsersEvent.emit(io);
    //     this.interactionService.setSelected(io);
    //     this.openDetail();
    //   }
    // );
    // debugger;
    // const io = new InteractionObject(this.selectedAction, this.domainName, this.selectedObj);
    // this.allUsersEvent.emit(io);
    // this.interactionService.setSelected(io);

    this.storageService.selectedUser = selectedUser;
    this.router.navigate(['/user-edit']);
  }

  new() {
    // this.selectedObj = {};
    // this.selectedAction = 'new';
    //
    // const io = new InteractionObject(this.selectedAction, this.domainName, this.selectedObj);
    // this.allUsersEvent.emit(io);
    // this.interactionService.setSelected(io);
     this.router.navigate(['/user-new']);
  }

  delete(userId:number) {
    this.usersService.deleteUser(this.storageService.getData('jwt'), userId).subscribe(res =>{
      this.toast.success({detail:"SUCCESS",summary:'Your Success Message', duration: 5000});
      this.getAllUsers();
    });

  }



  ngOnDestroy() {
    // if (this.subscription1) {
    //   this.subscription1.unsubscribe();
    // }
  }
}
