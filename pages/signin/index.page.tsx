import DefaultLayout from "components/layouts/default";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Image from "next/image";
import Link from "next/link";
import FormRow from "./components/form_row";
import { format } from "path/posix";
import SigninVM from "./signin.vm";
import { useDispatch, useSelector } from "react-redux";
// import { incrementCounter } from "store/counter/action";
import { RootState } from "store";

const SigninPage = () => {
  const vm = SigninVM();
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <DefaultLayout>
      <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
        <div className="text-center">
          <h1 className="font-semibold text-lg mb-2 mt-8">Login</h1>
          <span className="inline-flex space-x-1">
            <i>Continue as a guest?</i>
            <InfoIcon title="Continue using the website without loggin in" />
          </span>
        </div>
        <div className="grow flex flex-col items-center justify-center pb-8">
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
          <Link href="/">
            <a className="flex items-center ml-16">
              <i className="mr-1 text-sm underline">Forgot your password?</i>{" "}
              <InfoIcon title="Reset your password" />
            </a>
          </Link>
          <div className="flex space-x-4 mt-12">
            <PrimaryBtn className="min-w-[150px]" label="Sign Up" />
            <PrimaryBtn
              className="min-w-[150px]"
              label="Login"
              isLoading={vm.isSigningIn}
              onClick={vm.form.handleSubmit(vm.performLogin)}
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
