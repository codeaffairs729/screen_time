import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { Option } from "components/UI/form/dropdown_field";
import User, { Role } from "models/user.model";
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
      },
      onError: async (error: any) => toast.error(await getHttpErrorMsg(error)),
    });

  const roleOptions: Option[] = Object.keys(Role ?? {}).map((k) => ({
    value: Role[k as keyof typeof Role],
    label: k,
  }));

  const dataOwnerOptions: Option[] = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  return { form, handleSignup, isSigningUp, roleOptions, dataOwnerOptions };
};

export default SignupVM;
