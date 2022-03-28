import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm, UseFormReturn } from "react-hook-form";

const ForgotPasswordVM = () => {
  const router = useRouter();
  const form = useForm();
  const goToStep = (step: PageStep) => {
    router.push(`?step=${step}`);
  };
  const currentStep: PageStep =
    (router.query.step as PageStep) ?? PageStep.RequestResetEmail;
  const { execute: executeSendResetEmail } = useHttpCall();
  const sendResetEmail = () =>
    executeSendResetEmail(() => true, {
      onSuccess: (res) => goToStep(PageStep.EmailSent),
    });

  return {
    signinErrorMsg: "",
    form,
    router,
    sendResetEmail,
    currentStep,
  };
};

export const ForgotPasswordVMContext = createContext(
  {} as IForgotPasswordVMContext
);

interface IForgotPasswordVMContext {
  signinErrorMsg: string;
  form: UseFormReturn;
  sendResetEmail: () => void;
  currentStep: PageStep;
  setCurrentStep: Dispatch<SetStateAction<PageStep>>;
}

export const enum PageStep {
  RequestResetEmail = "request_reset_email",
  EmailSent = "email_sent",
}

export default ForgotPasswordVM;
