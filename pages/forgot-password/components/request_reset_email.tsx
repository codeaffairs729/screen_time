import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import { useContext } from "react";
import ForgotPasswordVM, { ForgotPasswordVMContext, PageStep } from "../forgot-password.vm";
import FormRow from "./form_row";

const RequestResetEmail = () => {
  const vm = useContext(ForgotPasswordVMContext);

  if (vm.currentStep != PageStep.RequestResetEmail) {
    return <div/>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="font-semibold text-lg mb-2 mt-8">
          Forgot your password
        </h1>
        <Link href="#">
          <a className="inline-flex space-x-1">
            <i className="mr-1 text-sm underline">Need help? Contact us</i>{" "}
            <InfoIcon title="Contact us" />
          </a>
        </Link>
      </div>
      <div className="grow flex flex-col items-center justify-center pb-8">
        {vm.signinErrorMsg && (
          <ErrorAlert
            message={vm.signinErrorMsg}
            className="max-w-[450px] w-full mb-4"
          />
        )}
        <FormRow label="Email">
          <TextField
            className="w-60"
            formControl={{
              control: vm.form.control,
              name: "email",
              rules: { required: "Email is required" },
            }}
            placeholder="Email"
            type="email"
          />
        </FormRow>
        <div className="flex space-x-4 mt-12">
          <PrimaryBtn
            className="bg-dtech-primary-dark min-w-[150px]"
            label="Send Email"
            onClick={vm.form.handleSubmit(vm.sendResetEmail)}
          />
        </div>
      </div>
    </>
  );
};

export default RequestResetEmail;
