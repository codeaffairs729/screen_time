import ErrorAlert from "components/UI/alerts/error_alert";
import SuccessAlert from "components/UI/alerts/success_alert";
import Loader from "components/UI/loader";
import { useContext } from "react";
import { VerifyEmailVMContext } from "../verify_email.vm";

const VerifyTokenStep = () => {
    const vm = useContext(VerifyEmailVMContext);
    return (
        <div className="grow flex flex-col items-center justify-center max-w-lg mx-auto">
            {vm.errorMessage && (
                <ErrorAlert message={vm.errorMessage || "Something went wrong, please try again later"} />
            )}
            {vm.verifyTokenData && (
                <SuccessAlert message="You email has been successfully verified. You can login to your account now." />
            )}
            {/* {(!vm.isVerifyingToken && !vm.verifyTokenData) && (
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
            )} */}
            {vm.isVerifyingToken && (
                <div className="text-sm text-gray-800">
                    <Loader /> Verifying token, please wait.
                </div>
            )}
        </div>
    );
};

export default VerifyTokenStep;
