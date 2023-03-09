import DefaultLayout from "components/layouts/default";
import DatasetDetailVM, { DatasetDetailVMContext } from "./dataset_detail.vm";
import { Tab } from "@headlessui/react";
import Dataset from "models/dataset.model.v4";
import TabPanel from "components/UI/tabbed/panel";
import DatasetHead from "./components/dataset_head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookieFromServer } from "common/utils/cookie.util";
import Http from "common/http";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import { NextPageContext } from "next";
import DatasetTabHeaders from "./components/dataset_tabs";
import DataFilesSection from "./components/data_files_section";
import DatasetInsights from "./components/insights_section";
import DatasetFeedbackSection from "./components/user_feedback";
import RelatedDatasets from "./components/related_datasets";
import ErrorAlert from "components/UI/alerts/error_alert";
import RelatedDatasetsVM, {
    RelatedDatasetsVMContext,
} from "./components/related_datasets/related_datasets.vm";
import BackBtn from "components/UI/buttons/back_btn";

enum tabIndex {
    data_files,
    insights,
    feedback,
    related_datasets,
}
const DatasetDetail = ({ dataset }: { dataset: Dataset | undefined }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { asPath } = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<any>(
        tabIndex[asPath.split("#")[1]?.split("/")[0] as any] || 0
    );
    const vm = DatasetDetailVM(dataset);
    const relatedVM = RelatedDatasetsVM(dataset);

    useEffect(() => {
        const hashParam: string = asPath.split("#")[1]?.split("/")[0];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
    }, []);
    if (!dataset) {
        return (
            <DefaultLayout>
                <ErrorAlert
                    className="max-w-xl mx-auto"
                    message="Something went wrong while fetching the datasets. Please try again later."
                />
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <DatasetDetailVMContext.Provider value={vm}>
                <div className="px-4">
                    <div className="flex flex-col justify-between mb-4 my-2 ml-4">
                            {/* <BackBtn /> */}
                        <p className="text-start text-2xl font-semibold mt-2">
                            DATASET
                        </p>
                        <span></span>
                    </div>
                    <div className="w-full h-fit py-4 bg-white rounded-[20px] shadow-container">
                        <DatasetHead dataset={dataset}/>
                        <div className="flex border-t px-4 shadow-container">
                            {!loading && (
                                <Tab.Group defaultIndex={selectedIndex}>
                                    <DatasetTabHeaders
                                        selectedIndex={selectedIndex}
                                    />
                                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                        <TabPanel className="!bg-white">
                                            <DataFilesSection
                                                goToPreview={() => {
                                                    setSelectedIndex(0);
                                                }}
                                            />
                                        </TabPanel>
                                        <TabPanel className="!bg-white">
                                            <DatasetInsights />
                                        </TabPanel>
                                        <TabPanel className="!bg-white">
                                            <DatasetFeedbackSection />
                                        </TabPanel>
                                        <TabPanel className="!bg-white">
                                            <RelatedDatasetsVMContext.Provider
                                                value={relatedVM}
                                            >
                                                <RelatedDatasets />
                                            </RelatedDatasetsVMContext.Provider>
                                        </TabPanel>
                                    </Tab.Panels>
                                </Tab.Group>
                            )}
                        </div>
                    </div>
                </div>
            </DatasetDetailVMContext.Provider>
        </DefaultLayout>
    );
};

DatasetDetail.getInitialProps = async ({ query, req }: NextPageContext) => {
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
export default DatasetDetail;
