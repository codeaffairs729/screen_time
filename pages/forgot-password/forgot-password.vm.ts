import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const ForgotPasswordVM = () => {
  const router = useRouter();
  const form = useForm();

  const { execute: executeSendResetEmail } = useHttpCall();
  const sendResetEmail = () => executeSendResetEmail(() => Http.get(""));

  return { signinErrorMsg: "", form, router, sendResetEmail };
};

export default ForgotPasswordVM;
