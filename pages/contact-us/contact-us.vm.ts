import { useHttpCall } from "common/hooks";
import Http from "common/http";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ContactusVM = () => {
    const [isSubmissionSuccess, setIsSubmissionSuccess] = useState<boolean>(false);
    const form = useForm();

    useEffect(() => {
        form.reset({});
    }, []);

    const { execute: executeSendEmail, isLoading: isSendingMail } =
        useHttpCall();
    const sendEmail = () => executeSendEmail(() => Http.post(""));
    return { isSubmissionSuccess, sendEmail, isSendingMail, form };
};

export default ContactusVM;
