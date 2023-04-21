import { useHttpCall } from "common/hooks";
import Http, { HttpBuilder } from "common/http";
import { getHttpErrorMsg } from "common/util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AccountUnlockVerifyVM = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>();

    const {
        execute: executeVerifyToken,
        isLoading: isVerifyingToken,
        error: verifyTokenError,
        data: verifyTokenData,
    } = useHttpCall();
    const verifyToken = () =>
        executeVerifyToken(
            () => {
                const token = router.query.token;
                // return Http.post(
                //     `/v1/users/unlock/verify`,
                //     { token },
                //     { redirectToLoginPageIfAuthRequired: false }
                // );
                return new HttpBuilder({
                    url: `/v1/users/unlock/verify`,
                    method: "POST",
                })
                    .addBody({ token: token })
                    .run({ retries: 0, tryRefreshingToken: false });
            },
            {
                onError: async (err) => {
                    const msg = await getHttpErrorMsg(err);
                    setErrorMessage(msg);
                },
            }
        );
    useEffect(() => {
        verifyToken();
    }, []);

    return {
        isVerifyingToken,
        verifyTokenError,
        verifyTokenData,
        errorMessage,
    };
};

export default AccountUnlockVerifyVM;
