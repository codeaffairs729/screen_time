import User from "models/user.model";
import { UPDATE_TOKEN, UPDATE_USER, LOGOUT, Action } from "./auth.type";

export const updateToken = (token: string): Action => {
  return {
    type: UPDATE_TOKEN,
    payload: { token },
  };
};

export const updateUser = (user: User): Action => {
  return {
    type: UPDATE_USER,
    payload: { user },
  };
};

export const logoutUser = (): Action => {
  return {
    type: LOGOUT,
    payload: {},
  };
};
