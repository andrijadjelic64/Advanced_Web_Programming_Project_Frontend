import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../service/storage.service";
import {UsersService} from "../../service/users.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {MachinesService} from "../../service/machines.service";

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {

  active:boolean = false;
  createMachineForm: FormGroup;
  constructor(private storageService: StorageService,
              private machinesService: MachinesService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: NgToastService) {
    this.createMachineForm = this.formBuilder.group({
      name: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }

  submit(){
    this.machinesService.createMachine(this.storageService.getData('jwt'), this.createMachineForm.get('name')?.value,this.active).subscribe(res => {
      this.toast.success({detail:"Machine has been created",summary:'SUCCES', duration: 5000});
      this.router.navigate(['/machines']);
    });
  }

  toggleActive(){
    this.active = !this.active;
  }
}
