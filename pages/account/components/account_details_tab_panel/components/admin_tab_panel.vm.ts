import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

const AdminTabPanelVM = () => {
    let [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
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

    return {
        isAddMemberModalOpen,
        setIsAddMemberModalOpen,
        isInvitingMember,
        inviteMember,
    };
};

export default AdminTabPanelVM;

export const AdminTabPanelVMContext = createContext({} as any);
