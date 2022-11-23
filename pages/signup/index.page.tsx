import DefaultLayout from "components/layouts/default";
import DropdownField from "components/UI/form/dropdown_field";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import FormRow from "./components/form_row";
import SignupVM from "./signup.vm";
import isEmail from "validator/lib/isEmail";
import ErrorAlert from "components/UI/alerts/error_alert";

const SignupPage = () => {
    const vm = SignupVM();

    return (
        <DefaultLayout>
            <div className="min-h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
                <div className="text-center mt-8 mb-4">
                    <h1 className="font-semibold text-lg">
                        {vm.signupType == "org_admin"
                            ? "Organisation Admin Sign Up"
                            : "Individual Sign Up"}
                    </h1>
                    <p className="text-sm text-gray-600 max-w-[480px] mx-auto">
                        {vm.signupType == "org_admin"
                            ? "As an organisation admin, you can manage the members and resources of your organisation. Please use a work email address to sign up."
                            : "As a registered user, you can gain access to features such as data downloads, data previews, providing feedback to data providers, among others."}
                    </p>
                </div>
                <div className="grow flex flex-col items-center justify-center">
                    {vm.signupErrorMsg && (
                        <ErrorAlert
                            message={vm.signupErrorMsg}
                            className="max-w-[450px] w-full mb-4"
                        />
                    )}
                    <FormRow label="Name">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: vm.form.control,
                                name: "name",
                                rules: { required: "Name is required" },
                            }}
                            placeholder="Name"
                        />
                    </FormRow>
                    <FormRow label="Email">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: vm.form.control,
                                name: "email",
                                rules: {
                                    required: "Email is required",
                                    validate: (val: string) => {
                                        if (!isEmail(val)) {
                                            return "Please enter a valid email";
                                        }
                                    },
                                },
                            }}
                            placeholder="Email"
                            type="email"
                        />
                    </FormRow>
                    <FormRow label="Password">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: vm.form.control,
                                name: "password",
                                rules: {
                                    validate: (val: string) => {
                                        if (val.length < 8) {
                                            return "Password should be atleast of length 8.";
                                        }
                                        if (val.search(/[A-Z]/) < 0) {
                                            return "Password should contain atleast 1 uppercase character.";
                                        }
                                        if (val.search(/[0-9]/) < 0) {
                                            return "Password should contain atleast 1 number.";
                                        }
                                        if (
                                            val.search(
                                                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
                                            )
                                        ) {
                                            return "Password should contain atleast 1 special character.";
                                        }
                                    },
                                },
                            }}
                            placeholder="Password"
                            type="password"
                        />
                    </FormRow>
                    <FormRow label="Confirm Password">
                        <TextField
                            className="w-60"
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
                            type="password"
                        />
                    </FormRow>
                    <FormRow label="Organisation">
                        <TextField
                            className="w-60"
                            formControl={{
                                control: vm.form.control,
                                name: "organisation",
                                rules: { required: "Organisation is required" },
                            }}
                            placeholder="Organisation"
                        />
                    </FormRow>
                    {/* <FormRow label="Data Owner">
                        <DropdownField
                            className="w-60"
                            placeholder="Choose whether data owner"
                            options={vm.dataOwnerOptions}
                            dataSelector="data-owner-dropdown"
                            formControl={{
                                control: vm.form.control,
                                name: "is_data_owner",
                                rules: {
                                    validate: (val: boolean) => {
                                        if (![true, false].includes(val)) {
                                            return "Data owner is required";
                                        }
                                    },
                                },
                            }}
                        />
                    </FormRow> */}
                    <FormRow label="Role">
                        <DropdownField
                            className="w-60"
                            placeholder="Please select your role"
                            options={vm.roleOptions}
                            dataSelector="role-dropdown"
                            formControl={{
                                control: vm.form.control,
                                name: "role",
                                rules: { required: "Role is required" },
                            }}
                        />
                    </FormRow>
                    {vm.form.watch("role") == "other" && (
                        <FormRow label="Role Other">
                            <TextField
                                className="w-60"
                                formControl={{
                                    control: vm.form.control,
                                    name: "role_other",
                                    rules: {
                                        required: "Role Other is required",
                                    },
                                }}
                                placeholder="Role Other"
                            />
                        </FormRow>
                    )}
                    <div className="flex space-x-4 mt-2">
                        <PrimaryBtn
                            dataSelector="signup-button"
                            className="bg-dtech-primary-dark min-w-[150px]"
                            label="Get started now"
                            isLoading={vm.isSigningUp}
                            isDisabled={vm.isSigningUp}
                            onClick={vm.form.handleSubmit(vm.handleSignup)}
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default SignupPage;
