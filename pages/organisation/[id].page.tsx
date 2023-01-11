import DefaultLayout from "components/layouts/default";
import BackBtn from "components/UI/buttons/back_btn";
import { useEffect, useState } from "react";
import OrganisationHead from "./components/organisation_head";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import { getCookieFromServer } from "common/utils/cookie.util";
import OrganisationTabHeaders from "./components/organisation_tabs";
import { useRouter } from "next/router";
import Datasets from "./components/datasets";
import Insights from "./components/insights_section";
import Report from "./components/report_section";
import { NextPageContext } from "next";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import Http from "common/http";
import Organisation from "models/organisation.model";
import OrganisationDetailVM, {
    IOrganisationDetailVMContext,
    OrganisationDetailVMContext,
} from "./organisation_detail.vm";
import ErrorAlert from "components/UI/alerts/error_alert";

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
    const vm: IOrganisationDetailVMContext = OrganisationDetailVM(organisation);

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
                    message="Something went wrong while fetching organisation data. Please try again later."
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
                            Organisation
                        </p>
                        <span></span>
                    </div>
                    <div className="w-full h-fit py-4 bg-dtech-light-grey rounded-[20px] shadow-container">
                        <OrganisationHead />
                        <div className="flex border-t px-4 shadow-container">
                            {!loading && (
                                <Tab.Group defaultIndex={selectedIndex}>
                                    <OrganisationTabHeaders
                                        selectedIndex={selectedIndex}
                                    />
                                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                        <TabPanel className="!bg-dtech-light-grey">
                                            <Datasets />
                                        </TabPanel>
                                        <TabPanel className="!bg-dtech-light-grey">
                                            <Insights />
                                        </TabPanel>
                                        <TabPanel className="!bg-dtech-light-grey">
                                            <Report />
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
        // const datasetData = await Http.get(`/v4/datasets/${datasetId}`, {
        //     baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_ROOT,
        //     extraHeaders: authToken
        //         ? { Authorization: `Bearer ${authToken}` }
        //         : {},
        // });
        // const dataset = Dataset.fromJson(
        //     datasetData[0]["user_search"][0]["results"][0]
        // );
        const organisation = Organisation.fromJson(ORGANISATION_DETAIL);
        return { organisation };
    } catch (error) {
        return { organisation: undefined };
    }
};

const ORGANISATION_DETAIL = {
    id: 1,
    title: "NatureScot Data Services",
    description:
        "NatureScot collects data and information on many aspects of Scotland’s environment. Their online data services let people access this knowledge easily.",
    dataQuality: 3,
    imgUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    domains: ["Health and care"],
    topics: ["Diseases"],
    dataset_count: 856,
    favorites_count: 123,
    view_count: 253,
    download_count: 435,
};

export default OrganisationDetailPage;
