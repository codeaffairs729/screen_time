import {
    updateBookmarkListsItems,
    clearBookmarkListsItems,
} from "store/user/user.action";
import { initializeStore } from "store";

class UserService {
    static async update(bookmarkListsItems: any) {
        /**
         * Update all the user API service data
         *
         * 1. Store the user bookmarks
         */
        //
        const store = initializeStore();

        const lists = bookmarkListsItems.lists.map((item: any) => {
            return {
                listName: item.list_name,
                listID: item.list_id,
            };
        });
        const items = bookmarkListsItems.list_items.map((item: any) => {
            return {
                itemID: item.item_id,
                listID: item.list_id,
                datasetID: item.dataset_id,
            };
        });
        store.dispatch(updateBookmarkListsItems(lists, items));
    }

    static async clear() {
        /**
         * Clear all the user API service data
         *
         * 1. Clear the user bookmarks
         */
        //
        const store = initializeStore();
        store.dispatch(clearBookmarkListsItems());
    }
}

export default UserService;
