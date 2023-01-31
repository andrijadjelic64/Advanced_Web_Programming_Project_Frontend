import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {MachinesService} from "../../service/machines.service";
import {User} from "../../model/user";
import {Machine} from "../../model/machine";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  allMachineResponse!: Machine[];

  canSearchMachines: boolean = false;
  canStartMachines: boolean = false;
  canStopMachines: boolean = false;
  canRestartMachines: boolean = false;
  canCreateMachines: boolean = false;
  canDestroyMachines: boolean = false;

  searchForm: FormGroup;

  constructor(private storageService: StorageService,
              private machinesService: MachinesService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: NgToastService) {

    this.searchForm = this.formBuilder.group({
      name: "",
      status: "",
    })
  }

  ngOnInit(): void {
    this.initializeUsersPermissions();
    this.getAllMachines()

  }

  private initializeUsersPermissions(): void {
    this.canSearchMachines = this.storageService.getData('canSearchMachines') === "true";
    this.canStartMachines = this.storageService.getData('canStartMachines') === "true";
    this.canStopMachines = this.storageService.getData('canStopMachines') === "true";
    this.canRestartMachines = this.storageService.getData('canRestartMachines') === "true";
    this.canCreateMachines = this.storageService.getData('canCreateMachines') === "true";
    this.canDestroyMachines = this.storageService.getData('canDestroyMachines') === "true";

  }


  getAllMachines() {

    this.machinesService.getAllMachines(this.storageService.getData('jwt'), null, null).subscribe(res => {
      this.allMachineResponse = res;
    });
  }

  search(){
    let name = this.searchForm.get('name')?.value
    let status = this.searchForm.get('status')?.value
    this.machinesService.getAllMachines(this.storageService.getData('jwt'), this.searchForm.get('name')?.value, this.searchForm.get('status')?.value).subscribe(res => {
      this.allMachineResponse = res;
    });
  }

  start(id: number) {
    this.machinesService.startMachine(this.storageService.getData('jwt'), id).subscribe(res => {
      this.toast.success({detail:"Machine started",summary:'SUCCES', duration: 5000});
      },
        error => {
        this.toast.success({detail:error.error,summary:'ERROR', duration: 5000});
        }

        );
  }

  stop(id: number) {
    this.machinesService.stopMachine(this.storageService.getData('jwt'), id).subscribe(res => {
      this.toast.success({detail:"Machine stopped",summary:'SUCCES', duration: 5000});
      },
      error => {
        this.toast.success({detail:error.error,summary:'ERROR', duration: 5000});
      }

    );
  }

  restart(id: number) {
    this.machinesService.restartMachine(this.storageService.getData('jwt'), id).subscribe(res => {
      this.toast.success({detail:"Machine restarted",summary:'SUCCES', duration: 5000});
      },
      error => {
        this.toast.success({detail:error.error,summary:'ERROR', duration: 5000});
      }

    );
  }

  destroy(id: number) {
    this.machinesService.destroyMachine(this.storageService.getData('jwt'), id).subscribe(res => {
      this.toast.success({detail:"Machine destroyed",summary:'SUCCES', duration: 5000});
      this.getAllMachines();
      },
      error => {
        this.toast.success({detail:error.error,summary:'ERROR', duration: 5000});
      }

    );
  }

  schedule(selectedMachine: any){
    this.storageService.selectedMachine = selectedMachine;
    this.router.navigate(['/scheduler']);
  }

  create() {
    this.router.navigate(['/create-machine']);
  }
}
