import TextField from "components/UI/form/text_field";
import DefaultLayout from "components/layouts/default";
import FormRow from "../components/form_row";
import ErrorAlert from "components/UI/alerts/error_alert";
import LoginUnlockVM from "./login_unlock.vm";
import PrimaryBtn from "components/UI/form/primary_btn";
import { getHttpErrorMsg, getMessageFromResponse } from "common/util";
import SuccessAlert from "components/UI/alerts/success_alert";
import { useEffect, useState } from "react";
import InfoIcon from "components/UI/icons/info_icon";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/router";
import NewGradientUI from "components/layouts/gradientLayout";


const LoginUnlockPage = () => {
    const vm = LoginUnlockVM();
    const router = useRouter();

    return (
        <NewGradientUI>
            <div className="grow flex flex-col items-left max-w-[30%px] justify-center sm:justify-center  sm:mx-[20%] sm:my-0 mx-[5%] my-[5%] ">
                <div
                    className="  -mt-[740px] sm:mt-0 mb-8 w-fit absolute sm:relative cursor-pointer"
                    onClick={() => router.push("/login")}
                >
                    <img src="/images/icons/arrows/arrow_back.svg" className=" hover:bg-gray-300 rounded-full"/>
                </div>
                <div className="text-center">
                    <h1 className="font-semibold text-[#333333] text-2xl  mb-2 sm:text-xl ">
                        Unlock account
                    </h1>
                </div>
                {vm.requestUnlockData && (
                    <SuccessAlert
                        message={getMessageFromResponse(
                            vm.requestUnlockData,
                            { defaultMessage: "Success. If the account exists and was locked, you will receive an email." }
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

                <div className=" sm:-mt-10">
                    <div className="mt-0 sm:mt-8 flex flex-col">
                        <div className="flex flex-row justify-items-start my-8">
                            <FormRow
                                label="Email"
                                className=" !bg-transparent text-[#333333] !text-xl sm:mt-0 sm:!text-base"
                            >
                                {" "}
                                <InfoIcon
                                    tooltipClassName="bg-dtech-dark-teal"
                                    iconClasses="text-[#333333]  -ml-24 sm:-ml-28"
                                    title="Enter your email ID. If logging in as an organisation admin, enter your organisation email ID."
                                />
                            </FormRow>
                        </div>
                    </div>
                    <TextField
                        className=" -mt-6 sm:-mt-8 rounded-xl  "
                        textfieldClassName="!bg-white"
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

                <div className="flex space-x-4 sm:mt-8 mt-12 justify-center">
                    <PrimaryBtn
                        // className=" bg-[#6E498E] min-w-[150px] !justify-center !items-center !py-3 w-8 sm:w-full !rounded-[30px]"
                        className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white !rounded-full max-w-[120px] my-4 !py-[12px] !px-[16px]"
                        label="Send Link"
                        isLoading={vm.isRequestUnlockLoading}
                        isDisabled={vm.isRequestUnlockLoading}
                        onClick={vm.form.handleSubmit(vm.requestUnlock)}
                    />
                </div>
            </div>
        </NewGradientUI>
    );
};
export default LoginUnlockPage;
