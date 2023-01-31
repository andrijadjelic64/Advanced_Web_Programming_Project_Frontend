import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import { AllUsersComponent } from './app/components/all-users/all-users.component';
import { EditUserComponent } from './app/components/edit-user/edit-user.component';
import {InteractionService} from "./app/shared/interaction.service";
import { CreateUserComponent } from './app/components/create-user/create-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgToastModule} from "ng-angular-popup";
import { MachinesComponent } from './app/components/machines/machines.component';
import { CreateMachineComponent } from './app/components/create-machine/create-machine.component';
import { SchedulerComponent } from './app/components/scheduler/scheduler.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllUsersComponent,
    EditUserComponent,
    CreateUserComponent,
    MachinesComponent,
    CreateMachineComponent,
    SchedulerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    NgbModule,
    NgToastModule
  ],
  providers: [
    InteractionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
