import { UPDATE, CLEAR, UPDATE_ITEMS_DATA, UserAction } from "./user.type";

export const updateBookmarkListsItems = (
    lists: any,
    items: any
): UserAction => {
    return {
        type: UPDATE,
        payload: { bookmarkLists: lists, bookmarkItems: items },
    };
};

export const updateBookmarkItemsData = (itemsData: any): UserAction => {
    return {
        type: UPDATE_ITEMS_DATA,
        payload: { bookmarkItemsData: itemsData },
    };
};

export const clearBookmarkListsItems = (): UserAction => {
    return {
        type: CLEAR,
        payload: {},
    };
};
