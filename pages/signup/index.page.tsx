import DefaultLayout from "components/layouts/default";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import FormRow from "./components/form_row";
import SignupVM from "./signup.vm";

const SigninPage = () => {
  const vm = SignupVM();

  return (
    <DefaultLayout>
      <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
        <div className="text-center mt-8 mb-4">
          <h1 className="font-semibold text-lg">Sign up</h1>
          <span className="inline-flex space-x-1">
            <i>Why should you create an account?</i>{" "}
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
                rules: {},
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
                rules: {},
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
                rules: {},
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
                rules: {},
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
                rules: {},
              }}
              placeholder="Organisation"
            />
          </FormRow>
          <FormRow label="Role">
            <TextField
              className="w-60"
              formControl={{
                control: vm.form.control,
                name: "user_type",
                rules: {},
              }}
              placeholder="Role"
            />
          </FormRow>
          <FormRow label="Data Owner">
            <TextField
              className="w-60"
              formControl={{
                control: vm.form.control,
                name: "data_owner",
                rules: {},
              }}
              placeholder="Data Owner"
            />
          </FormRow>
          <div className="flex space-x-4 mt-2">
            <PrimaryBtn
              className="bg-dtech-primary-dark min-w-[150px]"
              label="Get started now"
              onClick={vm.form.handleSubmit(vm.handleSignup)}
            />
          </div>
        </div>
        <div className="text-center pb-4">
          <Link href="/">
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
