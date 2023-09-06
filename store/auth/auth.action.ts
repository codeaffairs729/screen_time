import User from "models/user.model";
import {
    UPDATE_TOKEN,
    UPDATE_USER,
    UPDATE_EXTRA_DETAILS,
    LOGOUT,
    Action,
} from "./auth.type";

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

export const updateDetails = (extraDetails: { [key: string]: any }): Action => {
    return {
        type: UPDATE_EXTRA_DETAILS,
        payload: { extraDetails },
    };
};

export const logoutUser = (): Action => {
    return {
        type: LOGOUT,
        payload: {},
    };
};
