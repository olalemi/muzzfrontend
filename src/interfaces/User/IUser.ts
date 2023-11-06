import { IBase } from "../IBase";

export interface IUser extends IBase {
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}
