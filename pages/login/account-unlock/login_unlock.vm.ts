import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getMessageFromResponse } from "common/util";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginUnlockVM = () => {
    const form = useForm();

    const {
        execute: executeRequestUnlock,
        error: requestUnlockEror,
        data: requestUnlockData,
        isLoading: isRequestUnlockLoading,
    } = useHttpCall();
    const requestUnlock = (data: any) =>
        executeRequestUnlock(() =>
            Http.post(`/v1/users/unlock/request`, { ...data })
        );

    return {
        form,
        requestUnlock,
        requestUnlockEror,
        isRequestUnlockLoading,
        requestUnlockData,
    };
};

export default LoginUnlockVM;
