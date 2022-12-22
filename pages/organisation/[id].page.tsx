import DefaultLayout from "components/layouts/default";
import BackBtn from "components/UI/buttons/back_btn";
import { useEffect, useState } from "react";
import OrganisationHead from "./components/organisation_head";
import { Tab } from "@headlessui/react";
import TabPanel from "components/UI/tabbed/panel";
import OrganisationTabHeaders from "./components/organisation_tabs";
import { useRouter } from "next/router";
import Datasets from "./components/datasets";
import Insights from "./components/insights_section";
import Report from "./components/report_section";

enum tabIndex {
    datasets,
    insights,
    report,
}

const OrganisationDetailPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const { asPath } = useRouter();

    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
    }, []);

    return (
        <DefaultLayout>
            <div className="px-4">
                <div className="flex flex-row justify-between mb-4 my-2 ml-4">
                    <p className="text-center text-2xl font-semibold">
                        Organisation
                    </p>
                    <span></span>
                </div>
                <div className="w-full h-fit py-4 bg-dtech-light-grey rounded-[20px] shadow-container">
                    <OrganisationHead />
                    <div className="flex border-t px-4 border-t shadow-container">
                        {!loading && (
                            <Tab.Group defaultIndex={selectedIndex}>
                                <OrganisationTabHeaders selectedIndex={selectedIndex} />
                                <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                    <TabPanel className="!bg-dtech-light-grey">
                                        <Datasets />
                                    </TabPanel>
                                    <TabPanel className="!bg-dtech-light-grey">
                                        <Insights />
                                    </TabPanel>
                                    <TabPanel className="!bg-dtech-light-grey">
                                        {/* <Report /> */}
                                    </TabPanel>
                                </Tab.Panels>
                            </Tab.Group>
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default OrganisationDetailPage;
