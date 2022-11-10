import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrganisationInviteVM = () => {
    const {
        query: { invite_token },
    } = useRouter();
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
        console.log("useefffect", invite_token, Boolean(invite_token));
        if (invite_token) {
            verifyOrgInvite();
        } else {
            console.log("error");

            setErrorData((prevState) => ({ ...prevState, showError: true }));
        }
    }, []);
    return { errorData, isVerifying, showSuccess };
};

export default OrganisationInviteVM;
