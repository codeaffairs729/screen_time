import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import FormRow from "../components/form_row";
import NewPasswordVM from "./new-password.vm";
import { useState } from "react";
import { useRouter } from "next/router";
import NewGradientUI from "components/layouts/gradientLayout";

const ForgotPasswordPage = () => {
    const vm = NewPasswordVM();
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);

    return (
        <NewGradientUI>
            <div className="grow flex flex-col items-left max-w-[30%px] max-h-[80%] !mt-20 justify-evenly sm:justify-center  sm:mx-[20%] sm:my-0 mx-[5%] my-[5%] ">
                <div
                    className="  -mt-[728px] sm:mt-0 mb-8 w-fit absolute sm:relative cursor-pointer"
                    onClick={() => router.push("/login")}
                >
                    <img src="/images/icons/arrows/arrow_back.svg" />
                </div>
                <div className="text-center">
                    <h1 className="font-semibold text-[#333333] text-2xl mt-8 sm:mt-0 mb-2 sm:text-xl ">
                        New Credentials
                    </h1>
                </div>
                {vm.resetErrorMsg && (
                    <ErrorAlert
                        message={vm.resetErrorMsg}
                        className="max-w-[450px] w-full mb-4"
                    />
                )}
                <div>
                    <div className=" -mt-24 sm:mt-4">
                        <FormRow
                            label="New Password"
                            className=" !bg-transparent text-[#333333] !text-xl sm:!text-base !w-full"
                        >
                            {" "}
                        </FormRow>
                        <InfoIcon
                            tooltipClassName="!bg-dtech-dark-teal"
                            iconClasses="text-[#333333] -mt-[54px] ml-40 sm:ml-32"
                            title="Enter password "
                        />
                    </div>
                    <div className="relative">
                        <TextField
                            className=" -mt-6 sm:-mt-8 rounded-xl !bg-transparent "
                            textfieldClassName="!bg-white focus:!border-dtech-light-teal"
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
                                                err_msgs[err_msgs.length - 1];
                                            if (err_msgs.length > 1) {
                                                suffix = `${err_msgs
                                                    .slice(
                                                        0,
                                                        err_msgs.length - 1
                                                    )
                                                    .join(", ")} , ${suffix}`;
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
                            className="  ml-[90%] xl:ml-[88%] lg:ml-[85%] md:ml-[80%] absolute top-3 sm:top-3"
                            onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                            }
                            src={
                                isPasswordVisible
                                    ? "/images/icons/closed_eye.svg"
                                    : "/images/icons/open_eye.svg"
                            }
                        />
                    </div>
                </div>
                <div>
                    <div className=" -mt-24 sm:mt-4">
                        <FormRow
                            label="Confirm New Password"
                            className=" !bg-transparent text-[#333333] !text-xl sm:!text-base !w-full"
                        >
                            {" "}
                        </FormRow>
                        <InfoIcon
                            tooltipClassName="!bg-dtech-dark-teal"
                            iconClasses="text-[#333333] -mt-[54px] ml-[240px] sm:ml-[200px]"
                            title="Enter password "
                        />
                    </div>
                    <div className="relative">
                        <TextField
                            className=" -mt-6 sm:-mt-8 rounded-xl !bg-transparent "
                            textfieldClassName="!bg-white focus:!border-dtech-light-teal"
                            formControl={{
                                control: vm.form.control,
                                name: "confirm_password",
                                rules: {
                                    required: "Confirm password is required",
                                    validate: (val: string) => {
                                        if (vm.form.watch("password") != val) {
                                            return "Your passwords do no match";
                                        }
                                    },
                                },
                            }}
                            placeholder="Confirm Password"
                            type={
                                isConfirmPasswordVisible ? "text" : "password"
                            }
                            errorPosition={false}
                        />
                        <img
                            className="   ml-[90%] xl:ml-[88%] lg:ml-[85%] md:ml-[80%] absolute top-3 sm:top-3"
                            onClick={() =>
                                setIsConfirmPasswordVisible(
                                    !isConfirmPasswordVisible
                                )
                            }
                            src={
                                isConfirmPasswordVisible
                                    ? "/images/icons/closed_eye.svg"
                                    : "/images/icons/open_eye.svg"
                            }
                        />
                    </div>
                </div>
                <div className="flex space-x-4 -mt-20 sm:mt-8  justify-center">
                    <PrimaryBtn
                        className=" bg-dtech-main-dark min-w-[150px] !justify-center !items-center !py-3 w-8 sm:w-full !rounded-[30px]"
                        label="Done"
                        isLoading={vm.submitingNewPassword}
                        isDisabled={vm.submitingNewPassword}
                        onClick={vm.form.handleSubmit(vm.submitNewPassword)}
                    />
                </div>
            </div>
        </NewGradientUI>
    );
};

// return (
//   <DefaultLayout>
//     {/* <ForgotPasswordVMContext.Provider value={vm}> */}
//     <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
//       <div className="text-center">
//         <h1 className="font-semibold text-lg mb-2 mt-8">
//           Set your new password
//         </h1>
//         {/* <Link href="/contact-us">
//           <a className="inline-flex space-x-1">
//             <i className="mr-1 text-sm underline">Need help? Contact us</i>{" "}
//             <InfoIcon title="Contact us" />
//           </a>
//         </Link> */}
//       </div>
//       <div className="grow flex flex-col items-center justify-center pb-8">
//         {vm.resetErrorMsg && (
//           <ErrorAlert
//             message={vm.resetErrorMsg}
//             className="max-w-[450px] w-full mb-4"
//           />
//         )}
//         <FormRow label="Password">
//           <TextField
//             className="w-60"
//             formControl={{
//               control: vm.form.control,
//               name: "password",
//               rules: {
//                 validate: (val: string) => {
//                   if (val.length < 8) {
//                     return "Password should be atleast of length 8.";
//                   }
//                   if (val.search(/[A-Z]/) < 0) {
//                     return "Password should contain atleast 1 uppercase character.";
//                   }
//                   if (val.search(/[0-9]/) < 0) {
//                     return "Password should contain atleast 1 number.";
//                   }
//                   if (
//                     val.search(
//                       /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
//                     )
//                   ) {
//                     return "Password should contain atleast 1 special character.";
//                   }
//                 },
//               },
//             }}
//             placeholder="Password"
//             type="password"
//           />
//         </FormRow>
//         <FormRow label="Confirm Password">
//           <TextField
//             className="w-60"
//             formControl={{
//               control: vm.form.control,
//               name: "confirm_password",
//               rules: {
//                 required: "Confirm password is required",
//                 validate: (val: string) => {
//                   if (vm.form.watch("password") != val) {
//                     return "Your passwords do no match";
//                   }
//                 },
//               },
//             }}
//             placeholder="Confirm Password"
//             type="password"
//           />
//         </FormRow>
//         <div className="flex space-x-4 mt-12">
//           <PrimaryBtn
//             className="bg-dtech-primary-dark min-w-[150px]"
//             label="Save"
//             isLoading={vm.submitingNewPassword}
//             isDisabled={vm.submitingNewPassword}
//             onClick={vm.form.handleSubmit(vm.submitNewPassword)}
//           />
//         </div>
//       </div>
//       <div className="text-center pb-4">
//         <Link href="/data-privacy-policy">
//           <a className="text-sm underline text-gray-600">
//             Data privacy policy
//           </a>
//         </Link>
//       </div>
//     </div>
//     {/* </ForgotPasswordVMContext.Provider> */}
//   </DefaultLayout>
// );
// };

export default ForgotPasswordPage;
