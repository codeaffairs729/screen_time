import Http from "common/http";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useHttpCall } from "common/hooks";
import AuthService from "services/auth.service";
import User from "models/user.model";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useState } from "react";
import { getHttpErrorMsg } from "common/util";
import { posthog } from "posthog-js";

const SigninVM = () => {
    const form = useForm();
    const cache = useSelector((state: RootState) => state.cache);
    const lastSearchQuery = cache["last-search-query"];
    const lastSearchQueryUrl = lastSearchQuery
        ? `?q=${encodeURI(lastSearchQuery)}`
        : "";

    const [signinErrorMsg, setSigninErrorMsg] = useState<string | null>();
    const { isLoading: isSigningIn, execute: executePerformLogin } =
        useHttpCall();
    const performLogin = (data: any) =>
        executePerformLogin(
            () => {
                setSigninErrorMsg(null);
                return Http.post(`/v1/users/signin`, data);
            },
            {
                onSuccess: (res) => {
                    AuthService.signin(
                        User.fromJson(res["user"]),
                        res["token"],
                        "/"
                    );
                    posthog.identify(
                        res["user"].id, // distinct_id, required
                        {}, // $set, optional
                        {
                            email: res["user"].email,
                            role:
                                res["user"].role !== "other"
                                    ? res["user"].role
                                    : res["user"].role_other !== null
                                    ? "other " + res["user"].role_other
                                    : "other",
                        } // $set_once, optional
                    );
                },
                onError: async (error: any) =>
                    setSigninErrorMsg(await getHttpErrorMsg(error)),
            }
        );

    return {
        form,
        performLogin,
        isSigningIn,
        lastSearchQueryUrl,
        signinErrorMsg,
    };
};

export default SigninVM;
