import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { pickBy } from "lodash-es";
import toast from "react-hot-toast";

const ContactusVM = () => {
    const [isSubmissionSuccess, setIsSubmissionSuccess] =
        useState<boolean>(false);
    const form = useForm();

    useEffect(() => {
        form.reset({});
    }, []);

    const { execute: executeSendEmail, isLoading: isSendingMail } =
        useHttpCall();
    const sendEmail = (data: any) => {
        console.log("data", data);

        const sanitizedValues = pickBy(data, (value) => {
            console.log("value", value);
            if (typeof value == "boolean") {
                return true;
            }

            return value?.length > 0;
        });
        return executeSendEmail(
            () => Http.post("/v1/external/contact_us", sanitizedValues),
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

export default ContactusVM;
