/**
 * class used as interaction object communication between components or pages
 * for sending data
 */
export class InteractionObject {
  action: string;
  name: string;
  object: any;


  constructor(action: string, name: string, object: any) {
    this.action = action;
    this.name = name;
    this.object = object;
  }
}
