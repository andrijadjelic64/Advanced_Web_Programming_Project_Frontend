import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {InteractionObject} from "./interaction-object";

/**
 * shared service between pages or components
 */
@Injectable()
export class InteractionService {

  /**
   * observable string sources
   */
    private edit = new Subject<InteractionObject>();
    private save = new Subject<InteractionObject>();
    private delete = new Subject<InteractionObject>();

  // private edit = new BehaviorSubject<InteractionObject>(null);
  // private save = new BehaviorSubject<InteractionObject>(null);
  // private delete = new BehaviorSubject<InteractionObject>(null);

  /**
   * observable string streams
   */
  edit$ = this.edit.asObservable();
  save$ = this.save.asObservable();
  delete$ = this.delete.asObservable();

  /**
   * service commands
   */
  setSelected(io: InteractionObject) {
    this.edit.next(io);
  }

  setSave(io: InteractionObject) {
    this.save.next(io);
  }

  setDelete(io: InteractionObject) {
    this.delete.next(io);
  }

}
