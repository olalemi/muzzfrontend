import { IBase } from "../IBase";

export interface IRoomUser extends IBase {
  userId: string;
  roomId: string;
  userName: string;
}
