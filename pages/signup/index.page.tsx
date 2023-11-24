import DefaultLayout from "components/layouts/default";
import DropdownField from "components/UI/form/dropdown_field";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import FormRow from "./components/form_row";
import SignupVM from "./signup.vm";
import isEmail from "validator/lib/isEmail";
import ErrorAlert from "components/UI/alerts/error_alert";
import SuccessAlert from "components/UI/alerts/success_alert";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RootState } from "store";
import { useSelector } from "react-redux";
import InfoIcon from "components/UI/icons/info_icon";
import NewGradientUI from "components/layouts/gradientLayout";
import Link from "next/link";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import SignupMessage from "./components/signup_message";
// import SocialLogin from "components/UI/social/social_login";

const SocialLogin = dynamic(() => import("components/UI/social/social_login"), {
    ssr: false,
});

const SecondStep = ({
    vm,
    step,
    setStep,
    organisationRequired,
    isChecked,
    setIsChecked,
    showError,
    setOrganisationRequired,
    setShowError,
}: {
    vm: any;
    step: boolean;
    setStep: any;
    organisationRequired: boolean;
    isChecked: boolean;
    setIsChecked: any;
    showError: boolean;
    setOrganisationRequired: any;
    setShowError: any;
}) => {
    const [socialUser, setSocialUser] = useState(false);
    useEffect(() => {
        const userData = Cookies.get("userData");
        if (userData) {
            setSocialUser(true);
        }
    }, []);
    return (
        <div className="grow flex flex-col items-left max-w-[30%px] justify-evenly sm:justify-center mt-10  sm:mx-[20%] sm:my-0 mx-[5%] my-[5%] ">
            {!socialUser && (
                <div
                    className=" mb-10 mt-4 w-fit cursor-pointer"
                    onClick={() => setStep(!step)}
                >
                    <img
                        src="/images/icons/arrows/arrow_back.svg"
                        className="hover:bg-gray-300 rounded-full"
                    />
                </div>
            )}
            <div className=" -mt-12 sm:mt-0">
                <div className="mt-4">
                    <FormRow
                        label="Account type"
                        className=" !bg-transparent text-[#333333] !text-xl sm:!text-base"
                    >
                        {" "}
                    </FormRow>
                    <InfoIcon
                        tooltipClassName=" max- max-w-sm  !bg-dtech-dark-teal"
                        iconClasses="text-[#333333] ml-36 -mt-[54px] sm:!ml-[118px]"
                        title="Select one account type "
                    />
                </div>

                <DropdownField
                    newDropdown={true}
                    errorPosition={true}
                    className="w-full -mt-6 sm:-mt-8 "
                    placeholder="Select from the drop-down"
                    options={vm.accountTypeOptions}
                    dataSelector="account-dropdown"
                    formControl={{
                        control: vm.form.control,
                        name: "signup_type",
                        rules: {
                            required: "Required field",
                        },
                    }}
                    optionClass=" border-2 border-[#6DCDCB] !rounded-[30px]  "
                    dropDownCss="absolute w-full overflow-auto text-base bg-white  shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border-[3px] border-dtech-light-teal border-t-0 w-[100%] rounded-b-3xl z-20 !overflow-hidden"
                    newOptionclass={true}
                />
                <div className="mt-4">
                    <FormRow
                        label="Organisation"
                        className=" !bg-transparent text-[#333333] !text-xl sm:!text-base"
                    >
                        {" "}
                    </FormRow>
                    <InfoIcon
                        tooltipClassName=" max-w-sm  !bg-dtech-dark-teal"
                        iconClasses="text-[#333333] -mt-[54px] ml-36 sm:ml-[118px]"
                        title="Enter the name of the organisation that you are affiliated to"
                    />
                </div>

                <TextField
                    type="text"
                    errorPosition={true}
                    className=" -mt-6 sm:-mt-8 rounded-xl !bg-transparent "
                    textfieldClassName="!bg-white"
                    formControl={{
                        control: vm.form.control,
                        name: "organisation",
                        rules: {
                            ...(organisationRequired
                                ? { required: "Required field" }
                                : { required: false }),
                        },
                    }}
                    placeholder="E.g. ABC Corp"
                />

                <div className="mt-4">
                    <FormRow
                        label="Role"
                        className=" !bg-transparent text-[#333333] !text-xl sm:!text-base"
                    ></FormRow>
                    <InfoIcon
                        tooltipClassName=" max-w-sm  !bg-dtech-dark-teal"
                        iconClasses="text-[#333333] -mt-[56px] ml-14 sm:ml-12"
                        title="Select role "
                    />
                </div>

                <DropdownField
                    newDropdown={true}
                    errorPosition={true}
                    className=" w-full -mt-6 sm:-mt-8 "
                    placeholder="Select your role"
                    options={vm.roleOptions}
                    dataSelector="role-dropdown"
                    formControl={{
                        control: vm.form.control,
                        name: "role",
                        rules: { required: "Required field" },
                    }}
                    optionClass=" border-2 border-[#6DCDCB] !rounded-[30px]  "
                    signupDropdown={true}
                    newOptionclass={true}
                    dropDownCss="absolute w-full py-1  overflow-auto text-base bg-white  shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border-[3px] border-dtech-light-teal border-t-0 w-[100%] rounded-b-3xl z-20 !overflow-hidden"
                />

                {vm.form.watch("role") == "other" && (
                    <TextField
                        className=" mt-4     rounded-xl !bg-white "
                        formControl={{
                            control: vm.form.control,
                            name: "role_other",
                            rules: {
                                required: "Required field",
                            },
                        }}
                        placeholder="Enter other role"
                    />
                )}
            </div>
            <div className="flex mt-2  sm:mt-8">
                <input
                    className=" border-[2px] p-2 cursor-pointer  hover:border-4  hover:ring-4 hover:ring-[#C3C3C3] hover:bg-white focus:ring-[#FDD522] focus:border-2 active:bg-[#FDD522] checked:bg-dtech-main-dark"
                    type="checkbox"
                    onChange={() => setIsChecked(!isChecked)}
                />
                <div className=" -mt-1 ml-8 font-[Roboto] text-l">
                    I Accept Dtechtive’s{" "}
                    <a
                        className=" text-[#0065BD] underline"
                        href="https://dtechtive.com/data-privacy-policy"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Data Privacy Policy
                    </a>
                </div>
            </div>
            {!isChecked && showError && (
                <ErrorAlert
                    message={
                        "Please agree to the terms and policies to proceed."
                    }
                    className="max-w-[450px] w-full my-4"
                />
            )}
            <div className="flex flex-row my-10  sm:my-10 justify-center">
                <div className=" bg-[#727272] h-[1px] w-[25%] sm:w-[35%]"></div>
                <div className=" text-[#727272] -mt-3 ">Step 2/2</div>
                <div className=" bg-[#727272] h-[1px] w-[25%] sm:w-[35%]"></div>
            </div>
            <div className="flex justify-center !items-center space-x-4">
                <PrimaryBtn
                    dataSelector="signup-button"
                    className=" bg-[#6E498E] min-w-[150px] my-2 !justify-center !items-center !py-3 w-8 sm:w-full !rounded-[30px]"
                    label="Create my account"
                    isLoading={vm.isSigningUp}
                    isDisabled={vm.isSigningUp}
                    onClick={() => {
                        vm.form.getValues().signup_type == "org_admin"
                            ? setOrganisationRequired(true)
                            : setOrganisationRequired(false);
                        isChecked
                            ? vm.form.handleSubmit(() =>
                                  vm.handleSignup({
                                      ...vm.form.getValues(),
                                      // confirm_password:
                                      //     vm.form.getValues().password,
                                  })
                              )()
                            : setShowError(true);
                    }}
                />
            </div>
        </div>
    );
};

const SignupPage = () => {
    const vm = SignupVM();
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [organisationRequired, setOrganisationRequired] = useState(false);
    const [step, setStep] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user]);

    useEffect(() => {
        const userData = Cookies.get("userData");
        if (userData) {
            const signUpData = JSON.parse(userData);
            setStep(signUpData.length !== 0);
        }
    }, [Cookies.get("userData")]);


    if (vm.signupErrorMsg || vm.signupSuccessMsg) {
        return <SignupMessage successMessage={vm.signupSuccessMsg} errorMessage={vm.signupErrorMsg }/>;
    }
    return (
        <NewGradientUI>
            {!step ? (
                <div className="grow flex flex-col items-left max-w-[30%px] justify-evenly sm:justify-center  sm:mx-[20%] sm:my-0 mx-[5%] my-[5%] ">
                    <div className="text-center">
                        <h1 className="font-semibold text-[#333333] text-2xl mt-8 mb-2 sm:text-xl ">
                            Create an Account
                        </h1>
                    </div>

                    <div>
                        <div className="mt-4">
                            <FormRow
                                label="Name"
                                className=" !bg-transparent text-[#333333] !text-xl sm:mt-0 sm:!text-base"
                            >
                                {" "}
                            </FormRow>
                            <InfoIcon
                                tooltipClassName=" max-w-sm  !bg-dtech-dark-teal"
                                iconClasses="text-[#333333] -mt-[54px] ml-20 sm:ml-16"
                                title="Enter your full name"
                            />
                        </div>
                        <TextField
                            className=" -mt-6 sm:-mt-8 rounded-xl !bg-transparent "
                            textfieldClassName="!bg-white"
                            formControl={{
                                control: vm.form.control,
                                name: "name",
                                rules: {
                                    required: "Name is required",
                                    pattern: {
                                        value: /^[A-Za-z\s]+$/,
                                        message: "Use only letters",
                                    },
                                },
                            }}
                            placeholder="E.g. Jane Doe"
                            errorPosition={true}
                        />
                        <div className="mt-4">
                            <FormRow
                                label="Email"
                                className=" !bg-transparent text-[#333333] !text-xl sm:mt-0 sm:!text-base"
                            ></FormRow>
                            <InfoIcon
                                tooltipClassName=" max-w-sm  !bg-dtech-dark-teal"
                                iconClasses="text-[#333333] -mt-[54px] ml-[72px] sm:ml-16"
                                title="Enter your email ID. If signing up as an organisation admin, enter your organisation email ID."
                            />
                        </div>
                        <TextField
                            className=" -mt-6 sm:-mt-8 rounded-xl !bg-transparent "
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
                            placeholder="E.g. jane.doe@abc.org"
                            type="email"
                            errorPosition={true}
                        />
                        <div className="mt-4">
                            <FormRow
                                label="Password"
                                className=" !bg-transparent text-[#333333] !text-xl sm:!text-base"
                            >
                                {" "}
                            </FormRow>
                            <InfoIcon
                                tooltipClassName="max-w-sm  !bg-dtech-dark-teal"
                                iconClasses="text-[#333333] -mt-[54px] ml-28 sm:ml-24"
                                title="Create a secure password using 8 characters with at least 1 uppercase character, 1 number and 1 special character[!@#$%^&*]"
                            />
                        </div>
                        <div className="relative">
                            <TextField
                                className=" -mt-6 sm:-mt-8 rounded-xl !bg-transparent "
                                textfieldClassName="!bg-white"
                                formControl={{
                                    control: vm.form.control,
                                    name: "password",
                                    rules: {
                                        validate: (val: string) => {
                                            const prefix =
                                                "Password should contain atleast,";
                                            const specialChars = /[ !@#$%^&*]/;
                                            const err_msgs = [];
                                            if (val.length < 8) {
                                                err_msgs.push("8 charachters");
                                            }
                                            if (val.search(/[A-Z]/) < 0) {
                                                err_msgs.push(
                                                    "1 uppercase character"
                                                );
                                            }
                                            if (val.search(/[0-9]/) < 0) {
                                                err_msgs.push("1 number");
                                            }
                                            if (!specialChars.test(val)) {
                                                err_msgs.push(
                                                    "1 special character[!@#$%^&*]"
                                                );
                                            }
                                            if (err_msgs.length) {
                                                let suffix =
                                                    err_msgs[
                                                        err_msgs.length - 1
                                                    ];
                                                if (err_msgs.length > 1) {
                                                    suffix = `${err_msgs
                                                        .slice(
                                                            0,
                                                            err_msgs.length - 1
                                                        )
                                                        .join(
                                                            ", "
                                                        )} , ${suffix}`;
                                                }
                                                return `${prefix} ${suffix}`;
                                            }
                                        },
                                    },
                                }}
                                placeholder="Enter password"
                                type={isPasswordVisible ? "text" : "password"}
                                errorPosition={false}
                            />
                            <img
                                className=" ml-[90%] xl:ml-[88%] lg:ml-[85%] md:ml-[80%] absolute top-3"
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                                src={
                                    isPasswordVisible
                                        ? "/images/icons/closed_eye.svg"
                                        : "images/icons/open_eye.svg"
                                }
                            />
                        </div>

                        <div className="flex justify-center !items-center space-x-4 my-10 sm:my-10">
                            <PrimaryBtn
                                dataSelector="next-button"
                                className=" bg-[#6E498E] min-w-[150px] !justify-center !items-center !py-3 w-8 sm:w-full !rounded-[30px]"
                                label="Next"
                                onClick={vm.form.handleSubmit(() =>
                                    setStep(!step)
                                )}
                            />
                        </div>
                        <div className="flex flex-row my-10 sm:my-8 mt- justify-center">
                            <div className=" bg-[#727272] h-[1px] w-[25%] sm:w-[35%]"></div>
                            <div className=" text-[#727272] -mt-3 mx-6">or</div>
                            <div className=" bg-[#727272] h-[1px] w-[25%] sm:w-[35%]"></div>
                        </div>
                        <div className="my-8">
                            <div className="flex flex-row justify-center text-[#333333]">
                                Sign Up with
                            </div>
                            <SocialLogin />
                        </div>
                        <div className="flex flex-row my-10 sm:my-8 justify-center">
                            <div className=" bg-[#727272] h-[1px] w-[25%] sm:w-[35%]"></div>
                            <div className=" text-[#727272] -mt-3  ">
                                Step 1/2
                            </div>
                            <div className=" bg-[#727272] h-[1px] w-[25%] sm:w-[35%]"></div>
                        </div>
                        <div className="flex flex-row mt-4 mb-8 justify-center">
                            <div className="text-sm mx-2 text-[#333333]">
                                Already have an account ?
                            </div>
                            <Link href={"/login"}>
                                <a className="inline-flex space-x-1 ">
                                    <i className="mr-1 text-sm underline text-[#0065BD]">
                                        Log in
                                    </i>{" "}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <SecondStep
                    showError={showError}
                    setShowError={setShowError}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    vm={vm}
                    step={step}
                    setStep={setStep}
                    organisationRequired={organisationRequired}
                    setOrganisationRequired={setOrganisationRequired}
                />
            )}
        </NewGradientUI>
    );
};

export default SignupPage;
