import DefaultLayout from "components/layouts/default";
import RequestEmailStep from "./components/request_email_step";
import VerifyTokenStep from "./components/verify_token_step";
import VerifyEmailVM, {
    VerifyEmailStep,
    VerifyEmailVMContext,
} from "./verify_email.vm";

const VerifyEmailPage = () => {
    const vm = VerifyEmailVM();

    return (
        <DefaultLayout>
            <VerifyEmailVMContext.Provider value={vm}>
                <div className="min-h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
                    {vm.currentStep == VerifyEmailStep.RequestEmail && (
                        <RequestEmailStep />
                    )}
                    {vm.currentStep == VerifyEmailStep.VerifyToken && (
                        <VerifyTokenStep />
                    )}
                </div>
            </VerifyEmailVMContext.Provider>
        </DefaultLayout>
    );
};

export default VerifyEmailPage;
