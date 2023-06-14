import DefaultLayout from "components/layouts/default";
import BackBtn from "components/UI/buttons/back_btn";
import { useEffect, useState } from "react";
import OrganisationHead from "./components/organisation_head";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import { getCookieFromServer } from "common/utils/cookie.util";
import OrganisationTabHeaders from "./components/organisation_tabs";
import { useRouter } from "next/router";
import Datasets from "./components/datasets/";
import Insights from "./components/insights_section";
import Report from "./components/report_section";
import { NextPageContext } from "next";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import Http from "common/http";
import Organisation from "models/organisation.model";
import OrganisationDetailVM, {
    OrganisationDetailVMContext,
} from "./organisation_detail.vm";
import ErrorAlert from "components/UI/alerts/error_alert";
import User from "models/user.model";
import { useSelector } from "react-redux";
import { RootState } from "store";

const ORGANIZATION_ADMIN = "Organisation Admin";
const ORGANIZATION_MEMBER = "Organisation Member";

enum tabIndex {
    datasets,
    insights,
    report,
}

const OrganisationDetailPage = ({
    organisation,
}: {
    organisation: Organisation | undefined;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const { asPath } = useRouter();
    const vm: any = OrganisationDetailVM(organisation, asPath.split("/")[2]);
    const user = useSelector((state: RootState) => state.auth.user);
    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
    }, []);

    if (!organisation) {
        return (
            <DefaultLayout>
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching organisation details. Please try again later."
                />
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <OrganisationDetailVMContext.Provider value={vm}>
                <div className="px-4">
                    <div className="flex flex-row justify-between mb-4 my-2 ml-4">
                        <p className="text-center text-2xl font-semibold">
                            Data Provider
                        </p>
                        <span></span>
                    </div>
                    <div className="w-full h-fit py-4 bg-white rounded-[20px] shadow-container">
                        <OrganisationHead />
                        <div className="flex border-t px-4 shadow-container">
                            {!loading && (
                                <Tab.Group defaultIndex={selectedIndex}>
                                    <OrganisationTabHeaders
                                        selectedIndex={selectedIndex}
                                        user={User.getRole(user)?.name}
                                    />
                                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                        <TabPanel className="!bg-white">
                                            <Datasets />
                                        </TabPanel>
                                        <TabPanel className="!bg-white">
                                            <Insights />
                                        </TabPanel>
                                        <TabPanel className="!bg-white">
                                            {(User.getRole(user)?.name ===
                                                ORGANIZATION_ADMIN ||
                                                User.getRole(user)?.name ===
                                                    ORGANIZATION_MEMBER) && (
                                                <Report />
                                            )}
                                        </TabPanel>
                                    </Tab.Panels>
                                </Tab.Group>
                            )}
                        </div>
                    </div>
                </div>
            </OrganisationDetailVMContext.Provider>
        </DefaultLayout>
    );
};

OrganisationDetailPage.getInitialProps = async ({
    query,
    req,
}: NextPageContext) => {
    try {
        const orgId = query["id"];
        let authToken;
        if (req?.headers.cookie) {
            authToken = getCookieFromServer(AUTH_TOKEN, req);
        }
        const res = await Http.get(`/v1/data_sources/provider/${orgId}`, {
            extraHeaders: authToken
                ? { Authorization: `Bearer ${authToken}` }
                : {},
        });

        const organisation = Organisation.fromJson(res[0]);

        return { organisation };
    } catch (error) {
        return { organisation: undefined };
    }
};

export default OrganisationDetailPage;
