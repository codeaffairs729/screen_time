import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { Option } from "components/UI/form/dropdown_field";
import User, { Role } from "models/user.model";
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
  const handleSignup = (data: any) =>
    executeHandleSignup(
      () => {
        setSignupErrorMsg(null);
        return Http.post("/v1/users/signup", data);
      },
      {
        onSuccess: (res) => {
          AuthService.signin(User.fromJson(res["user"]), res["token"], "/");
        },
        onError: async (error: any) =>
          setSignupErrorMsg(await getHttpErrorMsg(error)),
      }
    );

  const roleOptions: Option[] = Object.keys(Role ?? {}).map((k) => ({
    value: Role[k as keyof typeof Role],
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
  };
};

export default SignupVM;
