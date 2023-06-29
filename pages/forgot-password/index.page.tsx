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
    // <DefaultLayout>
      <ForgotPasswordVMContext.Provider value={vm}>
        <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-between">
          <RequestResetEmail />
          <EmailSent />
        </div>
      </ForgotPasswordVMContext.Provider>
    // </DefaultLayout>
  );
};

export default ForgotPasswordPage;
