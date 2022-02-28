import { useHttpCall } from "common/hooks";
import Http from "common/http";
import User from "models/user.model";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthService from "services/auth.service";

const SignupVM = () => {
  const form = useForm();
  const { execute: executeHandleSignup, isLoading: isSigningUp } =
    useHttpCall();
  const handleSignup = (data: any) =>
    executeHandleSignup(() => Http.post("/v1/users/signup", data), {
      onSuccess: (res) => {
        AuthService.signin(User.fromJson(res["user"]), res["token"], "/");
        toast.success("You have successfully signed up");
      },
      onError: (error: any) =>
        toast.error("Something went wrong while signing up"),
    });

  return { form, handleSignup, isSigningUp };
};

export default SignupVM;
