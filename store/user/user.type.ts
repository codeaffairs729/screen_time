import { Notification } from "pages/workspace/notification.vm";
export const UPDATE = "update";
export const CLEAR = "clear";
export const UPDATE_ITEMS_DATA = "update_items_data";
export const NOTIFICATION_UPDATE = "notification_update";
export type UserAction = {
    type: string;
    payload: any;
};

export type UserState = {
    bookmarkLists: any;
    bookmarkItems: any;
    bookmarkItemsData: any;
    notifications: Notification[];
};
