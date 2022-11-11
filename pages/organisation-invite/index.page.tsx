import clsx from "clsx";
import withAuth from "common/HOCs/with_auth";
import DefaultLayout from "components/layouts/default";
import ErrorAlert from "components/UI/alerts/error_alert";
import SuccessAlert from "components/UI/alerts/success_alert";
import PrimaryBtn from "components/UI/form/primary_btn";
import TextField from "components/UI/form/text_field";
import InfoIcon from "components/UI/icons/info_icon";
import Loader from "components/UI/loader";
import { NextPageContext } from "next";
import Link from "next/link";
import OrganisationInviteVM from "./organisation_invite.vm";

const OrganisationInvitePage = ({query}: any) => {
    const vm = OrganisationInviteVM({query});
    return (
        <DefaultLayout>
            <div className="container mx-auto">
                <ErrorAlert
                    className={clsx({ hidden: !vm.errorData["showError"] })}
                    message={vm.errorData["errorMessage"]}
                />
                <SuccessAlert
                    className={clsx({ hidden: !vm.showSuccess })}
                    message="You have been successfully added to the new organisation"
                />
                {vm.isVerifying && (
                    <div className="flex items-center justify-center">
                        <Loader />
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

OrganisationInvitePage.getInitialProps = async ({query}: NextPageContext)=>{
    return {query}
}

export default OrganisationInvitePage;
