import DefaultLayout from "components/layouts/default";
import DatasetDetailVM, { DatasetDetailVMContext } from "../dataset_detail.vm";
import { Tab } from "@headlessui/react";
import Dataset from "models/dataset.model.v4";
import TabPanel from "components/UI/tabbed/panel";
import DatasetHead from "./dataset_head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookieFromServer } from "common/utils/cookie.util";
import Http from "common/http";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import { NextPageContext } from "next";
import DatasetTabHeaders from "./dataset_tabs";
import DataFilesSection from "./data_file";
import DatasetInsights from "./insights_section";
import DatasetFeedbackSection from "./user_feedback";
import MayAlsoLike from "./may_also_like";

enum tabIndex {
    data_files,
    preview,
    insights,
    feedback,
    related_datasets,
}
const DatasetDetail = ({ dataset }: { dataset: Dataset | undefined }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const { asPath } = useRouter();
    const vm = DatasetDetailVM(dataset);
    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
    }, []);
    return (
        <DefaultLayout>
            <DatasetDetailVMContext.Provider value={vm}>
                <div className="px-4">
                    <div className="flex flex-row justify-between mb-4 my-2 ml-4">
                        <p className="text-center text-2xl font-semibold">
                            Dataset
                        </p>
                        <span></span>
                    </div>
                    <div className="w-full h-fit py-4 bg-dtech-light-grey rounded-[20px] shadow-container">
                        <DatasetHead />
                        <div className="flex border-t px-4 shadow-container">
                            {!loading && (
                                <Tab.Group defaultIndex={selectedIndex}>
                                    <DatasetTabHeaders
                                        selectedIndex={selectedIndex}
                                    />
                                    <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                        <TabPanel className="!bg-dtech-light-grey">
                                            <DataFilesSection
                                                goToPreview={() => {
                                                    setSelectedIndex(1);
                                                }}
                                            />
                                        </TabPanel>
                                        <TabPanel className="!bg-dtech-light-grey">
                                            <DatasetInsights />
                                        </TabPanel>
                                        <TabPanel className="!bg-dtech-light-grey">
                                            <DatasetFeedbackSection />
                                        </TabPanel>
                                        <TabPanel className="!bg-dtech-light-grey">
                                            <MayAlsoLike />
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
