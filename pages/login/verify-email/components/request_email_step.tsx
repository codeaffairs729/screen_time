import ErrorAlert from "components/UI/alerts/error_alert";
import SuccessAlert from "components/UI/alerts/success_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import Loader from "components/UI/loader";
import { useContext } from "react";
import { VerifyEmailVMContext } from "../verify_email.vm";

const RequestEmailStep = () => {
    const vm = useContext(VerifyEmailVMContext);
    return (
        <div className="grow flex flex-col items-center justify-center max-w-lg mx-auto">
            {vm.errorMessage && (
                <ErrorAlert message={vm.errorMessage || "Something went wrong, please try again later"} />
            )}
            {vm.sendEmailData && (
                <SuccessAlert message="Verification email has been sent to your email address. Please click on the link in the email to verify your account." />
            )}
            {(!vm.isSendingEmail && !vm.sendEmailData) && (
                <div>
                    <p className="text-sm text-gray-700 mb-2">
                        You need to verify you email before you can login.
                    </p>
                    <PrimaryBtn
                        label="Request Email"
                        className="w-fit bg-dtech-primary-dark mx-auto"
                        onClick={vm.sendEmail}
                    />
                </div>
            )}
            {vm.isSendingEmail && <Loader />}
        </div>
    );
};

export default RequestEmailStep;
