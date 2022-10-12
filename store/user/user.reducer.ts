import {
    UserState,
    UserAction,
    UPDATE,
    CLEAR,
    UPDATE_ITEMS_DATA,
} from "./user.type";

export const initialState: UserState = {
    bookmarkLists: null,
    bookmarkItems: null,
    bookmarkItemsData: null,
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
    switch (action.type) {
        case UPDATE:
            return { ...state, ...action.payload };
        case UPDATE_ITEMS_DATA:
            return { ...state, ...action.payload };
        case CLEAR:
            return {
                ...state,
                bookmarkLists: null,
                bookmarkItems: null,
                bookmarkItemsData: null,
            };
        default:
            return state;
    }
};

export default userReducer;
