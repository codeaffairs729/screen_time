import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import User from "models/user.model";
import UserService from "services/user.service";

type Payload = {
    bookmarkType?: string;
    bookmarkId?: number | string ;
};

const DelListItemVM = (user: User | null) => {
    // use the API for submitting the new list name
    const { execute: executeDelListItem, isLoading: isDeletingListItem } =
        useHttpCall();
    const delOldListItem = (
        listID: number,
        itemID: number,
        payload: Payload
    ) => {
        const { bookmarkType, bookmarkId } = payload;
        executeDelListItem(
            () =>
                Http.delete(`/v1/user-bookmarks/listdelitem`, {
                    user_id: user?.id,
                    list_id: listID,
                    // dataset_id: datasetID,
                    // provider_uuid: organisationUUID,
                    item_id: itemID,
                    bookmark_type: bookmarkType,
                    bookmark_id: bookmarkId
                }),
            {
                onSuccess: (res) => {
                    UserService.update(res);
                },
                onError: (e) =>
                    toast.error("Something went wrong while creating a list."),
            }
        );
    };

    return { delOldListItem, isDeletingListItem };
};

export default DelListItemVM;
