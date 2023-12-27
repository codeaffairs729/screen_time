// DeleteAccountVM.js
import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserService from "services/user.service";
import { initializeStore } from "store";
import { logoutUser } from "store/auth/auth.action";

export const enum DeleteAccountActions {
    DeleteAccount = "delete_account",
}

const DeleteAccountVM = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [deleteAccountData, setDeleteAccountData] = useState<{ user?: string }>({});
    const {
        execute: executeDeleteAccount,
        isLoading: isDeletingAccount,
        error: deleteAccountError,
    } = useHttpCall();

    const deleteAccount = (token: any) =>
        executeDeleteAccount(
            () => {
                return Http.delete(
                    `/v1/users/delete-account/${token}`
                );
            },
            {
                onSuccess: (res) => {
                    toast.success("Account deleted successfully");
                    const store = initializeStore();
                    store.dispatch(logoutUser());
                    UserService.clear();
                    setDeleteAccountData(res);
                },
                onError: async (err) => {
                    const msg = await getHttpErrorMsg(err);
                    setErrorMessage(msg);
                    toast.error(`Error deleting account: ${msg}`);
                },
            }
        );

    return {
        deleteAccount,
        isDeletingAccount,
        deleteAccountData,
        errorMessage,
    };
};

export default DeleteAccountVM;

export const DeleteAccountVMContext = createContext<
    ReturnType<typeof DeleteAccountVM>
>({} as ReturnType<typeof DeleteAccountVM>);
