import { UPDATE, CLEAR, UserAction, UserState } from "./user.type";

export const updateBookmarkListsItems = (
    lists: any,
    items: any
): UserAction => {
    return {
        type: UPDATE,
        payload: { bookmarkLists: lists, bookmarkItems: items },
    };
};

export const clearBookmarkListsItems = (): UserAction => {
    return {
        type: CLEAR,
        payload: {},
    };
};
