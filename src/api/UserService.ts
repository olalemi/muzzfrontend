import axios from "axios";
import { toast } from "react-toastify";
import { IUser } from "../interfaces/User/IUser";
import { getBaseUrl } from ".";

const route: string = "user";
const apiClient = axios.create({
  baseURL: getBaseUrl(route),
  headers: {
    "Content-Type": "application/json",
  },
});

const createUser = async (formData: IUser) => {
  try {
    const body = JSON.stringify(formData);
    const response = await apiClient.post<IUser>("createuser", body);
    toast.success("User created successfully");
    return response.data;
  } catch (err: any) {
    console.error(err.message);
  }
};

const getUsers = async () => {
  try {
    const response = await apiClient.get<IUser[]>(`getUsers`);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
  }
};

const getCurrentUser = async (id: string) => {
  try {
    const response = await apiClient.get<IUser>(`getCurrentUser/${id}`);
    return response.data;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const UserService = {
  createUser,
  getUsers,
  getCurrentUser,
};

export default UserService;
