import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import User, { Role } from "models/user.model";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateUser } from "store/auth/auth.action";

const AdminTabPanelVM = () => {
    const adminUser = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const organisationId = adminUser?.organisations?.[0].organisation_id;
    let [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    // Fetch users belonging to the current organisation
    const {
        execute: executeFetchOrgUsers,
        isLoading: isFetchingOrgUsers,
        data: orgusers,
    } = useHttpCall<User[]>([]);
    const fetchOrgUsers = () =>
        executeFetchOrgUsers(
            () => Http.get(`/v1/users/org/${organisationId}`),
            {
                onError: async (error) =>
                    toast.error(await getHttpErrorMsg(error)),
                postProcess: (res) =>
                    User.fromJsonList(res["data"]).filter((user) =>
                        user.roles.every(
                            (role) => user.id !== adminUser?.id
                            // (role) => role.name != "Organization Admin"
                        )
                    ),
            }
        );
    useEffect(() => {
        fetchOrgUsers();
    }, []);

    const { execute: executeInviteMember, isLoading: isInvitingMember } =
        useHttpCall();
    const inviteMember = ({
        email,
        roles,
    }: {
        email: string;
        roles: string[];
    }) =>
        executeInviteMember(
            () =>
                Http.post("/v1/iam/sent_org_member_invite", {
                    email,
                    roles,
                }),
            {
                onError: async (error) =>
                    toast.error(await getHttpErrorMsg(error)),
                onSuccess: async (res) => {
                    toast.success("An email invite has been sent.");
                    setIsAddMemberModalOpen(false);
                },
            }
        );

    const { execute: executeDeleteOrgMember, isLoading: isDeletingOrgMember } =
        useHttpCall();
    const deleteOrgMember = (userId: number) =>
        executeDeleteOrgMember(
            () => Http.delete(`/v1/users/${userId}/org/${organisationId}`),
            {
                onSuccess: (res) => {
                    toast.success(
                        "The user was succesfully removed from the organisation."
                    );
                    fetchOrgUsers();
                },
                onError: (error) => {
                    toast.error("Something went wrong while removing th user.");
                },
            }
        );

    const { execute: executeSaveOrgDetails, isLoading: isSavingOrgDetails } =
        useHttpCall();
    const saveOrgDetails = (data: any) =>
        executeSaveOrgDetails(
            () => Http.patch(`/v1/iam/org/${organisationId}`, data),
            {
                onSuccess: (res) => {
                    const newAdminUser = User.updateOrganisation(adminUser, {
                        name: res["data"]["name"],
                        maxMembers: res["data"]["max_members"],
                        sector: res["data"]["sector"],
                    });
                    if (!newAdminUser) {
                        console.log("newAdminUser", newAdminUser);
                        throw new Error("Updated user is not valid");
                    }
                    dispatch(updateUser(newAdminUser));
                    toast.success("Details were updated successfully");
                },
            }
        );

    const { execute: executeChangeRole, isLoading: isChangingRole } =
        useHttpCall();
    const changeRole = ({
        userId,
        action,
    }: {
        userId: number;
        action: string;
    }) =>
        executeChangeRole(
            () =>
                Http.put(
                    `/v1/iam/org/${
                        User.getOrg(adminUser)?.organisation_id
                    }/${action}`,
                    {
                        user_id: userId,
                    }
                ),
            {
                onError: (error) => {
                    toast.error("Something went wrong while updating role");
                },
                onSuccess: (res) => {
                    toast.success("Role was updated successfully");
                    fetchOrgUsers();
                },
            }
        );
    const [changingRoleUserId, setChangingRoleUserId] = useState<number | null>(
        null
    );
    const makeOrgAdmin = (user: User) => {
        setChangingRoleUserId(user.id);
        changeRole({
            userId: user.id,
            action: "make_admin",
        });
    };
    const makeOrgMember = (user: User) => {
        setChangingRoleUserId(user.id);
        changeRole({
            userId: user.id,
            action: "make_member",
        });
    };

    return {
        isAddMemberModalOpen,
        setIsAddMemberModalOpen,
        isInvitingMember,
        inviteMember,
        deleteOrgMember,
        isDeletingOrgMember,
        isFetchingOrgUsers,
        orgusers,
        isSavingOrgDetails,
        saveOrgDetails,
        changeRole,
        isChangingRole,
        makeOrgAdmin,
        makeOrgMember,
        changingRoleUserId,
    };
};

export default AdminTabPanelVM;

export const AdminTabPanelVMContext = createContext({} as any);
