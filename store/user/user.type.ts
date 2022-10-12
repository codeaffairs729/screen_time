export const UPDATE = "update";
export const CLEAR = "clear";
export const UPDATE_ITEMS_DATA = "update_items_data";

export type UserAction = {
    type: string;
    payload: any;
};

export type UserState = {
    bookmarkLists: any;
    bookmarkItems: any;
    bookmarkItemsData: any;
};
