import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { Option } from "components/UI/form/dropdown_field";
import Cookies from "js-cookie";
import User, { UserRole } from "models/user.model";
import { useRouter } from "next/router";
import SigninVM from "pages/login/signin.vm";
import { NotificationsVMContext } from "pages/workspace/notification.vm";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthService from "services/auth.service";

const SignupVM = () => {
    const form = useForm();
    const [signupErrorMsg, setSignupErrorMsg] = useState<string | null>();
    const [signupSuccessMsg, setSignupSuccessMsg] = useState<string | null>();
    const vm = SigninVM();

    const {
        execute: executeHandleSignup,
        isLoading: isSigningUp,
        error,
    } = useHttpCall();
    const {
        query: { signup_type: signupType },
    } = useRouter();
    const { fetchNotifications } = useContext(NotificationsVMContext);
    const handleSignup = (data: any) =>
        executeHandleSignup(
            () => {
                if (Cookies.get("userData")) {
                    const userData = JSON.parse(
                        Cookies.get("userData") as string
                    );
                    if (userData) {
                        data = data?.email == "" &&
                            data?.name == "" &&
                            data?.password == "" && {
                                ...data,
                                email: userData.email,
                                name: userData.name,
                                password: userData.password,
                                provider: "google",
                            };
                    }
                } else {
                    data = { ...data, provider: "" };
                }
                setSignupErrorMsg(null);
                data = data?.role !== "other" && { ...data, role_other: "" };
                return Http.post("/v1/users/signup", {
                    ...data,
                    // signup_type: signupType,
                });
            },
            {
                onSuccess: (res) => {
                    // AuthService.signin(
                    //     User.fromJson(res["user"]),
                    //     res["token"],
                    //     "/",
                    //     fetchNotifications
                    // );
                    if (Cookies.get("userData")) {
                        const userData = JSON.parse(
                            Cookies.get("userData") as string
                        );
                        vm.performGoogleSignIn({
                            "access_token" : userData?.password
                        });
                        Cookies.remove("userData");
                    } else {
                        toast.success("You have signed up successfully.");
                        setSignupSuccessMsg(
                            "Verification email has been sent, please use the link in the email to verify your account. After which you can login into your account."
                        );
                    }
                },
                onError: async (error: any) =>
                    setSignupErrorMsg(await getHttpErrorMsg(error)),
            }
        );

    const roleOptions: Option[] = Object.keys(UserRole ?? {}).map((k) => ({
        value: UserRole[k as keyof typeof UserRole],
        label: k,
    }));

    const accountTypeOptions: Option[] = [
        { value: "individual", label: "Individual" },
        { value: "org_admin", label: "Organisation" },
    ];

    const dataOwnerOptions: Option[] = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
    ];

    return {
        form,
        handleSignup,
        isSigningUp,
        roleOptions,
        accountTypeOptions,
        dataOwnerOptions,
        signupErrorMsg,
        signupType,
        signupSuccessMsg,
    };
};

export default SignupVM;
