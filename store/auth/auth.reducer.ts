import {
  AuthState,
  Action,
  LOGOUT,
  UPDATE_TOKEN,
  UPDATE_USER,
} from "./auth.type";

export const initialState: AuthState = {
  user: null,
  token: null,
};

const authReducer = (state: AuthState = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return { ...state, ...action.payload };
    case UPDATE_USER:
      return { ...state, ...action.payload };
    case LOGOUT:
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

export default authReducer;
