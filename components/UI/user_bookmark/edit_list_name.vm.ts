import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import User from "models/user.model";
import UserService from "services/user.service";

const EditListNameVM = (user: User | null) => {
    // use the API for deleting the list
    const { execute: executeEditListName, isLoading: isEditingListName } =
        useHttpCall();
    const editListName = (listName: string, listID: number) => {
        executeEditListName(
            () =>
                Http.put(`/v1/user-bookmarks/updatelist`, {
                    list_id: listID,
                    list_name: listName,
                    user_id: user?.id,
                }),
            {
                onSuccess: (res) => {
                    UserService.update(res);
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while updating the list name."
                    ),
            }
        );
    };

    return { editListName, isEditingListName };
};

export default EditListNameVM;
