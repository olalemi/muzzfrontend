import axios from "axios";
import { getBaseUrl } from ".";
import { IRoomUser } from "../interfaces/RoomUsers/IRoomUsers";

const route: string = "roomusers";
const apiClient = axios.create({
  baseURL: getBaseUrl(route),
  headers: {
    "Content-Type": "application/json"
  }
});

const createRoomUsers = async (formData: IRoomUser) => {
  try {
    const body = JSON.stringify(formData);
    const response = await apiClient.post<IRoomUser>("createRoomUser", body);
    return response.status;
  } catch (err: any) {
    console.error(err.message);
  }
};

const getRoomUsersByRoomId = async (roomId: string) => {
  const response = await apiClient.get<IRoomUser[]>(`roomUsers/${roomId}`);
  return response.data;
};

export const RoomUsersService = {
  createRoomUsers,
  getRoomUsersByRoomId
};

export default RoomUsersService;
