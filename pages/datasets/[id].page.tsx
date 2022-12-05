import DefaultLayout from "components/layouts/default";
import SummarySection from "./components/summary_section";
import DatasetDetailVM, { DatasetDetailVMContext } from "./dataset_detail.vm";
import { Tab } from "@headlessui/react";
import TabHeader from "components/UI/tabbed/header";
import TabPanel from "components/UI/tabbed/panel";
import FeedbackSection from "./components/feedback_section";
import PreviewSection from "./components/preview_section";
import SummaryInsights from "./components/summary_insights";
import { NextPageContext } from "next";
import Http from "common/http";
import Dataset from "models/dataset.model.v4";
import ErrorAlert from "components/UI/alerts/error_alert";
import MayAlsoLike from "./components/may_also_like";
import DataFilesSection from "./components/data_files";
import BackBtn from "components/UI/buttons/back_btn";
import { getCookieFromServer } from "common/utils/cookie.util";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "components/UI/loader";

enum tabIndex {
    data_files,
    preview,
    insights,
    feedback,
    related_datasets,
}

const DatasetDetailPage = ({ dataset }: { dataset: Dataset | undefined }) => {
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const { asPath } = useRouter();
    if (!dataset) {
        return (
            <DefaultLayout>
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching dataset data. Please try again later."
                />
            </DefaultLayout>
        );
    }
    const vm = DatasetDetailVM(dataset);

    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
    }, []);

    return (
        <DefaultLayout>
            <DatasetDetailVMContext.Provider value={vm}>
                <div className="flex flex-row justify-between mb-4">
                    <BackBtn />
                    <p className="text-center text-lg font-semibold">Dataset</p>
                    <span></span>
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        <SummarySection />
                    </div>
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <div className="w-2/3 border">
                            <Tab.Group
                                defaultIndex={selectedIndex}
                                onChange={setSelectedIndex}
                            >
                                <Tab.List className="flex flex-row justify-between">
                                    <TabHeader>Data files</TabHeader>
                                    <TabHeader>Preview</TabHeader>
                                    <TabHeader>Insights</TabHeader>
                                    <TabHeader>Feedback</TabHeader>
                                    <TabHeader>Related datasets</TabHeader>
                                </Tab.List>
                                <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                    <TabPanel>
                                        <DataFilesSection
                                            goToPreview={() => {
                                                setSelectedIndex(1);
                                            }}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <PreviewSection />
                                    </TabPanel>
                                    <TabPanel>
                                        <SummaryInsights />
                                    </TabPanel>
                                    <TabPanel>
                                        <FeedbackSection />
                                    </TabPanel>
                                    <TabPanel>
                                        <MayAlsoLike />
                                    </TabPanel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    )}
                </div>
            </DatasetDetailVMContext.Provider>
        </DefaultLayout>
    );
};

DatasetDetailPage.getInitialProps = async ({ query, req }: NextPageContext) => {
    try {
        const datasetId = query["id"];
        let authToken;
        if (req?.headers.cookie) {
            authToken = getCookieFromServer(AUTH_TOKEN, req);
        }
        const datasetData = await Http.get(`/v4/datasets/${datasetId}`, {
            baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_ROOT,
            extraHeaders: authToken
                ? { Authorization: `Bearer ${authToken}` }
                : {},
        });
        const dataset = Dataset.fromJson(
            datasetData[0]["user_search"][0]["results"][0]
        );
        return { dataset };
    } catch (error) {
        return { dataset: undefined };
    }
};

export default DatasetDetailPage;
