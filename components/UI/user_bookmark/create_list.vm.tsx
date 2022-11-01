import { useHttpCall } from "common/hooks";
import Http from "common/http";
import toast from "react-hot-toast";
import User from "models/user.model";
import UserService from "services/user.service";

const CreateListVM = (user: User | null, bookmark_lists: any) => {
    // use the API for submitting the new list name
    const { execute: executeCreateList, isLoading: isCreatingList } =
        useHttpCall();
    const createNewUserList = (listName: string) => {
        // Validation for duplicate input and check store for duplication
        let isDuplicate = false;

        bookmark_lists.forEach((list: any) => {
            if (list.listName == listName) {
                isDuplicate = true;
            }
        });

        if (listName != "" && !isDuplicate) {
            executeCreateList(
                () =>
                    Http.post(`/v1/user-bookmarks/createlist`, {
                        user_id: user?.id,
                        list_name: listName,
                    }),
                {
                    onSuccess: (res) => {
                        console.log(res);
                        UserService.update(res);
                    },
                    onError: (e) =>
                        toast.error(
                            "Something went wrong while creating a list."
                        ),
                }
            );
        } else {
            toast.error("Not a valid list name.");
        }
    };

    return { createNewUserList, isCreatingList };
};

export default CreateListVM;
