import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {MachinesService} from "../../service/machines.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {Machine} from "../../model/machine";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  selectedMachine:Machine;
  schedulerStartForm: FormGroup
  schedulerStopForm: FormGroup
  schedulerRestartForm: FormGroup
  pipe = new DatePipe('en-US');

  constructor(private storageService: StorageService,
              private machinesService: MachinesService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: NgToastService) {
    this.selectedMachine = storageService.selectedMachine;

    this.schedulerStartForm = this.formBuilder.group({
      date: Date
    });
    this.schedulerStopForm = this.formBuilder.group({
      date: Date
    });
    this.schedulerRestartForm = this.formBuilder.group({
      date: Date
    });
  }

  ngOnInit(): void {
  }

  scheduleStart() {
    let date = this.schedulerStartForm.get('date')?.value;
    let dateString = this.pipe.transform(date, "dd.MM.yyyy HH:mm");
    this.machinesService.scheduleStart(this.storageService.getData('jwt'),this.selectedMachine.machineId, dateString).subscribe( res => {
      this.toast.success({detail:"Start scheduled",summary:'SUCCES', duration: 5000});
      this.router.navigate(['/machines']);
      },
      error => {
        this.toast.success({detail:error.error,summary:'ERROR', duration: 5000});
      }

    );

  }
  scheduleStop() {
    let date = this.schedulerStopForm.get('date')?.value;
    let dateString = this.pipe.transform(date, "dd.MM.yyyy HH:mm");
    this.machinesService.scheduleStop(this.storageService.getData('jwt'),this.selectedMachine.machineId, dateString).subscribe( res => {
      this.toast.success({detail:"Stop scheduled",summary:'SUCCES', duration: 5000});
      this.router.navigate(['/machines']);
      },
      error => {
        this.toast.success({detail:error.error,summary:'ERROR', duration: 5000});
      }

    );

  }
  scheduleRestart() {
    let date = this.schedulerRestartForm.get('date')?.value;
    let dateString = this.pipe.transform(date, "dd.MM.yyyy HH:mm");
    this.machinesService.scheduleRestart(this.storageService.getData('jwt'),this.selectedMachine.machineId, dateString).subscribe( res => {
      this.toast.success({detail:"Restart scheduled",summary:'SUCCES', duration: 5000});
      this.router.navigate(['/machines']);
      },
      error => {
        this.toast.success({detail:error.error,summary:'ERROR', duration: 5000});
      }

    );

  }
}
