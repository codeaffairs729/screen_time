import Http from "common/http";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useHttpCall } from "common/hooks";
import AuthService from "services/auth.service";
import User from "models/user.model";
import { useSelector } from "react-redux";
import { RootState } from "store";

const SigninVM = () => {
  const form = useForm();
  const cache = useSelector((state: RootState) => state.cache);
  const lastSearchQuery = cache["last-search-query"];
  const lastSearchQueryUrl = lastSearchQuery
    ? `?q=${encodeURI(lastSearchQuery)}`
    : "";

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
    lastSearchQueryUrl,
  };
};

export default SigninVM;
