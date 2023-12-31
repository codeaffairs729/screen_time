import Http, { HttpBuilder } from "common/http";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useHttpCall } from "common/hooks";
import AuthService from "services/auth.service";
import User from "models/user.model";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useContext, useEffect, useState } from "react";
import { getHttpErrorMsg } from "common/util";
import { usereventLogin } from "services/usermetrics.service";
import { NotificationsVMContext } from "pages/workspace/notification.vm";
import { useRouter } from "next/router";
import { Non200ResponseError } from "common/exceptions";
import Cookies from "js-cookie";

const getPathBool = (previousPath: any) => {
    switch (previousPath) {
        case "/search/organisation":
            return true;
        case "/datasets/[id]":
            return true;
        case "/search":
            return true;
        default:
            return false;
    }
};
const SigninVM = () => {
    const form = useForm();
    const router = useRouter();
    const cache = useSelector((state: RootState) => state.cache);
    const { fetchNotifications } = useContext(NotificationsVMContext);
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
                return new HttpBuilder({
                    url: `/v1/users/signin`,
                    method: "POST",
                })
                    .addBody(data)
                    .run({ retries: 0, tryRefreshingToken: false });
                // return Http.post(`/v1/users/signin`, data);
            },
            {
                onSuccess: (res) => {
                    AuthService.signin(
                        User.fromJson(res["user"]),
                        res["token"],
                        { rememberMe: res?.remember_me },
                        getPathBool(localStorage.getItem("previous_path")),
                        localStorage.getItem("previous_path") ?? "/",
                        fetchNotifications
                    );
                    usereventLogin(User.fromJson(res["user"]));
                },
                onError: async (error: Non200ResponseError) => {
                    const res = error.response.clone();
                    const errorMsg = await getHttpErrorMsg(error);
                    setSigninErrorMsg(errorMsg);
                    errorMsg?.includes("password you entered is wrong") &&
                        toast.error(
                            "Incorrect email or password. Please retry."
                        );
                    const body = await res.json();
                    if (body["action"] == "redirect_verify_email") {
                        toast.error(
                            "You will now be redirected to request verification email page."
                        );
                        setTimeout(() => {
                            router.push({
                                pathname: encodeURI(`/login/verify-email`),
                                query: {
                                    email: data["email"],
                                    action: "send_email",
                                },
                            });
                        }, 3000);
                    }
                },
            }
        );

    const {
        isLoading: isSsoSigningIn,
        execute: executePerformSsoSignIn,
    } = useHttpCall();

    const performSsoSignIn = (data:any) => {
        Cookies.remove('userData');
        executePerformSsoSignIn(
            () =>
                Http.post(`/v1/users/provider_sign_in?token=${data['access_token']}&provider=${data['provider']}`),
            {
                onSuccess: (res) => {
                    if(!res['user']){
                        const value = {
                            name: res["email"].replace(/[^a-zA-Z]/g, '').replace(/gmail\.com/g, ''),
                            email: res["email"],
                            password: data['access_token'],
                            provider: res['provider']
                        }
                        Cookies.set('userData', JSON.stringify(value))
                        router.push("/signup");
                    }else{
                        AuthService.signin(
                            User.fromJson(res["user"]),
                            res["token"],
                            { rememberMe: res?.remember_me },
                            getPathBool(localStorage.getItem("previous_path")),
                            localStorage.getItem("previous_path") ?? "/",
                            fetchNotifications
                        );
                        usereventLogin(User.fromJson(res["user"]));
                    }
                },
                onError: async (error: Non200ResponseError) => {
                    const res = error.response.clone();
                    const errorMsg = await getHttpErrorMsg(error);
                    setSigninErrorMsg(errorMsg);
                    const body = await res.json();
                    if (body["action"] == "redirect_verify_email") {
                        toast.error(
                            "You will now be redirected to request verification email page."
                        );
                        setTimeout(() => {
                            router.push({
                                pathname: encodeURI(`/login/verify-email`),
                                query: {
                                    email: data["email"],
                                    action: "send_email",
                                },
                            });
                        }, 3000);
                    }
                },
            }
        );
    };

    return {
        form,
        performLogin,
        isSigningIn,
        lastSearchQueryUrl,
        signinErrorMsg,
        performSsoSignIn,
        isSsoSigningIn,
    };
};

export default SigninVM;
