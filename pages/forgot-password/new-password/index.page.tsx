import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import FormRow from "../components/form_row";
import NewPasswordVM from "./new-password.vm";

const ForgotPasswordPage = () => {
  const vm = NewPasswordVM();

  return (
    <DefaultLayout>
      {/* <ForgotPasswordVMContext.Provider value={vm}> */}
      <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
        <div className="text-center">
          <h1 className="font-semibold text-lg mb-2 mt-8">
            Set your new password
          </h1>
          <Link href="#">
            <a className="inline-flex space-x-1">
              <i className="mr-1 text-sm underline">Need help? Contact us</i>{" "}
              <InfoIcon title="Contact us" />
            </a>
          </Link>
        </div>
        <div className="grow flex flex-col items-center justify-center pb-8">
          {vm.resetErrorMsg && (
            <ErrorAlert
              message={vm.resetErrorMsg}
              className="max-w-[450px] w-full mb-4"
            />
          )}
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
          <div className="flex space-x-4 mt-12">
            <PrimaryBtn
              className="bg-dtech-primary-dark min-w-[150px]"
              label="Save"
              isLoading={vm.submitingNewPassword}
              isDisabled={vm.submitingNewPassword}
              onClick={vm.form.handleSubmit(vm.submitNewPassword)}
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
      {/* </ForgotPasswordVMContext.Provider> */}
    </DefaultLayout>
  );
};

export default ForgotPasswordPage;
