import User from "models/user.model";

export const UPDATE_TOKEN = "update_token";
export const UPDATE_USER = "update_user";
export const LOGOUT = "logout";

export type Action = {
  type: string;
  payload: {
    [key: string]: any;
  };
};

export type AuthState = {
  user: User | null;
  token: string | null;
};
