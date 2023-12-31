import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import User from "models/user.model";
import UserService from "services/user.service";

type Payload = {
    bookmarkType?: string;
    bookmarkId?: number | string ;
};

const AddListItemVM = (user: User | null) => {
    // use the API for submitting the new list name
    const { execute: executeAddListItem, isLoading: isAddingListItem } =
        useHttpCall();
    const addNewListItem = (listID: number, payload: Payload) => {
        const { bookmarkType, bookmarkId } = payload;
        executeAddListItem(
            () =>
                Http.post(`/v1/user-bookmarks/listadditem`, {
                    user_id: user?.id,
                    list_id: listID,
                    // dataset_id: datasetID,
                    // provider_uuid: organisationUUID,
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

    return { addNewListItem, isAddingListItem };
};

export default AddListItemVM;
