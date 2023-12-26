import { useContext, useEffect } from "react";
import DeleteAccountVM, {
    DeleteAccountVMContext,
} from "./deleteAccount.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import SuccessAlert from "components/UI/alerts/success_alert";
import Loader from "components/UI/loader";

const DeleteAccountPage = () => {
    const vm = DeleteAccountVM();
    useEffect(() => {
       vm.deleteAccount() 
    },[])
    return (
        <div className="grow flex flex-col items-center justify-center max-w-lg mx-auto">
            {vm.errorMessage && (
                <ErrorAlert message={vm.errorMessage || "Something went wrong, please try again later"} />
            )}
            {vm.deleteAccountData && (
                <SuccessAlert message="Your account has been successfully deleted." />
            )}
            {vm.isDeletingAccount && (
                <div className="text-sm text-gray-800">
                    <Loader /> Deleting account, please wait.
                </div>
            )}
        </div>
    );
};

export default DeleteAccountPage;
