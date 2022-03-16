import DefaultLayout from "components/layouts/default";
import DropdownField from "components/UI/form/dropdown_field";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import { useWatch } from "react-hook-form";
import FormRow from "./components/form_row";
import SignupVM from "./signup.vm";
import isEmail from "validator/lib/isEmail";

const SigninPage = () => {
  const vm = SignupVM();

  return (
    <DefaultLayout>
      <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
        <div className="text-center mt-8 mb-4">
          <h1 className="font-semibold text-lg">Sign up</h1>
          <span className="inline-flex space-x-1">
            <i className="mr-1 text-sm underline">Why should you create an account?</i>{" "}
            <InfoIcon
              className="ml-1"
              title="Register a new account to access more features"
            />
          </span>
        </div>
        <div className="grow flex flex-col items-center justify-center pb-8">
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
                rules: { required: "Password is required" },
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
                  required: "Confitm password is required",
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
          <FormRow label="Data Owner">
            <DropdownField
              className="w-60"
              placeholder="Choose whether data owner"
              options={vm.dataOwnerOptions}
              formControl={{
                control: vm.form.control,
                name: "is_data_owner",
                // rules: { required: "Data owner is required" },
                rules: {
                  validate: (val: boolean) => {
                    console.log('val', val, JSON.stringify(val));
                    
                    if (![true, false].includes(val)) {
                      return "Data owner is requireds";
                    }
                  },
                },
              }}
            />
          </FormRow>
          <FormRow label="Role">
            <DropdownField
              className="w-60"
              placeholder="Please select your role"
              options={vm.roleOptions}
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
                  rules: { required: "Role Other is required" },
                }}
                placeholder="Role Other"
              />
            </FormRow>
          )}
          <div className="flex space-x-4 mt-2">
            <PrimaryBtn
              className="bg-dtech-primary-dark min-w-[150px]"
              label="Get started now"
              onClick={vm.form.handleSubmit(vm.handleSignup)}
            />
          </div>
        </div>
        <div className="text-center pb-4">
          <Link href="/data-privacy-policy">
            <a className="text-sm underline text-gray-600">
              Data privacy policy
            </a>
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SigninPage;
