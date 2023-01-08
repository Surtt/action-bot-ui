export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  jwt: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}
