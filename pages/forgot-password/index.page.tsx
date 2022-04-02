import DefaultLayout from "components/layouts/default";
import Link from "next/link";
import EmailSent from "./components/email_sent";
import RequestResetEmail from "./components/request_reset_email";
import ForgotPasswordVM, {
  ForgotPasswordVMContext,
} from "./forgot-password.vm";

const ForgotPasswordPage = () => {
  const vm = ForgotPasswordVM();

  return (
    <DefaultLayout>
      <ForgotPasswordVMContext.Provider value={vm}>
        <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
          <RequestResetEmail />
          <EmailSent />
          <div className="text-center pb-4">
            <Link href="/data-privacy-policy">
              <a className="text-sm underline text-gray-600">
                Data privacy policy
              </a>
            </Link>
          </div>
        </div>
      </ForgotPasswordVMContext.Provider>
    </DefaultLayout>
  );
};

export default ForgotPasswordPage;
