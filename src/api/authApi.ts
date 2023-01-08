import axios from "axios";
import {
  GenericResponse,
  ILoginResponse,
  IUser,
  IUserResponse,
} from "../types";

const BASE_URL = "http://localhost:8000";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const signUpUser = async (user: Omit<IUser, "role">) => {
  const response = await authApi.post<GenericResponse>("users/register", user);
  return response.data;
};

export const loginUser = async (user: Omit<IUser, "name" | "role">) => {
  const response = await authApi.post<ILoginResponse>("users/login", user);
  return response.data;
};

export const getMe = async (token: string) => {
  const response = await authApi.get<IUser>("users/info", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};
