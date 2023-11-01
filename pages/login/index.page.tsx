import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import FormRow from "./components/form_row";
import SigninVM from "./signin.vm";
import { useEffect, useState } from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import NewGradientUI from "components/layouts/gradientLayout";
import isEmail from "validator/lib/isEmail";
import Popup from "components/UI/Popop";
import PopupSubscription from "components/UI/popup_subscription";

const SigninPage = () => {
    const vm = SigninVM();
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (user) {
            const timer = setTimeout(() => {
                router.push("/");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [router]);

    return (
        <div className="relative">
            {user && <Popup duration={2000} />}
            <NewGradientUI>
                <div className="grow flex flex-col items-left max-w-[30%px] justify-evenly sm:justify-center  sm:mx-[20%] sm:my-0 mx-[5%] my-[5%] ">
                    <div className="text-center">
                        <h1 className="font-semibold text-[#333333] text-2xl mt-8 mb-2 sm:mt-16 sm:text-xl ">
                            Log In
                        </h1>
                    </div>

                    <div className=" -mt-20 sm:-mt-10">
                        <div className="mt-4 flex flex-col">
                            <div className="flex flex-row justify-items-start my-8">
                                <FormRow
                                    label="Email"
                                    className=" !bg-transparent text-[#333333] !text-xl sm:mt-0 sm:!text-base"
                                >
                                    {" "}
                                    <InfoIcon
                                        tooltipClassName="max-w-sm  !bg-dtech-dark-teal"
                                        iconClasses="text-[#333333]  -ml-24 sm:-ml-24"
                                        title="Enter your email ID. If logging in as an organisation admin, enter your organisation email ID."
                                    />
                                </FormRow>
                            </div>

                            {vm.signinErrorMsg?.includes(
                                "password you entered is wrong"
                            ) && (
                                <div className="text-xs mb-7 sm:mb-10 -mt-10 text-red-800 ml">
                                    {vm.signinErrorMsg}
                                </div>
                            )}
                        </div>
                        <TextField
                            className=" -mt-6 sm:-mt-8 rounded-xl !bg-transparent "
                            textfieldClassName="!bg-white "
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
                            optionsClass="block px-3 py-2 w-full text-sm appearance-none bg-transparent rounded-lg focus:ring-[#6DCDCB] border-2 border-[#333] focus:border-dtech-secondary-light placeholder:text-gray-400 placeholder:text-sm disabled:border-gray-300 disabled:bg-gray-50"
                        />
                    </div>
                    <div className=" -mt-20 sm:-mt-10">
                        <div className="mt-4 flex flex-col">
                            <div className="flex flex-row justify-items-start my-8">
                                <FormRow
                                    label="Password"
                                    className=" !bg-transparent text-[#333333] !text-xl sm:!text-base"
                                >
                                    {" "}
                                    <InfoIcon
                                        tooltipClassName="max-w-sm  !bg-dtech-dark-teal"
                                        iconClasses="text-[#333333] -ml-16 sm:-ml-20"
                                        title="Enter password "
                                    />
                                </FormRow>
                            </div>
                            {vm.signinErrorMsg?.includes("You have made") && (
                                <div className="text-xs mb-7 sm:mb-10 -mt-10 text-red-800">
                                    {vm.signinErrorMsg}
                                </div>
                            )}
                        </div>
                        <div className=" relative ">
                            <TextField
                                className=" -mt-6 sm:-mt-8 rounded-xl !bg-transparent "
                                textfieldClassName="!bg-white "
                                formControl={{
                                    control: vm.form.control,
                                    name: "password",
                                    rules: { required: "Required field" },
                                }}
                                placeholder="Enter password"
                                type={isPasswordVisible ? "text" : "password"}
                                errorPosition={true}
                            />
                            <button
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                                className="-mt-16 ml-[90%] xl:ml-[88%] lg:ml-[85%] md:ml-[80%]"
                            >
                                <img
                                    className=" absolute -mt-[44px]"
                                    src={
                                        isPasswordVisible
                                            ? "/images/icons/closed_eye.svg"
                                            : "images/icons/open_eye.svg"
                                    }
                                />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between mb-4 -mt-12 sm:mt-0 ">
                        <Link href="/login/account-unlock">
                            <a className=" items-center self-end underline text-[#0065BD] text-sm">
                                Unlock account
                                <InfoIcon
                                    tooltipClassName="max-w-sm  !bg-dtech-dark-teal"
                                    iconClasses="text-[#0065BD] mx-2"
                                    title="Enter email id to unlock account"
                                />
                            </a>
                        </Link>
                        <Link href="/forgot-password">
                            <a className=" items-center self-end underline text-[#0065BD] text-sm">
                                Forgot your password?
                                <InfoIcon
                                    tooltipClassName="max-w-sm  !bg-dtech-dark-teal"
                                    iconClasses="text-[#0065BD] ml-2"
                                    title="Reset your password"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className=" -mt-8 sm:mt-0">
                        <input
                            className=" border-[2px] p-2 cursor-pointer  hover:border-4  hover:ring-4 hover:ring-[#C3C3C3] hover:bg-white focus:ring-[#FDD522] focus:border-2 active:bg-[#FDD522] checked:bg-dtech-main-dark"
                            type="checkbox"
                            onChange={() => setRememberMe(!rememberMe)}
                        />{" "}
                        Remember Me
                    </div>
                    <div className="flex space-x-4 sm:mt-8 justify-center">
                        <PrimaryBtn
                            className=" bg-[#6E498E] min-w-[150px] !justify-center !items-center !py-3 w-8 sm:w-full !rounded-[30px]"
                            dataSelector="signin-button"
                            label="Log In"
                            isDisabled={vm.isSigningIn}
                            isLoading={vm.isSigningIn}
                            onClick={() => {
                                vm.form.handleSubmit(() =>
                                    vm.performLogin({
                                        ...vm.form.getValues(),
                                        rememberMe,
                                    })
                                )();
                            }}
                        />
                    </div>

                    <div className=" -mt-12 sm:mt-0">
                        <div className="flex flex-row mt-10 justify-center">
                            <div className=" bg-[#727272] h-[1px] w-[25%] sm:w-[35%]"></div>
                            <div className=" text-[#727272] -mt-3 mx-6">or</div>
                            <div className=" bg-[#727272] h-[1px] w-[25%] sm:w-[35%]"></div>
                        </div>
                        <div className="flex flex-row mt-6 justify-center text-[#333333]">
                            Log In with
                        </div>
                        <div className="flex flex-row mt-4 justify-center">
                            <div className=" mx-4">
                                <img
                                    src="/images/icons/Google.svg"
                                    width={35}
                                ></img>
                            </div>
                            <div className=" mx-4 ">
                                <img
                                    src="/images/icons/Microsoft.svg"
                                    width={35}
                                ></img>
                            </div>
                            <div className=" mx-4 ">
                                <img
                                    src="/images/icons/LinkedIn.svg"
                                    width={35}
                                ></img>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row mt-4 justify-center">
                                <div className="text-sm mx-2 text-[#333333]">
                                    Do not have an account ?
                                </div>
                                <Link href={"/signup"}>
                                    <a className="inline-flex space-x-1 mx-2">
                                        <i className="mr-1 text-sm underline text-[#0065BD]">
                                            Sign up for free
                                        </i>{" "}
                                    </a>
                                </Link>
                            </div>
                            <div className="flex flex-row mt-4 justify-center">
                                <div className="text-sm mx-2 text-[#333333]">
                                    Do not want an account ?
                                </div>
                                <Link
                                    href={
                                        vm.lastSearchQueryUrl
                                            ? `/search${vm.lastSearchQueryUrl}`
                                            : "/"
                                    }
                                >
                                    <a className="inline-flex space-x-1 mx-2">
                                        <i className="mr-1 text-sm underline text-[#0065BD]">
                                            Continue as a guest?
                                        </i>{" "}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </NewGradientUI>
        </div>
    );
};

export default withAuth(SigninPage);
