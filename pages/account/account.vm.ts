import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import User from "models/user.model";
import { createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "store";
const AccountVM = () => {
    const adminUser = useSelector((state: RootState) => state.auth.user);

    // Fetch users belonging to the current organisation
    const {
        execute: executeFetchOrgUsers,
        isLoading: isFetchingOrgUsers,
        data: orgusers,
    } = useHttpCall<User[]>([]);
    const fetchOrgUsers = () =>
        executeFetchOrgUsers(
            () => Http.get(`/v1/users/org`),
            {
                onError: async (error) =>
                    toast.error(await getHttpErrorMsg(error)),
                postProcess: (res) =>
                    User.fromJsonList(res["data"]).filter((user) =>
                        user.roles.every((role) => user.id !== adminUser?.id)
                    ),
            }
        );
    // useEffect(() => {
    //     fetchOrgUsers();
    // }, []);
    return {
        isFetchingOrgUsers,
        orgusers,
        executeFetchOrgUsers,
        fetchOrgUsers,
    };
}
export default AccountVM
export const AccountContext = createContext({ permissions: [] } as any);
