import {Permission} from "./permission";

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  permissions?: Permission[];

 constructor() {
 }
}
