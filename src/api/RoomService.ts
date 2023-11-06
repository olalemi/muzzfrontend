import axios from "axios";
import { toast } from "react-toastify";
import { getBaseUrl } from ".";
import { IRoom } from "../interfaces/Room/IRoom";
import { IRoomUser } from "../interfaces/RoomUsers/IRoomUsers";

const route: string = "room";
const apiClient = axios.create({
  baseURL: getBaseUrl(route),
  headers: {
    "Content-Type": "application/json"
  }
});

const getRooms = async () => {
  try {
    const response = await apiClient.get<IRoom[]>(`getRooms`);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
  }
};

const createRoom = async (formData: IRoom) => {
  try {
    const body = JSON.stringify(formData);
    const response = await apiClient.post<IRoom>("createRoom", body);
    toast.success("Room created successfully");
    return response.status;
  } catch (err: any) {
    console.error(err.message);
  }
};

const getRoomDetails = async (id: string) => {
  try {
    const response = await apiClient.get<IRoom>(`getRoomDetails/${id}`);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
  }
};

const deleteRoom = async (roomId: string) => {
  try {
    const response = await apiClient.delete<IRoomUser>(`/${roomId}`);
    return response.status;
  } catch (error) {
    console.error("Error deleting room", error);
    throw error;
  }
};

export const RoomService = {
  createRoom,
  getRooms,
  getRoomDetails,
  deleteRoom
};

export default RoomService;
