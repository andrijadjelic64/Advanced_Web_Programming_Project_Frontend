import {Permission} from "./permission";

export class LoginResponse {
  jwt!: string;
  permissions: string[];
}
