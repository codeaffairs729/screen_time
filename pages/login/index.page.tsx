import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Link from "next/link";
import { useRouter } from "next/router";
import FormRow from "./components/form_row";
import SigninVM from "./signin.vm";

const SigninPage = () => {
    const router = useRouter();
    const vm = SigninVM();

    return (
        <DefaultLayout>
            <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
                <div className="text-center">
                    <h1 className="font-semibold text-lg mb-2 mt-8">Log In</h1>
                    <Link
                        href={
                            vm.lastSearchQueryUrl
                                ? `/search${vm.lastSearchQueryUrl}`
                                : "/"
                        }
                    >
                        <a className="inline-flex space-x-1">
                            <i className="mr-1 text-sm underline">
                                Continue as a guest?
                            </i>{" "}
                            <InfoIcon title="Continue using the website without logging in" />
                        </a>
                    </Link>
                </div>
                <div className="grow flex flex-col items-center justify-center">
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
                    <Link href="/forgot-password">
                        <a className="flex items-center ml-16">
                            <i className="mr-1 text-sm underline">
                                Forgot your password?
                            </i>{" "}
                            <InfoIcon title="Reset your password" />
                        </a>
                    </Link>
                    <div className="flex space-x-4 mt-12">
                        <PrimaryBtn
                            className="bg-dtech-primary-dark min-w-[150px]"
                            label="Sign Up"
                            onClick={() => router.push("/signup")}
                        />
                        <PrimaryBtn
                            className="bg-dtech-primary-dark min-w-[150px]"
                            dataSelector="signin-button"
                            label="Log In"
                            isDisabled={vm.isSigningIn}
                            isLoading={vm.isSigningIn}
                            onClick={vm.form.handleSubmit(vm.performLogin)}
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default withAuth(SigninPage);
