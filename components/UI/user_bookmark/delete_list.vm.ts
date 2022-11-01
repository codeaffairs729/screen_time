import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import User from "models/user.model";
import UserService from "services/user.service";

const DeleteListVM = (user: User | null) => {
    // use the API for deleting the list
    const { execute: executeDeleteList, isLoading: isDeletingList } =
        useHttpCall();
    const deleteUserList = (listName: string, listID: number) => {
        executeDeleteList(
            () =>
                Http.delete(`/v1/user-bookmarks/deletelist`, {
                    list_id: listID,
                    list_name: listName,
                    user_id: user?.id,
                }),
            {
                onSuccess: (res) => {
                    console.log(res);
                    UserService.update(res);
                },
                onError: (e) =>
                    toast.error(
                        "Something went wrong while deleting the list."
                    ),
            }
        );
    };

    return { deleteUserList, isDeletingList };
};

export default DeleteListVM;
