import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { useEffect, useState } from "react";

const OrganisationInviteVM = ({query}: any) => {
    const {invite_token} = query;
    const [errorData, setErrorData] = useState({
        showError: false,
        errorMessage: "Token is missing. Please make sure the url is correct.",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const { execute: executeVerifyOrgInvite, isLoading: isVerifying } =
        useHttpCall();
    const verifyOrgInvite = () =>
        executeVerifyOrgInvite(
            () =>
                Http.post(`/v1/iam/verify_org_member_invite`, { invite_token }),
            {
                onError: async (error) => {
                    setErrorData({
                        showError: true,
                        errorMessage: await getHttpErrorMsg(error),
                    });
                },
                onSuccess: (res) => {
                    setShowSuccess(true);
                },
            }
        );
    useEffect(() => {
        if (invite_token) {
            setErrorData((prevState) => ({ ...prevState, showError: false }));
            verifyOrgInvite();
        } else {
            setErrorData((prevState) => ({ ...prevState, showError: true }));
        }
    }, [invite_token]);
    return { errorData, isVerifying, showSuccess };
};

export default OrganisationInviteVM;
