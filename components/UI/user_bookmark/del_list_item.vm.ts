import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import User from "models/user.model";
import UserService from "services/user.service";

const DelListItemVM = (user: User | null) => {
    // use the API for submitting the new list name
    const { execute: executeDelListItem, isLoading: isDeletingListItem } =
        useHttpCall();
    const delOldListItem = (
        listID: number,
        datasetID: number,
        itemID: number
    ) => {
        executeDelListItem(
            () =>
                Http.delete(`/v1/user-bookmarks/listdelitem`, {
                    user_id: user?.email,
                    list_id: listID,
                    dataset_id: datasetID,
                    item_id: itemID,
                }),
            {
                onSuccess: (res) => {
                    console.log(res);
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
