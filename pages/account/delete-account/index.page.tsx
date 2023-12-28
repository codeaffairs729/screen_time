import { useContext, useEffect } from "react";
import DeleteAccountVM, {
    DeleteAccountVMContext,
} from "./deleteAccount.vm";
import {useRouter} from "next/router"
import ErrorAlert from "components/UI/alerts/error_alert";
import SuccessAlert from "components/UI/alerts/success_alert";
import Loader from "components/UI/loader";
import DefaultLayout from "components/layouts/default";

const DeleteAccountPage = () => {
    const vm = DeleteAccountVM();
    const router = useRouter();
    useEffect(() => {
        const token = router.query.token;
        if (token) {
            vm.deleteAccount(token);
        }
    }, [router.query.token]);
    return (
        <DefaultLayout>

            {vm.errorMessage && (
                <ErrorAlert message={vm.errorMessage || "Something went wrong, please try again later"} />
            )}
        <div className="grow flex flex-col items-center justify-center max-w-lg h-screen mx-auto">
                {vm.deleteAccountData && (
                    <SuccessAlert message={`Success! The account for ${vm?.deleteAccountData?.user} on Dtechtive (or find.data.gov.scot) has been deleted. You do not need to take any further action. We will miss you!`} />
            )}
            </div>
            {vm.isDeletingAccount && (
                <div className="text-sm text-gray-800">
                    <Loader /> Deleting account, please wait.
                </div>
            )}
        </DefaultLayout>
    );
};

export default DeleteAccountPage;
