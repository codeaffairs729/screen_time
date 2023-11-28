import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import { useContext, useEffect, useState } from "react";
import ForgotPasswordVM, {
    ForgotPasswordVMContext,
    PageStep,
} from "../forgot-password.vm";
import FormRow from "./form_row";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/router";
import NewGradientUI from "components/layouts/gradientLayout";

const RequestResetEmail = () => {
    const vm = useContext(ForgotPasswordVMContext);
    const router = useRouter();

    if (vm.currentStep != PageStep.RequestResetEmail) {
        return <div />;
    }
    return (
        <NewGradientUI>
            <div className="grow flex flex-col items-left max-w-[30%px] justify-evenly sm:justify-center  sm:mx-[20%] sm:my-0 mx-[5%] my-[5%] ">
                <div
                    className="  -mt-[740px] sm:mt-0 mb-8 w-fit absolute sm:relative cursor-pointer"
                    onClick={() => router.push("/login")}
                >
                    <img
                        src="/images/icons/arrows/arrow_back.svg"
                        className=" hover:bg-gray-300 rounded-full"
                    />
                </div>
                <div className="text-center">
                    <h1 className="font-semibold text-[#333333] text-2xl mt-8 sm:mt-0 mb-2 sm:text-xl ">
                        Reset Password
                    </h1>
                </div>
                {vm.signinErrorMsg && (
                    <ErrorAlert
                        message={vm.signinErrorMsg}
                        className="max-w-[450px] w-full mb-4"
                    />
                )}
                <div className=" -mt-72 sm:-mt-10">
                    <div className="mt-4 flex flex-col">
                        <div className="flex flex-row justify-items-start my-8">
                            <FormRow
                                label="Email"
                                className=" !bg-transparent text-[#333333] !text-xl sm:mt-0 sm:!text-base"
                            >
                                {" "}
                                <InfoIcon
                                    tooltipClassName="!bg-dtech-dark-teal"
                                    iconClasses="text-[#333333]  -ml-32 sm:-ml-36"
                                    title="Enter regular text in email id "
                                />
                            </FormRow>
                        </div>
                    </div>
                    <TextField
                        className=" -mt-6 sm:-mt-8 rounded-xl  "
                        textfieldClassName="!bg-white focus:!border-dtech-light-teal"
                        formControl={{
                            control: vm.form.control,
                            name: "email",
                            rules: {
                                required: "Required field",
                                validate: (val: string) => {
                                    if (!isEmail(val)) {
                                        return "Please enter a valid e-mail address";
                                    }
                                },
                            },
                        }}
                        placeholder="Enter Email"
                        type="email"
                        errorPosition={true}
                    />
                </div>

                <div className="flex space-x-4 sm:mt-8 -mt-48 justify-center">
                    <PrimaryBtn
                        // className=" bg-[#6E498E] min-w-[150px] !justify-center !items-center !py-3 w-8 sm:w-full !rounded-[30px]"
                        className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white !rounded-full  max-w-[120px] my-4 !py-[12px] !px-[16px]"
                        label="Send Email"
                        isLoading={vm.isSendingMail}
                        isDisabled={vm.isSendingMail}
                        onClick={vm.form.handleSubmit(vm.sendResetEmail)}
                    />
                </div>
            </div>
        </NewGradientUI>
    );
};

export default RequestResetEmail;
