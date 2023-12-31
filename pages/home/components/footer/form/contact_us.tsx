import { useEffect, useState, useRef } from "react";
import ContactusVM from "pages/contact-us/contact-us.vm";
import isEmail from "validator/lib/isEmail";
import TextField from "components/UI/form/text_field";
import FormRow from "pages/login/components/form_row";
import PrimaryBtn from "components/UI/form/primary_btn";
import ReCAPTCHA from "react-google-recaptcha"
import InfoIcon from "components/UI/icons/info_icon";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const ContactUs = () => {
    const [recaptchaToken, setRecaptchaToken] = useState<string>("");
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
    const [formError, setFormError] = useState<string>("")
    const captchaRef = useRef<ReCAPTCHA | null>(null);
    const vm = ContactusVM()
    const handleRecaptchaChange = async (token: string | undefined) => {
        if (token) {
            setRecaptchaToken(token);
            const verificationResult = await fetch("/api/verify", {
                method: "POST",
                body: token,
            });
            // const verificationResult = await verifyToken(token);
            const data = await verificationResult.json()
            if (data.message == "human") {
                setFormError("")
            }
            else {
                setFormError("could not verify recaptcha")
            }

        }
        else {
            setFormError("Some error occured while getting token")
        }
    };
    return (
        <div className="flex flex-col w-full ">
            <div className=" my-4 font-[700] sm:text-[19px]">Say Hello 👋</div>
            <div className=" flex flex-row w-full ">
                <div className=" bg-[#6E498E] min-w-[2px] mr-4 "></div>
                <div className="flex flex-col w-full">
                    <div className="mb-2">
                        <FormRow
                            label="Name"
                            className="!bg-transparent text-[#333333] !text-base sm:!text-[16px] sm:!font-[700]"
                        >
                            {" "}
                        </FormRow>
                        {/* <InfoIcon
                            tooltipClassName="w-60 !bg-dtech-dark-teal"
                            iconClasses="text-[#333333] -mt-[46px] !ml-14 sm:ml-16"
                            title="Enter your full name"
                        /> */}
                    </div>
                    <TextField
                        className=" -mt-6 !static w-[100%]  sm:-mt-8 rounded-xl !bg-transparent"
                        textfieldClassName="!bg-[#FBFAFA] border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none "
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
                        placeholder="Enter Name"
                        errorPosition={true}
                    />
                    <div className="my-4">
                        <FormRow
                            label="Email"
                            className=" !bg-transparent text-[#333333] !text-base sm:mt-0 sm:!text-[16px] sm:!font-[700]"
                        >

                        </FormRow>
                        {/* <InfoIcon
                            tooltipClassName="w-60 !bg-dtech-dark-teal"
                            iconClasses="text-[#333333] -mt-[46px] !ml-[52px] sm:ml-16"
                            title="Enter your email ID. If signing up as an organisation admin, enter your organisation email ID."
                        /> */}
                    </div>
                    <TextField
                        className=" sm:-mt-2 !static w-[100%] rounded-xl !bg-transparent "
                        textfieldClassName="!bg-[#FBFAFA] border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none"
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
                        placeholder="Enter E Mail"
                        type="email"
                        errorPosition={true}
                    />
                    <div className="my-4">
                        <FormRow
                            label="Message"
                            className="!bg-transparent text-[#333333] !text-base sm:!text-[16px] sm:!font-[700]"
                        >
                        </FormRow>
                        {/* <InfoIcon
                            tooltipClassName="w-60 !bg-dtech-dark-teal"
                            iconClasses="text-[#333333] -mt-[46px] !ml-18 !ml-[75px]"
                            title="Enter your message"
                        /> */}
                    </div>
                    <TextField
                        className=" !-mt-2 sm:-mt-8 !static w-[100%] rounded-xl !bg-transparent "
                        textfieldClassName="!bg-[#FBFAFA] border-0 border-b border-[#C3C3C3] focus:ring-opacity-0 rounded-none"
                        placeholder="Enter Message"
                        formControl={{
                            control: vm.form.control,
                            name: "message",
                            rules: {
                                required: "Message is required",
                            },
                        }}
                        errorPosition={true}
                    />
                    <div className="my-4 text-dtech-main-grey"></div>
                    <ReCAPTCHA
                        sitekey={siteKey}
                        ref={captchaRef}
                        onChange={(token) => token && handleRecaptchaChange(token)}
                    />
                    <div className=" text-red-600">{formError}</div>
                    <PrimaryBtn
                        label="Send"
                        className="bg-dtech-new-main-light active:bg-dtech-dark-yellow hover:bg-dtech-main-dark active:border-b-2 border-black hover:border-0 active:text-black text-white !rounded-full active:animate-ping max-w-[120px] my-4 !py-[12px] !px-[16px]"
                        isLoading={vm.isSendingMail}
                        onClick={async () => {
                            const validated = await vm.form.trigger()
                            if (validated) {
                                if (recaptchaToken) {
                                    vm.form.handleSubmit(vm.sendEmail)();
                                    captchaRef?.current?.reset();
                                }
                                else setFormError("Please verify the reCAPTCHA.");
                            }
                        }}
                    />
                    {vm.isSubmissionSuccess && <div className="  bg-green-700 my-2 flex items-center text-white w-fit px-4 py-2"><IoMdCheckmarkCircleOutline size={32} color="white" /><div className="mx-2">Thanks for your message.</div></div>}
                </div>

            </div>
        </div>
    )
}
export default ContactUs;