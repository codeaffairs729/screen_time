import { useHttpCall } from "common/hooks";
import Http from "common/http";
import User from "models/user.model";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "store";

const MembersTableVM = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    const {
        execute: executeFetchOrgUsers,
        isLoading: isFetchingOrgUsers,
        data: membersData,
    } = useHttpCall<User[]>([]);
    const fetchOrgUsers = () =>
        executeFetchOrgUsers(
            () =>
                Http.get(
                    `/v1/users/org/${user?.organisations?.[0].organisation_id}`
                ),
            {
                onError: (error) => toast.error(error),
                postProcess: (res) => res["data"],
                // onSuccess: (res)=>toast
            }
        );
    useEffect(() => {
        fetchOrgUsers();
    }, []);
    // const membersData = [
    //     {
    //         name: "Philipa",
    //         email: "philippa@nature.scot",
    //     },
    //     {
    //         name: "Jane Doe",
    //         email: "jane.doe@nature.scot",
    //     },
    //     {
    //         name: "Adithya",
    //         email: "adithya@nature.scot",
    //     },
    //     {
    //         name: "Lisa",
    //         email: "lisa@nature.scot",
    //     },
    // ];

    return { membersData, isFetchingOrgUsers };
};

export default MembersTableVM;
