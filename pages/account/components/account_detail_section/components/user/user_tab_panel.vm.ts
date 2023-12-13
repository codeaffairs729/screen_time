import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { Option } from "components/UI/form/dropdown_field";
import User, { UserRole } from "models/user.model";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateUser } from "store/auth/auth.action";

const UserTabPanelVM = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [file, setFile] = useState(user?.user_image_url);
    const [apiKeys, setApiKeys] = useState<any>([]);
    const [apiPopup, setApiPopup] = useState(false);
    const [isApiCreated, setIsApiCreated] = useState(false);
    const [createdApiKey, setCreatedApiKey] = useState<any>({});
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const dispatch = useDispatch();
    const form = useForm();
    const apiForm = useForm();
    const roleOptions: Option[] = Object.keys(UserRole ?? {}).map((k) => ({
        value: UserRole[k as keyof typeof UserRole],
        label: k,
    }));

    useEffect(() => {
        form.reset({ ...user, role_other: user?.roleOther } ?? {});
    }, [user]);
   

    const { isLoading: isCreatingApiKeys, execute: executeCreateApiKeys } =
        useHttpCall();
    const createApiKeys = (data: any) => {
        executeCreateApiKeys(
            () => Http.post(`/v1/users/create-api-key`, data),
            {
                postProcess: (res: any) => {
                    setCreatedApiKey(res);
                    fetchApiKeys();
                    setIsApiCreated(true);
                    apiForm.reset()
                },
                onError: async (error) =>
                {
                    const err = await getHttpErrorMsg(error)
                    if (err) toast.error(err)
                    else toast.error("A key with the same name already exists");
                }
            }
        );
    };

    const { isLoading: isFetchingApiKeys, execute: executeFetchApiKeys } =
        useHttpCall();
    const fetchApiKeys = () => {
        executeFetchApiKeys(() => Http.get(`/v1/users/api-keys`), {
            postProcess: (res: any) => {
                setApiKeys(res);
                setApiPopup(true);
            },
            onError: async (error) => toast.error(await getHttpErrorMsg(error)),
        });
    };

    const { isLoading: isDeletingApiKeys, execute: executeDeleteApiKeys } =
        useHttpCall();
    const deleteApiKeys = (apiKeyId: any) => {
        executeDeleteApiKeys(
            () => Http.delete(`/v1/users/${apiKeyId}/delete-api-key`),
            {
                postProcess: (res: any) => {
                    setIsDeleted(true);
                    setIsApiCreated(false);
                    fetchApiKeys()
                },
                onError: async (error) =>
                    toast.error(await getHttpErrorMsg(error)),
            }
        );
    };

    const { isLoading: isSavingUserDetails, execute: executeSaveUserDetails } =
        useHttpCall();
    const saveUserDetails = (data: any) => {
        executeSaveUserDetails(
            () =>
                Http.patch(`/v1/users/${user?.id}`, data, {
                    // extraHeaders: {
                    //     "content-type": "multipart/form-data",
                    // },
                }),
            {
                onSuccess: (res) => {
                    const updated_user = User.fromJson(res["data"]);
                    dispatch(updateUser(updated_user));
                    toast.success("Details were updated successfully");
                    setFile(updated_user.user_image_url);
                },
                onError: async (error) =>
                    toast.error(await getHttpErrorMsg(error)),
            }
        );
    };

    return {
        roleOptions,
        saveUserDetails,
        isSavingUserDetails,
        user,
        form,
        file,
        setFile,
        fetchApiKeys,
        isFetchingApiKeys,
        apiKeys,
        createApiKeys,
        isCreatingApiKeys,
        createdApiKey,
        deleteApiKeys,
        isDeletingApiKeys,
        isDeleted,
        apiPopup,
        setApiPopup,
        isApiCreated,
        setIsApiCreated,
        apiForm,
    };
};

export default UserTabPanelVM;
export const UserTabPanelVMContext = createContext({} as any);
