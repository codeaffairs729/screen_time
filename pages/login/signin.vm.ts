import Http from "common/http";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useHttpCall } from "common/hooks";
import AuthService from "services/auth.service";
import User from "models/user.model";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useContext, useState } from "react";
import { getHttpErrorMsg } from "common/util";
import { usereventLogin } from "services/usermetrics.service";
import { NotificationsVMContext } from "pages/workspace/notification.vm";
import { useRouter } from "next/router";

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
    const path: string | null =
        localStorage.getItem("previous_path") === null
            ? "/"
            : localStorage.getItem("previous_path");
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
                        path === null ? "/" : path.slice(1),
                        fetchNotifications
                    );
                    usereventLogin(User.fromJson(res["user"]));
                },
                onError: async (error: any) => {
                    const res = error.response.clone();
                    setSigninErrorMsg(await getHttpErrorMsg(error));
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

    return {
        form,
        performLogin,
        isSigningIn,
        lastSearchQueryUrl,
        signinErrorMsg,
    };
};

export default SigninVM;
