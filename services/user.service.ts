import {
    updateBookmarkListsItems,
    clearBookmarkListsItems,
    updateBookmarkItemsData,
} from "store/user/user.action";
import { initializeStore } from "store";
import Http from "common/http";
import Dataset from "models/dataset.model";

class UserService {
    static async update(bookmarkListsItems: any) {
        /**
         * Update all the user API service data
         *
         * 1. Store the user bookmarks
         */
        //
        const store = initializeStore();

        const items = bookmarkListsItems.list_items.map((item: any) => {
            return {
                itemID: item.item_id,
                listID: item.list_id,
                datasetID: item.dataset_id,
            };
        });

        const lists = bookmarkListsItems.lists.map((list: any) => {
            let listDatasets: any = [];

            items.forEach((item: any, idx: any) => {
                if (item.listID == list.list_id) {
                    listDatasets.push(item.datasetID);
                }
            });
            return {
                listName: list.list_name,
                listID: list.list_id,
                listDatasets: listDatasets,
            };
        });

        store.dispatch(updateBookmarkListsItems(lists, items));

        const dataset_ids = bookmarkListsItems.list_items.map(
            (item: any) => item.dataset_id
        );

        console.log(dataset_ids);

        // Fetch bookmark itsm dataset data
        // https://api.dtechtive.com/data_view/{ids}?li=193&li=194
        // let item_req_param = "li=193&li=194";
        let item_req_param = "";
        dataset_ids.forEach((id: any) => {
            item_req_param = `${item_req_param}li=${id}&`;
        });
        const res_itemsdata = await Http.get(
            `/data_view/{ids}?${item_req_param}`,
            {
                baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_ROOT,
            }
        );

        const bookmark_itesm_data = Dataset.fromJsonList(
            res_itemsdata[0].user_search[0].results
        );
        store.dispatch(updateBookmarkItemsData(bookmark_itesm_data));
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
