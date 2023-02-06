import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import ForgotPasswordVM, {
    ForgotPasswordVMContext,
    PageStep,
} from "../forgot-password.vm";
import FormRow from "./form_row";

const EmailSent = () => {
    const vm = useContext(ForgotPasswordVMContext);

    if (vm.currentStep != PageStep.EmailSent) {
        return <div />;
    }

    return (
        <>
            <div className="text-center">
                <h1 className="font-semibold text-lg mb-2 mt-8">Email sent</h1>
            </div>
            <div className="grow flex flex-col items-center justify-center p-8 pt-0 text-center text-gray-600 max-w-2xl mx-auto">
                An email containing a reset link to create a new password was
                sent to your email address if that email address exists in our
                records. If you don’t receive a message in 5 minutes, check the
                junk folder. If you are still experiencing any problems, contact
                support at dtechtive@dtime.ai
                <div className="flex space-x-4 mt-12">
                    <PrimaryBtn
                        className="bg-dtech-primary-dark min-w-[150px]"
                        label="Return to Home"
                        onClick={() => Router.push("/")}
                    />
                </div>
            </div>
        </>
    );
};

export default EmailSent;
