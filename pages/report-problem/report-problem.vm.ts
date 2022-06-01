import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { pickBy } from "lodash-es";
import toast from "react-hot-toast";
import { RootState } from "store";
import { useSelector } from "react-redux";

const ReportProblemVM = () => {
    const [isSubmissionSuccess, setIsSubmissionSuccess] =
        useState<boolean>(false);
    const user = useSelector((state: RootState) => state.auth.user);

    const form = useForm();

    useEffect(() => {
        if (user) {
            form.reset({ name: user.name, email: user.email });
        } else {
            form.reset({});
        }
    }, [user]);

    const { execute: executeSendEmail, isLoading: isSendingMail } =
        useHttpCall();
    const sendEmail = (data: any) => {
        const sanitizedValues = pickBy(data, (value) => {
            if (typeof value == "boolean") {
                return true;
            }
            return value?.length > 0;
        });
        return executeSendEmail(
            () => Http.post("/v1/app-services/report_problem", sanitizedValues),
            {
                onSuccess: (res) => setIsSubmissionSuccess(true),
                onError: (e) =>
                    toast.error(
                        "Something went wrong. Please try again later."
                    ),
            }
        );
    };
    return { isSubmissionSuccess, sendEmail, isSendingMail, form };
};

export default ReportProblemVM;
