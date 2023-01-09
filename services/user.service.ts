import {
    updateBookmarkListsItems,
    clearBookmarkListsItems,
    updateBookmarkItemsData,
} from "store/user/user.action";
import { initializeStore } from "store";
import Http from "common/http";
import Dataset from "models/dataset.model";
import Organisation from "models/organisation.model";

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
                organisationID: item.data_provider_id,
            };
        });

        const lists = bookmarkListsItems.lists.map((list: any) => {
            let listDatasets: any = [];
            let listOrganisations: any = [];

            items.forEach((item: any, idx: any) => {
                if (item.listID == list.list_id) {
                    if (
                        item.datasetID &&
                        !listDatasets.includes(item.datasetID)
                    ) {
                        listDatasets.push(item.datasetID);
                    }
                    if (
                        item.organisationID &&
                        !listOrganisations.includes(item.organisationID)
                    ) {
                        listOrganisations.push(item.organisationID);
                    }
                }
            });

            return {
                listName: list.list_name,
                listID: list.list_id,
                listDatasets: listDatasets,
                listOrganisations: listOrganisations,
            };
        });

        store.dispatch(updateBookmarkListsItems(lists, items));

        const all_dataset_ids = bookmarkListsItems.list_items
            .filter((item: any) => item.dataset_id)
            .map((item: any) => item.dataset_id);

        const all_organisation_ids = bookmarkListsItems.list_items
            .filter((item: any) => item.data_provider_id)
            .map((item: any) => item.data_provider_id);

        const dataset_ids = Array.from(new Set(all_dataset_ids));
        const organisation_ids = Array.from(new Set(all_organisation_ids));

        // Fetch bookmark itsm dataset data
        // https://api.dtechtive.com/data_view/{ids}?li=193&li=194
        // let item_req_param = "li=193&li=194";

        let datasets: Dataset[] = [];
        let organisations: any = [
            // {
            //     id: 1,
            //     title: "Public Health Scotland",
            //     description:
            //         "Featured Public Health Scotland Metadata Quality Open Commercial The Scottish Health and Social Care open data platform gives access to statistics and ference data for information and re-use. This platform is managed by Public Health Scotland",
            //     dataQuality: 2,
            //     buttonTags: ["open"],
            //     topics: ["health"],
            //     domains: ["test"],
            //     stats: {
            //         datasetsCount: 1,
            //         favoritesCount: 2,
            //         viewCount: 4,
            //         downloadCount: 1,
            //     },
            // },
        ];

        if (dataset_ids.length > 0) {
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

            datasets = Dataset.fromJsonList(
                res_itemsdata[0].user_search[0].results
            );
        }

        if (organisation_ids?.length > 0) {
            const resOrgData = await Http.get(
                `/v1/data_sources/display_providers`,
                {
                    params: organisation_ids,
                    baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
                }
            );

            organisations = Organisation.fromJsonList(resOrgData);
        }

        store.dispatch(
            updateBookmarkItemsData({
                datasets: datasets?.length ? datasets : [],
                organisations: organisations?.length ? organisations : [],
            })
        );
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
