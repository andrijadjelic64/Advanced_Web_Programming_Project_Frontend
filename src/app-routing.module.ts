import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./app/components/login/login.component";
import {AllUsersComponent} from "./app/components/all-users/all-users.component";
import {EditUserComponent} from "./app/components/edit-user/edit-user.component";
import {CreateUserComponent} from "./app/components/create-user/create-user.component";
import {MachinesComponent} from "./app/components/machines/machines.component";
import {CreateMachineComponent} from "./app/components/create-machine/create-machine.component";
import {SchedulerComponent} from "./app/components/scheduler/scheduler.component";


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "all-users",
    component: AllUsersComponent
  },
  {
    path: "user-edit",
    component: EditUserComponent
  },
  {
    path: "user-new",
    component: CreateUserComponent
  },
  {
    path: "machines",
    component: MachinesComponent
  },
  {
    path: "create-machine",
    component: CreateMachineComponent
  },
  {
    path: "scheduler",
    component: SchedulerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
