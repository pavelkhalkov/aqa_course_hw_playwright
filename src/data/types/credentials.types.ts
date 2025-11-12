import { IResponseFields } from "./core.types";

export interface ICredentials {
  username: string;
  password: string;
}

export interface ILoginResponse extends IResponseFields {
  User: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
    createdOn: string;
  };
}