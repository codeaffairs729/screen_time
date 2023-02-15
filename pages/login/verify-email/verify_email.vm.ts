import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { getHttpErrorMsg } from "common/util";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const enum VerifyEmailStep {
    RequestEmail = "request_email",
    VerifyToken = "verify_token",
}

export const enum VerifyEmailActions {
    SendEmail = "send_email",
}

const VerifyEmailVM = () => {
    const router = useRouter();
    const step = String(
        router.query.step ?? VerifyEmailStep.RequestEmail
    );
    const [currentStep, setCurrentStep] = useState<string>();
    useEffect(()=>{
      if(step){
        setCurrentStep(step);
      }
    }, [step]);
    const action = String(router.query.action);
    const [errorMessage, setErrorMessage] = useState<string>();
    const {
        execute: executeSendEmail,
        isLoading: isSendingEmail,
        error: sendEmailError,
        data: sendEmailData,
    } = useHttpCall();
    const sendEmail = () =>
        executeSendEmail(
            () => {
                const email = router.query.email;
                if (!email) {
                    throw new Error("Email is missing");
                }
                return Http.post(`/v1/users/verify-email/sent-mail`, { email });
            },
            {
                onError: async (err) => {
                    const msg = await getHttpErrorMsg(err);
                    setErrorMessage(msg);
                },
            }
        );

    useEffect(() => {
        if (action == VerifyEmailActions.SendEmail) {
            sendEmail();
        }
    }, [action]);

    const {
        execute: executeVerifyToken,
        isLoading: isVerifyingToken,
        error: verifyTokenError,
        data: verifyTokenData,
    } = useHttpCall();
    const verifyToken = () =>
        executeVerifyToken(
            () => {
                const token = router.query.token;
                return Http.post(
                    `/v1/users/verify-email/verify-token`,
                    { token },
                    { redirectToLoginPageIfAuthRequired: false }
                );
            },
            {
                onError: async (err) => {
                    const msg = await getHttpErrorMsg(err);
                    setErrorMessage(msg);
                },
            }
        );
    useEffect(() => {
        if (currentStep == VerifyEmailStep.VerifyToken) {
            verifyToken();
        }
    }, [currentStep]);

    return {
        isSendingEmail,
        sendEmail,
        sendEmailData,
        // sendEmailError,
        // verifyTokenError,
        verifyTokenData,
        isVerifyingToken,
        currentStep,
        errorMessage,
    };
};

export default VerifyEmailVM;

export const VerifyEmailVMContext = createContext<
    ReturnType<typeof VerifyEmailVM>
>({} as ReturnType<typeof VerifyEmailVM>);
