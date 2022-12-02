import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { Option } from "components/UI/form/dropdown_field";
import User, { UserRole } from "models/user.model";
import { useRouter } from "next/router";
import { NotificationsVM } from "pages/workspace/workspace.vm";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthService from "services/auth.service";

const SignupVM = () => {
    const form = useForm();
    const [signupErrorMsg, setSignupErrorMsg] = useState<string | null>();
    const {
        execute: executeHandleSignup,
        isLoading: isSigningUp,
        error,
    } = useHttpCall();
    const {
        query: { signup_type: signupType },
    } = useRouter();
    const { fetchNotifications } = NotificationsVM();
    const handleSignup = (data: any) =>
        executeHandleSignup(
            () => {
                setSignupErrorMsg(null);
                return Http.post("/v1/users/signup", {
                    ...data,
                    signup_type: signupType,
                });
            },
            {
                onSuccess: (res) => {
                    AuthService.signin(
                        User.fromJson(res["user"]),
                        res["token"],
                        "/",
                        fetchNotifications
                    );
                },
                onError: async (error: any) =>
                    setSignupErrorMsg(await getHttpErrorMsg(error)),
            }
        );

    const roleOptions: Option[] = Object.keys(UserRole ?? {}).map((k) => ({
        value: UserRole[k as keyof typeof UserRole],
        label: k,
    }));

    const dataOwnerOptions: Option[] = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ];

    return {
        form,
        handleSignup,
        isSigningUp,
        roleOptions,
        dataOwnerOptions,
        signupErrorMsg,
        signupType,
    };
};

export default SignupVM;
