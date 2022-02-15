import DefaultLayout from "components/layouts/default";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Image from "next/image";
import Link from "next/link";
import { format } from "path/posix";
import SigninVM from "./signin.vm";

const SigninPage = () => {
  const vm = SigninVM();

  return (
    <DefaultLayout>
      <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
        <div className="text-center">
          <h1 className="font-semibold text-lg mb-2 mt-8">Login</h1>
          <span>
            <i>Continue as a guest?</i>{" "}
            <Image
              src="/images/icons/info.svg"
              width="15px"
              height="15px"
              alt="Info"
            />
          </span>
        </div>
        <div className="grow -mt-8 flex flex-col items-center justify-center">
          <div className="flex items-center mb-3">
            <span className="mr-4 pl-2 w-32 py-2 text-sm font-semibold text-gray-800 bg-gray-200">
              Email
            </span>
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
          </div>
          <div className="flex items-center mb-1">
            <span className="mr-4 pl-2 w-32 py-2 text-sm font-semibold text-gray-800 bg-gray-200">
              Password
            </span>
            <TextField
              className="w-60"
              formControl={{
                control: vm.form.control,
                name: "email",
                rules: {},
              }}
              placeholder="Password"
              type="password"
            />
          </div>
          <Link href="/">
            <a className="flex items-center ml-16">
              <i className="mr-1 text-sm underline">Forgot your password?</i>{" "}
              <InfoIcon title="Reset your password" />
            </a>
          </Link>
          <div className="flex space-x-4 mt-12">
            <PrimaryBtn className="min-w-[150px]" label="Sign Up" />
            <PrimaryBtn className="min-w-[150px]" label="Login" />
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
