import DefaultLayout from "components/layouts/default";
import DropdownField from "components/UI/form/dropdown_field";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import isEmail from "validator/lib/isEmail";
import FormRow from "./components/form_row";
import SuccessScreen from "./components/success_screen";
import ContactusVM from "./contact-us.vm";

const ContactUsPage = () => {
    const vm = ContactusVM();

    return (
        <DefaultLayout>
            <div className="grow flex flex-col">
                <div className="text-center mt-8 mb-4">
                    <h1 className="font-semibold text-lg">Contact us</h1>
                    <span className="inline-flex space-x-1">
                        <i className="mr-1 text-sm underline">Need help?</i>{" "}
                        <InfoIcon className="ml-1" title="Contact us" />
                    </span>
                </div>
                {vm.isSubmissionSuccess && <SuccessScreen />}
                {!vm.isSubmissionSuccess && (
                    <div className="m-auto w-full">
                        <div className="md:flex md:space-x-6 justify-center max-w-site w-full lg:px-[10%] px-4">
                            <div className="w-full">
                                <FormRow label="Your name" required={true}>
                                    <TextField
                                        className=""
                                        formControl={{
                                            control: vm.form.control,
                                            name: "name",
                                            rules: {
                                                required: "Name is required",
                                            },
                                        }}
                                        placeholder=""
                                    />
                                </FormRow>
                                <FormRow label="Your Email" required={true}>
                                    <TextField
                                        className=""
                                        type="email"
                                        formControl={{
                                            control: vm.form.control,
                                            name: "email",
                                            rules: {
                                                required: "Email is required",
                                                validate: (val: string) => {
                                                    if (val && !isEmail(val)) {
                                                        return "Please enter a valid email";
                                                    }
                                                },
                                            },
                                        }}
                                        placeholder=""
                                    />
                                </FormRow>
                                <FormRow label="Organisation">
                                    <TextField
                                        className=""
                                        formControl={{
                                            control: vm.form.control,
                                            name: "organisation",
                                            rules: {},
                                        }}
                                        placeholder=""
                                    />
                                </FormRow>
                                <FormRow label="Role">
                                    <TextField
                                        className=""
                                        formControl={{
                                            control: vm.form.control,
                                            name: "role",
                                            rules: {},
                                        }}
                                        placeholder=""
                                    />
                                </FormRow>
                                <FormRow label="Data Owner">
                                    <DropdownField
                                        className=""
                                        formControl={{
                                            control: vm.form.control,
                                            name: "data_owner",
                                            rules: {},
                                        }}
                                        options={[
                                            {
                                                value: true,
                                                label: "Yes",
                                            },
                                            {
                                                value: false,
                                                label: "No",
                                            },
                                        ]}
                                        placeholder=""
                                    />
                                </FormRow>
                            </div>
                            <div className="w-full">
                                <FormRow
                                    label="Message"
                                    isTwoRow={true}
                                    className="flex-col h-full pb-3"
                                >
                                    <TextField
                                        type="textarea"
                                        className="w-[315px] h-full"
                                        textfieldClassName="h-full"
                                        formControl={{
                                            control: vm.form.control,
                                            name: "message",
                                            rules: {},
                                        }}
                                    />
                                </FormRow>
                            </div>
                        </div>
                        <PrimaryBtn
                            label="Submit"
                            className="bg-dtech-primary-dark max-w-[120px] my-4 mx-auto"
                            isLoading={vm.isSendingMail}
                            onClick={vm.form.handleSubmit(vm.sendEmail)}
                        />
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default ContactUsPage;
