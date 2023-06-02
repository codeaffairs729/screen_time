import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { Option } from "components/UI/form/dropdown_field";
import User, { UserRole } from "models/user.model";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateUser } from "store/auth/auth.action";

const UserTabPanelVM = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [file, setFile] = useState(user?.user_image_url);

    const dispatch = useDispatch();
    const form = useForm();

    const roleOptions: Option[] = Object.keys(UserRole ?? {}).map((k) => ({
        value: UserRole[k as keyof typeof UserRole],
        label: k,
    }));

    useEffect(() => {
        form.reset({ ...user, role_other: user?.roleOther } ?? {});
    }, [user]);

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
                    setFile(updated_user.user_image_url)
                },
                onError: async (error) =>
                    toast.error(await getHttpErrorMsg(error)),
            }
        );
    };
    return { roleOptions, saveUserDetails, isSavingUserDetails, user, form, file, setFile };
};

export default UserTabPanelVM;
