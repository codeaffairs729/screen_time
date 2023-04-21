import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import SuccessAlert from "components/UI/alerts/success_alert";
import Loader from "components/UI/loader";
import AccountUnlockVerifyVM from "./account_unlock_verify.vm";
import { getMessageFromResponse } from "common/util";

const VerifyEmailPage = () => {
    const vm = AccountUnlockVerifyVM();

    return (
        <DefaultLayout>
            <div className="min-h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
                <div className="grow flex flex-col items-center justify-center max-w-lg mx-auto">
                    {vm.errorMessage && (
                        <ErrorAlert
                            message={
                                vm.errorMessage ||
                                "Something went wrong, please try again later"
                            }
                        />
                    )}
                    {vm.verifyTokenData && (
                        <SuccessAlert
                            message={getMessageFromResponse(
                                vm.verifyTokenData,
                                {
                                    defaultMessage:
                                        "Your account is now unlocked.",
                                }
                            )}
                        />
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
            </div>
        </DefaultLayout>
    );
};

export default VerifyEmailPage;
