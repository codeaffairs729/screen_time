import DefaultLayout from "components/layouts/default";
import DatasetDetailVM, { DatasetDetailVMContext } from "./dataset_detail.vm";
import { Tab } from "@headlessui/react";
import Dataset from "models/dataset.model.v4";
import TabPanel from "components/UI/tabbed/panel";
import DatasetHead from "./components/dataset_head";
import { useEffect, useRef, useState } from "react";
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
import { usereventDatasetView } from "services/usermetrics.service";
import clsx from "clsx";

enum tabIndex {
    data_files,
    insights,
    feedback,
    related_datasets,
}
const DatasetDetail = ({ dataset }: { dataset: Dataset | undefined }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { asPath } = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<any>(
        tabIndex[asPath.split("#")[1]?.split("/")[0] as any] || 0
    );
    const vm = DatasetDetailVM(dataset);
    const relatedVM = RelatedDatasetsVM(dataset);
    const imageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const hashParam: string = asPath.split("#")[1]?.split("/")[0];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
    }, []);
    if (typeof window !== "undefined") {
        const previousPath = localStorage.getItem("previous_path");
        if (previousPath?.includes("/search?q=") && dataset) {
            const startIndex =
                previousPath.indexOf("/search?q=") + "/search?q=".length;
            const endIndex = previousPath.indexOf("&", startIndex);
            let extractedString;
            if (endIndex === -1) {
                extractedString = previousPath.replace("/search?q=", "");
            } else {
                extractedString = previousPath.substring(startIndex, endIndex);
            }
            usereventDatasetView(dataset, extractedString);
        }
    }
    console.log({dataset})
    useEffect(() => {
        const hashParam: string = asPath.split("#")[1];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640); // Adjust the breakpoint as needed
        };

        // Call handleResize on initial component render
        handleResize();

        // Add event listener to window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const handleScroll = () => {
        setScrollPosition(-window.scrollY);
        setHeight(window.scrollY)
    };
    const upperLimit1 = -60;
    const upperLimit2 = -270;
    const translationValue1 = Math.max(scrollPosition * 0.5, upperLimit1);
    const translationValue2 = Math.max(scrollPosition * 0.3, upperLimit2 * 1.2);
    useEffect(() => {
        if (imageRef.current) {
            const desiredHeight = `${250}px`;
            imageRef.current.style.height = desiredHeight;
            imageRef.current.style.width = desiredHeight;
        }
    }, [])
    const setHeight = (size: any) => {
        if (imageRef.current) {
            const desiredHeight = `${250 - size}px`;
            imageRef.current.style.height = desiredHeight;
            imageRef.current.style.width = desiredHeight;
        }
    };
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
                <div className=" bg-[#EBEBEB] ">
                    <div className=" bg-white h-16 sm:h-10 -mt-20 sm:mt-0">

                    </div>
                    <div
                        className="bg-black  h-[414px] absolute right-0 z-0 w-full">
                        {/* <img src={`data:image/jpeg;base64,${image}`} className=" w-full h-full" /> */}
                    </div>
                    <div className="px-4 relative">
                        <div
                            className="hidden sm:flex flex-row justify-between mb-4 my-10 ml-4 items-center ">
                            <p className="text-center text-2xl font-bold  px-[37px] py-[18px] bg-[#0E9A8E] bg-opacity-60 text-white">
                                Dataset
                            </p>
                            <span></span>
                            <div ref={imageRef} className=" rounded-full min-h-[100px] min-w-[100px]">
                                <a href={``} target="_blank" rel="noreferrer" className="h-full w-full overflow-hidden bg-[#0E9A8E] bg-opacity-60 rounded-full relative flex items-center justify-center">
                                    <img
                                        // data-tip={"Click to open website"}
                                        src={""}
                                        alt=""
                                        className={clsx(`h-[70%] w-[70%] absolute z-10 `)}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="flex sm:hidden flex-row px-4 py-2 my-2  items-center bg-[#0E9A8E] bg-opacity-60">
                            <a href={``} target="_blank" rel="noreferrer" className=" rounded-full overflow-hidden">
                                <img
                                    // data-tip={"Click to open website"}
                                    src={"organisation.imgUrl"}
                                    alt=""
                                    className="h-[80px] w-[80px] p-2 "
                                />
                            </a>
                            <p className="text-center text-lg font-bold mx-4 text-white">
                                Dataset
                            </p>
                        </div>
                        <div
                            style={{ marginTop: `${translationValue1}px` }}
                        >
                            <div className="w-full h-fit py-4 sm:mt-24 mt-32 bg-white rounded-lg">
                                <DatasetHead dataset={dataset} />
                            </div>
                            <div className="flex border-t sm:mt-[600px]  flex-col bg-[#EBEBEB]"
                                style={{ marginTop: `${translationValue2 + (isMobile ? 320 : 200)}px` }}
                            >
                                <div className="lg:flex border-t px-4 shadow-container">
                                    {!loading && (
                                        <Tab.Group defaultIndex={selectedIndex}>
                                            <DatasetTabHeaders
                                                selectedIndex={selectedIndex}
                                            />
                                            <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                                <TabPanel className="!bg-white !p-0 lg:p-6">
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
        const datasetData = await Http.get(`/v5/datasets/by-dataset-ids?dataset_ids=${datasetId}`, {
            baseUrl: process.env.NEXT_PUBLIC_PUBLIC_API_ROOT,
            extraHeaders: authToken
                ? { Authorization: `Bearer ${authToken}` }
                : {},
        });
        const dataset = Dataset.fromJson(
            datasetData["results"][0]
        );
        return { dataset };
    } catch (error) {
        return { dataset: undefined };
    }
};
export default DatasetDetail;
