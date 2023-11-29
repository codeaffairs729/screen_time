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
import Cookies from "js-cookie";
// import SocialLogin from "components/UI/social/social_login";
import dynamic from "next/dynamic";
import NewLoader from "components/cookies/newloader";

const SocialLogin = dynamic(() => import("components/UI/social/social_login"), {
    ssr: false,
});

const SigninPage = () => {
    const vm = SigninVM();
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        Cookies.remove("userData");
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
            {vm.isSsoSigningIn && <NewLoader duration={2000} />}
            <NewGradientUI>
                <div className="grow flex flex-col items-left max-w-[30%px] justify-evenly sm:justify-center  sm:mx-[18%] sm:my-0 mx-[5%] my-[5%] ">
                    <div className="text-center">
                        <h1 className="font-semibold text-[#333333] text-2xl mt-8 mb-2 sm:mt-16 sm:text-xl ">
                            Log In
                        </h1>
                    </div>
                    {
                        <div
                            className=" mb-10 mt-4 w-fit cursor-pointer"
                            onClick={() => router.back()}
                        >
                            <img
                                src="/images/icons/arrows/arrow_back.svg"
                                className="hover:bg-gray-300 rounded-full"
                            />
                        </div>
                    }
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
                                textfieldClassName="!bg-white focus:!border-dtech-light-teal"
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
                            <div className="cursor-pointer">
                                <a className="items-center p-1 rounded-sm self-end underline text-sm text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black">
                                    Unlock account
                                </a>
                                <InfoIcon
                                    tooltipClassName="max-w-sm  !bg-dtech-dark-teal"
                                    iconClasses="text-[#0065BD] mx-2"
                                    title="Enter email id to unlock account"
                                />
                            </div>
                        </Link>
                        <Link href="/forgot-password">
                            <div className="cursor-pointer">
                                <a className="items-center p-1 rounded-sm self-end underline text-sm text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black">
                                    Forgot your password?
                                </a>
                                <InfoIcon
                                    tooltipClassName="max-w-sm  !bg-dtech-dark-teal"
                                    iconClasses="text-[#0065BD] ml-2"
                                    title="Reset your password"
                                />
                            </div>
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
                            className="  bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white text-base font-bold border-0 min-w-[150px] !justify-center !items-center !py-3 w-8 sm:w-full !rounded-[30px]"
                            dataSelector="signin-button"
                            label="Log In"
                            isDisabled={vm.isSigningIn || vm.isSsoSigningIn}
                            isLoading={vm.isSigningIn || vm.isSsoSigningIn}
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
                        <SocialLogin vm={vm} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row mt-4 justify-center items-center">
                            <div className="text-sm mx-2 text-[#333333]">
                                Do not have an account ?
                            </div>
                            <Link href={"/signup"}>
                                <a className="items-center self-end underline text-sm text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black px-1 rounded-sm">
                                    <i className="items-center active:text-black">
                                        Sign up for free
                                    </i>{" "}
                                </a>
                            </Link>
                        </div>
                        <div className="flex flex-row mt-4 justify-center items-center">
                            <div className="text-sm mr-1 text-[#333333]">
                                Do not want an account ?
                            </div>
                            <Link
                                href={
                                    vm.lastSearchQueryUrl
                                        ? `/search${vm.lastSearchQueryUrl}`
                                        : "/"
                                }
                            >
                                <a className="items-center self-end underline text-sm text-dtech-dark-blue hover:underline hover:decoration-dtech-light-blue hover:text-dtech-light-blue hover:bg-[#6DCDCB8C] active:bg-dtech-dark-yellow active:text-black px-1 rounded-sm">
                                    <i className="items-center active:text-black">
                                        Continue as a guest?
                                    </i>{" "}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </NewGradientUI>
        </div>
    );
};

export default withAuth(SigninPage);
