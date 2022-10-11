export const UPDATE = "update";
export const CLEAR = "clear";

export type UserAction = {
    type: string;
    payload: any;
};

export type UserState = {
    bookmarkLists: any;
    bookmarkItems: any;
};
