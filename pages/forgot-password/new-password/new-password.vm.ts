import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import User from "models/user.model";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthService from "services/auth.service";

const NewPasswordVM = () => {
  const router = useRouter();
  const {
    query: { token },
  } = router;
  const form = useForm();
  const [resetErrorMsg, setResetErrorMsg] = useState<string | null>();
  const { execute: executeSubmitNewPassword, isLoading: submitingNewPassword } =
    useHttpCall();
  const submitNewPassword = (data: any) =>
    executeSubmitNewPassword(
      () =>
        Http.post(
          "/v1/users/set-new-password",
          { ...data, token },
          { redirectToLoginPageIfAuthRequired: false }
        ),
      {
        onSuccess: (res) => {
          toast.success(
            "Successfully reset your password; You may now sign in with your new password"
          );
          router.push("/signin");
        },
        onError: async (error: any) =>
          setResetErrorMsg(await getHttpErrorMsg(error)),
      }
    );
  return { form, submitingNewPassword, submitNewPassword, resetErrorMsg };
};

export default NewPasswordVM;
