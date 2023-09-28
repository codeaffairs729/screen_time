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
// import DataFilesSection from "./components/data_files_section";
// import DatasetInsights from "./components/insights_section";
// import DatasetFeedbackSection from "./components/user_feedback";
// import RelatedDatasets from "./components/related_datasets";
import ErrorAlert from "components/UI/alerts/error_alert";
import RelatedDatasetsVM, {
    RelatedDatasetsVMContext,
} from "./components/related_datasets/related_datasets.vm";
import { usereventDatasetView } from "services/usermetrics.service";
import Image from "next/image";
import customImageLoader from "../../components/image/customImage";
import dynamic from "next/dynamic";
import Head from 'next/head';
import Script from 'next/script';

const DataFilesSection = dynamic(() => import("./components/data_files_section"), {
    ssr: false,
});
const DatasetFeedbackSection = dynamic(() => import("./components/user_feedback"), {
    ssr: false,
});
const RelatedDatasets = dynamic(() => import("./components/related_datasets"), {
    ssr: false,
});
const DatasetInsights = dynamic(() => import("./components/insights_section"), {
    ssr: false,
});
const datasetHeaders = [
    {
        name: "User Feedback",
    },
    {
        name: "Insights",
    },
]
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
    const [topicImage, setTopicImage] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const { asPath } = useRouter();
    const [scrollLeft, setScrollLeft] = useState(0);
    const [highlightedDot, setHighlightedDot] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<any>(
        tabIndex[asPath.split("#")[1]?.split("/")[0] as any] || 0
    );
    const vm = DatasetDetailVM(dataset);
    const relatedVM = RelatedDatasetsVM(dataset);
    const imageRef = useRef<HTMLDivElement>(null)
    const fetchImages = async () => {
        const logoUrl = await Http.get(`/v1/datasets/${dataset?.id}/logo`, {
            baseUrl: process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT,
        })

        return logoUrl
    }
    useEffect(() => {
        const hashParam: string = asPath.split("#")[1]?.split("/")[0];
        setSelectedIndex(tabIndex[hashParam as any]);
        setLoading(false);

        const loadImage = async () => {
            const image = await fetchImages();
            setImgUrl(image.logo_url.logo_url)
            setTopicImage(image.topic_image_url)
        };

        loadImage();
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
    const schemaMarkup = {
        "@context": "http://schema.org",
        "@type": "Dataset",
        "title": dataset?.detail.name,
        "description": dataset?.detail.description,
        "uuid": dataset?.id,
        "dataset_url": dataset?.detail.datasetUrl,
        "created": dataset?.detail.createdAt,
        "last_updated": dataset?.detail.lastUpdate,
        "keywords": dataset?.detail.keywords,
        "usage_rights": dataset?.detail.license.usageRights == "Closed" ? true : false,
        "license": {
            "@type": "CreativeWork",
            "data_licences.type": dataset?.detail.license.type,
            "data_licences.url": dataset?.detail.license.url,
        },
        "includedInDataCatalog": {
            "@type": "DataCatalog",
            "data_host organisation": dataset?.host.organisation,
            "data_host uuid": dataset?.host.uuid,
            "data_host url": dataset?.host.hostUrl,
            "data_host logo_url": imgUrl,
            "data_host description": null,
            "@ContactPoint": {
                "data_host contacts.name": dataset?.host.contact.name,
                "data_host contacts.email": dataset?.host.contact.email,
                "data_host contacts.phone": dataset?.host.contact.phone,
                "data_host contacts.role": dataset?.host.contact.role,
            }
        },
        "publisher": {
            "@type": "Organisation",
            "data_owner organisation": dataset?.owner.organisation,
            "data_owner uuid": dataset?.owner.uuid,
            "data_owner url": dataset?.owner.ownerUrl,
            "data_owner logo_url": null,
            "data_owner description": null,
            "@ContactPoint": {
                "data_owner contacts.name": dataset?.owner.contact.name,
                "data_owner contacts.email": dataset?.owner.contact.email,
                "data_owner contacts.phone": dataset?.owner.contact.phone,
                "data_owner contacts.role": dataset?.owner.contact.role,
            }
        },
        "distribution": dataset?.urls.map((item) => ({
            "@type": "DataDownload",
            "download_files.description": item.description,
            "download_files.format": item.format,
            "download_files.size_mb": item.sizemb,
            "download_files.url": item.url,
            "download_files.created": item.createdAt,
            "download_files.last_updated": item.lastUpdated,
        }))
    }

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
                <Head>
                    <script
                        type='application/ld+json'
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
                </Head>
                <div className=" bg-[#EBEBEB] ">
                    <div className=" bg-white h-16 sm:h-10 -mt-20 sm:mt-0">

                    </div>
                    <div
                        className="bg-black  h-[414px] overflow-hidden absolute left-0 z-0 w-full ">
                        {topicImage && (
                            <div className="">
                                <Image
                                    src={topicImage}
                                    alt="topic image"
                                    layout="responsive" // Use "responsive" layout to achieve "object-fit: contain"
                                    width={50} // Set the desired width
                                    height={50} // Set the desired height
                                    loader={customImageLoader} // Use the custom loader
                                    className=" sm:!-mt-[50%] mt-0"
                                />
                            </div>
                        )}

                    </div>
                    <div className="px-4 relative">
                        <div
                            className="hidden sm:flex flex-row justify-between mb-4 my-10 ml-4 items-center ">
                            <p className="text-center text-2xl font-bold  px-[37px] py-[18px] bg-[#0E9A8E] bg-opacity-60 text-white">
                                Dataset
                            </p>
                            <span></span>
                            <div ref={imageRef} className="rounded-full min-h-[100px] min-w-[100px]">
                                <a href={`${dataset.owner.ownerUrl}`} target="_blank" rel="noreferrer" className="h-full w-full overflow-hidden bg-white bg-opacity-80 rounded-full relative flex items-center justify-center">
                                    {imgUrl && (
                                        <div className=" w-full h-full ">
                                            <div className=" h-full w-full relative"> {/* Add padding here */}
                                                <Image
                                                    src={imgUrl}
                                                    loader={customImageLoader}
                                                    alt="ORG"
                                                    // objectFit="cover"
                                                    layout="fill"
                                                    // height={100}
                                                    // width={100}
                                                    className=" !w-[100%] !h-full !p-6 object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </a>
                            </div>


                        </div>
                        <div className="flex sm:hidden flex-row px-4 py-2 my-2  items-center bg-dtech-light-teal xl:bg-white bg-opacity-80">
                            <div className=" ">

                                <a href={`${dataset.owner.ownerUrl}`} target="_blank" rel="noreferrer" className=" rounded-full overflow-hidden">
                                    {imgUrl &&

                                        <div className="  relative"> {/* Add padding here */}
                                            <Image
                                                src={imgUrl}
                                                loader={customImageLoader}
                                                alt="ORG"
                                                // layout="fill"
                                                width={50}
                                                height={50}
                                                className=" object-contain"
                                            />
                                        </div>}
                                </a>
                            </div>
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
                            <div className="flex border-t mt-10 flex-col bg-[#EBEBEB]"
                            // style={{ marginTop: `${translationValue2 + (isMobile ? 320 : 200)}px` }}
                            >
                                <div className=" bg-white sm:px-8 px-4 sm:py-4 py-2 overflow-x-scroll " id="scrollable-div">

                                    <DataFilesSection
                                        goToPreview={() => {
                                            setSelectedIndex(0);
                                        }}
                                        scrollLeft={scrollLeft}
                                        setScrollLeft={setScrollLeft}
                                        setHighlightedDot={setHighlightedDot}
                                    />
                                    <div className=" sm:hidden flex flex-row w-full items-center justify-center">
                                        {[1, 2, 3].map((item, index) => (
                                            <div
                                                key={index}
                                                className={` rounded-full w-3 h-3 m-1 ${index === highlightedDot ? 'bg-dtech-dark-teal' : 'bg-[#D9D9D9]'}`}
                                            // onClick={() => handleDotClick(index)}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col border-t mt-4 xl:mt-10 shadow-container">
                                    {!loading && (
                                        <Tab.Group defaultIndex={selectedIndex}>
                                            <DatasetTabHeaders
                                                selectedIndex={selectedIndex}
                                                headers={datasetHeaders}
                                            />
                                            <Tab.Panels className="h-[calc(100%-var(--dataset-detail-tab-header-height))] w-full flex">
                                                <TabPanel className="!bg-white">
                                                    <DatasetFeedbackSection />
                                                </TabPanel>
                                                <TabPanel className="!bg-white">
                                                    <DatasetInsights />
                                                </TabPanel>
                                            </Tab.Panels>
                                        </Tab.Group>
                                    )}
                                </div>
                                <div className=" text-[#2D2D32] lg:my-8 my-4 font-bold lg:text-2xl text-lg">
                                    Related Datasets
                                </div>
                                <RelatedDatasetsVMContext.Provider
                                    value={relatedVM}
                                >
                                    <RelatedDatasets />
                                </RelatedDatasetsVMContext.Provider>
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
            // extraHeaders: authToken
            //     ? { Authorization: `Bearer ${authToken}` }
            //     : {},
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
