import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import User, { Role } from "models/user.model";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { updateUser } from "store/auth/auth.action";

const AdminTabPanelVM = () => {
    const adminUser = useSelector((state: RootState) => state.auth.user);
    const [file, setFile] = useState(adminUser?.logo_url)
    const dispatch = useDispatch();
    const { control, handleSubmit, reset, clearErrors, getValues, formState } = useForm();
    const organisationId = adminUser?.organisations?.[0]?.organisation_id;
    let [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const form=useForm()

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
                Http.post("/v1/iam/send_org_member_invite", {
                    email,
                    roles,
                }),
            {
                onError: async (error) =>
                    toast.error(await getHttpErrorMsg(error)),
                onSuccess: async (res) => {
                    toast.success("An email invite has been sent.");
                    reset({
                        email: "",
                        roles: "",
                    });
                    setIsAddMemberModalOpen(false);
                },
            }
        );

    const { execute: executeDeleteOrgMember, isLoading: isDeletingOrgMember } =
        useHttpCall();
    const deleteOrgMember = (userId: number) =>
        executeDeleteOrgMember(
            () => Http.delete(`/v1/users/${userId}/org`),
            {
                onSuccess: (res) => {
                    toast.success(
                        "The user was succesfully removed from the organisation."
                    );
                    fetchOrgUsers();
                },
                onError: async (error) => {
                    await getHttpErrorMsg(error);
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
                        logo_url: res["data"]["logo_url"]
                    });
                    if (!newAdminUser) {
                        console.log("newAdminUser", newAdminUser);
                        throw new Error("Updated user is not valid");
                    }
                    dispatch(updateUser(newAdminUser));
                    setFile(newAdminUser.organisations[0]?.logo_url)
                    toast.success("Details were updated successfully");
                },
                onError: async (error) => {
                    await getHttpErrorMsg(error);
                },
            }
        );

    const { execute: executeChangeRole, isLoading: isChangingRole } =
        useHttpCall();
    const changeRole = ({ user, role }: { user: User; role: string }) =>
        executeChangeRole(
            () =>
                Http.put(
                    `/v1/iam/org/make_${role}`,
                    {
                        user_id: user.id,
                    }
                ),
            {
                onError: async (error) => {
                    toast.error(await getHttpErrorMsg(error));
                },
                onSuccess: (res) => {
                    toast.success(
                        `${user.name} was successfully ${
                            role == "admin" ? "promoted" : "demoted"
                        } to ${role}.`
                    );
                    // toast.success("Role was updated successfully");
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
            user: user,
            role: "admin",
        });
    };
    const makeOrgMember = (user: User) => {
        setChangingRoleUserId(user.id);
        changeRole({
            user: user,
            role: "member",
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
        control,
        handleSubmit,
        getValues,
        form, 
        formState,
        file,
        setFile
    };
};

export default AdminTabPanelVM;

export const AdminTabPanelVMContext = createContext({} as any);
