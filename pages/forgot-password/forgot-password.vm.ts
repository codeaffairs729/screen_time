import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

const ForgotPasswordVM = () => {
  const router = useRouter();
  const form = useForm();
  const goToStep = (step: PageStep) => {
    router.push(`?step=${step}`);
  };
  const currentStep: PageStep =
    (router.query.step as PageStep) ?? PageStep.RequestResetEmail;
  const { execute: executeSendResetEmail, isLoading: isSendingMail } =
    useHttpCall();
  const sendResetEmail = (data: any) =>
    executeSendResetEmail(
      () => Http.post("/v1/users/send-reset-password-email", data),
      {
        onSuccess: (res) => goToStep(PageStep.EmailSent),
        onError: (error) =>
          getHttpErrorMsg(error).then((msg) => toast.error(msg)),
      }
    );

  return {
    signinErrorMsg: "",
    form,
    router,
    sendResetEmail,
    currentStep,
    isSendingMail,
  };
};

export const ForgotPasswordVMContext = createContext(
  {} as IForgotPasswordVMContext
);

interface IForgotPasswordVMContext {
  signinErrorMsg: string;
  form: UseFormReturn;
  sendResetEmail: (data: any) => Promise<unknown>;
  currentStep: PageStep;
  isSendingMail: boolean;
}

export const enum PageStep {
  RequestResetEmail = "request_reset_email",
  EmailSent = "email_sent",
}

export default ForgotPasswordVM;
