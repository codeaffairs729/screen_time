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
    });

  // const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_DASHBOARD_API_ROOT}/v1/users/signin`, (url: string)=>Http.post(url))
  // const performLogin = async (data: any) => {
  //   console.log("performLogin", data);

  //   try {
  //     const res = await Http.post(`/v1/users/signin`, data);
  //     toast.success("you have been successfully logged in");
  //     router.push("/search");
  //   } catch (error) {
  //     console.log("error", error);
  //     if (error instanceof Non200ResponseError && error.status == 401) {
  //       const errorRes = await error.response.json();
  //       toast.error(errorRes?.detail ?? "Please check your email and password");
  //     } else {
  //       toast.error("Something went wrong while logging you in");
  //     }
  //   }
  // };

  return {
    form,
    performLogin,
    isSigningIn,
  };
};

export default SigninVM;
