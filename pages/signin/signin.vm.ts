import Http from "common/http";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import toast, { Toaster } from "react-hot-toast";
import { Non200ResponseError } from "common/exceptions";
import { useRouter } from "next/router";
import { useHttpCall } from "common/hooks";
import AuthService from "services/auth.service";
import User from "models/user.model";

const SigninVM = () => {
  const form = useForm();
  const router = useRouter();

  const { isLoading: isSigningIn, execute: executePerformLogin } =
    useHttpCall();

  const performLogin = (data: any) =>
    executePerformLogin(() => Http.post(`/v1/users/signin`, data), {
      onSuccess: (res) =>
        AuthService.signin(User.fromJson(res["user"]), res["token"], "/"),
      onError: (error) =>
        toast.error("Something went wrong while signing you in"),
    });

  return {
    form,
    performLogin,
    isSigningIn,
  };
};

export default SigninVM;
