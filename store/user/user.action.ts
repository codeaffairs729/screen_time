import {
    UPDATE,
    CLEAR,
    UPDATE_ITEMS_DATA,
    NOTIFICATION_UPDATE,
    UserAction,
} from "./user.type";
import { Notification } from "pages/workspace/notification.vm";

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

export const updateNotifications = (notifications: Notification[]) => {
    return {
        type: NOTIFICATION_UPDATE,
        payload: notifications,
    };
};
