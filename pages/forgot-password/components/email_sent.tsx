import PrimaryBtn from "components/UI/form/primary_btn";
import Router from "next/router";
import { useContext } from "react";
import ForgotPasswordVM, {
    ForgotPasswordVMContext,
    PageStep,
} from "../forgot-password.vm";
import NewGradientUI from "components/layouts/gradientLayout";

const EmailSent = () => {
    const vm = useContext(ForgotPasswordVMContext);

    if (vm.currentStep != PageStep.EmailSent) {
        return <div />;
    }

    return (
        <NewGradientUI>
            <div className="text-center">
                <h1 className="font-semibold text-lg mb-2 mt-8">Email sent</h1>
            </div>
            <div className="grow flex flex-col items-center justify-center p-8 pt-0 text-center text-dtech-main-dark max-w-2xl mx-auto">
                If your email exists in our records, you&apos;ll receive a password
                reset link via email. Check your spam folder if it doesn&apos;t
                arrive in 5 minutes. For further assistance, email
                dtechtive@dtime.ai.
                <div className="flex space-x-4 mt-12">
                    <PrimaryBtn
                        className="bg-dtech-main-dark min-w-[150px] !rounded-[30px]"
                        label="Return to Home"
                        onClick={() => Router.push("/")}
                    />
                </div>
            </div>
        </NewGradientUI>
    );
};

export default EmailSent;
