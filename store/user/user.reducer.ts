import {
    UserState,
    UserAction,
    UPDATE,
    CLEAR,
    UPDATE_ITEMS_DATA,
    NOTIFICATION_UPDATE,
} from "./user.type";

export const initialState: UserState = {
    bookmarkLists: null,
    bookmarkItems: null,
    bookmarkItemsData: null,
    notifications: [],
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
        case NOTIFICATION_UPDATE:
            console.log(action.payload, "action.payload");
            return {
                ...state,
                notifications: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
