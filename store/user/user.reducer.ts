import { UserState, UserAction, UPDATE, CLEAR } from "./user.type";

export const initialState: UserState = {
    bookmarkLists: null,
    bookmarkItems: null,
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case UPDATE:
            return { ...state, ...action.payload };
        case CLEAR:
            return { ...state, bookmarkLists: null, bookmarkItems: null };
        default:
            return state;
    }
};

export default userReducer;
