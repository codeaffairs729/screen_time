import TextField from "components/UI/form/text_field";
import DefaultLayout from "components/layouts/default";
import FormRow from "../components/form_row";
import ErrorAlert from "components/UI/alerts/error_alert";
import LoginUnlockVM from "./login_unlock.vm";
import PrimaryBtn from "components/UI/form/primary_btn";
import { getHttpErrorMsg, getMessageFromResponse } from "common/util";
import SuccessAlert from "components/UI/alerts/success_alert";

const LoginUnlockPage = () => {
    const vm = LoginUnlockVM();

    return (
        <DefaultLayout showSearchBar={false}>
            <div className="min-h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
                <div className="text-center">
                    <h1 className="font-semibold text-lg mb-2 mt-8">
                        Unlock account
                    </h1>
                </div>
                <div className="grow flex flex-col items-center justify-center pb-8 max-w-[448px] w-full mx-auto">
                    {vm.requestUnlockData && (
                        <SuccessAlert
                            message={getMessageFromResponse(
                                vm.requestUnlockData,
                                { defaultMessage: "Email was sent" }
                            )}
                            className="max-w-[450px] w-full mb-4"
                        />
                    )}
                    {vm.requestUnlockEror && (
                        <ErrorAlert
                            message={getMessageFromResponse(
                                vm.requestUnlockEror,
                                { defaultMessage: "Something went wrong" }
                            )}
                            className="max-w-[450px] w-full mb-4"
                        />
                    )}
                    <FormRow label="Email">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: vm.form.control,
                                name: "email",
                                rules: { required: "Email is required" },
                            }}
                            placeholder="Email"
                            type="email"
                        />
                    </FormRow>
                    <div className="flex space-x-4 mt-12">
                        <PrimaryBtn
                            className="bg-dtech-primary-dark min-w-[150px]"
                            label="Send Email"
                            isLoading={vm.isRequestUnlockLoading}
                            isDisabled={vm.isRequestUnlockLoading}
                            onClick={vm.form.handleSubmit(vm.requestUnlock)}
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default LoginUnlockPage;
